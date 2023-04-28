import Todo from '@/components/todo'
import Head from 'next/head'
import React from 'react'

export default function Index() {
  return (
    <div className='flex items-center justify-center'>
      <Head>
        <title>Todo App</title>
      </Head>
      <main className='w-full rounded-lg flex items-center justify-center flex-col mt-10'>
        <h1 className='text-4xl font-bold'>ToDo list app</h1>
        <p className='text-sm text-gray-700'>Your to-do list is:</p>
        <Todo />
      </main>
    </div>
  )
}
