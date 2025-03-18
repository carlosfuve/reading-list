import { Router } from 'express';
import BookRepository from '../repositories/BookRepository';
import BookUseCaseMoveBook from '../../application/BookUseCaseMoveBook';
import BookMoveBookController from '../controllers/BookMoveBookController';
import BookController from '../controllers/BookController';
import BookUseCaseCreateBook from '../../application/BookUseCaseCreateBook';
import BookCreateController from '../controllers/BookCreateController';
import BookUseCaseDeleteBook from '../../application/BookUseCaseDeleteBook';
import BookDeleteController from '../controllers/BookDeleteController';

// Repository and dependencies
const bookRepository = new BookRepository();

// Use Cases
const bookMoveUseCase = new BookUseCaseMoveBook(bookRepository);
const bookAddUseCase = new BookUseCaseCreateBook(bookRepository);
const bookDeleteUseCase = new BookUseCaseDeleteBook(bookRepository);

// Controllers
const bookMoveBookController = new BookMoveBookController(bookMoveUseCase);
const bookController = new BookController(bookRepository);
const bookCreateController = new BookCreateController(bookAddUseCase);
const bookDeleteController = new BookDeleteController(bookDeleteUseCase);

const router = Router();

router.get('/', (req, res) => { bookController.getBooks(req, res); });
router.post('/', (req, res) => { bookCreateController.run(req, res); });
router.patch('/:idBook', (req, res) => { bookMoveBookController.run(req, res); });
router.delete('/:idBook', (req, res) => { bookDeleteController.run(req, res); });

export default router;
