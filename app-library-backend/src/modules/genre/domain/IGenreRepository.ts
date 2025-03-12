import IGenre from './IGenre';

interface IGenreRepository {
    getAll(): Promise<IGenre[] | null>,
    createGenre(name: string): Promise<IGenre | null>,
    createMultipleGenres(nameGenres: string[]): Promise<IGenre[] | null>
    deleteGenre(id: number): Promise<boolean | null>
}

export default IGenreRepository;
