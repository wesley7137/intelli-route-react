import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios' // Assume you're using axios for API calls

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const access_token = localStorage.getItem('access_token')
      const user_id = localStorage.getItem('user_id') // Changed from 'userId' to 'user_id'
      const email = localStorage.getItem('email')

      if (access_token && user_id && email) {
        try {
          // Validate token with the server
          await axios.get('/api/validate-token', {
            headers: { Authorization: `Bearer ${access_token}` },
          })

          setIsAuthenticated(true)
          setUser({ user_id: user_id, email: email })
        } catch (error) {
          console.error('Token validation failed:', error)
          await refreshToken()
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [])

  const refreshToken = async () => {
    try {
      const refresh_token = localStorage.getItem('refresh_token')
      if (!refresh_token) {
        throw new Error('No refresh token available')
      }

      const response = await axios.post('/api/refresh-token', { refresh_token })
      const { access_token, user_id, email } = response.data

      localStorage.setItem('access_token', access_token)
      localStorage.setItem('user_id', user_id)
      localStorage.setItem('email', email)

      setIsAuthenticated(true)
      setUser({ user_id: user_id, email: email })
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
    }
  }

  const login = (access_token, refresh_token, user_id, email) => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    localStorage.setItem('user_id', user_id)
    localStorage.setItem('email', email)
    setIsAuthenticated(true)
    setUser({ user_id: user_id, email: email })
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('email')
    setIsAuthenticated(false)
    setUser(null)
  }

  if (loading) {
    return <div>Loading...</div> // Or any loading component
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
