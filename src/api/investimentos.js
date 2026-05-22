import { apiRequest } from './client'

export function listPatrimonio(token, usuarioId) {
  return apiRequest(`/usuario/${usuarioId}/patrimonio`, { token })
}

export function createInvestimento(token, usuarioId, payload) {
  return apiRequest(`/usuario/${usuarioId}/patrimonio`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  })
}

export function updateInvestimento(token, usuarioId, investimentoId, payload) {
  return apiRequest(`/usuario/${usuarioId}/patrimonio/${investimentoId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload),
  })
}

export function deleteInvestimento(token, usuarioId, investimentoId) {
  return apiRequest(`/usuario/${usuarioId}/patrimonio/${investimentoId}`, {
    method: 'DELETE',
    token,
  })
}

export function getResumoPatrimonio(token, usuarioId) {
  return apiRequest(`/usuario/${usuarioId}/patrimonio/resumo`, { token })
}
