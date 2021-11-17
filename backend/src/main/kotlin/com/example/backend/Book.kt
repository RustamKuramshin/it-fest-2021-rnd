package com.example.backend

import java.time.LocalDate

data class Book(
    val id: Long,
    val title: String,
    val author: String,
    val yearOfPublishing: LocalDate,
    val genre: String,
    val pages: Int,
    val hasEpubVersion: Boolean
)
