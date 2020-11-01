import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import {ThemeProvider} from '@material-ui/core/styles'
import {Routes} from './Routes'
import theme from './theme'
import './index.css'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes />
  </ThemeProvider>,
  document.getElementById('root')
)
