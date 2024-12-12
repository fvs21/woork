package org.woork.backend.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.woork.backend.exceptions.ImageNotFoundException;
import org.woork.backend.exceptions.UnableToDownloadImageException;
import org.woork.backend.exceptions.UnableToUploadImageException;
import org.woork.backend.exceptions.UnsupportedImageTypeException;

@RestController
@RequestMapping("api/images")
public class ImageController {
    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }


    @GetMapping("/{filename}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable String filename) {
        byte[] imageBytes = imageService.downloadImage(filename);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.valueOf(imageService.getImageType(filename)))
                .body(imageBytes);
    }
}
