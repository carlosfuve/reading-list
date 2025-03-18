import { Request, Response } from 'express';
import ExpressResponse from '../../../shared/infraestructure/controllers/ExpressResponse';
import IGenreRepository from '../../domain/IGenreRepository';
import { NotFoundError } from '../../../shared/infraestructure/Errors';
import IGenre from '../../domain/IGenre';

class GenreController extends ExpressResponse {
    private repository: IGenreRepository;

    constructor(private readonly genreRepository: IGenreRepository) {
        super();
        this.repository = genreRepository;
    }

    public async getGenres(_req: Request, res: Response): Promise<Response> {
        const allGenres = await this.repository.getAll();
        if (!allGenres) return this.sendError(res, NotFoundError);
        return this.sendJsonResponse(res, 200, allGenres);
    }

    public async createGenres(req: Request, res: Response): Promise<Response> {
        const genres: string[] = req.body.genres;
        const genresCreated: IGenre[] | null = await this.repository.createMultipleGenres(genres);
        if (!genresCreated) return this.sendError(res, NotFoundError);
        return this.sendJsonResponse(res, 200, genresCreated);
    }

    public async deleteGenre(req: Request, res: Response): Promise<Response> {
        const idGenre: number = req.body.idGenre;
        const deleted: boolean | null = await this.repository.deleteGenre(idGenre);
        if (deleted == null || !deleted) return this.sendJsonResponse(res, 400, { message: 'Genre not deleted or does not exists' });
        return this.sendJsonResponse(res, 200, { message: 'Genre deleted' });
    }
}

export default GenreController;
