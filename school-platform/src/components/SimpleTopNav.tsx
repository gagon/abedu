import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

function SimpleTopNav() {
  const location = useLocation()
  const { user, logout, isAuthenticated } = useAuth()
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/school" className="text-xl font-bold text-blue-600">
            School Platform
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link 
              to="/school" 
              className={`px-3 py-2 text-sm font-medium ${
                location.pathname.startsWith('/school') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              School
            </Link>
            <Link 
              to="/quizzes" 
              className={`px-3 py-2 text-sm font-medium ${
                location.pathname === '/quizzes' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Quizzes
            </Link>
            <Link 
              to="/games" 
              className={`px-3 py-2 text-sm font-medium ${
                location.pathname === '/games' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Games
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {user?.name}
                </span>
                <Link 
                  to="/account" 
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Account
                </Link>
                <button 
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default SimpleTopNav
