import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Header from './components/Header'
import QuickTestHelper from './components/QuickTestHelper'
import Login from './pages/Login'
import Registration from './pages/Registration'
import UserProfile from './pages/UserProfile'
import Wizard from './pages/Wizard'
import Dashboard from './pages/Dashboard'

function AppContent() {
  const [language, setLanguage] = useState('en')
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-lightgreen flex items-center justify-center">
        <div className="text-2xl font-bold text-primary">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-lightgreen text-gray-800">
      {isAuthenticated && (
        <Header language={language} setLanguage={setLanguage} />
      )}

      <main className={isAuthenticated ? 'p-4' : ''}>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login language={language} />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Registration language={language} />} 
          />

          {/* Protected Routes */}
          <Route 
            path="/profile" 
            element={isAuthenticated ? <UserProfile language={language} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/wizard" 
            element={isAuthenticated ? <Wizard language={language} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard language={language} /> : <Navigate to="/login" />} 
          />

          {/* Root Route */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
          />
        </Routes>
      </main>

      {/* Quick Test Helper */}
      <QuickTestHelper />

      {isAuthenticated && (
        <footer className="p-4 text-center text-sm text-gray-500">
          SME Loan Onboarding Prototype © 2026
        </footer>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
