import express from 'express'
import multer from 'multer'
import path from 'path'
import { getAll, getById, getStokMenipis, create, update, remove } from '../controllers/guitar.controller.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

const router = express.Router()
router.get('/', getAll)
router.get('/stok-menipis', getStokMenipis)  
router.get('/:id', getById)
router.post('/', upload.single('image'), create)
router.put('/:id', upload.single('image'), update)
router.delete('/:id', remove)
export default router