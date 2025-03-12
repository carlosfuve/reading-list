import { Router, Request, Response } from 'express';
import bookRoutes from './modules/book/infraestructure/routes/bookRoutes';
import genreRoutes from './modules/genre/infraestructure/routes/genreRoutes';

const router = Router();

router.use('/books', bookRoutes);
router.use('/genre', genreRoutes);
router.use('/*', (_: Request, res: Response) => { res.status(404).json({ code: 404, msg: 'Not found.' }); });

export default router;
