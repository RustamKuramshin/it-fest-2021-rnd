package com.example.backend.entities

import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "book")
data class Book(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long?,
    val title: String?,
    val author: String?,
    val yearOfPublishing: LocalDate?,
    val genre: String?,
    val pages: Int?,
    val hasEpubVersion: Boolean?
)
