const TOKEN_KEY = 'cw_access_token'

export function setAccessToken(token) {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token)
    else sessionStorage.removeItem(TOKEN_KEY)
  } catch {
    // ignore storage errors
  }
}

export function getAccessToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function clearAccessToken() {
  setAccessToken(null)
}
