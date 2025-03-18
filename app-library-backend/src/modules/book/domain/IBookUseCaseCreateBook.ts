import IBook from './IBook';

interface IBookUseCaseCreateBook {
    addBook(book: IBook): Promise<IBook | null>
}

export default IBookUseCaseCreateBook;
