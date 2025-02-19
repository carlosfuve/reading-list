import { Router } from 'express';
import BookRepository from '../repositories/BookRepository';
import BookUseCaseMoveBook from '../../application/BookUseCaseMoveBook';
import BookMoveBookController from '../controllers/BookMoveBookController';
import BookController from '../controllers/BookController';

// Repository and dependencies
const bookRepository = new BookRepository();

// Use Cases
const bookMoveUseCase = new BookUseCaseMoveBook(bookRepository);

// Controllers
const bookAddCartController = new BookMoveBookController(bookMoveUseCase);
const bookController = new BookController(bookRepository);

const router = Router();

router.get('/', (req, res) => { bookController.getBooks(req, res); });
router.get('/:idBook', (req, res) => { bookController.getBookId(req, res); });
router.patch('/:idBook', (req, res) => { bookAddCartController.run(req, res); });

export default router;
