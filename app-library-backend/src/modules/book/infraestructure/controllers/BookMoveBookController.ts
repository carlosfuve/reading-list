import { Request, Response } from 'express';
import Controller from '../../../shared/infraestructure/controllers/Controller';
import { ConflictError, ValidationError } from '../../../shared/infraestructure/Errors';
import IBookUseCaseMoveBook from '../../domain/IBookUseCaseMoveBook';
import IBook from '../../domain/IBook';

class BookMoveBookController extends Controller {
    constructor(private readonly useCase: IBookUseCaseMoveBook) {
        super();
    }

    protected async runImplementation(req: Request, res: Response): Promise<Response> {
        const idBook: string = req.params.idBook;
        if (idBook == null) return this.sendError(res, new ValidationError('The id is required field'));

        const bookModified: IBook | null = await this.useCase.moveBook(idBook);
        if (bookModified == null) throw new ConflictError('Book not modified');
        return this.sendJsonResponse(res, 200, { book: { id: bookModified.id, availble: bookModified.available } });
    }
}

export default BookMoveBookController;
