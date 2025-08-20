import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react'
import { AuthState, AuthContextType, LoginCredentials, RegisterData, User } from '@/types/auth'
import { authService } from '@/services/authService'

// Auth actions
type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true }
    case 'LOGIN_SUCCESS':
      return { user: action.payload, isAuthenticated: true, isLoading: false }
    case 'LOGIN_FAILURE':
      return { user: null, isAuthenticated: false, isLoading: false }
    case 'LOGOUT':
      return { user: null, isAuthenticated: false, isLoading: false }
    case 'UPDATE_USER':
      return { ...state, user: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for existing session on mount
  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: currentUser })
    }
  }, [])

  // Login function
  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'LOGIN_START' })
    
    const result = await authService.login(credentials)
    
    if (result.success && result.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: result.user })
      return { success: true }
    } else {
      dispatch({ type: 'LOGIN_FAILURE' })
      return { success: false, error: result.error }
    }
  }

  // Register function
  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    const result = await authService.register(data)
    
    if (result.success && result.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: result.user })
      return { success: true }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
      return { success: false, error: result.error }
    }
  }

  // Logout function
  const logout = () => {
    authService.logout()
    dispatch({ type: 'LOGOUT' })
  }

  // Update profile function
  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!state.user) {
      return { success: false, error: 'User not logged in' }
    }

    dispatch({ type: 'SET_LOADING', payload: true })
    
    const result = await authService.updateProfile(state.user.id, data)
    
    if (result.success && result.user) {
      dispatch({ type: 'UPDATE_USER', payload: result.user })
      dispatch({ type: 'SET_LOADING', payload: false })
      return { success: true }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
      return { success: false, error: result.error }
    }
  }

  // Change password function
  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!state.user) {
      return { success: false, error: 'User not logged in' }
    }

    dispatch({ type: 'SET_LOADING', payload: true })
    
    const result = await authService.changePassword(state.user.id, currentPassword, newPassword)
    
    dispatch({ type: 'SET_LOADING', payload: false })
    return result
  }

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    changePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
