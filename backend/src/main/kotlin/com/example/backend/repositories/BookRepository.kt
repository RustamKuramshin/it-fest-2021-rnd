package com.example.backend.repositories

import com.example.backend.dto.Book
import org.springframework.data.repository.CrudRepository

interface BookRepository: CrudRepository<Book, Long> {

}