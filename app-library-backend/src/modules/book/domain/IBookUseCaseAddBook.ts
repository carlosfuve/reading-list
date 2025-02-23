import IBook from './IBook';

interface IBookUseCaseAddBook {
    addBook(book: IBook): Promise<IBook | null>
}

export default IBookUseCaseAddBook;
