import IBook from '../../domain/IBook';
import IBookRepository from '../../domain/IBookRepository';
import Book from '../../../../database/models/Book';
import { Op } from 'sequelize';
// import Genre from '../../../../database/models/Genre';

class BookRepository implements IBookRepository {
    async getAll(): Promise<IBook[] | null> {
        try {
            const allBooks = await Book.findAll({
                /* include: [{
                    model: Genre,
                    attributes: ['name'] // Qué columnas de la tabla `Genre` quieres traer
                }], */
                raw: true
            });
            console.log(allBooks);
            return allBooks;
        } catch {
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

    async getBookByGenre(genre: string): Promise<IBook[] | null> {
        try {
            return Book.findAll({ where: { genre } });
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
                }
            });
        } catch {
            return null;
        }
    }

    async getBookByGenrePages(genre: string, pages: number): Promise<IBook[] | null> {
        try {
            return Book.findAll({
                where: {
                    pages: {
                        [Op.gt]: pages // Encuentra libros con más de pages
                    },
                    genre
                }
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
