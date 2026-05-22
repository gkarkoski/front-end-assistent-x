import { apiRequest } from './client'

export function listModelos(token) {
  return apiRequest('/modelo', { token })
}

export function getModelo(token, id) {
  return apiRequest(`/modelo/${id}`, { token })
}

export function listOrigens(token) {
  return apiRequest('/transacoes/origens', { token })
}

export function listTiposInvestimento(token) {
  return apiRequest('/investimento/tipos', { token })
}
