import IBook from '../../domain/IBook';
import IBookRepository from '../../domain/IBookRepository';
import Book from '../../../../database/models/Book';
import { Op, Sequelize } from 'sequelize';
import Genre from '../../../../database/models/Genre';
import IGenreRepository from '../../../genre/domain/IGenreRepository';
import GenreRepository from '../../../genre/infraestructure/repositories/GenreRepository';

class BookRepository implements IBookRepository {
    private genreRepository: IGenreRepository = new GenreRepository();

    async getAll(): Promise<IBook[] | null> {
        try {
            const allBooks = await Book.findAll({
                attributes: [
                    'id',
                    'title',
                    'pages',
                    'cover',
                    'year',
                    'ISBN',
                    'available',
                    [Sequelize.col('Genre.name'), 'genre']
                ],
                include: [
                    {
                        model: Genre,
                        attributes: []
                    }],
                raw: true
            });
            return allBooks;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getBookById(idBook: string): Promise<IBook | null> {
        try {
            return await Book.findByPk(idBook);
        } catch {
            return null;
        }
    }

    async getBookByGenre(genre: number): Promise<IBook[] | null> {
        try {
            return Book.findAll({
                where: { genre },
                attributes: [
                    'id',
                    'title',
                    'pages',
                    'cover',
                    'year',
                    'ISBN',
                    'available',
                    [Sequelize.col('Genre.name'), 'genre']
                ],
                include: [
                    {
                        model: Genre,
                        attributes: []
                    }],
                raw: true
            });
        } catch {
            return null;
        }
    }

    async getBookByPages(pages: number): Promise<IBook[] | null> {
        try {
            return Book.findAll({
                where: {
                    pages: {
                        [Op.gt]: pages // Encuentra libros con más de pages
                    }
                },
                attributes: [
                    'id',
                    'title',
                    'pages',
                    'cover',
                    'year',
                    'ISBN',
                    'available',
                    [Sequelize.col('Genre.name'), 'genre']
                ],
                include: [
                    {
                        model: Genre,
                        attributes: []
                    }],
                raw: true
            });
        } catch {
            return null;
        }
    }

    async getBookByGenrePages(genre: number, pages: number): Promise<IBook[] | null> {
        try {
            return Book.findAll({
                where: {
                    pages: {
                        [Op.gt]: pages // Encuentra libros con más de pages
                    },
                    genre
                },
                attributes: [
                    'id',
                    'title',
                    'pages',
                    'cover',
                    'year',
                    'ISBN',
                    'available',
                    [Sequelize.col('Genre.name'), 'genre']
                ],
                include: [
                    {
                        model: Genre,
                        attributes: []
                    }],
                raw: true
            });
        } catch {
            return null;
        }
    }

    async updateAvalible(idBook: string): Promise<IBook | null> {
        try {
            const existsInDB: IBook | null = await this.getBookById(idBook);
            if (!existsInDB) throw new Error('Book does not exists');

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_numberAffectedRows, updatedBooks] = await Book.update(
                { available: !existsInDB.available },
                { where: { id: idBook }, returning: true } // Devuelve los datos actualizados
            );

            if (updatedBooks.length === 0) throw new Error('Update failed');
            return updatedBooks[0];
        } catch {
            return null;
        }
    }

    async createNewBook(ibook: IBook): Promise<IBook | null> {
        try {
            const idBook: string = ibook.title.toLocaleLowerCase().replace(/ /g, '-');
            const existsInDB: IBook | null = await this.getBookById(idBook);
            if (existsInDB) throw new Error('Duplicated id');
            const genreExists: string | null = await this.genreRepository.getGenreName(ibook.genre);
            if (!genreExists) throw new Error('Genre does not exists in DB');
            const newBook: IBook = {
                id: idBook,
                available: true,
                ...ibook
            };
            const result = await Book.create(newBook);
            return result;
        } catch {
            return null;
        }
    }

    async deleteBook(idBook: string): Promise<boolean | null> {
        try {
            const numDelete: number = await Book.destroy({ where: { id: idBook } });
            return numDelete > 0;
        } catch {
            return null;
        }
    }
}

export default BookRepository;
