import Todo from '@/components/todo'
import Head from 'next/head'
import React from 'react'

export default function Index() {
  return (
    <div>
      <Head>
        <title>Todo App</title>
      </Head>
      <h1>This is a Todo app for testing the Ruby on Rails API integration CRUD</h1>
      <main>
        <p>Your to-do list is:</p>
        <Todo />
      </main>
    </div>
  )
}
