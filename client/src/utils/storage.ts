const TOKEN_KEY = 'token'

function setTokenKey(token: string): void {
    return localStorage.setItem(TOKEN_KEY, token)
}
function getTokenKey(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}
function removeTokenKey(): void {
  return localStorage.removeItem(TOKEN_KEY)
}

const USER_KEY = 'user'

function setUserKey(user: string): void {
  return localStorage.setItem(USER_KEY, user)
}
function getUserKey(): string | null {
  return localStorage.getItem(USER_KEY)
}
function removeUserKey(): void {
  return localStorage.removeItem(USER_KEY)
}

function removeAuthKeys(): void {
    removeTokenKey()
    removeUserKey()
}

export {
  setTokenKey,
  getTokenKey,
  removeTokenKey,
  setUserKey,
  getUserKey,
  removeUserKey,
  removeAuthKeys
}