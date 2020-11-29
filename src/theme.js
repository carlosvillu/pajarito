import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#0c7bc0',
    },
    error: {
      main: '#c51f5d',
    },
    background: {
      default: '#15212b',
      paper: '#182530',
    },
  },
  MuiAppBar: {
    colorPrimary: 'red',
  },
})

export default theme
