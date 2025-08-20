import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import SchoolPage from './pages/SchoolPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import SubjectPage from './pages/SubjectPage'
import ChapterPage from './pages/ChapterPage'
import QuizzesPage from './pages/QuizzesPage'
import GamesPage from './pages/GamesPage'

function App() {
  return (
    <Layout>
      <Routes>
        {/* Root redirect to school */}
        <Route path="/" element={<Navigate to="/school" replace />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        
        {/* School routes */}
        <Route path="/school" element={<SchoolPage />} />
        <Route path="/school/:grade/:subject" element={<SubjectPage />} />
        <Route path="/school/:grade/:subject/:chapter" element={<ChapterPage />} />
        
        {/* Placeholder routes */}
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/games" element={<GamesPage />} />
      </Routes>
    </Layout>
  )
}

export default App
