import express from 'express'
import cache from '../middleware/redis';


const router = express.Router();


router.get('/', (req, res)=> res.sendStatus(200));

export default router;