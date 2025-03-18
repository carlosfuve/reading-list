import { Request, Response } from 'express';
import Controller from '../../../shared/infraestructure/controllers/Controller';
import IBookUseCaseCreateBook from '../../domain/IBookUseCaseCreateBook';
import IBook from '../../domain/IBook';

class BookCreateController extends Controller {
    constructor(private readonly bookUseCase: IBookUseCaseCreateBook) {
        super();
    }

    protected async runImplementation(req: Request, res: Response): Promise<Response> {
        const newBook: IBook[] = req.body.books;
        const createdBooks: IBook[] = [];

        for (const book of newBook) {
            const bookCreated: IBook | null = await this.bookUseCase.addBook(book);
            if (bookCreated) createdBooks.push(bookCreated);
        }

        const result = createdBooks.map(({ id, title, pages, genre, cover, year, ISBN, available }) => ({ id, title, pages, genre, cover, year, ISBN, available }));
        return this.sendJsonResponse(res, 200, result);
    }
}

export default BookCreateController;
