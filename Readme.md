# Endpoint API

Daftar endpoint REST API yang tersedia di dalam project ini:

### 1. Post
POST `http://localhost:3000/api/user/register` Registrasi user baru  
POST `http://localhost:3000/api/user/login` Login user  
POST `http://localhost:3000/api/guitar` Tambah guitar baru  
POST `http://localhost:3000/api/kategori` Tambah kategori baru  
POST `http://localhost:3000/api/supplier` Tambah supplier baru  
POST `http://localhost:3000/api/transaction` Buat transaksi baru  

### 2. Get
GET `http://localhost:3000/api/guitar` Ambil semua data guitar  
GET `http://localhost:3000/api/guitar/:id` Ambil data guitar by ID  
GET `http://localhost:3000/api/guitar/stok-menipis` Ambil data guitar stok rendah  
GET `http://localhost:3000/api/kategori` Ambil semua kategori  
GET `http://localhost:3000/api/supplier` Ambil semua supplier  
GET `http://localhost:3000/api/supplier/:id` Ambil supplier by ID  
GET `http://localhost:3000/api/transaction` Ambil semua data transaksi  
GET `http://localhost:3000/api/transaction/user/:id_user` Ambil transaksi per user  
GET `http://localhost:3000/api/transaction/:id` Ambil transaksi by ID  

### 3. Put
PUT `http://localhost:3000/api/guitar/:id` Update data guitar  
PUT `http://localhost:3000/api/supplier/:id` Update data supplier  
PUT `http://localhost:3000/api/transaction/:id` Update status transaksi  

### 4. Delete
DELETE `http://localhost:3000/api/guitar/:id` Hapus data guitar  
DELETE `http://localhost:3000/api/kategori/:id` Hapus kategori  
DELETE `http://localhost:3000/api/supplier/:id` Hapus supplier