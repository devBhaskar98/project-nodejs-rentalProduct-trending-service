import { Router } from "express";
import trendingRepository from "./trending-repository.js";
// import runDbMigrations from "../../db/migrations/index.js";

const router = Router();

// runDbMigrations();

router.post('/', async (req, res) => {
    const result = await trendingRepository.create(req.body);

    res.status(201).json(result)
})

router.get('/', async (req, res) => {
    const result = await trendingRepository.findAll();

    res.json(result)
})

router.get('/:id', async (req, res) => {
    const result = await trendingRepository.findOne(+req.params.id);

    res.json(result)
})

router.put('/:id', async (req, res) => {
    const result = await trendingRepository.updateOne(+req.params.id, req.body);

    res.json(result)
})

router.delete('/:id', async (req, res) => {
    const result = await trendingRepository.deleteOne(+req.params.id);

    res.json(result)
})

export default router;