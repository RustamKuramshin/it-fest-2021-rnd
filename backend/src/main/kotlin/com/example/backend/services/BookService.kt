package com.example.backend.services

import com.example.backend.dto.Book

interface BookService {
     fun getBooks(): List<Book>
     fun getBook(id: Long): Book
     fun createBook(id: Long, book: Book): Book
     fun updateBook(id: Long, book: Book): Book
     fun deleteBook(id: Long)
}