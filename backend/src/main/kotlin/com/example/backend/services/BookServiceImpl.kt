package com.example.backend.services

import com.example.backend.dto.Book
import com.example.backend.exceptions.BookNotFoundException
import com.example.backend.repositories.BookRepository
import org.springframework.stereotype.Service

@Service
class BookServiceImpl(
    private val bookRepository: BookRepository
): BookService {

    override fun getBooks(): List<Book> {
        return bookRepository.findAll().toList()
    }

    override fun getBook(id: Long): Book {
        return bookRepository.findById(id).orElseThrow { throw BookNotFoundException() }
    }

    override fun createBook(book: Book): Book {
       return bookRepository.save(book)
    }

    override fun updateBook(id: Long, book: Book): Book {
        return bookRepository.save(book)
    }

    override fun deleteBook(id: Long) {
        bookRepository.deleteById(id)
    }

}