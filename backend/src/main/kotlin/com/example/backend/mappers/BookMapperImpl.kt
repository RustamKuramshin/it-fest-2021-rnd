package com.example.backend.mappers

import com.example.backend.dto.BookDTO
import com.example.backend.entities.Book
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.stereotype.Component

@Component
class BookMapperImpl(private val mapper: ObjectMapper) : BookMapper {

    override fun toEntity(book: BookDTO): Book {
        return mapper.convertValue(book, Book::class.java)
    }

    override fun toDTO(book: Book): BookDTO {
        return mapper.convertValue(book, BookDTO::class.java)
    }
}