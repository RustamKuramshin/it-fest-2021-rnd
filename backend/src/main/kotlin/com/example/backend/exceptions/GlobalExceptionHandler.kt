package com.example.backend.exceptions

import com.example.backend.dto.BookDTO
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice


@RestControllerAdvice
class GlobalExceptionHandler(
) {

    @ExceptionHandler(Exception::class)
    fun handleAnyException(e: Exception): ResponseEntity<BookDTO> {
        return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
    }

    @ExceptionHandler(BookNotFoundException::class)
    fun handleBookNotFoundException(e: BookNotFoundException): ResponseEntity<BookDTO> {
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }
}