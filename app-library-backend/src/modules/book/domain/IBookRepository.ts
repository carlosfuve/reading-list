import IBook from './IBook';

interface IBookRepository {
    getAll(): Promise<IBook[] | null>,
    getBookById(idBook: string): Promise<IBook | null>,
    getBookByGenre(genre: number): Promise<IBook[] | null>,
    getBookByPages(pages: number): Promise<IBook[] | null>,
    getBookByGenrePages(genre: number, pages: number): Promise<IBook[] | null>,
    updateAvalible(idBook: string): Promise<IBook | null>,
    createNewBook(ibook: IBook): Promise<IBook | null>,
    deleteBook(idBook: string): Promise<boolean | null>
}

export default IBookRepository;
