package org.woork.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.woork.backend.config.RsaKeyProperties;
import org.woork.backend.posting.Posting;
import org.woork.backend.posting.PostingRepository;
import org.woork.backend.role.Role;
import org.woork.backend.role.RoleRepository;
import org.woork.backend.user.User;
import org.woork.backend.user.UserRepository;

@EnableConfigurationProperties({RsaKeyProperties.class})
@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run(RoleRepository roleRepository, PostingRepository postingRepository, UserRepository userRepository) {
        return args -> {
            roleRepository.save(new Role("USER"));
        };
    }

}
