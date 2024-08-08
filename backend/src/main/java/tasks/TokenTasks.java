package tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.woork.backend.token.RefreshTokenBlacklist;
import org.woork.backend.token.RefreshTokenRepository;

import java.time.Instant;
import java.util.List;

@Component
public class TokenTasks {
    private final RefreshTokenRepository refreshTokenRepository;

    @Autowired
    public TokenTasks(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Scheduled(cron = "* 3 * * 1 ?", zone = "UTC-6")
    public void deleteBlacklistedTokens() {
        List<RefreshTokenBlacklist> refreshTokenBlacklist = refreshTokenRepository.findAll();
        for(RefreshTokenBlacklist refreshTokenBlacklistItem : refreshTokenBlacklist) {
            if(refreshTokenBlacklistItem.getExpiresAt().isAfter(Instant.now())) {
                refreshTokenRepository.delete(refreshTokenBlacklistItem);
            }
        }
    }
}
