import { Router } from 'express';
import BookRepository from '../repositories/BookRepository';
import BookUseCaseMoveBook from '../../application/BookUseCaseMoveBook';
import BookMoveBookController from '../controllers/BookMoveBookController';
import BookController from '../controllers/BookController';
import BookUseCaseAddBook from '../../application/BookUseCaseAddBook';
import BookAddController from '../controllers/BookAddBookController';

// Repository and dependencies
const bookRepository = new BookRepository();

// Use Cases
const bookMoveUseCase = new BookUseCaseMoveBook(bookRepository);
const bookAddUseCase = new BookUseCaseAddBook(bookRepository);

// Controllers
const bookMoveBookController = new BookMoveBookController(bookMoveUseCase);
const bookController = new BookController(bookRepository);
const bookAddBookController = new BookAddController(bookAddUseCase);

const router = Router();

router.get('/', (req, res) => { bookController.getBooks(req, res); });
router.post('/', (req, res) => { bookAddBookController.run(req, res); });
router.get('/:idBook', (req, res) => { bookController.getBookId(req, res); });
router.patch('/:idBook', (req, res) => { bookMoveBookController.run(req, res); });
// router.delete('/:idBook', (req, res) => { boookDeleteController.run(req, res); }); TODO: Create route

export default router;
