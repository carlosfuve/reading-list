import IBook from '../../domain/IBook';
import IBookRepository from '../../domain/IBookRepository';
import Book from '../../../../database/models/Book';
import { Op } from 'sequelize';

class BookRepository implements IBookRepository {
    async getAll(): Promise<IBook[] | null> {
        try {
            return Book.findAll();
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

    async getBookByTitle(title: string): Promise<IBook | null> {
        try {
            return Book.findOne({ where: { title } }); // infoBookFilter.filter(book => book.title === title)[0];
        } catch {
            return null;
        }
    }

    async getMinPages(pages: number): Promise<IBook[] | null> {
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

    async updateAvalible(idBook: string): Promise<IBook | null> {
        try {
            const existsInDB: IBook | null = await this.getBookById(idBook);
            if (!existsInDB) throw new Error('Book does not exists');
            const newBook: IBook = {
                ...existsInDB,
                available: !existsInDB.available
            };
            const result = await Book.update(newBook, { where: { id: idBook } });
            if (!result[0]) return null;
            return newBook;
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
            return await Book.create(newBook);
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
