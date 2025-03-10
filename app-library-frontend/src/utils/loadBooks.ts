import type IBook from "@/interfaces/IBook";

export async function loadData() {
    const response = await fetch("../../books.json");
    const data = await response.json();
    const result = data.library.map((book: { book: any; }) => book.book)
    return result
}

export async function allGenres() {
    const books = await loadData();
    const genres: string[] = books.map((book: IBook) => book.genre)
    const genresWithOutDuplicates: string[] = [...new Set(genres)]
    return genresWithOutDuplicates
}
