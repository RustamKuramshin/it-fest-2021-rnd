package com.example.backend.dto

import org.springframework.data.annotation.Id

/**
 * DTO - Data Transfer Object.
 * Представление сущности - книга.
 *
 * */
data class Book(
        @Id var id: Long? = null,
        var name: String? = null,
        var author: String? = null,
        var numberOfPages : Int? = null,
        var isElectronic : Boolean? = null
) {

    data class Builder(
            var id: Long? = null,
            var name: String? = null,
            var author: String? = null,
            var numberOfPages: Int? = null,
            var isElectronic: Boolean? = null
    ) {

        fun text(id: Long?) = apply { this.id = id }
        fun name(name: String?) = apply { this.name = name }
        fun author(author: String?) = apply { this.author = author }
        fun numberOfPages(numberOfPages: Int?) = apply { this.numberOfPages = numberOfPages }
        fun isElectronic(isElectronic: Boolean?) = apply { this.isElectronic = isElectronic }

        fun build() = Book(
                id,
                name,
                author,
                numberOfPages,
                isElectronic
        )
    }
}