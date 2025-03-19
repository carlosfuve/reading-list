/* eslint-disable no-useless-constructor */
import { title } from 'process';
import ValidationService from '../../shared/services/ValidationService';
import IBook from '../domain/IBook';
import IBookRepository from '../domain/IBookRepository';
import IBookUseCaseAddBook from '../domain/IBookUseCaseCreateBook';
import { ValidationError } from '../../shared/infraestructure/Errors';

class BookUseCaseCreateBook implements IBookUseCaseAddBook {
    private validate = new ValidationService();

    constructor(
        private readonly repository: IBookRepository
    ) { }

    async addBook(book: IBook): Promise<IBook | null> {
        if (this.validate.isEmpty(book.title) || this.validate.isMaxLength(title, 500)) throw new ValidationError('Error in title');
        if (this.validate.isNumberZero(book.pages.toString())) throw new ValidationError('The book has have more than zero pages');
        if (!this.validate.containsNumbers(book.year.toString())) throw new ValidationError('The year must be a number');

        const newBook: Promise<IBook | null> = this.repository.createNewBook(book);
        return newBook;
    }
}

export default BookUseCaseCreateBook;
