import { Request, Response } from 'express';
import IBookRepository from '../../domain/IBookRepository';
import ExpressResponse from '../../../shared/infraestructure/controllers/ExpressResponse';
import { NotFoundError } from '../../../shared/infraestructure/Errors';

class BookController extends ExpressResponse {
    private repository: IBookRepository;

    constructor(private readonly bookRepository: IBookRepository) {
        super();
        this.repository = bookRepository;
    }

    public async getBooks(req: Request, res: Response): Promise<Response> {
        const { genre, pages } = req.query as Record<string, string>;
        const numPages = pages ? parseInt(pages, 10) : 0;
        try {
            if (genre && pages) {
                const filterBooks = await this.repository.getBookByGenrePages(genre, numPages);
                if (!filterBooks) throw Error;
                return this.sendJsonResponse(res, 200, filterBooks);
            } else if (genre) {
                const bookByGenre = await this.repository.getBookByGenre(genre);
                if (!bookByGenre) throw Error;
                return this.sendJsonResponse(res, 200, bookByGenre);
            } else if (pages) {
                const bookByPages = await this.repository.getBookByPages(numPages);
                if (!bookByPages) throw Error;
                return this.sendJsonResponse(res, 200, bookByPages);
            } else {
                const allBooks = await this.repository.getAll();
                if (!allBooks) throw Error;
                return this.sendJsonResponse(res, 200, allBooks);
            }
        } catch {
            return this.sendError(res, NotFoundError);
        }
    }

    public async getBookId(req: Request, res: Response): Promise<Response> {
        const idBook: string | null = req.params.idBook;
        // if (!idBook) return this.sendError(res, new ValidationError('The id field is required'));

        const availableBook = await this.repository.getBookById(idBook);
        if (availableBook == null) return this.sendError(res, new NotFoundError('This book does not exists in the database'));
        return this.sendJsonResponse(res, 200, availableBook);
    }
}

export default BookController;
