/* eslint-disable no-useless-constructor */
import IBook from '../domain/IBook';
import IBookRepository from '../domain/IBookRepository';
import IBookUseCaseAddBook from '../domain/IBookUseCaseCreateBook';

class BookUseCaseCreateBook implements IBookUseCaseAddBook {
    constructor(
        private readonly repository: IBookRepository
    ) { }

    async addBook(book: IBook): Promise<IBook | null> { // TODO: Añadir validaciones
        // ADD CONSULTA A GENRE -- TIENE QUE ESTAR EL ID DEL GENRE EN LA BD

        const newBook: Promise<IBook | null> = this.repository.createNewBook(book);
        return newBook;
    }
}

export default BookUseCaseCreateBook;
