package org.woork.backend.authentication;

import org.woork.backend.user.User;

public class LoginResponse {
    User user;
    String access_token;

    public LoginResponse(User user, String access_token) {
        this.user = user;
        this.access_token = access_token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }
}
