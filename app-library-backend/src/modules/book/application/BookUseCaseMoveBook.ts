/* eslint-disable no-useless-constructor */
import IValidationService from '../../shared/domain/IValidationService';
import ValidationService from '../../shared/services/ValidationService';
import IBook from '../domain/IBook';
import IBookRepository from '../domain/IBookRepository';
import IBookUseCaseMoveBook from '../domain/IBookUseCaseMoveBook';
import { ValidationError } from '../../shared/infraestructure/Errors';

class BookUseCaseMoveBook implements IBookUseCaseMoveBook {
    private validationService: IValidationService = new ValidationService();

    constructor(
        private readonly repository: IBookRepository
    ) { }

    async moveBook(idBook: string): Promise<IBook | null> {
        // Use Case Validations
        if (this.validationService.isEmpty(idBook)) throw new ValidationError('The id is a required field');

        // Use Case logic
        const book: IBook | null = await this.repository.updateAvalible(idBook);
        if (book == null) throw new Error('Book not found');
        return book;
    }
}

export default BookUseCaseMoveBook;
