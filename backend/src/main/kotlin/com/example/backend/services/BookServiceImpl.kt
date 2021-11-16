package com.example.backend.services

import com.example.backend.dto.Book
import com.example.backend.repositories.BookRepository
import org.springframework.stereotype.Service

@Service
class BookServiceImpl(
    private val bookRepository: BookRepository
): BookService {

    override fun getBooks(): List<Book> {
        TODO("Not yet implemented")
    }

    override fun getBook(id: Long): Book {
        TODO("Not yet implemented")
    }

    override fun createBook(id: Long, book: Book): Book {
        TODO("Not yet implemented")
    }

    override fun updateBook(id: Long, book: Book): Book {
        TODO("Not yet implemented")
    }

    override fun deleteBook(id: Long) {
        TODO("Not yet implemented")
    }

}