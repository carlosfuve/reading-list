import axios from "axios";

const API_URL: string = 'http://localhost:3000/'

export function getAllGenres() {
    const result = axios.get(API_URL + 'genre')
    return result
}

export async function getAllBooks() {
    const result = await axios.get(API_URL + 'book')
    return result.data
}

export async function changeAvailableBook(idBook: string) {
    const result = await axios.patch(API_URL + `book/${idBook}`)
    return result.data
}

export async function getFilterByPages(pages: number) {
    const result = await axios.get(API_URL + 'book', {
        params: { pages }
    })
    return result.data
}

export async function getFilterByGenre(genre: number) {
    const result = await axios.get(API_URL + 'book', {
        params: { genre }
    })
    return result.data
}
