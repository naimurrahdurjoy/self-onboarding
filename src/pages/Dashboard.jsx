import React, { useState } from 'react'
import { Eye, Send, FileText, CheckCircle, XCircle, ChevronDown, TrendingUp, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ROView from './dashboard/ROView'
import BDMView from './dashboard/BDMView'
import AdminView from './dashboard/AdminView'
import CustomerDashboard from './dashboard/CustomerDashboard'

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
    return <CustomerDashboard language={language} />
  }

  if (user?.role === 'RO') return <ROView language={language} selectedLead={selectedLead} setSelectedLead={setSelectedLead} />
  if (user?.role === 'BDM') return <BDMView language={language} selectedLead={selectedLead} setSelectedLead={setSelectedLead} />
  if (user?.role === 'Admin') return <AdminView language={language} />

  return <div className="text-center py-20"><p className="text-xl text-gray-600">Unknown role: {user?.role}</p></div>
}
