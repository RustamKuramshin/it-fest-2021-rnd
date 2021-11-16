package com.example.backend.services

import com.example.backend.dto.Book

interface BookService {
    suspend fun getBooks()
    suspend fun getBook(id: Long)
    suspend fun createBook(id: Long, book: Book)
    suspend fun updateBook(id: Long, book: Book)
    suspend fun deleteBook(id: Long)
}