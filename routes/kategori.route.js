import express from 'express'
import { getAll, create, remove } from '../controllers/kategori.controller.js'

const router = express.Router()
router.get('/', getAll)
router.post('/', create)
router.delete('/:id', remove)
export default router