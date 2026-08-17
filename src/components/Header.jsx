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
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileMenuRef = useRef(null)
  const lang = t[language] || t.en

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
    <header className="w-full max-w-full overflow-x-hidden bg-white border-b-2 border-primary shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between gap-3 overflow-x-hidden">
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
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
            >
              <option value="en">English</option>
              <option value="bn">বাংলা</option>
            </select>
          </div>

          {isAuthenticated && user && (
            <div ref={profileMenuRef} className="relative">
              <button
                type="button"
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm hover:bg-opacity-90 transition shadow-sm ring-2 ring-white"
                title="MFS User Profile & eKYC"
              >
                {user.avatar || 'U'}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.mobile}</p>
                  </div>

                  <div className="py-2">
                    <button
                      type="button"
                      onClick={handleProfileClick}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      <User className="w-4 h-4" />
                      <span>{lang.profile}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSettingsClick}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      <Settings className="w-4 h-4" />
                      <span>{lang.settings}</span>
                    </button>

                    <div className="my-2 border-t border-gray-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{lang.logout}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
