/* eslint-disable no-useless-constructor */
import IBook from '../domain/IBook';
import IBookRepository from '../domain/IBookRepository';
import IBookUseCaseAddBook from '../domain/IBookUseCaseAddBook';

class BookUseCaseAddBook implements IBookUseCaseAddBook {
    constructor(
        private readonly repository: IBookRepository
    ) { }

    addBook(book: IBook): Promise<IBook | null> { // TODO: Añadir validaciones
        const newBook: Promise<IBook | null> = this.repository.createNewBook(book);
        return newBook;
    }
}

export default BookUseCaseAddBook;
