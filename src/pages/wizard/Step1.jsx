import React, { useState } from 'react'
import { Info } from 'lucide-react'

const t = {
  en: {
    registration: 'Registration / Login',
    mobile: 'Mobile Number',
    password: 'Create Password',
    otp: 'OTP Code',
    verifyOtp: 'Verify OTP',
    useOtp: 'Use OTP Instead',
    continue: 'Continue',
    otpInfo: 'Accept any 6-digit code (mock)',
    otpError: 'Enter 6-digit OTP'
  },
  bn: {
    registration: 'নিবন্ধন / লগইন',
    mobile: 'মোবাইল নম্বর',
    password: 'পাসওয়ার্ড তৈরি করুন',
    otp: 'ওটিপি কোড',
    verifyOtp: 'ওটিপি যাচাই করুন',
    useOtp: 'পরিবর্তে ওটিপি ব্যবহার করুন',
    continue: 'চালিয়ে যান',
    otpInfo: 'যেকোনো ৬ অঙ্কের কোড গ্রহণ করুন (মক)',
    otpError: '৬ অঙ্কের ওটিপি প্রবেশ করুন'
  }
}

export default function Step1({ next, data, setData, language }) {
  const [mobile, setMobile] = useState('017')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [usingOtp, setUsingOtp] = useState(false)
  const lang = t[language] || t.en

  const verifyOtp = () => {
    if (otp.length === 6) {
      alert('OTP Accepted (Mock)')
      next()
    } else {
      alert(lang.otpError)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-primary">{lang.registration}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{lang.mobile}</label>
          <input
            type="tel"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="+880..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{lang.password}</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="useOtp"
            checked={usingOtp}
            onChange={e => setUsingOtp(e.target.checked)}
          />
          <label htmlFor="useOtp" className="text-sm text-gray-700">{lang.useOtp}</label>
        </div>

        {usingOtp && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-gray-700">{lang.otp}</label>
              <Info className="w-4 h-4 text-gray-500 cursor-help" title={lang.otpInfo} />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={otp}
                onChange={e => setOtp(e.target.value.slice(0, 6))}
                className="w-full flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength="6"
                placeholder="000000"
              />
              <button
                onClick={verifyOtp}
                className="w-full sm:w-auto bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition font-medium"
              >
                {lang.verifyOtp}
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            onClick={next}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium"
          >
            {lang.continue}
          </button>
        </div>
      </div>
    </div>
  )
}
