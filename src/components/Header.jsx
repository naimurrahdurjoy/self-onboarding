import React, { useState } from 'react'
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
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const lang = t[language] || t.en

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleProfileClick = () => {
    navigate('/profile')
    setShowProfileMenu(false)
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

        <div className="flex items-center gap-2 sm:gap-6 min-w-0">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-600" />
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="en">English</option>
              <option value="bn">বাংলা</option>
            </select>
          </div>

          {isAuthenticated && user && (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm hover:bg-opacity-90 transition"
                title="MFS User Profile & eKYC"
              >
                {user.avatar}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl border border-gray-200 w-48 overflow-hidden z-50">
                  <div className="px-4 py-3 bg-gray-50 border-b">
                    <p className="font-bold text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.mobile}</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition text-left text-gray-700"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">{lang.profile}</span>
                    </button>
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition text-left text-gray-700"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">{lang.settings}</span>
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-100 transition text-left text-red-600 font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">{lang.logout}</span>
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
