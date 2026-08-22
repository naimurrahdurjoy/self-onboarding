import React, { useState, useEffect } from 'react'
import { Briefcase, Building2, FileCheck } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { DEFAULT_INTEREST_RATE } from '../constants/options'
import Step3 from './wizard/Step3'
import Step5 from './wizard/Step5'
import Step7 from './wizard/Step7'

const WIZARD_STEPS = [
  { id: 1, key: 'financials', label: 'Business & Financials' },
  { id: 2, key: 'trade', label: 'Trade & Entity Details' },
  { id: 3, key: 'preview', label: 'Preview & Submit' }
]

const STEP_ICONS = { financials: Briefcase, trade: Building2, preview: FileCheck }
const STEP_LABELS = { financials: 'ব্যবসা ও আর্থিক', trade: 'ট্রেড ও সত্তা বিবরণ', preview: 'পূর্বরূপ ও জমা' }

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
    monthlyIncome: 700000, monthlyExpense: 420000, personalExpense: 20000,
    cash: 200000, stock: 1700000, receivables: 700000, payables: 400000, fixedAssets: 3700000
  },
  trade: {
    operationMode: 'Trading', proposalType: 'NEW', businessName: 'Test Traders',
    entityType: 'PROPRIETORSHIP', businessProduct: 'General Trading',
    startDate: '2020-01-15', employees: 5, ownership: 'Self-Owned (100%)',
    existingLoanFlag: false,
    tradeNumber: '', issueDate: '', expiryDate: '', issueAuthority: '',
    eTin: '', eTinVerified: false, trc: '', bin: '', businessGrowth: 15,
    registeredAddress: '', division: 'Dhaka', district: 'Dhaka', nearestBranch: 'Dhaka Central Main Branch'
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
  const [step, setStep] = useState(1)
  const [data, setData] = useState(getInitialData)
  const [completedTabs, setCompletedTabs] = useState([])

  useEffect(() => {
    if (isAuthenticated && user?.mobile) {
      setData(prev => ({ ...prev, mobile: user.mobile }))
    }
  }, [isAuthenticated, user?.mobile])

  useEffect(() => {
    if (isVerifiedUser) {
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

  useEffect(() => {
    updateLoanApplicationData(data)
  }, [data])

  const lang = language === 'bn' ? 'bn' : 'en'
  const tabs = WIZARD_STEPS

  const mergeData = (section, sectionData) => {
    setData(prev => {
      return section === 'root'
        ? { ...prev, ...sectionData }
        : { ...prev, [section]: { ...prev[section], ...sectionData } }
    })
  }

  const next = (targetStep) => {
    if (!completedTabs.includes(step)) {
      setCompletedTabs(prev => [...prev, step])
    }
    setStep(s => typeof targetStep === 'number' ? targetStep : Math.min(s + 1, 3))
  }

  const prev = () => {
    if (step > 1) {
      setStep(s => Math.max(s - 1, 1))
    }
  }

  const goToTab = (tabId) => {
    setStep(tabId)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {tabs.map(tab => {
              const Icon = STEP_ICONS[tab.key]
              const isActive = step === tab.id
              const isCompleted = completedTabs.includes(tab.id)

              return (
                <button
                  key={tab.id}
                  onClick={() => goToTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : isCompleted
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{lang === 'bn' ? STEP_LABELS[tab.key] : tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="border-t pt-6">
          {step === 1 && <Step3 prev={prev} next={next} data={data} setData={mergeData} language={language} isVerifiedUser={isVerifiedUser} />}
          {step === 2 && <Step5 prev={prev} next={next} data={data} setData={mergeData} language={language} />}
          {step === 3 && <Step7 prev={prev} data={data} setData={mergeData} language={language} />}
        </div>
      </div>
    </div>
  )
}
