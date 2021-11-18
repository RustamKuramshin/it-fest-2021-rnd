package com.example.backend.services

import com.example.backend.dto.BookDTO

interface BookService {
     fun getBooks(): List<BookDTO>
     fun getBook(id: Long): BookDTO
     fun createBook(book: BookDTO): BookDTO
     fun updateBook(id: Long, book: BookDTO): BookDTO
     fun deleteBook(id: Long)
}