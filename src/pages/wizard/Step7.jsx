import React, { useState } from 'react'
import { CheckCircle, Clock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const t = {
  en: {
    previewSubmit: 'Preview & Submit',
    summary: 'Application Summary',
    declaration: 'I declare that all information provided is accurate and complete',
    submit: 'Submit Application',
    back: 'Back',
    submitted: 'Application Successfully Submitted',
    statusTracking: 'Live Status Tracking',
    notifications: 'Notifications',
    noNewDocuments: 'No additional documents requested at this time'
  },
  bn: {
    previewSubmit: 'পূর্বরূপ ও জমা',
    summary: 'আবেদনের সারসংক্ষেপ',
    declaration: 'আমি ঘোষণা করছি যে প্রদান করা সমস্ত তথ্য নির্ভুল এবং সম্পূর্ণ',
    submit: 'আবেদন জমা দিন',
    back: 'পিছনে',
    submitted: 'আবেদন সফলভাবে জমা দেওয়া হয়েছে',
    statusTracking: 'লাইভ স্ট্যাটাস ট্র্যাকিং',
    notifications: 'বিজ্ঞপ্তি',
    noNewDocuments: 'এই সময়ে কোন অতিরিক্ত ডকুমেন্ট অনুরোধ করা হয়নি'
  }
}

const stages = [
  { en: 'Application Submitted', bn: 'আবেদন জমা দেওয়া হয়েছে' },
  { en: 'e-KYC & CIB Verified', bn: 'ই-কেওয়াইসি এবং সিআইবি যাচাইকৃত' },
  { en: 'Assigned to RO', bn: 'আর.ও নিয়োগ করা হয়েছে' },
  { en: 'Credit Assessment in Progress', bn: 'ঋণ মূল্যায়ন চলছে' },
  { en: 'BDM Approved', bn: 'বিডিএম অনুমোদিত' },
  { en: 'Loan Sanctioned', bn: 'ঋণ মঞ্জুর করা হয়েছে' }
]

export default function Step7({ prev, data, language }) {
  const { updateApplicationStatus } = useAuth()
  const [accepted, setAccepted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [currentStage, setCurrentStage] = useState(1)
  const lang = t[language] || t.en

  const personal = data.personal || {}
  const business = data.business || {}
  const trade = data.trade || {}
  const calc = data.calculator || {}

  const handleSubmit = () => {
    if (!accepted) { alert('Please accept the declaration'); return }
    setSubmitted(true)
    updateApplicationStatus('Submitted')
    let stage = 1
    const interval = setInterval(() => {
      stage += 1
      setCurrentStage(stage)
      if (stage === 2) updateApplicationStatus('eKYC Verified')
      if (stage === 3) updateApplicationStatus('Assigned to RO')
      if (stage === 4) updateApplicationStatus('Credit Review')
      if (stage >= stages.length) {
        updateApplicationStatus('Sanctioned')
        clearInterval(interval)
      }
    }, 2500)
  }

  const summaryRows = [
    ['Applicant', personal.fullName || '—'],
    ['Mobile', data.mobile || '—'],
    ['Business', business.businessName || '—'],
    ['Loan Type', business.loanType || '—'],
    ['Purpose', business.purpose || '—'],
    ['Requested', `৳ ${(business.requested || 0).toLocaleString()}`],
    ['Eligible', `৳ ${(calc.eligibleLoanAmount || 0).toLocaleString()}`],
    ['Tenure', `${business.tenureValue || '—'} ${business.tenureUnit || ''}`],
    ['Entity', trade.entityType || 'PROPRIETORSHIP'],
    ['Branch', trade.nearestBranch || '—'],
    ['Existing Loans', trade.existingLoanFlag ? `${(data.existingLoans || []).length} recorded` : 'None']
  ]

  return (
    <div>
      {!submitted ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-primary">{lang.previewSubmit}</h2>

          <div className="p-4 bg-white rounded-lg border border-gray-200 mb-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">{lang.summary}</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {summaryRows.map(([label, value]) => (
                <div key={label}>
                  <span className="text-gray-600">{label}:</span>{' '}
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="mt-1" />
              <span className="text-sm text-gray-700">{lang.declaration}</span>
            </label>
          </div>

          <div className="flex justify-between">
            <button onClick={prev} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition font-medium">{lang.back}</button>
            <button onClick={handleSubmit} disabled={!accepted} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium disabled:opacity-50">{lang.submit}</button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-primary text-center">{lang.submitted}</h2>

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6">{lang.statusTracking}</h3>
            <div className="space-y-4">
              {stages.map((stage, idx) => {
                const stageNum = idx + 1
                const isCompleted = stageNum <= currentStage
                const isCurrent = stageNum === currentStage
                return (
                  <div key={idx}>
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}`}>
                        {isCompleted ? <CheckCircle className="w-6 h-6" /> : isCurrent ? <Clock className="w-6 h-6 animate-spin" /> : stageNum}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>{stage.en}</div>
                        <div className="text-sm text-gray-600">{stage.bn}</div>
                      </div>
                    </div>
                    {idx < stages.length - 1 && <div className={`ml-5 w-1 h-4 ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}`} />}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">{lang.notifications}</h3>
            {currentStage >= 3 ? (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm text-gray-700">
                <div className="font-medium text-blue-900 mb-1">RO Contact Notice</div>
                <div>প্রিয় গ্রাহক শিঘ্রই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবে।</div>
              </div>
            ) : (
              <div className="text-sm text-gray-600 italic">{lang.noNewDocuments}</div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
