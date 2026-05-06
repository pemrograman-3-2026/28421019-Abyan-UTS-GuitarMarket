import express from 'express'
import userRoute from './routes/user.route.js'
import kategoriRoute from './routes/kategori.route.js'
import supplierRoute from './routes/supplier.route.js'
import guitarRoute from './routes/guitar.route.js'
import transactionRoute from './routes/transaction.route.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.send('Guitar Market On'))

app.use('/api/user', userRoute)
app.use('/api/kategori', kategoriRoute)
app.use('/api/supplier', supplierRoute)
app.use('/api/guitar', guitarRoute)
app.use('/api/transaction', transactionRoute)

app.listen(3000, () => console.log('Server jalan di http://localhost:3000'))