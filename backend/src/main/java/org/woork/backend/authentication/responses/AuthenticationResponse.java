package org.woork.backend.authentication.responses;

import org.woork.backend.user.resources.UserResource;

public class AuthenticationResponse {
    UserResource user;
    String accessToken;

    public AuthenticationResponse() {}

    public AuthenticationResponse(UserResource user, String access_token) {
        this.user = user;
        this.accessToken = access_token;
    }

    public UserResource getUser() {
        return user;
    }

    public void setUser(UserResource user) {
        this.user = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
