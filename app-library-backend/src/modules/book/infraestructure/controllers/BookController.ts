import { Request, Response } from 'express';
import IBookRepository from '../../domain/IBookRepository';
import ExpressResponse from '../../../shared/infraestructure/controllers/ExpressResponse';
import { NotFoundError, ValidationError } from '../../../shared/infraestructure/Errors';

class BookController extends ExpressResponse {
    private repository: IBookRepository;

    constructor(private readonly bookRepository: IBookRepository) {
        super();
        this.repository = bookRepository;
    }

    public async getBooks(req: Request, res: Response): Promise<Response> {
        const { genre } = <{ genre: string }>req.query;
        if (genre) {
            const bookByGenre = await this.repository.getBookByGenre(genre);
            return this.sendJsonResponse(res, 200, bookByGenre);
        } else {
            const allBooks = await this.repository.getAll();
            return this.sendJsonResponse(res, 200, allBooks);
        }
    }

    public async getBookId(req: Request, res: Response): Promise<Response> {
        const idBook: string | null = req.params.idBook;
        if (!idBook) return this.sendError(res, new ValidationError('The id field is required'));

        const availableBook = await this.repository.getBookById(idBook);
        if (availableBook == null) return this.sendError(res, new NotFoundError('This book does not exists in the database'));
        return this.sendJsonResponse(res, 200, availableBook);
    }
}

export default BookController;
