package com.example.backend.dto

import java.time.LocalDate


data class BookDTO(
    val id: Long?,
    val title: String?,
    val author: String?,
    val yearOfPublishing: LocalDate?,
    val genre: String?,
    val pages: Int?,
    val hasEpubVersion: Boolean?
) {
    data class Builder(
        var id: Long? = null,
        var title: String? = null,
        var author: String? = null,
        var yearOfPublishing: LocalDate? = null,
        var genre: String? = null,
        var pages: Int? = null,
        var hasEpubVersion: Boolean? = null
    ) {

        fun id(id: Long?) = apply { this.id = id }
        fun title(title: String?) = apply { this.title = title }
        fun author(author: String?) = apply { this.author = author }
        fun yearOfPublishing(yearOfPublishing: LocalDate?) = apply { this.yearOfPublishing = yearOfPublishing }
        fun genre(genre: String?) = apply { this.genre = genre }
        fun pages(pages: Int?) = apply { this.pages = pages }
        fun hasEpubVersion(hasEpubVersion: Boolean?) = apply { this.hasEpubVersion = hasEpubVersion }

        fun build() = BookDTO(
            id,
            title,
            author,
            yearOfPublishing,
            genre,
            pages,
            hasEpubVersion
        )
    }
}
