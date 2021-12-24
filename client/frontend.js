import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

new Vue({
    el: '#app',
    data() {
        return {
            form: {
                name: '',
                value: ''
            },
            books: []
        }
    },
    computed: {
        canCreate() {
            return this.form.value.trim() && this.form.name.trim()
        }
    },
    methods: {
        async createBook() {
            const {...book} = this.form

            const newBook = await request('/api/books', 'POST', book)

            this.books.push(newBook)

            this.form.name = this.form.value=''
        },
        async renameBook(id) {
            const book = this.books.find(c => c.id === id)
            const updated = await request(`/api/books/${id}`, 'PUT', {
                ...book
            })
            book.name = this.form.name
            book.value = this.form.value
        },
        async removeBook(id) {
            await request(`/api/books/${id}`, 'DELETE')
            this.books = this.books.filter(c => c.id !== id)
        }
    },
    async mounted() {
        this.books = await request('/api/books')
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e) {
        console.warn('Error:', e.message)
    }
}