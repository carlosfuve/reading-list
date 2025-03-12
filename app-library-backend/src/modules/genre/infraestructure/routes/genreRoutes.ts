import { Router } from 'express';
import GenreRepository from '../repositories/GenreRepository';
import GenreController from '../controllers/GenreController';

// Repository and dependencies
const genreRepository = new GenreRepository();

// Use Case

// Controller
const genreController = new GenreController(genreRepository);

const router = Router();

router.get('/', (req, res) => { genreController.getGenres(req, res); });

export default router;
