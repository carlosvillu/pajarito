import { createTheme } from '@mui/material/styles'

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'dark',
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
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          colorPrimary: '#0c7bc0',
        },
      },
    },
  },
})

export default theme
