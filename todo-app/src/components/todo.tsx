import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Todo() {
    const [todos, setTodos] = useState([])

    const getTodos = async () => {
        const response = await axios.get('http://localhost:3000/todos')
        return response.data
    }

    useEffect(() => {
        getTodos().then(todos => setTodos(todos))
    }, [])

    return (
        <>
            {/* Creating */}
        </>
    )
}
