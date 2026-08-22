import React, { useState } from 'react'
import { DEFAULT_INTEREST_RATE, LOAN_PURPOSES } from '../../constants/options'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import EMIOutcomeModal from '../../components/EMIOutcomeModal'
import FinancialRangeInput from '../../components/FinancialRangeInput'

const t = {
  en: {
    businessFinance: 'Business & Financial Information',
    businessName: 'Business Name',
    loanType: 'Preferred Loan Type',
    purpose: 'Purpose of Loan',
    interestRate: 'Interest Rate (Auto-fetched)',
    requested: 'Requested Loan Amount',
    tenure: 'Tenure',
    months: 'Months',
    years: 'Years',
    monthlyIncome: 'Monthly Income',
    monthlyExpense: 'Monthly Business Expense',
    personalExpense: 'Personal & Family Expense (Monthly)',
    cash: 'Cash in Business',
    stock: 'Stock Amount',
    receivables: 'Receivables',
    payables: 'Payables',
    fixedAssets: 'Fixed Assets',
    back: 'Back',
    next: 'Next'
  },
  bn: {
    businessFinance: 'ব্যবসা ও আর্থিক তথ্য',
    businessName: 'ব্যবসার নাম',
    loanType: 'পছন্দের ঋণের ধরন',
    purpose: 'ঋণের উদ্দেশ্য',
    interestRate: 'সুদের হার (স্বয়ং-আনা)',
    requested: 'অনুরোধকৃত ঋণ পরিমাণ',
    tenure: 'মেয়াদ',
    months: 'মাস',
    years: 'বছর',
    monthlyIncome: 'মাসিক আয়',
    monthlyExpense: 'মাসিক ব্যবসায়িক খরচ',
    personalExpense: 'ব্যক্তিগত ও পারিবারিক খরচ (মাসিক)',
    cash: 'ব্যবসায় নগদ',
    stock: 'স্টক পরিমাণ',
    receivables: 'প্রাপ্য',
    payables: 'প্রদেয়',
    fixedAssets: 'স্থির সম্পদ',
    back: 'পিছনে',
    next: 'পরবর্তী'
  }
}

export default function Step3({ prev, next, data, setData, language, isVerifiedUser = false }) {
  const [showOutcome, setShowOutcome] = useState(false)
  const { eKYCStatus, verifyEKYC, updateApplicationStatus, updateLoanApplicationData } = useAuth()
  const navigate = useNavigate()
  const form = { interestRate: DEFAULT_INTEREST_RATE, tenureUnit: 'Years', tenureValue: 3, ...data.business }
  const lang = t[language] || t.en

  const update = (fields) => setData('business', fields)

  const tenureMonths = form.tenureUnit === 'Years' ? form.tenureValue * 12 : form.tenureValue

  const handleNext = () => {
    update({ ...form, tenureMonths })
    setShowOutcome(true)
  }

  const continueToApplication = (calculator) => {
    setData('calculator', calculator)
    setShowOutcome(false)
    next(2)
  }

  const saveDraft = () => {
    updateApplicationStatus('Pending eKYC')
    updateLoanApplicationData({ ...data, business: form, status: 'Pending eKYC' })
    setShowOutcome(false)
    navigate('/dashboard')
  }

  const verifyAndContinue = () => {
    verifyEKYC()
    setTimeout(() => {
      setShowOutcome(false)
      next(2)
    }, 1600)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-primary">{lang.businessFinance}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{lang.businessName}</label>
          <input
            value={form.businessName}
            onChange={e => update({ businessName: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.loanType}</label>
            <select value={form.loanType} onChange={e => update({ loanType: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="Secured">Secured</option>
              <option value="Unsecured">Unsecured</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.purpose}</label>
            <select value={form.purpose} onChange={e => update({ purpose: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              {LOAN_PURPOSES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.interestRate}</label>
            <input type="number" value={form.interestRate} readOnly className="w-full border border-gray-300 p-2 rounded-lg bg-gray-50 text-gray-600" />
          </div>
          <div>
            <FinancialRangeInput label={lang.requested} value={form.requested} onChange={value => update({ requested: value })} min={50000} max={3000000} step={25000} />
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <FinancialRangeInput label={lang.tenure} value={form.tenureValue} onChange={value => update({ tenureValue: value })} min={1} max={form.tenureUnit === 'Years' ? 7 : 84} step={1} />
              <select value={form.tenureUnit} onChange={e => update({ tenureUnit: e.target.value })} className="w-full sm:w-auto border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Months">{lang.months}</option>
                <option value="Years">{lang.years}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FinancialRangeInput label={lang.monthlyIncome} value={form.monthlyIncome} onChange={value => update({ monthlyIncome: value })} min={10000} max={5000000} step={10000} />
          <FinancialRangeInput label={lang.monthlyExpense} value={form.monthlyExpense} onChange={value => update({ monthlyExpense: value })} min={5000} max={4000000} step={5000} />
          <FinancialRangeInput label={lang.personalExpense} value={form.personalExpense} onChange={value => update({ personalExpense: value })} min={5000} max={1000000} step={5000} />
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">Asset & Working Capital Metrics</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ['cash', lang.cash, 0, 10000000, 50000],
              ['stock', lang.stock, 0, 20000000, 100000],
              ['receivables', lang.receivables, 0, 10000000, 50000],
              ['payables', lang.payables, 0, 10000000, 50000],
              ['fixedAssets', lang.fixedAssets, 0, 50000000, 100000]
            ].map(([key, label, min, max, step]) => <FinancialRangeInput key={key} label={label} value={form[key]} onChange={value => update({ [key]: value })} min={min} max={max} step={step} />)}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button onClick={prev} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition font-medium">{lang.back}</button>
          <button onClick={handleNext} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium">{lang.next}</button>
        </div>
      </div>
      {showOutcome && <EMIOutcomeModal
        data={{ ...data, business: form }}
        language={language}
        verified={isVerifiedUser || eKYCStatus === 'verified'}
        onContinue={continueToApplication}
        onVerify={verifyAndContinue}
        onLater={saveDraft}
        onClose={() => setShowOutcome(false)}
      />}
    </div>
  )
}
