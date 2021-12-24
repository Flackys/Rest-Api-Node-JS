const express = require('express')
const path = require('path')
const {v4} = require ('uuid')
const app = express()

let BOOKS = [
    {id: v4(), name: 'Думай и процветай', value: 'Наполеон Хилл'}
]

app.use(express.json())

// GET - Получение данных
app.get('/api/books', (req, res) => {
        res.status(200).json(BOOKS)
})

// POST - Добавление книг
app.post('/api/books', (req, res) => {
    const contact = {...req.body, id: v4()}
    BOOKS.push(contact)
    res.status(201).json(contact)
})

// DELETE - Удаление книг
app.delete('/api/books/:id', (req, res) => {
   BOOKS = BOOKS.filter(c => c.id !== req.params.id)
    res.status(200).json({message: 'Книга была удалена'})
})

// PUT - Обновление книг
app.put('/api/books/:id', (req, res) => {
    const idx = BOOKS.findIndex(c => c.id === req.params.id)
    BOOKS[idx] = req.body
    res.json(BOOKS[idx])
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'client', 'index.html'))
})

app.listen(3000, () => console.log('Сервер был запущен. Порт: 3000'))