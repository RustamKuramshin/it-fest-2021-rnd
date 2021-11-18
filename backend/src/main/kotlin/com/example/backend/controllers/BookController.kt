package com.example.backend.controllers

import com.example.backend.dto.Book
import com.example.backend.services.BookService
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/book")
class BookController(
    private val bookService: BookService
) {

    @RequestMapping(
        method = [RequestMethod.GET],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    @ResponseStatus(HttpStatus.OK)
    fun getBooks(): List<Book> {
        return bookService.getBooks()
    }

    @RequestMapping(
        method = [RequestMethod.GET],
        value = ["/{id}"],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    @ResponseStatus(HttpStatus.OK)
    fun getBook(@PathVariable id: Long): List<Book> {
        return bookService.getBooks()
    }

    @RequestMapping(
        method = [RequestMethod.POST],
        produces = [MediaType.APPLICATION_JSON_VALUE],
        consumes = [MediaType.APPLICATION_JSON_VALUE]
    )
    @ResponseStatus(HttpStatus.CREATED)
    fun createBook(book: Book): List<Book> {
        return bookService.getBooks()
    }

    @RequestMapping(
        method = [RequestMethod.PUT],
        value = ["/{id}"],
        produces = [MediaType.APPLICATION_JSON_VALUE],
        consumes = [MediaType.APPLICATION_JSON_VALUE]
    )
    @ResponseStatus(HttpStatus.OK)
    fun updateBook(@PathVariable id: Long, book: Book): Book {
        return bookService.updateBook(id, book)
    }

    @RequestMapping(
        method = [RequestMethod.DELETE],
        value = ["/{id}"]
    )
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteBook(@PathVariable id: Long) {
        bookService.deleteBook(id)
    }
}