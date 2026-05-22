import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as apiLogin } from '../api/auth'
import { getUsuario } from '../api/usuario'
import { setUnauthorizedHandler } from '../api/client'
import {
  clearStoredAuth,
  getStoredAuth,
  getStoredUser,
  parseUsuarioIdFromToken,
  setStoredAuth,
  setStoredUser,
} from '../utils/token'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const stored = getStoredAuth()
  const [token, setToken] = useState(stored.token)
  const [usuarioId, setUsuarioId] = useState(stored.usuarioId)
  const [user, setUser] = useState(getStoredUser())
  const [loading, setLoading] = useState(false)
  const [bootstrapping, setBootstrapping] = useState(!!stored.token)

  const logout = useCallback(() => {
    clearStoredAuth()
    setToken(null)
    setUsuarioId(null)
    setUser(null)
    navigate('/login', { replace: true })
  }, [navigate])

  const refreshUser = useCallback(async () => {
    if (!token || !usuarioId) return
    const data = await getUsuario(token, usuarioId)
    setUser(data)
    setStoredUser(data)
  }, [token, usuarioId])

  useEffect(() => {
    setUnauthorizedHandler(logout)
  }, [logout])

  useEffect(() => {
    if (!token || !usuarioId) {
      setBootstrapping(false)
      return
    }
    refreshUser()
      .catch(() => logout())
      .finally(() => setBootstrapping(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const login = async (usuario, senha) => {
    setLoading(true)
    try {
      const data = await apiLogin(usuario, senha)
      const authToken = data.token
      const id = data.id ?? parseUsuarioIdFromToken(authToken)
      setToken(authToken)
      setUsuarioId(id)
      setStoredAuth(authToken, id)
      const profile = await getUsuario(authToken, id)
      setUser(profile)
      setStoredUser(profile)
      navigate('/dashboard', { replace: true })
    } finally {
      setLoading(false)
    }
  }

  const updateUser = (profile) => {
    setUser(profile)
    setStoredUser(profile)
  }

  const value = {
    token,
    usuarioId,
    user,
    loading,
    bootstrapping,
    isAuthenticated: Boolean(token && usuarioId),
    login,
    logout,
    refreshUser,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
