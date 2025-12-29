import React from 'react'
import { createBrowserRouter, redirect } from 'react-router'
import { domain } from './domain'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { Layout } from './components/Layout/Layout'
import { Trinos } from './pages/Trinos/Trinos'

// Auth helper functions
const USERS_KEY = '__Current_User__'

function getUser() {
  const usersJSON = window.localStorage.getItem(USERS_KEY) || '{}'
  const usersDB = JSON.parse(usersJSON)
  return usersDB[USERS_KEY] || null
}

// Login page loader
async function loginLoader({ request }) {
  const user = getUser()

  if (user) {
    const url = new URL(request.url)
    const from = url.searchParams.get('from') || '/'
    return redirect(from)
  }

  return null
}

// Login page action
async function loginAction({ request }) {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  const [error] = await domain.get('loginUserUseCase').execute({
    username,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return redirect('/')
}

// Register page loader
async function registerLoader() {
  return null
}

// Register page action
async function registerAction({ request }) {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  const [error] = await domain.get('registerUserUseCase').execute({
    username,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return redirect('/login')
}

// Root loader - loads trinos data
async function rootLoader() {
  const [error, data] = await domain.get('listTrinoUseCase').execute()
  return {
    trinos: data?.trinos || [],
    error: error?.message || null,
  }
}

// Root action - handles create trino
async function rootAction({ request }) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  if (intent === 'create-trino') {
    const body = formData.get('body')
    const imagesJson = formData.get('images')

    const newTrino = {
      id: Date.now().toString(),
      body,
      images: imagesJson ? JSON.parse(imagesJson) : [],
      createdAt: new Date().toISOString(),
    }

    const [error, result] = await domain.get('createTrinoUseCase').execute({
      ...newTrino,
    })

    if (error) {
      return { error: error.message, success: false }
    }

    return { success: true, trino: result }
  }

  return null
}

// Layout loader - checks auth
async function layoutLoader({ request }) {
  const user = getUser()

  if (!user) {
    const url = new URL(request.url)
    const from = url.pathname
    throw redirect(`/login?from=${from}`)
  }

  return { user }
}

// Layout action - handles logout
async function layoutAction({ request }) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  if (intent === 'logout') {
    const [error] = await domain.get('logoutUserUseCase').execute()
    if (error) {
      return { error: error.message }
    }
    throw redirect('/login')
  }

  return null
}

// Router configuration - using direct imports instead of lazy loading
export const router = createBrowserRouter([
  {
    path: '/login',
    loader: loginLoader,
    action: loginAction,
    element: <Login />,
  },
  {
    path: '/register',
    loader: registerLoader,
    action: registerAction,
    element: <Register />,
  },
  {
    path: '/',
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        // Layout wrapper for protected routes
        loader: layoutLoader,
        action: layoutAction,
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Trinos />,
          },
        ],
      },
    ],
  },
])
