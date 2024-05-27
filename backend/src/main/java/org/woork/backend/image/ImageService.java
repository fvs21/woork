package org.woork.backend.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.exceptions.UnableToDownloadImageException;
import org.woork.backend.exceptions.UnableToUploadImageException;
import org.woork.backend.exceptions.ImageNotFoundException;
import org.woork.backend.exceptions.UnsupportedImageTypeException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    private static final File DIRECTORY = new File("/");
    private static final String URL = "http://localhost:8080/api/images/";

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image uploadImage(MultipartFile file, String prefix) {
        if(!file.getContentType().split("/")[1].equals("jpeg") ||
        !file.getContentType().split("/")[1].equals("png")) {
            throw new UnsupportedImageTypeException();
        }
        try {
            String extension = "." + file.getContentType().split("/")[1];

            File imageFile = File.createTempFile(prefix, extension, DIRECTORY);
            file.transferTo(imageFile);

            String imageUrl = URL + imageFile.getName();

            Image image = new Image(
                    imageFile.getName(),
                    file.getContentType(),
                    imageFile.getPath(),
                    imageUrl
            );
            return imageRepository.save(image);
        } catch (IOException e) {
            throw new UnableToUploadImageException();
        }
    }

    public byte[] downloadImage(String fileName) {
        Image image = imageRepository.findByImageName(fileName).orElseThrow(ImageNotFoundException::new);
        String filePath = image.getImagePath();

        try {
            return Files.readAllBytes(new File(filePath).toPath());
        } catch (IOException e) {
            throw new UnableToDownloadImageException();
        }

    }

    public String getImageType(String fileName) {
        Image image = imageRepository.findByImageName(fileName).orElseThrow(ImageNotFoundException::new);
        return image.getImageType();
    }
}
