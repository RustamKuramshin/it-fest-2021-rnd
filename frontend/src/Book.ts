export interface Book {
    id: number,
    title: string,
    author: string,
    yearOfPublishing: Date,
    genre: string,
    pages: number,
    hasEpubVersion: boolean
}