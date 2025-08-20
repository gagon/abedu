import { ReactNode } from 'react'
import TopNav from './TopNav'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      {/* Add top padding to account for fixed navigation */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}

export default Layout
