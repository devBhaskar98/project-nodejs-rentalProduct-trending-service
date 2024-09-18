import { Router } from 'express';
import { index, hello, healthCheck } from './default.js';

const router = Router();

router.get('/', index);
router.get('/hello', hello);

router.get('/health/check', healthCheck);

export default router;
