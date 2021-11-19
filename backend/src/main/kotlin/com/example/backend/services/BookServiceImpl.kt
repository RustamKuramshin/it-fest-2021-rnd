package com.example.backend.services

import com.example.backend.dto.BookDTO
import com.example.backend.exceptions.BookCreateException
import com.example.backend.exceptions.BookNotFoundException
import com.example.backend.mappers.BookMapper
import com.example.backend.repositories.BookRepository
import org.springframework.stereotype.Service

@Service
class BookServiceImpl(
    private val bookRepository: BookRepository,
    private val mapper: BookMapper
) : BookService {

    override fun getBooks(): List<BookDTO> {
        return bookRepository.findAll().map(mapper::toDTO)
    }

    override fun getBook(id: Long): BookDTO {
        return mapper.toDTO(bookRepository.findById(id)
            .orElseThrow { throw BookNotFoundException("Не найдена книга с id $id.") })
    }

    override fun createBook(book: BookDTO): BookDTO {
        val res = try {
            bookRepository.save(mapper.toEntity(book))
        }catch (e: RuntimeException){
            throw BookCreateException("Не удалось сохранить книгу $book.")
        }
        return mapper.toDTO(res)
    }

    override fun updateBook(id: Long, book: BookDTO): BookDTO {
        getBook(id)
        val res = bookRepository.save(mapper.toEntity(book.copy(id = id)))
        return mapper.toDTO(res)
    }

    override fun deleteBook(id: Long) {
        bookRepository.deleteById(id)
    }
}