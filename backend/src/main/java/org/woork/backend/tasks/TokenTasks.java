package org.woork.backend.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.woork.backend.token.TokenService;

@Component
public class TokenTasks {
    private final TokenService tokenService;

    @Autowired
    public TokenTasks(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Scheduled(fixedRate = 86400000)
    public void deleteBlacklistedTokens() {
        tokenService.flushExpiredBlackListRefreshTokens();
    }
}
