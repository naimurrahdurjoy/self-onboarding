import React, { useState } from 'react'
import { Eye, Send, FileText, CheckCircle, XCircle, ChevronDown, TrendingUp, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ROView from './dashboard/ROView'
import BDMView from './dashboard/BDMView'
import AdminView from './dashboard/AdminView'

const t = {
  en: {
    clientPortal: 'Dear Customer',
    clientSubtitle: 'Welcome to your personal loan onboarding portal',
    continueWizard: 'Continue Self Onboarding',
    continue:'Continue',
    wizardDescription: 'Complete your loan application',
    applicationTracker: 'Application Status Tracker',
    trackerDescription: 'Live tracking of your loan application',
    status: 'Status',
    submitted: 'Submitted',
    eKYCVerified: 'eKYC Verified',
    assignedToRO: 'Assigned to RO',
    creditReview: 'Credit Review',
    sanctioned: 'Sanctioned',
    notStarted: 'Not Started',
    step: 'Step'
  },
  bn: {
    clientPortal: 'সম্মানিত গ্রাহক',
    clientSubtitle: 'আপনার ব্যক্তিগত ঋণ অনবোর্ডিং পোর্টালে স্বাগতম',
    continueWizard: 'আপনার আবেদন সম্পন্ন করুন',
    continue:'চালিয়ে যান',
    wizardDescription: 'আপনার ঋণ আবেদন সম্পূর্ণ করুন',
    applicationTracker: 'আবেদন ট্র্যাকার',
    trackerDescription: 'আপনার ঋণ আবেদনের স্থিতি দেখুন',
    status: 'স্থিতি',
    submitted: 'জমা দেওয়া হয়েছে',
    eKYCVerified: 'ই-কেওয়াইসি যাচাইকৃত',
    assignedToRO: 'আরও নিয়োজিত',
    creditReview: 'ক্রেডিট পর্যালোচনা',
    sanctioned: 'অনুমোদিত',
    notStarted: 'শুরু হয়নি',
    step: 'ধাপ'
  }
}

export default function Dashboard({ language }) {
  const lang = t[language] || t.en
  const { user, applicationStatus } = useAuth()
  const navigate = useNavigate()
  const [selectedLead, setSelectedLead] = useState(null)

  // Define application steps
  const applicationSteps = [
    { label: lang.submitted, key: 'Submitted' },
    { label: lang.eKYCVerified, key: 'eKYC Verified' },
    { label: lang.assignedToRO, key: 'Assigned to RO' },
    { label: lang.creditReview, key: 'Credit Review' },
    { label: lang.sanctioned, key: 'Sanctioned' }
  ]

  const getStepStatus = (stepKey) => {
    const steps = [lang.notStarted, 'Submitted', 'eKYC Verified', 'Assigned to RO', 'Credit Review', 'Sanctioned']
    const currentIndex = steps.indexOf(applicationStatus)
    const stepIndex = steps.indexOf(stepKey)
    
    if (currentIndex > stepIndex) return 'completed'
    if (currentIndex === stepIndex) return 'in-progress'
    return 'pending'
  }

  if (user?.role === 'Client') {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 overflow-x-hidden">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2 break-words">{lang.clientPortal}</h1>
          <p className="text-gray-600 text-sm sm:text-base break-words">{lang.clientSubtitle}</p>
        </div>

        {/* Quick Action Cards */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch mb-8">
          {/* Wizard Card - Main Action */}
          <div className="w-full bg-white rounded-2xl shadow-lg p-5 sm:p-8 hover:shadow-xl transition cursor-pointer border-2 border-primary border-opacity-20" onClick={() => navigate('/wizard')}>
            <div className="flex items-start justify-between mb-4 gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-1 break-words">{lang.continueWizard}</h3>
                <p className="text-gray-600 text-sm break-words">{lang.wizardDescription}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary text-2xl shrink-0">
                📋
              </div>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition font-bold">
              {lang.continue}
            </button>
          </div>

          {/* Application Tracker Card */}
          <div className="w-full bg-white rounded-2xl shadow-lg p-5 sm:p-8 border-2 border-green-200">
            <div className="flex items-start justify-between mb-6 gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-1 break-words">{lang.applicationTracker}</h3>
                <p className="text-gray-600 text-sm break-words">{lang.trackerDescription}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-primary text-2xl shrink-0">
                ✓
              </div>
            </div>
            <div className="space-y-3">
              {applicationSteps.map((step, idx) => {
                const status = getStepStatus(step.key)
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0 ${
                      status === 'completed' ? 'bg-green-500' :
                      status === 'in-progress' ? 'bg-primary' :
                      'bg-gray-300'
                    }`}>
                      {status === 'completed' ? '✓' : idx + 1}
                    </div>
                    <span className={`font-medium break-words ${
                      status === 'completed' ? 'text-green-600' :
                      status === 'in-progress' ? 'text-primary font-bold' :
                      'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (user?.role === 'RO') return <ROView language={language} selectedLead={selectedLead} setSelectedLead={setSelectedLead} />
  if (user?.role === 'BDM') return <BDMView language={language} selectedLead={selectedLead} setSelectedLead={setSelectedLead} />
  if (user?.role === 'Admin') return <AdminView language={language} />

  return <div className="text-center py-20"><p className="text-xl text-gray-600">Unknown role: {user?.role}</p></div>
}
