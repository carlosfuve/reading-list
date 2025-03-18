import IGenre from './IGenre';

interface IGenreRepository {
    getAll(): Promise<IGenre[] | null>,
    getGenreId(name: string): Promise<number | null>,
    getGenreName(id: number): Promise<string | null>,
    createGenre(name: string): Promise<IGenre | null>,
    createMultipleGenres(nameGenres: string[]): Promise<IGenre[] | null>
    deleteGenre(id: number): Promise<boolean | null>
}

export default IGenreRepository;
