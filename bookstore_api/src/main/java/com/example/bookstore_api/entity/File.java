package com.example.bookstore_api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Table(name = "Files")
@NoArgsConstructor
public class File {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type = "uuid-char")
    private UUID id;
    private String fileName;
    private String mediaType;
    private long size;
    @Lob
    private byte[] bytes;
    @CreationTimestamp
    private final LocalDateTime timestamp = LocalDateTime.now();

    public File(String fileName, String mediaType, long size) {
        this(fileName, mediaType, size, null);
    }

    public File(String fileName, String mediaType, long size, byte[] bytes) {
        this.fileName = fileName;
        this.mediaType = mediaType;
        this.size = size;
        this.bytes = bytes;
    }
}

