import { apiRequest } from './client'

export function getUsuario(token, usuarioId) {
  return apiRequest(`/usuario/${usuarioId}`, { token })
}

export function setModelo(token, usuarioId, modeloId) {
  return apiRequest(`/usuario/${usuarioId}/modelo/${modeloId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify({ usuarioId, modeloId }),
  })
}

export function getResumoOrcamento(token, usuarioId, modeloId) {
  return apiRequest(`/usuario/${usuarioId}/modelo/${modeloId}/resumo`, { token })
}
