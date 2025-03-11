import type IBook from "@/interfaces/IBook";

/*
axios.get('http://localhost:3000/books')
.then( response => {  this.librosDisp = response.data; }
).catch(err => { console.log(err) })
*/

export async function loadData() {
    const response = await fetch("../../books.json");
    const data = await response.json();

    const libroLecturaStorage = JSON.parse(localStorage.getItem("booksList") ?? "[]");

    const result = data.library.map((book: { book: any }) => {
        const bookData: IBook = { ...book.book };
        bookData.available = !libroLecturaStorage.some((book: IBook) => book.id === bookData.id);
        bookData.id = bookData.title.toLowerCase().replace(/\s+/g, '-');

        return bookData;
    });
    return result
}

export async function allGenres() {
    const books = await loadData();
    const genres: string[] = books.map((book: IBook) => book.genre)
    const genresWithOutDuplicates: string[] = [...new Set(genres)]
    return genresWithOutDuplicates
}
