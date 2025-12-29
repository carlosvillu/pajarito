import React from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppRoutes } from './Routes'
import theme from './theme'
import './index.css'

import { Global } from './contexts/global'
import { Pajarito } from './domain'

const domain = new Pajarito()
const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Global.Provider value={{ domain }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  </Global.Provider>
)
