package org.woork.backend.passwordreset;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.woork.backend.exceptions.ResetTokenDoesNotExistException;
import org.woork.backend.exceptions.UserDoesNotExistException;
import org.woork.backend.user.PasswordResetToken;
import org.woork.backend.user.User;
import org.woork.backend.user.UserRepository;

import java.util.Objects;

@Service
public class PasswordResetService {
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
    public static String RESET_LINK_SENT = "El link de recuperación fue enviado";
    public static String PASSWORD_RESET = "Contraseña cambiada.";
    public static String INVALID_USER = "No se encontró ningun usuario con esas credenciales.";
    public static String INVALID_TOKEN = "Token de verificación incorrecto.";
    public static String RESET_THROTTLED = "Espera unos minutos antes de solicitar otro link.";
    public static String RECENTLY_UPDATED_PASSWORD = "Cambiaste tu contraseña recientemente. Debes esperar 1 día desde que la actualizaste para solicitar cambiarla.";

    public String createPasswordResetToken(String credentialType, String credential) {
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        if(Objects.equals(credentialType, "email"))
            passwordResetToken.setEmail(credential);
        else
            passwordResetToken.setPhone(credential);

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

    public User getUserFromToken(String token) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(
                passwordEncoder.encode(token)
        ).orElse(null);
        if(passwordResetToken == null) {
            throw new ResetTokenDoesNotExistException(INVALID_TOKEN);
        }

        return userRepository.findByEmailOrPhone(passwordResetToken.getEmail(), passwordResetToken.getPhone()).orElseThrow(UserDoesNotExistException::new);
    }

    public void resetPassword(String token, String newPassword) {
        User user = getUserFromToken(token);
        user.setPassword(passwordEncoder.encode(newPassword));
        passwordResetTokenRepository.deleteByToken(token);
    }
}
