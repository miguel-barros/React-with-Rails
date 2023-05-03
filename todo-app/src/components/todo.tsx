import React, { useEffect, useState, useRef } from 'react'
import { Icon } from '@iconify/react';
import { Alert } from '@mui/material';

import TodoController from '@/controller/todoController';

export default function Todo() {
    const [todos, setTodos] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [alert, setAlert] = useState({ show: false, type: 'success', message: '' })

    const [newTodo, setNewTodo] = useState({ name: '', description: '', status: false })

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

    const verifyButton = async (todo: any) => {
        const btn = document.getElementById('btn-edit')
        if (!btn) return false
        if (btn.innerText === 'Create') {
            handleCreate(todo)
        } else if (btn.innerText === 'Update') {
            handleUpdate(todo)
        }
    }

    const verifyParams = (todo: any) => {
        if (!todo.name || !todo.name.trim()) {
            setAlert({ show: true, type: 'error', message: 'Name is required' })
            return false
        } else if (!todo.description || !todo.description.trim()) {
            setAlert({ show: true, type: 'error', message: 'Description is required' })
            return false
        } else {
            return true
        }
    }

    const handleCreate = async (todo: any) => {
        if (!verifyParams(todo)) return false
        const btn = document.getElementById('btn-edit')
        if (!btn) return false
        TodoController.create(todo).then((res) => {
            if (!res) return false
            setAlert({ show: true, type: 'success', message: 'Create has been success' })
            setRefresh(!refresh)
            setNewTodo({
                name: '',
                description: '',
                status: false
            })
        }).catch((err) => {
            setAlert({ show: true, type: 'error', message: err.message })
        })
    }

    const handleUpdate = async (todo: any) => {
        if (!verifyParams(todo)) return false
        const btn = document.getElementById('btn-edit')
        if (!btn) return false
        TodoController.update(todo).then((res) => {
            if (!res) return false
            setAlert({ show: true, type: 'success', message: 'Update has been success' })
            setRefresh(!refresh)
            setNewTodo({
                name: '',
                description: '',
                status: false
            })
            btn.innerText = 'Create'
        }).catch((err) => {
            setAlert({ show: true, type: 'error', message: err.message })
        })
    }

    const handleEdit = async (todo: any) => {
        const btn = document.getElementById('btn-edit')
        if (!btn) return false
        btn.innerText = 'Update'
        setNewTodo({
            name: todo.name,
            description: todo.description,
            status: todo.status
        })
        setNewTodo({ ...todo, id: todo.id })
    }

    const handleClear = async () => {
        setNewTodo({
            name: '',
            description: '',
            status: false
        })
    }

    useEffect(() => {
        getTodos()
    }, [refresh])

    return (
        <div className='w-full h-full mt-5 flex items-center flex-col'>
            <div className='w-7/12 flex items-center justify-between mb-5'>
                <input type="text" className='bg-[#2b2b2b] rounded-xl py-1 px-4 w-6/12 mr-3 outline-none' placeholder='New todo name' onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })} value={newTodo.name} />
                <input type="text" className='bg-[#2b2b2b] rounded-xl py-1 px-4 w-full mr-3 outline-none' placeholder='New todo description' onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })} value={newTodo.description} />
                <button className='text-white bg-green-500 py-1 px-6 mr-3 text-sm rounded-xl hover:bg-green-600 transition ease-in' onClick={() => verifyButton(newTodo)} id={"btn-edit"} >Create</button>
                <button disabled={newTodo.name === '' && newTodo.description === '' ? true : false} className='text-white bg-red-600 py-1 px-6 text-sm rounded-xl hover:bg-red-700 transition ease-in disabled:bg-opacity-50 disabled:hover:bg-opacity-60 disabled:text-opacity-50' onClick={() => handleClear()}>Cancel</button>
            </div>
            {alert.show && <Alert severity={alert.type} onClose={() => setAlert({ ...alert, show: false })} >{alert.message}</Alert>}
            {todos.length === 0 && <p className='text-md text-gray-400'>No todo found</p>}
            <table className='w-10/12'>
                <thead className='text-sm border-b-2 border-[#2b2b2b]'>
                    <tr className=''>
                        <th className='w-1/12'>Status</th>
                        <th className='w-3/12'>Name</th>
                        <th className='w-6/12'>Description</th>
                        <th className='w-full'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo: any) => (
                        <tr key={todo.id}>
                            < td className='flex items-center justify-center' > {
                                todo.status ? (
                                    <Icon icon="mdi:checkbox-marked" className='text-green-500 w-8 h-8 cursor-pointer' onClick={() => {
                                        TodoController.update({ ...todo, status: false })
                                        setRefresh(!refresh)
                                    }} />
                                ) : (
                                    <Icon icon="mdi:clock" className='text-yellow-500  w-8 h-8 cursor-pointer' onClick={() => {
                                        TodoController.update({ ...todo, status: true })
                                        setRefresh(!refresh)
                                    }} />
                                )
                            }</td>
                            <td>{todo.status ?
                                <p className='opacity-50'><s>{todo.name}</s></p> : <p>{todo.name}</p>
                            }</td>
                            <td>{
                                todo.status ? <p className='w-[60ch] truncate opacity-50' ><s>{todo.description}</s></p> : <p className='w-[60ch] truncate '>{todo.description}</p>
                            }</td>

                            <td>
                                <div className='flex items-center justify-center'>
                                    <button disabled={(todo.status) ? true : false} className='text-yellow-700 border border-yellow-500 py-1 px-6 text-sm rounded-xl hover:bg-yellow-500 transition ease-in hover:text-white disabled:opacity-50 disabled:hover:bg-[#131516] disabled:hover:text-yellow-700' onClick={() => handleEdit(todo)
                                    }>Edit</button>
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
            </table >
        </div >
    )
}
