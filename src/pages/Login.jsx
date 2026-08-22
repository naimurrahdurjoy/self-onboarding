import React, { useState } from 'react'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import logoImage from '../../image/logo.png'

const t = {
  en: {
    userId: 'User ID',
    userIdPlaceholder: 'Mobile Number',
    saveId: 'Save ID',
    password: 'Password',
    otp: 'OTP',
    forgotPassword: 'Forgot Password?',
    login: 'Login',
    register: 'রেজিস্ট্রেশন করুন',
    toggleOTP: 'Use OTP Instead',
    togglePassword: 'Use Password',
    otpInfo: 'Accept any 6-digit code',
    otpError: 'Please enter 6-digit OTP',
    error: 'Invalid credentials'
  },
  bn: {
    userId: 'ইউজার আইডি',
    userIdPlaceholder: 'মোবাইল নম্বর',
    saveId: 'সেভ আইডি',
    password: 'পাসওয়ার্ড',
    otp: 'ওটিপি',
    forgotPassword: 'পাসওয়ার্ড ভুলে গিয়েছেন?',
    login: 'লগইন',
    register: 'রেজিস্ট্রেশন করুন',
    toggleOTP: 'ওটিপি ব্যবহার করুন',
    togglePassword: 'পাসওয়ার্ড ব্যবহার করুন',
    otpInfo: 'যেকোনো ৬ অঙ্কের কোড গ্রহণ করুন',
    otpError: 'অনুগ্রহ করে ৬ অঙ্কের ওটিপি প্রবেশ করুন',
    error: 'অবৈধ প্রমাণপত্র'
  }
}

export default function Login({ language = 'en' }) {
  const lang = t[language] || t.en
  const { login } = useAuth()
  const navigate = useNavigate()
  const [mobile, setMobile] = useState(localStorage.getItem('savedUserId') || '')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [useOTP, setUseOTP] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [saveId, setSaveId] = useState(false)
  const [error, setError] = useState('')

  React.useEffect(() => {
    const handler = (e) => {
      setMobile(e.detail.mobile)
      setPassword(e.detail.password)
      setUseOTP(false)
    }
    window.addEventListener('durjoy-quickfill', handler)
    return () => window.removeEventListener('durjoy-quickfill', handler)
  }, [])

  const handleLogin = () => {
    setError('')
    if (!mobile.trim()) { setError(lang.error); return }
    if (!useOTP && !password.trim()) { setError(lang.error); return }
    if (useOTP && otp.length !== 6) { setError(lang.otpError); return }

    try {
      login(mobile, useOTP ? otp : password)
      if (saveId) localStorage.setItem('savedUserId', mobile)
      navigate('/dashboard')
    } catch {
      setError(lang.error)
    }
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-b from-lightgreen via-white to-lightgreen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-primary opacity-5 rounded-b-3xl" />

      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-5 sm:p-8 relative z-10">
        <div className="flex justify-center mb-8">
          <img
            src={logoImage}
            alt="দুর্জয় Logo"
            className="h-28 w-auto object-contain"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.userId}</label>
          <input
            type="tel"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            placeholder={lang.userIdPlaceholder}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition"
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="saveId"
              checked={saveId}
              onChange={e => setSaveId(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="saveId" className="text-xs text-gray-600 cursor-pointer">{lang.saveId}</label>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-700">
              {useOTP ? lang.otp : lang.password}
            </label>
            <button
              onClick={() => { setUseOTP(!useOTP); setError('') }}
              className="text-xs text-primary hover:underline font-medium"
            >
              {useOTP ? lang.togglePassword : lang.toggleOTP}
            </button>
          </div>
          <div className="relative">
            <input
              type={useOTP ? 'text' : showPassword ? 'text' : 'password'}
              value={useOTP ? otp : password}
              onChange={e => useOTP ? setOtp(e.target.value.slice(0, 6)) : setPassword(e.target.value)}
              placeholder={useOTP ? '000000' : '•••••••'}
              maxLength={useOTP ? 6 : undefined}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition pr-10"
            />
            {!useOTP && (
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-primary"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            )}
          </div>
          {useOTP && (
            <p className="text-xs text-gray-500 mt-1">{lang.otpInfo}</p>
          )}
        </div>

        <div className="mb-6 text-right">
          <button className="text-sm font-medium text-orange-500 hover:text-orange-600">
            {lang.forgotPassword}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition mb-4"
        >
          {lang.login}
        </button>

        <button
          onClick={() => navigate('/register')}
          className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold text-lg hover:bg-green-50 transition"
        >
          {lang.register}
        </button>
      </div>
    </div>
  )
}
