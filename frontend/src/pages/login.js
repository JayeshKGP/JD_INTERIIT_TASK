import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Box, 
  CssBaseline,
  createTheme,
  ThemeProvider
} from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    background: {
      default: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: 0,
            },
          },
        },
      },
    },
  },
});

export default function AuthForm() {
  const [isRedirect, setIsRedirect] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backend = process.env.REACT_APP_BACKEND

  useEffect(() => {
    const auth = localStorage.getItem('auth')
    if (auth === 'true') {
      setIsRedirect(true)
      setTimeout(() => {
        window.location.href = '/' // Redirect after 2 seconds
      }, 2000)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = isSignUp ? 'signup' : 'signin'

    axios.post(backend + url, { email, password }, { withCredentials: true })
      .then(response => {
        console.log('Success:', response.data)
        if (response.data.auth === 'true') {
          window.location.href = '/'
          localStorage.setItem('auth', 'true')
        } else {
          localStorage.setItem('auth', 'false')
          alert(response.data.message)
        }
      })
      .catch(error => {
        console.error('Error:', error)
        // Handle error (e.g., show error message)
      })
    console.log(isSignUp ? 'Sign Up' : 'Sign In', { email, password })
  }

  if (isRedirect) {
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Already Login Redirecting...
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' } }}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                onClick={() => setIsSignUp(!isSignUp)}
                sx={{ textTransform: 'none', fontSize: '0.9rem', color: 'black' }}
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}