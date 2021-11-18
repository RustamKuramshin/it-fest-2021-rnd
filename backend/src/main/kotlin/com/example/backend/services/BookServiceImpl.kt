package com.example.backend.services

import com.example.backend.dto.BookDTO
import com.example.backend.entities.Book
import com.example.backend.exceptions.BookNotFoundException
import com.example.backend.repositories.BookRepository
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.stereotype.Service

@Service
class BookServiceImpl(
    private val bookRepository: BookRepository,
    private val mapper: ObjectMapper
) : BookService {

    override fun getBooks(): List<BookDTO> {
        val res = mutableListOf<BookDTO>()
        bookRepository.findAll().forEach{ res.add(mapper.convertValue(it, BookDTO::class.java))}
        return res
    }

    override fun getBook(id: Long): BookDTO {
        val res = bookRepository.findById(id).orElseThrow { throw BookNotFoundException("Не найдена книга с id $id.") }
        return mapper.convertValue(res, BookDTO::class.java)
    }

    override fun createBook(book: BookDTO): BookDTO {
        val entity = mapper.convertValue(book, Book::class.java)
        val res = bookRepository.save(entity)
        return mapper.convertValue(res, BookDTO::class.java)
    }

    override fun updateBook(id: Long, book: BookDTO): BookDTO {
        val entity = mapper.convertValue(book.copy(id = id), Book::class.java)
        val res = bookRepository.save(entity)
        return mapper.convertValue(res, BookDTO::class.java)
    }

    override fun deleteBook(id: Long) {
        bookRepository.deleteById(id)
    }
}