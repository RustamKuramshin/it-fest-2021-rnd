package com.example.backend.repositories

import com.example.backend.dto.Book
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
class BookRepository: CrudRepository<Long, Book> {

}