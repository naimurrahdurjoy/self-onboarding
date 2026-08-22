import React, { useState, useEffect } from 'react'
import {
  UserCheck, Briefcase, Building2, Landmark, FileCheck
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { DEFAULT_INTEREST_RATE } from '../constants/options'
import Step1 from './wizard/Step1'
import Step2 from './wizard/Step2'
import Step3 from './wizard/Step3'
import Step5 from './wizard/Step5'
import Step6 from './wizard/Step6'
import Step7 from './wizard/Step7'

const WIZARD_TABS = [
  { id: 1, key: 'personal', icon: UserCheck, en: 'Personal & eKYC', bn: 'ব্যক্তিগত ও ই-কেওয়াইসি' },
  { id: 2, key: 'business', icon: Briefcase, en: 'Business & Financials', bn: 'ব্যবসা ও আর্থিক' },
  { id: 4, key: 'trade', icon: Building2, en: 'Trade & Entity Details', bn: 'ট্রেড ও সত্তা বিবরণ' },
  { id: 5, key: 'existingLoans', icon: Landmark, en: 'Existing Banking Loans', bn: 'বিদ্যমান ব্যাংক ঋণ' },
  { id: 6, key: 'preview', icon: FileCheck, en: 'Preview & Submit', bn: 'পূর্বরূপ ও জমা' }
]

const defaultData = (mobile) => ({
  mobile: mobile || '',
  personal: {
    fullName: '', dob: '', nid: '', gender: '', father: '', mother: '',
    presentAddress: '', permanentAddress: '', tinNumber: '',
    dedupeStatus: null, cibStatus: null, livenessVerified: false
  },
  business: {
    businessName: 'Test Traders', loanType: 'Secured', purpose: 'Working Capital',
    interestRate: DEFAULT_INTEREST_RATE, requested: 500000,
    tenureValue: 3, tenureUnit: 'Years',
    monthlyIncome: 700000, monthlyExpense: 421000, personalExpense: 20000,
    cash: 200000, stock: 1700000, receivables: 700000, payables: 400000, fixedAssets: 3700000
  },
  trade: {
    operationMode: 'Trading', proposalType: 'NEW', businessName: 'Test Traders',
    entityType: 'PROPRIETORSHIP', businessProduct: 'General Trading',
    startDate: '2020-01-15', employees: 5, ownership: 'Self-Owned (100%)',
    existingLoanFlag: false,
    tradeNumber: '', issueDate: '', expiryDate: '', issueAuthority: '',
    eTin: '', eTinVerified: false, trc: '', bin: '', businessGrowth: 15,
    registeredAddress: '', nearestBranch: 'Dhaka Central'
  },
  existingLoans: [],
  calculator: null
})

export default function Wizard({ language }) {
  const { isAuthenticated, user, userProfile, eKYCStatus, updateLoanApplicationData } = useAuth()
  const isVerifiedUser = Boolean(user?.isEkycVerified || user?.isEKYCVerified || user?.eKYCVerified || user?.nidVerified || eKYCStatus === 'verified')
  const profileData = user?.profileData || userProfile || {}
  const getInitialData = () => {
    const initial = defaultData(isAuthenticated ? user?.mobile : '')
    if (!isVerifiedUser) return initial
    return {
      ...initial,
      personal: {
        ...initial.personal,
        fullName: profileData.fullName || user?.name || '',
        dob: profileData.dateOfBirth || profileData.dob || '',
        nid: profileData.nidNumber || profileData.nid || '',
        gender: profileData.gender || '',
        father: profileData.fatherName || profileData.father || '',
        mother: profileData.motherName || profileData.mother || '',
        presentAddress: profileData.presentAddress || '',
        permanentAddress: profileData.permanentAddress || '',
        tinNumber: profileData.eTINNumber || profileData.eTin || profileData.tinNumber || '',
        dedupeStatus: 'cleared',
        cibStatus: 'cleared',
        livenessVerified: true
      }
    }
  }
  const [step, setStep] = useState(isAuthenticated ? (isVerifiedUser ? 2 : 1) : 0)
  const [data, setData] = useState(getInitialData)
  const [completedTabs, setCompletedTabs] = useState(isVerifiedUser ? [1] : [])

  useEffect(() => {
    if (isAuthenticated && user?.mobile) {
      setData(prev => ({ ...prev, mobile: user.mobile }))
    }
  }, [isAuthenticated, user?.mobile])

  useEffect(() => {
    if (isVerifiedUser) {
      setStep(currentStep => currentStep === 0 || currentStep === 1 ? 2 : currentStep)
      setCompletedTabs(prev => prev.includes(1) ? prev : [1, ...prev])
      setData(prev => ({
        ...prev,
        personal: {
          ...prev.personal,
          fullName: profileData.fullName || user?.name || prev.personal.fullName,
          dob: profileData.dateOfBirth || profileData.dob || prev.personal.dob,
          nid: profileData.nidNumber || profileData.nid || prev.personal.nid,
          father: profileData.fatherName || profileData.father || prev.personal.father,
          mother: profileData.motherName || profileData.mother || prev.personal.mother,
          presentAddress: profileData.presentAddress || prev.personal.presentAddress,
          permanentAddress: profileData.permanentAddress || prev.personal.permanentAddress,
          tinNumber: profileData.eTINNumber || profileData.eTin || profileData.tinNumber || prev.personal.tinNumber,
          dedupeStatus: 'cleared',
          cibStatus: 'cleared',
          livenessVerified: true
        }
      }))
    }
  }, [isVerifiedUser, profileData, user?.name])

  useEffect(() => {
    setData(prev => ({
      ...prev,
      trade: {
        ...prev.trade,
        businessName: prev.business.businessName,
        mobile: prev.mobile
      }
    }))
  }, [data.business.businessName, data.mobile])

  const lang = language === 'bn' ? 'bn' : 'en'
  const tabs = WIZARD_TABS

  const mergeData = (section, sectionData) => {
    setData(prev => {
      const updated = section === 'root'
        ? { ...prev, ...sectionData }
        : { ...prev, [section]: { ...prev[section], ...sectionData } }
      updateLoanApplicationData(updated)
      return updated
    })
  }

  const next = (targetStep) => {
    if (!completedTabs.includes(step)) {
      setCompletedTabs(prev => [...prev, step])
    }
    if (step === 4 && !data.trade.existingLoanFlag) {
      setStep(6)
      return
    }
    setStep(s => targetStep || Math.min(s + 1, 6))
  }

  const prev = () => {
    if (step === 6 && !data.trade.existingLoanFlag) {
      setStep(4)
      return
    }
    if (step > 1 || (step === 1 && !isAuthenticated)) {
      setStep(s => Math.max(s - 1, isAuthenticated ? 1 : 0))
    }
  }

  const goToTab = (tabId) => {
    if (tabId === 5 && !data.trade.existingLoanFlag) return
    setStep(tabId)
  }

  if (!isAuthenticated && step === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Step1 next={() => setStep(1)} data={data} setData={d => mergeData('root', d)} language={language} />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {tabs.map(tab => {
              const Icon = tab.icon
              const isActive = step === tab.id
              const isCompleted = completedTabs.includes(tab.id)
              const isVerifiedPersonalStep = tab.id === 1 && isVerifiedUser
              const isDisabled = tab.id === 5 && !data.trade.existingLoanFlag

              return (
                <button
                  key={tab.id}
                  onClick={() => !isDisabled && goToTab(tab.id)}
                  disabled={isDisabled}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : isCompleted
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : isDisabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{isVerifiedPersonalStep ? (lang === 'bn' ? '✓ প্রোফাইল থেকে যাচাইকৃত' : '✓ Verified from Profile') : (lang === 'bn' ? tab.bn : tab.en)}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="border-t pt-6">
          {step === 1 && (
            <Step2 prev={prev} next={next} data={data} setData={mergeData} language={language} isVerifiedUser={isVerifiedUser} />
          )}
          {step === 2 && (
            <Step3 prev={prev} next={next} data={data} setData={mergeData} language={language} isVerifiedUser={isVerifiedUser} />
          )}
          {step === 4 && (
            <Step5 prev={prev} next={next} data={data} setData={mergeData} language={language} />
          )}
          {step === 5 && data.trade.existingLoanFlag && (
            <Step6 prev={prev} next={next} data={data} setData={mergeData} language={language} />
          )}
          {step === 6 && (
            <Step7 prev={prev} data={data} setData={mergeData} language={language} />
          )}
        </div>
      </div>
    </div>
  )
}
