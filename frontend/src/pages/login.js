import React, { useState } from 'react'
import axios from 'axios'

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backend = process.env.REACT_APP_BACKEND;

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = isSignUp ? 'signup' : 'signin'

    axios.post(backend+url, { email, password }, { withCredentials: true })
        .then(response => {
            console.log('Success:', response.data)
            if(response.data.auth === 'true'){
                window.location.href = '/';
            }else{
                alert(response.data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error)
            // Handle error (e.g., show error message)
        })
    console.log(isSignUp ? 'Sign Up' : 'Sign In', { email, password })
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f3e8ff',
    fontFamily: 'Arial, sans-serif',
  }

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%',
    maxWidth: '400px',
  }

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  }

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#8b5cf6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }

  const linkButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#8b5cf6',
    cursor: 'pointer',
    textDecoration: 'underline',
  }

  return (
    <div style={formStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', color: '#4b5563' }}>
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '20px' }}>
          {isSignUp ? 'Sign up to get started' : 'Sign in to your account'}
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <span style={{ color: '#6b7280' }}>Or continue with</span>
        </div>
        <button
          style={linkButtonStyle}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  )
}