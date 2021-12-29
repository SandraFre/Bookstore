package com.example.bookstore_api.controller;

import com.example.bookstore_api.entity.File;
import com.example.bookstore_api.service.FileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

import static com.example.bookstore_api.ApiPath.*;

@RestController
@RequestMapping(FILES)
@Api(tags = "Upload/download files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @ApiOperation(value = "Upload file to server", httpMethod = "POST")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Failas issaugotas sekmingai"),
            @ApiResponse(code = 403, message = "Neturi leidimu"),
            @ApiResponse(code = 401, message = "Neprisijunges")
    })

    @PostMapping(BLOBS)
    public void saveFileAsBlob(@RequestParam MultipartFile multipartFile){
        fileService.saveFileInDbAsBlob(multipartFile);
    }

    @ApiOperation(value = "Download file from server by name", httpMethod = "GET")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Failas parsiustas sekmingai"),
            @ApiResponse(code = 403, message = "Neturi leidimu"),
            @ApiResponse(code = 401, message = "Neprisijunges")
    })


    @GetMapping(GET_BLOB)
    public ResponseEntity<Resource> getFileById(@PathVariable(ID_VARIABLE) UUID id){
        File file = fileService.getFileById(id);

        Resource resource = new ByteArrayResource(file.getBytes());

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(file.getMediaType()))
                .headers(getHeaders(file.getFileName()))
                .body(resource);

    }

    private HttpHeaders getHeaders(String fileName){
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

        return headers;
    }
}
