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
  try {
    const { name, brand, type, year, color, price, stock, id_kategori, id_supplier } = req.body
    const imageUrl = req.file ? req.file.filename : null

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
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Gagal menambah gitar', error: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const { name, brand, type, year, color, price, stock, id_kategori, id_supplier } = req.body
    const id = parseInt(req.params.id)
    
    const existingGuitar = await prisma.guitar.findUnique({ where: { id } })
    if (!existingGuitar) return res.status(404).json({ message: 'Guitar Not Found' })

    const imageUrl = req.file ? req.file.filename : existingGuitar.imageUrl

    const data = await prisma.guitar.update({
      where: { id },
      data: {
        name, brand, type,
        year: year ? parseInt(year) : null,
        color,
        price: price ? parseInt(price) : existingGuitar.price,
        stock: stock ? parseInt(stock) : existingGuitar.stock,
        imageUrl,
        id_kategori: id_kategori ? parseInt(id_kategori) : existingGuitar.id_kategori,
        id_supplier: id_supplier ? parseInt(id_supplier) : existingGuitar.id_supplier
      }
    })
    res.json({ message: 'Guitar Updated', data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Gagal memperbarui gitar', error: error.message })
  }
}

export const remove = async (req, res) => {
  await prisma.guitar.delete({ where: { id: parseInt(req.params.id) } })
  res.json({ message: 'Guitar Removed' })
}