package com.example.backend.mappers

import com.example.backend.dto.BookDTO
import com.example.backend.entities.Book

interface BookMapper {
    fun toEntity(book: BookDTO): Book
    fun toDTO(book: Book): BookDTO
}