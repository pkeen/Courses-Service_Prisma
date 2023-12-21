import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
    res.send('Hello, World! from API routes');
});

export default router;

