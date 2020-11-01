import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import {ThemeProvider} from '@material-ui/core/styles'
import {Routes} from './Routes'
import theme from './theme'
import './index.css'

import {Global} from './contexts/global'
import {Pajarito} from './domain'

const domain = new Pajarito()

ReactDOM.render(
  <Global.Provider value={{domain}}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  </Global.Provider>,
  document.getElementById('root')
)
