package com.example.bookstore_api.service;

import com.example.bookstore_api.entity.File;
import com.example.bookstore_api.exception.FileException;
import com.example.bookstore_api.repository.FileRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
@Slf4j
public class FileService {

    private static final int MAX_SIZE = 10000000;
    private final Set<String> types;
    private final Path fileLocation;

    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
        this.fileLocation = Paths.get("./files").toAbsolutePath().normalize();
        this.types = Set.of(MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_GIF_VALUE);
    }

       public void saveFileInDbAsBlob(MultipartFile multipartFile){
        validateFile(multipartFile);

        try{
            File file = new File(multipartFile.getOriginalFilename(),
                    multipartFile.getContentType(),
                    multipartFile.getSize(),
                    multipartFile.getBytes());
            fileRepository.save(file);

        } catch (Exception e){
            log.error("Error cannot save file");
            throw new FileException(String.format("Cannot save %s file", multipartFile.getOriginalFilename()));
        }
    }


    public File getFileById(UUID id){

        return fileRepository.findById(id).orElseThrow(()
                -> new FileException(String.format("Cannot find file by %s UUID", id)));

    }


    private void validateFile(MultipartFile multipartFile){
        if (multipartFile.getSize()> MAX_SIZE){
            throw new FileException(String.format("File size %s is too large", multipartFile.getSize()));
        }

        if (!types.contains(multipartFile.getContentType())){
            throw new FileException(String.format("Content type %s is not allowed", multipartFile.getContentType()));
        }
    }

}
