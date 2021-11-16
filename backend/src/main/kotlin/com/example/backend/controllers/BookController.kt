package com.example.backend.controllers

import com.example.backend.dto.Book
import com.example.backend.services.BookService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/book")
class BookController(
    private val bookService: BookService
) {

    @RequestMapping(
        method = [RequestMethod.GET],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    fun getBooks(): List<Book> {
        return bookService.getBooks()
    }

    @RequestMapping(
        method = [RequestMethod.GET],
        value = ["/{id}"],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    fun getBook(@PathVariable id: Long): List<Book> {
        return bookService.getBooks()
    }

    @RequestMapping(
        method = [RequestMethod.GET],
        value = ["/{id}"],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    fun createBook(id: Long, book: Book): List<Book> {
        return bookService.getBooks()
    }

    @RequestMapping(
        method = [RequestMethod.GET],
        value = ["/{id}"],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    fun updateBook(id: Long, book: Book): Book {
        return bookService.updateBook(id, book)
    }

    @RequestMapping(
        method = [RequestMethod.DELETE],
        value = ["/{id}"]
    )
    fun deleteBook(@PathVariable id: Long) {
        bookService.deleteBook(id)
    }
}