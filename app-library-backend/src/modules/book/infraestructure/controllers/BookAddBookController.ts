import { Request, Response } from 'express';
import Controller from '../../../shared/infraestructure/controllers/Controller';
import IBookUseCaseAddBook from '../../domain/IBookUseCaseAddBook';
import IBook from '../../domain/IBook';
import { ConflictError } from '../../../shared/infraestructure/Errors';

class BookAddController extends Controller {
    constructor(private readonly bookUseCase: IBookUseCaseAddBook) {
        super();
    }

    protected async runImplementation(req: Request, res: Response): Promise<Response> {
        const newBook: IBook = {
            title: req.body.title,
            pages: req.body.pages,
            genre: req.body.genre,
            cover: req.body.cover,
            year: req.body.year,
            ISBN: req.body.ISBN
        };

        const bookCreated: IBook | null = await this.bookUseCase.addBook(newBook);
        if (bookCreated === null) throw new ConflictError('Book not created');
        return this.sendJsonResponse(res, 200, {
            created: true,
            book: {
                id: bookCreated.id,
                title: bookCreated.title,
                pages: bookCreated.pages,
                genre: bookCreated.genre,
                cover: bookCreated.cover,
                year: bookCreated.year,
                ISBN: bookCreated.ISBN
            }
        });
    }
}

export default BookAddController;
