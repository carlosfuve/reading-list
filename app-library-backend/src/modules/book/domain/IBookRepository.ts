import IBook from './IBook';

interface IBookRepository {
    getAll(): Promise<IBook[] | null>,
    getBookById(idBook: string): Promise<IBook | null>,
    getBookByTitle(title: string): Promise<IBook | null>,
    getBookByGenre(genre: string): Promise<IBook[] | null>,
    getMinPages(pages: number): Promise<IBook[] | null>,
    updateAvalible(idBook: string): Promise<IBook | null>,
    createNewBook(ibook: IBook): Promise<IBook | null>
}

export default IBookRepository;
