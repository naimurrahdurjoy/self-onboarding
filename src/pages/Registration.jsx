import React, { useState } from 'react'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import logoImage from '../../image/logo.png'

const t = {
  en: {
    title: 'Registration',
    name: 'Name',
    mobile: 'Mobile Number',
    email: 'Email Address',
    emailOptional: '(Optional)',
    password: 'Create Password',
    otp: 'OTP Verification Code',
    otpPlaceholder: '000000',
    verifyOtp: 'Verify OTP',
    sendOtp: 'Send OTP',
    completeRegistration: 'Complete Registration',
    backToLogin: 'Back to Login',
    otpInfo: 'Accept any 6-digit code',
    otpError: 'Please enter 6-digit OTP',
    validationError: 'Please fill all required fields',
    otpVerified: 'OTP Verified ✓',
    yourInfo: 'Your Information',
    verifyMobile: 'Verify Mobile OTP',
    success: 'Registration Successful!'
  },
  bn: {
    title: 'রেজিস্ট্রেশন',
    name: 'নাম',
    mobile: 'মোবাইল নম্বর',
    email: 'ইমেইল ঠিকানা',
    emailOptional: '(ঐচ্ছিক)',
    password: 'পাসওয়ার্ড তৈরি করুন',
    otp: 'ওটিপি যাচাই কোড',
    otpPlaceholder: '০০০০০০',
    verifyOtp: 'ওটিপি যাচাই করুন',
    sendOtp: 'ওটিপি পাঠান',
    completeRegistration: 'রেজিস্ট্রেশন সম্পন্ন করুন',
    backToLogin: 'লগইন এ ফিরে যান',
    otpInfo: 'যেকোনো ৬ অঙ্কের কোড গ্রহণ করুন',
    otpError: 'অনুগ্রহ করে ৬ অঙ্কের ওটিপি প্রবেশ করুন',
    validationError: 'অনুগ্রহ করে সমস্ত প্রয়োজনীয় ক্ষেত্র পূরণ করুন',
    otpVerified: 'ওটিপি যাচাই করা হয়েছে ✓',
    yourInfo: 'আপনার তথ্য',
    verifyMobile: 'মোবাইল ওটিপি যাচাই',
    success: 'রেজিস্ট্রেশন সফল!'
  }
}

export default function Registration({ language = 'en' }) {
  const lang = t[language] || t.en
  const { register } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', password: '' })
  const [otp, setOtp] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSendOTP = () => {
    const { name, mobile, password } = formData
    if (!name.trim() || !mobile.trim() || !password.trim()) {
      setError(lang.validationError)
      return
    }
    setError('')
    setStep(2)
  }

  const handleVerifyOTP = () => {
    if (otp.length !== 6) { setError(lang.otpError); return }
    setOtpVerified(true)
    setError('')
    setSuccess(true)
    setTimeout(() => {
      register({ ...formData, role: 'Client', eKYCVerified: false })
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-lightgreen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-5 sm:p-8">
        <div className="flex justify-center mb-6">
          <img src={logoImage} alt="দুর্জয় Logo" className="h-24 w-auto object-contain" />
        </div>

        <h1 className="text-2xl font-bold text-center text-primary mb-1">{lang.title}</h1>
        <p className="text-center text-gray-600 text-sm mb-6">
          {step === 1 ? lang.yourInfo : lang.verifyMobile}
        </p>

        <div className="flex gap-2 mb-6">
          <div className={`flex-1 h-2 rounded-full transition ${step >= 1 ? 'bg-primary' : 'bg-gray-300'}`} />
          <div className={`flex-1 h-2 rounded-full transition ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`} />
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{lang.success}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {step === 1 && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.name}</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.mobile}</label>
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="01700000000" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang.email} <span className="text-xs text-gray-500">{lang.emailOptional}</span>
              </label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.password}</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition pr-10" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-primary">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button onClick={handleSendOTP} className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition mb-4">{lang.sendOtp}</button>
            <button onClick={() => navigate('/login')} className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold text-lg hover:bg-green-50 transition">{lang.backToLogin}</button>
          </>
        )}

        {step === 2 && (
          <>
            {otpVerified && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">{lang.otpVerified}</span>
              </div>
            )}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.otp}</label>
              <input type="text" value={otp} onChange={e => setOtp(e.target.value.slice(0, 6))} placeholder={lang.otpPlaceholder} maxLength="6" disabled={otpVerified} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition text-center text-2xl tracking-widest disabled:bg-gray-100" />
              <p className="text-xs text-gray-500 mt-1">{lang.otpInfo}</p>
            </div>
            {!otpVerified ? (
              <>
                <button onClick={handleVerifyOTP} className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition mb-4">{lang.verifyOtp}</button>
                <button onClick={() => { setStep(1); setOtp(''); setError('') }} className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold text-lg hover:bg-green-50 transition">{lang.backToLogin}</button>
              </>
            ) : (
              <button disabled className="w-full bg-gray-400 text-white py-3 rounded-lg font-bold text-lg cursor-not-allowed">{lang.completeRegistration}</button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
