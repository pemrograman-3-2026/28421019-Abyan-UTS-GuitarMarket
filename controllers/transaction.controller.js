import { prisma } from '../lib/prisma.js'

export const getAll = async (req, res) => {
  const data = await prisma.transaction.findMany({
    include: { user: true, items: { include: { guitar: true } } }
  })
  res.json({ message: 'OK', data })
}

export const getByUser = async (req, res) => {
  const data = await prisma.transaction.findMany({
    where: { id_user: parseInt(req.params.id_user) },
    include: { items: { include: { guitar: true } } }
  })
  res.json({ message: 'OK', data })
}

export const getById = async (req, res) => {
  const data = await prisma.transaction.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { user: true, items: { include: { guitar: true } } }
  })
  if (!data) return res.status(404).json({ message: 'Transaction Not Found' })
  res.json({ message: 'OK', data })
}

export const create = async (req, res) => {
  const { id_user, items } = req.body

  const itemsWithPrice = await Promise.all(items.map(async (item) => {
    const guitar = await prisma.guitar.findUnique({ where: { id: item.id_guitar } })
    if (!guitar) throw new Error(`Guitar id ${item.id_guitar} tidak ditemukan`)
    if (guitar.stock < item.quantity) throw new Error(`Stok ${guitar.name} tidak cukup`)
    return {
      id_guitar: item.id_guitar,
      quantity: item.quantity,
      price: guitar.price,
      subtotal: guitar.price * item.quantity
    }
  }))

  const totalPrice = itemsWithPrice.reduce((sum, i) => sum + i.subtotal, 0)

  const transaction = await prisma.transaction.create({
    data: {
      id_user,
      totalPrice,
      items: { create: itemsWithPrice }
    },
    include: { items: { include: { guitar: true } } }
  })

  await Promise.all(itemsWithPrice.map(item =>
    prisma.guitar.update({
      where: { id: item.id_guitar },
      data: { stock: { decrement: item.quantity } }
    })
  ))

  res.status(201).json({ message: 'Transaction Succesfully', data: transaction })
}

export const updateStatus = async (req, res) => {
  const { status } = req.body
  const data = await prisma.transaction.update({
    where: { id: parseInt(req.params.id) },
    data: { status }
  })
  res.json({ message: 'Status Updated', data })
}