import React, { useState, useEffect, useRef } from 'react'
import { Globe, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import logoImage from '../../image/logo.png'

const t = {
  en: { profile: 'Profile', settings: 'Settings', logout: 'Logout' },
  bn: { profile: 'প্রোফাইল', settings: 'সেটিংস', logout: 'লগআউট' }
}

export default function Header({ language, setLanguage }) {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = require('react-router-dom').useLocation()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileMenuRef = useRef(null)
  const lang = t[language] || t.en

  // Determine if current route is login (or other public routes)
  const isAuthRoute = ['/login', '/register'].includes(location.pathname)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    navigate('/login')
  }

  const handleProfileClick = () => {
    navigate('/profile')
    setIsProfileOpen(false)
  }

  const handleSettingsClick = () => {
    setIsProfileOpen(false)
  }

  const handleHomeClick = () => {
    navigate('/dashboard')
  }

  return (
    <header className="w-full max-w-full overflow-visible bg-white border-b-2 border-primary shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between gap-3 overflow-visible">
        <button
          onClick={handleHomeClick}
          className="hover:opacity-90 transition cursor-pointer flex-shrink-0 overflow-hidden"
          title="Home Dashboard"
        >
          <img
            src={logoImage}
            alt="Disha SME Loan Portal"
            className="h-12 sm:h-14 w-auto max-w-[120px] object-contain"
          />
        </button>

        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-600" />
            <button
              type="button"
              onClick={() => setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'))}
              className="border border-gray-300 rounded px-2 py-1 text-sm bg-white text-gray-700 hover:bg-gray-50 transition"
            >
              {language === 'en' ? 'English' : 'বাংলা'}
            </button>
          </div>

          {/* Only show avatar when authenticated and not on auth pages like /login */}
          {isAuthenticated && user && !isAuthRoute && (
            <div ref={profileMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full bg-[#0D5C3A] text-white font-bold flex items-center justify-center cursor-pointer focus:outline-none shadow-sm"
                title="MFS User Profile & eKYC"
              >
                {user.avatar || '2'}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-[9999] overflow-visible">
                  <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                    <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.mobile}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleProfileClick}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>{lang.profile}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSettingsClick}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>{lang.settings}</span>
                  </button>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{lang.logout}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
