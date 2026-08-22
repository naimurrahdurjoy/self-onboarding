import React, { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

const TEST_ACCOUNTS = [
  { label: 'Fill Registered Client', mobile: '01700000001', password: '123' },
  { label: 'Fill RO Staff', mobile: '01700000002', password: '123' },
  { label: 'Fill BDM Staff', mobile: '01700000003', password: '123' },
  { label: 'Fill Admin', mobile: '01700000004', password: '123' }
]

export default function QuickTestHelper() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const handleQuickFill = (mobile, password) => {
    login(mobile, password)
    if (location.pathname === '/login' || location.pathname === '/register') {
      navigate('/dashboard')
    }
  }

  const handleFillLoginForm = (mobile, password) => {
    window.dispatchEvent(new CustomEvent('durjoy-quickfill', { detail: { mobile, password } }))
    if (location.pathname !== '/login') navigate('/login')
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-opacity-90'
        }`}
        title="Dev Quick-Fill Assistant"
      >
        {isOpen ? <ChevronDown className="w-6 h-6 text-white" /> : <ChevronUp className="w-6 h-6 text-white" />}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-2xl border-2 border-primary w-72 overflow-hidden">
          <div className="bg-primary text-white px-4 py-3 font-bold text-sm">
            Dev Quick-Fill Assistant
          </div>
          <div className="p-3 space-y-2">
            {TEST_ACCOUNTS.map(account => (
              <div key={account.mobile} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-bold text-gray-800 text-sm mb-1">{account.label}</p>
                <p className="text-xs text-gray-600 mb-2">
                  Phone: <span className="font-mono">{account.mobile}</span> | Password: <span className="font-mono">{account.password}</span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleFillLoginForm(account.mobile, account.password)}
                    className="flex-1 bg-white border border-primary text-primary py-1.5 rounded text-xs font-bold hover:bg-green-50 transition"
                  >
                    Fill Form
                  </button>
                  <button
                    onClick={() => handleQuickFill(account.mobile, account.password)}
                    className="flex-1 bg-primary text-white py-1.5 rounded text-xs font-bold hover:bg-opacity-90 transition"
                  >
                    {isAuthenticated ? 'Switch' : 'Login'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
