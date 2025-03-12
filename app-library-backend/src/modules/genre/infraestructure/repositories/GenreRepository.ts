import IGenre from '../../domain/IGenre';
import IGenreRepository from '../../domain/IGenreRepository';
import Genre from '../../../../database/models/Genre';

class GenreRepository implements IGenreRepository {
    async getAll(): Promise<IGenre[] | null> {
        try {
            return Genre.findAll();
        } catch {
            return null;
        }
    }

    async createGenre(name: string): Promise<IGenre | null> {
        try {
            return Genre.create({ name });
        } catch {
            return null;
        }
    }

    async createMultipleGenres(nameGenres: string[]): Promise<IGenre[] | null> {
        const genresCreated: IGenre[] = [];
        for (const name in nameGenres) {
            const result = await this.createGenre(name);
            if (result) genresCreated.push(result);
        }
        return genresCreated;
    }

    async deleteGenre(id: number): Promise<boolean | null> {
        try {
            await Genre.destroy({
                where: { id }
            });
            return true;
        } catch {
            return null;
        }
    }
}

export default GenreRepository;
