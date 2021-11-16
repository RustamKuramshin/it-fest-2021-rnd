package com.example.backend.services

import com.example.backend.dto.Book
import org.springframework.stereotype.Service

@Service
class BookServiceImpl: BookService {

    override suspend fun getBooks() {
        TODO("Not yet implemented")
    }

    override suspend fun getBook(id: Long) {
        TODO("Not yet implemented")
    }

    override suspend fun createBook(id: Long, book: Book) {
        TODO("Not yet implemented")
    }

    override suspend fun updateBook(id: Long, book: Book) {
        TODO("Not yet implemented")
    }

    override suspend fun deleteBook(id: Long) {
        TODO("Not yet implemented")
    }
}