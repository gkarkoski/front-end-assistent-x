const API_BASE = '/api'

let onUnauthorized = null

export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler
}

async function parseError(response) {
  try {
    const data = await response.json()
    return data?.error ?? `Erro ${response.status}`
  } catch {
    const text = await response.text()
    return text || `Erro ${response.status}`
  }
}

export async function apiRequest(path, options = {}) {
  const { token, skipAuth = false, ...fetchOptions } = options

  const headers = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers ?? {}),
  }

  if (!skipAuth && token) {
    headers.Authorization = token
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...fetchOptions,
    headers,
  })

  if (response.status === 204) {
    return null
  }

  if (!response.ok) {
    const message = await parseError(response)
    if (response.status === 401 && onUnauthorized) {
      onUnauthorized()
    }
    throw new Error(message)
  }

  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return response.json()
  }

  return null
}
