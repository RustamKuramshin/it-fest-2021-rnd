package com.example.backend.dto

import org.springframework.data.annotation.Id


data class Book(
        @Id var id: Long? = null,
        var text: String? = null) {

//    data class Builder(
//            var id: Long? = null,
//            var text: String? = null
//    ) {
//
//        fun text(id: Long?) = apply { this.id = id }
//        fun text(text: String?) = apply { this.text = text }
//
//        fun build() = Book(
//                id,
//                text)
//    }
}