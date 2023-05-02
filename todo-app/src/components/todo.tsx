import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { Alert } from '@mui/material';
import TodoController from '@/controller/todoController';

export default function Todo() {
    const [todos, setTodos] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [alert, setAlert] = useState({ show: false, type: '', message: '' })

    const getTodos = async () => {
        try {
            const res = await TodoController.getAll()
            setTodos(res)
            return res
        } catch (err: any) {
            setAlert({ show: true, type: 'error', message: err.message })
            return err
        }
    }

    useEffect(() => {
        getTodos()
    }, [refresh])

    return (
        <div className='w-full h-full mt-5 flex items-center justify-center flex-col'>
            {alert.show && <Alert onClose={() => setAlert({ ...alert, show: false })} >{alert.message}</Alert>}
            <table className='w-10/12'>
                <thead className='text-sm border-b-2 border-gray-200'>
                    <tr className=''>
                        <th className='w-1/12'>Status</th>
                        <th className='w-3/12'>Name</th>
                        <th className='w-6/12'>Description</th>
                        <th className='w-full'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo: any) => (
                        <tr key={todo.id} >
                            <td className='flex items-center justify-center'>{todo.status ? (
                                <Icon icon="mdi:checkbox-marked" className='text-green-500 w-8 h-8 cursor-pointer' onClick={() => {
                                    TodoController.update({ ...todo, status: false })
                                    setRefresh(!refresh)
                                }} />
                            ) : (
                                <Icon icon="mdi:close-box" className='text-red-500  w-8 h-8 cursor-pointer' onClick={() => {
                                    TodoController.update({ ...todo, status: true })
                                    setRefresh(!refresh)
                                }} />
                            )}</td>
                            <td>{todo.status ?
                                <p className='opacity-50'><s>{todo.name}</s></p> : <p>{todo.name}</p>
                            }</td>
                            <td>{
                                todo.status ? <p className='w-[60ch] truncate opacity-50' ><s>{todo.description}</s></p> : <p className='w-[60ch] truncate '>{todo.description}</p>
                            }</td>

                            <td>
                                <div className='flex items-center justify-center'>
                                    <button className='text-yellow-700 border border-yellow-500 py-1 px-6 text-sm rounded-xl hover:bg-yellow-500 transition ease-in hover:text-white' onClick={() => { }}>Edit</button>
                                    <button className='text-red-500 border border-red-500  py-1 px-6 text-sm rounded-xl ml-2 hover:bg-red-500 transition ease-in hover:text-white' onClick={() => {
                                        TodoController.delete(todo.id).then((res) => {
                                            if (res) {
                                                setAlert({ show: true, type: 'success', message: 'Delete success' })
                                                setRefresh(!refresh)
                                            }
                                        })
                                    }}>Del</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}
