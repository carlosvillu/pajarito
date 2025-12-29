import React from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { RouterProvider } from 'react-router'
import { router } from './router'
import theme from './theme'
import './index.css'

import { Global } from './contexts/global'
import { Pajarito } from './domain/index.ts'

const domain = new Pajarito()
const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Global.Provider value={{ domain }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Global.Provider>
)
