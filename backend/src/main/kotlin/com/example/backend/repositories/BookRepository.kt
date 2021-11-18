package com.example.backend.repositories

import com.example.backend.entities.Book
import org.springframework.data.repository.CrudRepository

interface BookRepository: CrudRepository<Book, Long> {

}