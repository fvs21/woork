package org.woork.backend.image;

import io.github.cdimascio.dotenv.Dotenv;
 import org.apache.commons.imaging.formats.jpeg.exif.ExifRewriter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.exceptions.UnableToDownloadImageException;
import org.woork.backend.exceptions.UnableToUploadImageException;
import org.woork.backend.exceptions.ImageNotFoundException;
import org.woork.backend.exceptions.UnsupportedImageTypeException;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class ImageService {
    private static final Log log = LogFactory.getLog(ImageService.class);
    private final ImageRepository imageRepository;

    private static final String imagesPath = Dotenv.load().get("images_path");

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image uploadImage(MultipartFile file, String prefix) {
        String fileType = file.getContentType().split("/")[1];
        if(!(fileType.equals("png") || fileType.equals("jpg") || fileType.equals("jpeg"))) {
            throw new UnsupportedImageTypeException();
        }
        try {
            String extension = "." + file.getContentType().split("/")[1];

            File imageFile = File.createTempFile(prefix, extension, new File(imagesPath + "/" + prefix));

            byte[] bytes = stripExifMetadata(file.getBytes());
            try(FileOutputStream fos = new FileOutputStream(imageFile.getPath())) {
                fos.write(bytes);
            } catch (IOException e) {
                log.info(e.getMessage());
                throw new UnableToUploadImageException();
            }

            String imageUrl = "/api/images/" + imageFile.getName();

            Image image = new Image(
                    imageFile.getName(),
                    file.getContentType(),
                    imageFile.getPath(),
                    imageUrl
            );
            return imageRepository.save(image);
        } catch (IOException e) {
            log.info(e.getMessage());
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

    private byte[] stripExifMetadata(byte[] fileBytes) {
        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            new ExifRewriter().removeExifMetadata(fileBytes, byteArrayOutputStream);
            return byteArrayOutputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteImage(Image image) {
        imageRepository.delete(image);
    }
}
