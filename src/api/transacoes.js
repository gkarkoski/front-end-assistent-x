import { apiRequest } from './client'

export function listEntradas(token, usuarioId) {
  return apiRequest(`/usuario/${usuarioId}/entradas`, { token })
}

export function getEntrada(token, usuarioId, transacaoId) {
  return apiRequest(`/usuario/${usuarioId}/entradas/${transacaoId}`, { token })
}

export function createEntrada(token, usuarioId, payload) {
  return apiRequest(`/usuario/${usuarioId}/entradas`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  })
}

export function updateEntrada(token, usuarioId, transacaoId, payload) {
  return apiRequest(`/usuario/${usuarioId}/entradas/${transacaoId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload),
  })
}

export function deleteEntrada(token, usuarioId, transacaoId) {
  return apiRequest(`/usuario/${usuarioId}/entradas/${transacaoId}`, {
    method: 'DELETE',
    token,
  })
}

export function getResumoEntradas(token, usuarioId) {
  return apiRequest(`/usuario/${usuarioId}/entradas/resumo`, { token })
}

export function listSaidas(token, usuarioId) {
  return apiRequest(`/usuario/${usuarioId}/saidas`, { token })
}

export function getSaida(token, usuarioId, transacaoId) {
  return apiRequest(`/usuario/${usuarioId}/saidas/${transacaoId}`, { token })
}

export function createSaida(token, usuarioId, payload) {
  return apiRequest(`/usuario/${usuarioId}/saidas`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  })
}

export function updateSaida(token, usuarioId, transacaoId, payload) {
  return apiRequest(`/usuario/${usuarioId}/saidas/${transacaoId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload),
  })
}

export function deleteSaida(token, usuarioId, transacaoId) {
  return apiRequest(`/usuario/${usuarioId}/saidas/${transacaoId}`, {
    method: 'DELETE',
    token,
  })
}

export function getResumoSaidas(token, usuarioId) {
  return apiRequest(`/usuario/${usuarioId}/saidas/resumo`, { token })
}
