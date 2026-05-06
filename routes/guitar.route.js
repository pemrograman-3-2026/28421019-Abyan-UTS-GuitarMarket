import express from 'express'
import { getAll, getById, getStokMenipis, create, update, remove } from '../controllers/guitar.controller.js'

const router = express.Router()
router.get('/', getAll)
router.get('/stok-menipis', getStokMenipis)  
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)
export default router