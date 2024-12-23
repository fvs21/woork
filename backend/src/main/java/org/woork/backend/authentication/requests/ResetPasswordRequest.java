package org.woork.backend.authentication.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {
    @NotBlank(message = "Token cannot be null")
    private String token;

    @NotBlank(message = "Credential cannot be null")
    private String credential;

    @NotBlank(message = "Password cannot be null")
    private String password;

    @NotBlank(message = "Password confirmation cannot be null")
    private String confirmPassword;

    public ResetPasswordRequest() {}

    public ResetPasswordRequest(String token, String credential, String password, String confirmPassword) {
        this.credential = credential;
        this.token = token;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
