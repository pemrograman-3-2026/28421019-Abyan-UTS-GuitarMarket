import { prisma } from '../lib/prisma.js'

export const getAll = async (req, res) => {
  const data = await prisma.guitar.findMany({
    include: { category: true, supplier: true }
  })
  res.json({ message: 'OK', data })
}

export const getById = async (req, res) => {
  const data = await prisma.guitar.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { category: true, supplier: true }
  })
  if (!data) return res.status(404).json({ message: 'Guitar Not Found' })
  res.json({ message: 'OK', data })
}

export const getStokMenipis = async (req, res) => {
  const data = await prisma.guitar.findMany({
    where: { stock: { lte: 3 } },
    include: { category: true, supplier: true }
  })
  res.json({ message: 'Low Stock', data })
}

export const create = async (req, res) => {
  const { name, brand, type, year, color, price, stock, imageUrl, id_kategori, id_supplier } = req.body
  const data = await prisma.guitar.create({
    data: {
      name, brand, type,
      year: year ? parseInt(year) : null,
      color,
      price: parseInt(price),
      stock: parseInt(stock),
      imageUrl,
      id_kategori: parseInt(id_kategori),
      id_supplier: parseInt(id_supplier)
    },
    include: { category: true, supplier: true }
  })
  res.status(201).json({ message: 'Guitar Added', data })
}

export const update = async (req, res) => {
  const { name, brand, type, year, color, price, stock, imageUrl, id_kategori, id_supplier } = req.body
  const data = await prisma.guitar.update({
    where: { id: parseInt(req.params.id) },
    data: { name, brand, type, year, color, price, stock, imageUrl, id_kategori, id_supplier }
  })
  res.json({ message: 'Guitar Updated', data })
}

export const remove = async (req, res) => {
  await prisma.guitar.delete({ where: { id: parseInt(req.params.id) } })
  res.json({ message: 'Guitar Removed' })
}