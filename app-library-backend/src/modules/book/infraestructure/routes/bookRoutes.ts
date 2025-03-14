import { Router } from 'express';
import BookRepository from '../repositories/BookRepository';
import BookUseCaseMoveBook from '../../application/BookUseCaseMoveBook';
import BookMoveBookController from '../controllers/BookMoveBookController';
import BookController from '../controllers/BookController';
import BookUseCaseAddBook from '../../application/BookUseCaseAddBook';
import BookAddController from '../controllers/BookAddBookController';
import BookUseCaseDeleteBook from '../../application/BookUseCaseDeleteBook';
import BookDeleteController from '../controllers/BookDeleteController';

// Repository and dependencies
const bookRepository = new BookRepository();

// Use Cases
const bookMoveUseCase = new BookUseCaseMoveBook(bookRepository);
const bookAddUseCase = new BookUseCaseAddBook(bookRepository);
const bookDeleteUseCase = new BookUseCaseDeleteBook(bookRepository);

// Controllers
const bookMoveBookController = new BookMoveBookController(bookMoveUseCase);
const bookController = new BookController(bookRepository);
const bookAddBookController = new BookAddController(bookAddUseCase);
const bookDeleteController = new BookDeleteController(bookDeleteUseCase);

const router = Router();

router.get('/', (req, res) => { bookController.getBooks(req, res); }); // ACTUALIZAR EL GENRE, PONER QUE ES NUMERO
router.post('/', (req, res) => { bookAddBookController.run(req, res); });
// TODO: CREATE MULTIPLE BOOKS
router.get('/:idBook', (req, res) => { bookController.getBookId(req, res); });
router.patch('/:idBook', (req, res) => { bookMoveBookController.run(req, res); });
router.delete('/:idBook', (req, res) => { bookDeleteController.run(req, res); });

export default router;
