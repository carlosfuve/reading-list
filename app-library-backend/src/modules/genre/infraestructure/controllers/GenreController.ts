import { Request, Response } from 'express';
import ExpressResponse from '../../../shared/infraestructure/controllers/ExpressResponse';
import IGenreRepository from '../../domain/IGenreRepository';
import { NotFoundError } from '../../../shared/infraestructure/Errors';

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
}

export default GenreController;
