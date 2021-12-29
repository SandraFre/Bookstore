package com.example.bookstore_api.repository;

import com.example.bookstore_api.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FileRepository extends JpaRepository<File, UUID> {
    File findFirstByFileName(String fileName);

}
