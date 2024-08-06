package org.woork.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.woork.backend.config.RsaKeyProperties;
import org.woork.backend.image.Image;
import org.woork.backend.image.ImageRepository;
import org.woork.backend.location.LocationService;
import org.woork.backend.role.Role;
import org.woork.backend.role.RoleRepository;


@EnableConfigurationProperties({RsaKeyProperties.class})
@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run(RoleRepository roleRepository, ImageRepository imageRepository) {
        return args -> {
            roleRepository.save(new Role("USER"));
            imageRepository.save(new Image(
                    "default-pfp",
                    "image/jpg",
                    Dotenv.load().get("images_path")+"/default-pfp.jpg",
                    "http://localhost:8000/api/images/default-pfp"
            ));
        };
    }

}
