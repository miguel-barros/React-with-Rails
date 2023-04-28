import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Icon } from '@iconify/react';

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
        <div className='w-full h-full mt-5 flex items-center justify-center'>
            <table className='w-10/12'>
                <thead className='text-sm border-b-2 border-gray-200'>
                    <tr className=''>
                        <th className='w-3/12'>Name</th>
                        <th className='w-6/12'>Description</th>
                        <th className='w-1/12'>Status</th>
                        <th className='w-full'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo: any) => (
                        <tr key={todo.id}>
                            <td>{todo.status ?
                                <p className='opacity-50'><s>{todo.name}</s></p> : <p>{todo.name}</p>
                            }</td>
                            <td>{
                                todo.status ? <p className='w-[60ch] truncate opacity-50' ><s>{todo.description}</s></p> : <p className='w-[60ch] truncate '>{todo.description}</p>
                            }</td>
                            <td className='flex items-center justify-center'>{todo.status ? (
                                <Icon icon="mdi:checkbox-marked" className='text-green-500 w-8 h-8 cursor-pointer' />
                            ) : (
                                <Icon icon="mdi:close-box" className='text-red-500  w-8 h-8 cursor-pointer' />
                            )}</td>
                            <td>
                                <div className='flex items-center justify-center'>
                                    <button className='text-yellow-700 border border-yellow-500 py-1 px-6 text-sm rounded-xl'>Edit</button>
                                    <button className='text-red-500 border border-red-500  py-1 px-6 text-sm rounded-xl ml-2'>Del</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}
