import axios from 'axios'

const API_URL = 'http://localhost:3000/todos'

interface Todo {
    id: number,
    title: string,
    description: string,
    status: boolean
}

export default class TodoController {
    static async getAll() {
        const response = await axios.get(API_URL)
        return response.data
    }

    static async get(id: number) {
        const response = await axios.get(`${API_URL}/${id}`)
        return response.data
    }
    
    static async create(todo: Todo) {
        const response = await axios.post(API_URL, todo)
        return response.data
    }
    
    static async update(todo: Todo) {
        const response = await axios.put(`${API_URL}/${todo.id}`, todo)
        return response.data
    }
    
    static async delete(id: number) {
        const confirm = window.confirm('Are you sure you want to delete this todo?')
        if (!confirm) return
        const response = await axios.delete(`${API_URL}/${id}`)
        return response
    }
}