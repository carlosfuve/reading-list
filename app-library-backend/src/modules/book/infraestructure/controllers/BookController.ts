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
        const { genre, pages } = req.query as Record<string, string>;
        const numPages = pages ? parseInt(pages, 10) : 0;
        try {
            if (genre && pages) {
                const filterBooks = await this.repository.getBookByGenrePages(genre, numPages);
                if (!filterBooks) throw Error;
                const result = filterBooks.map(async book => {
                    const genreName = await this.genreRepository.getGenreName(book.genre);
                    if (!genreName) throw Error();
                    return {
                        ...book,
                        genre: genreName
                    };
                });
                return this.sendJsonResponse(res, 200, result);
            } else if (genre) {
                const bookByGenre = await this.repository.getBookByGenre(genre);
                if (!bookByGenre) throw Error;
                const result = bookByGenre.map(async book => {
                    const genreName = await this.genreRepository.getGenreName(book.genre);
                    if (!genreName) throw Error();
                    return {
                        ...book,
                        genre: genreName
                    };
                });
                return this.sendJsonResponse(res, 200, result);
            } else if (pages) {
                const bookByPages = await this.repository.getBookByPages(numPages);
                if (!bookByPages) throw Error;
                const result = bookByPages.map(async book => {
                    const genreName = await this.genreRepository.getGenreName(book.genre);
                    if (!genreName) throw Error();
                    return {
                        ...book,
                        genre: genreName
                    };
                });
                return this.sendJsonResponse(res, 200, result);
            } else {
                const allBooks = await this.repository.getAll();
                if (!allBooks) throw Error;
                const result = await Promise.all(allBooks.map(async book => {
                    const genreName = await this.genreRepository.getGenreName(book.genre);
                    if (!genreName) throw Error();
                    return {
                        ...book,
                        genre: genreName
                    };
                }));
                return this.sendJsonResponse(res, 200, result);
            }
        } catch {
            return this.sendError(res, NotFoundError);
        }
    }
}

export default BookController;
