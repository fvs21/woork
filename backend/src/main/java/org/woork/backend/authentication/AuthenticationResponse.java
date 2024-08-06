package org.woork.backend.authentication;

import org.woork.backend.user.User;
import org.woork.backend.user.UserDTO;

public class AuthenticationResponse {
    UserDTO user;
    String access_token;

    public AuthenticationResponse() {}

    public AuthenticationResponse(UserDTO user, String access_token) {
        this.user = user;
        this.access_token = access_token;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }
}
