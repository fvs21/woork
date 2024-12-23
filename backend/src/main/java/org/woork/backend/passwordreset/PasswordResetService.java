package org.woork.backend.passwordreset;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.woork.backend.exceptions.ResetTokenDoesNotExistException;
import org.woork.backend.exceptions.UserDoesNotExistException;
import org.woork.backend.user.User;
import org.woork.backend.user.UserRepository;

import java.util.Objects;

@Service
public class PasswordResetService {
    private static final Log log = LogFactory.getLog(PasswordResetService.class);
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public PasswordResetService(
            PasswordResetTokenRepository passwordResetTokenRepository,
            PasswordEncoder passwordEncoder,
            UserRepository userRepository
    ) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    //Mensajes
    public static String RESET_LINK_SENT = "El link de recuperación fue enviado.";
    public static String PASSWORD_RESET = "Contraseña cambiada.";
    public static String INVALID_USER = "No se encontró ningun usuario con esas credenciales.";
    public static String INVALID_TOKEN = "Link de verificación incorrecto.";
    public static String RESET_THROTTLED = "Espera unos minutos antes de solicitar otro link.";
    public static String RECENTLY_UPDATED_PASSWORD = "Cambiaste tu contraseña recientemente. Debes esperar 1 día desde que la actualizaste para solicitar cambiarla.";

    public String createPasswordResetToken(User user) {
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setUserId(user.getId());

        String token = RandomStringUtils.random(64, true, true);

        passwordResetToken.setToken(passwordEncoder.encode(token));
        passwordResetTokenRepository.save(passwordResetToken);
        return token;
    }

    public boolean resetTokenExists(String token) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(
                passwordEncoder.encode(token)
        ).orElse(null);
        return passwordResetToken != null;
    }

    public PasswordResetToken getTokenFromUser(User user) {
        return passwordResetTokenRepository.findByUserId(user.getId()).orElseThrow(() -> new ResetTokenDoesNotExistException(INVALID_TOKEN));
    }

    public void resetPassword(String token, String credential, String newPassword) {
        User user = userRepository.findByEmailOrPhone(credential, credential).orElseThrow(() -> new ResetTokenDoesNotExistException(INVALID_TOKEN));

        PasswordResetToken passwordResetToken = getTokenFromUser(user);

        if(!passwordEncoder.matches(token, passwordResetToken.getToken())) {
            throw new ResetTokenDoesNotExistException(INVALID_TOKEN);
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        passwordResetTokenRepository.delete(passwordResetToken);
    }
}
