import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { API_UNAUTHORIZED_EVENT, AUTH_TOKEN_STORAGE_KEY } from '../services/apiClient'

const TOKEN_STORAGE_KEY = AUTH_TOKEN_STORAGE_KEY
const USER_STORAGE_KEY = 'authUser'

export type AuthUser = Record<string, unknown>

interface AuthState {
  token: string | null
  user: AuthUser | null
}

interface AuthContextValue {
  token: string | null
  user: AuthUser | null
  login: (token: string, user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

const emptyAuthState: AuthState = { token: null, user: null }

function clearStoredAuth() {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
  } catch {
    // Storage can be unavailable in restricted browsing contexts.
  }
}

function restoreAuthState(): AuthState {
  try {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

    const token = storedToken?.trim()
    if (!token) {
      clearStoredAuth()
      return emptyAuthState
    }

    const storedUser = localStorage.getItem(USER_STORAGE_KEY)

    if (!storedUser) {
      return { token, user: null }
    }

    try {
      const parsedUser: unknown = JSON.parse(storedUser)
      if (typeof parsedUser === 'object' && parsedUser !== null && !Array.isArray(parsedUser)) {
        return { token, user: parsedUser as AuthUser }
      }
    } catch {
      // The token remains usable if only the optional profile data is corrupted.
    }

    localStorage.removeItem(USER_STORAGE_KEY)
    return { token, user: null }
  } catch {
    clearStoredAuth()
    return emptyAuthState
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>(restoreAuthState)

  const login = useCallback((newToken: string, newUser: AuthUser) => {
    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, newToken)
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser))
    } catch {
      // Keep the active session available even when persistent storage is unavailable.
    }

    setAuthState({ token: newToken, user: newUser })
  }, [])

  const logout = useCallback(() => {
    clearStoredAuth()
    setAuthState(emptyAuthState)
  }, [])

  useEffect(() => {
    window.addEventListener(API_UNAUTHORIZED_EVENT, logout)

    return () => window.removeEventListener(API_UNAUTHORIZED_EVENT, logout)
  }, [logout])

  const contextValue = useMemo<AuthContextValue>(() => ({
    token: authState.token,
    user: authState.user,
    login,
    logout,
  }), [authState, login, logout])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
