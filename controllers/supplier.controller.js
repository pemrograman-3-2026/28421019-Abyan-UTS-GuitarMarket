import { prisma } from '../lib/prisma.js'

export const getAll = async (req, res) => {
  const data = await prisma.supplier.findMany()
  res.json({ message: 'OK', data })
}

export const getById = async (req, res) => {
  const data = await prisma.supplier.findUnique({ where: { id: parseInt(req.params.id) } })
  if (!data) return res.status(404).json({ message: 'Supplier tidak ditemukan!' })
  res.json({ message: 'OK', data })
}

export const create = async (req, res) => {
  const { name, city, phone } = req.body
  const data = await prisma.supplier.create({ data: { name, city, phone } })
  res.status(201).json({ message: 'Supplier ditambahkan!', data })
}

export const update = async (req, res) => {
  const { name, city, phone } = req.body
  const data = await prisma.supplier.update({
    where: { id: parseInt(req.params.id) },
    data: { name, city, phone }
  })
  res.json({ message: 'Supplier diupdate!', data })
}

export const remove = async (req, res) => {
  await prisma.supplier.delete({ where: { id: parseInt(req.params.id) } })
  res.json({ message: 'Supplier dihapus!' })
}