export interface Book {
    id: number | undefined,
    title: string,
    author: string,
    yearOfPublishing: Date | undefined,
    genre: string,
    pages: number | undefined,
    hasEpubVersion: boolean | undefined
}