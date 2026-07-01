import express from 'express'
import cors from 'cors'
import userRoute from './routes/user.route.js'
import kategoriRoute from './routes/kategori.route.js'
import supplierRoute from './routes/supplier.route.js'
import guitarRoute from './routes/guitar.route.js'
import transactionRoute from './routes/transaction.route.js'
import path from 'path'

const app = express()
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

app.get('/', (req, res) => res.send('Guitar Market On'))

app.use('/api/user', userRoute)
app.use('/api/kategori', kategoriRoute)
app.use('/api/supplier', supplierRoute)
app.use('/api/guitar', guitarRoute)
app.use('/api/transaction', transactionRoute)

app.listen(3100, () => console.log('Server jalan di http://localhost:3100'))