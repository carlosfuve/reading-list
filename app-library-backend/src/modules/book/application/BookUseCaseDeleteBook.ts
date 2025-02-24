/* eslint-disable no-useless-constructor */
import IBookRepository from '../domain/IBookRepository';
import IBookUseCaseDeleteBook from '../domain/IBookUseCaseDeleteBook';

class BookUseCaseDeleteBook implements IBookUseCaseDeleteBook {
    constructor(private readonly repository: IBookRepository) { }

    async delete(idBook: string): Promise<boolean | null> {
        const deletedBook: Promise<boolean | null> = this.repository.deleteBook(idBook);
        return deletedBook;
    }
}

export default BookUseCaseDeleteBook;
