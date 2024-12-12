package org.woork.backend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.sqids.Sqids;

@Configuration
public class UrlEncoding {
    private final String sqidsKey = Dotenv.load().get("URL_SQIDS_KEY");

    @Bean
    public Sqids sqids() {
        return Sqids.builder()
                .minLength(8)
                .alphabet(sqidsKey)
                .build();
    }
}
