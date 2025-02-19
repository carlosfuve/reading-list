import IBook from './IBook';

interface IBookUseCaseMoveBook {
    moveBook(idBook: string): Promise<IBook | null>
}

export default IBookUseCaseMoveBook;
