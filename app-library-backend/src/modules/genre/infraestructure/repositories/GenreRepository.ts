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

    async getGenreId(name: string): Promise<number | null> {
        try {
            const result = await Genre.findOne({ where: { name } });
            if (!result) throw Error('Genre not find');
            return result.id;
        } catch {
            return null;
        }
    }

    async getGenreName(id: number): Promise<string | null> {
        try {
            const result = await Genre.findByPk(id);
            if (!result) throw Error('Genre not find');
            return result.name;
        } catch {
            return null;
        }
    }

    async createGenre(name: string): Promise<IGenre | null> {
        try {
            return await Genre.create({ name });
        } catch {
            return null;
        }
    }

    async createMultipleGenres(nameGenres: string[]): Promise<IGenre[] | null> {
        const genresCreated: IGenre[] = [];
        for (const name of nameGenres) {
            const result = await this.createGenre(name);
            if (result) {
                genresCreated.push(result);
            }
        }
        return genresCreated.map(({ id, name }) => ({ id, name }));
    }

    async deleteGenre(id: number): Promise<boolean | null> {
        try {
            const result = await Genre.destroy({
                where: { id }
            });
            return result > 0;
        } catch {
            return null;
        }
    }
}

export default GenreRepository;
