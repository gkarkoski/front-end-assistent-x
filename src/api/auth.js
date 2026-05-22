import { apiRequest } from './client'

export function login(usuario, senha) {
  return apiRequest('/usuario/login', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({ usuario, senha }),
  })
}
