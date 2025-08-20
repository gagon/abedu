import { User, LoginCredentials, RegisterData } from '@/types/auth'

// Simple hash function for passwords (for demo purposes only)
const simpleHash = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'school-platform-salt')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Local storage keys
const USERS_KEY = 'school-platform-users'
const CURRENT_USER_KEY = 'school-platform-current-user'

class AuthService {
  // Get all users from localStorage
  private getUsers(): Array<User & { password: string }> {
    const usersJson = localStorage.getItem(USERS_KEY)
    return usersJson ? JSON.parse(usersJson) : []
  }

  // Save users to localStorage
  private saveUsers(users: Array<User & { password: string }>): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Register new user
  async register(data: RegisterData): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const users = this.getUsers()
      
      // Check if user already exists
      const existingUser = users.find(user => user.email.toLowerCase() === data.email.toLowerCase())
      if (existingUser) {
        return { success: false, error: 'An account with this email already exists' }
      }

      // Hash password
      const hashedPassword = await simpleHash(data.password)
      
      // Create new user
      const newUser: User & { password: string } = {
        id: this.generateId(),
        name: data.name.trim(),
        email: data.email.toLowerCase(),
        password: hashedPassword,
        createdAt: new Date().toISOString()
      }

      // Save user
      users.push(newUser)
      this.saveUsers(users)

      // Return user without password
      const { password, ...userWithoutPassword } = newUser
      return { success: true, user: userWithoutPassword }
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' }
    }
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const users = this.getUsers()
      const hashedPassword = await simpleHash(credentials.password)
      
      // Find user
      const user = users.find(u => 
        u.email.toLowerCase() === credentials.email.toLowerCase() && 
        u.password === hashedPassword
      )

      if (!user) {
        return { success: false, error: 'Invalid email or password' }
      }

      // Save current user session
      const { password, ...userWithoutPassword } = user
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
      
      return { success: true, user: userWithoutPassword }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' }
    }
  }

  // Logout user
  logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  // Get current user
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(CURRENT_USER_KEY)
    return userJson ? JSON.parse(userJson) : null
  }

  // Update user profile
  async updateProfile(userId: string, data: Partial<User>): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const users = this.getUsers()
      const userIndex = users.findIndex(u => u.id === userId)
      
      if (userIndex === -1) {
        return { success: false, error: 'User not found' }
      }

      // Check if email is already taken by another user
      if (data.email) {
        const emailExists = users.find(u => 
          u.id !== userId && 
          u.email.toLowerCase() === data.email.toLowerCase()
        )
        if (emailExists) {
          return { success: false, error: 'This email is already taken' }
        }
      }

      // Update user
      const updatedUser = {
        ...users[userIndex],
        ...data,
        email: data.email ? data.email.toLowerCase() : users[userIndex].email,
        name: data.name ? data.name.trim() : users[userIndex].name
      }
      
      users[userIndex] = updatedUser
      this.saveUsers(users)

      // Update current user session
      const { password, ...userWithoutPassword } = updatedUser
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
      
      return { success: true, user: userWithoutPassword }
    } catch (error) {
      return { success: false, error: 'Profile update failed. Please try again.' }
    }
  }

  // Change password
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const users = this.getUsers()
      const userIndex = users.findIndex(u => u.id === userId)
      
      if (userIndex === -1) {
        return { success: false, error: 'User not found' }
      }

      // Verify current password
      const currentHashedPassword = await simpleHash(currentPassword)
      if (users[userIndex].password !== currentHashedPassword) {
        return { success: false, error: 'Current password is incorrect' }
      }

      // Hash new password
      const newHashedPassword = await simpleHash(newPassword)
      
      // Update password
      users[userIndex].password = newHashedPassword
      this.saveUsers(users)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Password change failed. Please try again.' }
    }
  }
}

export const authService = new AuthService()
