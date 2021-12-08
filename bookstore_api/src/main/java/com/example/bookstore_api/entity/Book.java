package com.example.bookstore_api.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "Books")
public class Book {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type = "uuid-char")
    private UUID id;
    @NotBlank
    private String title;
    @NotBlank
    private String author;
    @NotBlank
    private String category;
    @NotBlank
    @Size(min = 3, max = 4)
    private String year;
    @PositiveOrZero
    private int quantity;
    @Positive
    @NotNull
    private BigDecimal price;


}
