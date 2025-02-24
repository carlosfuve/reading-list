import { Request, Response } from 'express';
import Controller from '../../../shared/infraestructure/controllers/Controller';
import IBookUseCaseDeleteBook from '../../domain/IBookUseCaseDeleteBook';
import { ConflictError, ValidationError } from '../../../shared/infraestructure/Errors';

class BookDeleteController extends Controller {
    constructor(private readonly bookUseCase: IBookUseCaseDeleteBook) {
        super();
    }

    protected async runImplementation(req: Request, res: Response): Promise<Response> {
        const idBook: string = req.params.idBook;
        if (idBook == null) return this.sendError(res, new ValidationError('The id is required field'));

        const resultDelete: boolean | null = await this.bookUseCase.delete(idBook);
        if (resultDelete === null || !resultDelete) throw new ConflictError('Book not deleted');
        return this.sendJsonResponse(res, 200, { book: idBook, deleted: resultDelete });
    }
}

export default BookDeleteController;
