package org.woork.backend.authentication.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticatedUpdatePasswordRequest {
    @NotBlank(message = "Contraseña incorrecta.")
    private String currentPassword;

    @NotBlank(message = "Provee una contraseña nueva.")
    @Size(min = 8, message = "Elige una contraseña más segura")
    private String newPassword;

    @NotBlank(message = "Las contraseñas no son iguales.")
    @Size(min = 8, message = "Las contraseñas no son iguales.")
    private String confirmPassword;
}
