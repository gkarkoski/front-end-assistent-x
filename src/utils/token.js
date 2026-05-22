export function parseUsuarioIdFromToken(token) {
  if (!token) return null
  const match = token.match(/Bearer usuario_(\d+)/)
  return match ? Number(match[1]) : null
}

export function getStoredAuth() {
  const token = localStorage.getItem('assistentx_token')
  const usuarioId = localStorage.getItem('assistentx_usuarioId')
  return {
    token,
    usuarioId: usuarioId ? Number(usuarioId) : parseUsuarioIdFromToken(token),
  }
}

export function setStoredAuth(token, usuarioId) {
  localStorage.setItem('assistentx_token', token)
  localStorage.setItem('assistentx_usuarioId', String(usuarioId))
}

export function clearStoredAuth() {
  localStorage.removeItem('assistentx_token')
  localStorage.removeItem('assistentx_usuarioId')
  localStorage.removeItem('assistentx_user')
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem('assistentx_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setStoredUser(user) {
  localStorage.setItem('assistentx_user', JSON.stringify(user))
}
