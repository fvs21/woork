package org.woork.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.woork.backend.config.RsaKeyProperties;
import org.woork.backend.image.Image;
import org.woork.backend.image.ImageRepository;


@EnableConfigurationProperties({RsaKeyProperties.class})
@SpringBootApplication
@EnableScheduling
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run(ImageRepository imageRepository) {
        return args -> {
            imageRepository.save(new Image(
                    "default-pfp",
                    "image/jpg",
                    Dotenv.load().get("images_path")+"/default-pfp.jpg",
                    "http://localhost:8000/api/images/default-pfp"
            ));
        };
    }

}
