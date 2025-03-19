import { Request, Response } from 'express';
import IBookRepository from '../../domain/IBookRepository';
import ExpressResponse from '../../../shared/infraestructure/controllers/ExpressResponse';
import { NotFoundError } from '../../../shared/infraestructure/Errors';
import IGenreRepository from '../../../genre/domain/IGenreRepository';
import GenreRepository from '../../../genre/infraestructure/repositories/GenreRepository';

class BookController extends ExpressResponse {
    private repository: IBookRepository;
    private genreRepository: IGenreRepository = new GenreRepository();

    constructor(private readonly bookRepository: IBookRepository) {
        super();
        this.repository = bookRepository;
    }

    public async getBooks(req: Request, res: Response): Promise<Response> { // TODO: Change to join
        const genre = req.query.genre as string;
        const pages = req.query.pages as string;
        const numPages = pages ? parseInt(pages, 10) : 0;
        const numGenre = genre ? parseInt(genre, 10) : 0;
        try {
            if (genre && pages) {
                const filterBooks = await this.repository.getBookByGenrePages(numGenre, numPages);
                if (!filterBooks) throw Error;
                return this.sendJsonResponse(res, 200, filterBooks);
            } else if (genre) {
                const bookByGenre = await this.repository.getBookByGenre(numGenre);
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
}

export default BookController;
