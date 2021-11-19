package com.example.backend.exceptions

import com.example.backend.dto.BookDTO
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler


@RestControllerAdvice
class GlobalExceptionHandler : ResponseEntityExceptionHandler(
) {

    @ExceptionHandler(Exception::class)
    fun handleAnyException(e: Exception): ResponseEntity<BookDTO> {
        return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
    }

    @ExceptionHandler(BookNotFoundException::class, BookCreateException::class)
    fun handleBookNotFoundException(e: RuntimeException): ResponseEntity<String> {
        return ResponseEntity(e.message, HttpStatus.NOT_FOUND)
    }
}