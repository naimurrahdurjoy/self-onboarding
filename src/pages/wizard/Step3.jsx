import React, { useState } from 'react'
import { DEFAULT_INTEREST_RATE, LOAN_PURPOSES, BANKS, EXISTING_LOAN_TYPES } from '../../constants/options'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import EMIOutcomeModal from '../../components/EMIOutcomeModal'
import FinancialRangeInput from '../../components/FinancialRangeInput'

const t = {
  en: {
    businessFinance: 'Business & Financial Information',
    businessName: 'Business Name',
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
  const form = { interestRate: DEFAULT_INTEREST_RATE, tenureUnit: 'Years', tenureValue: 3, existingLoanFlag: false, ...data.business }
  const lang = t[language] || t.en

  const update = (fields) => setData('business', fields)
  const loans = data.existingLoans?.length ? data.existingLoans : []
  const existingEmiTotal = loans.reduce((sum, loan) => sum + (Number(loan.emi) || 0), 0)

  const tenureMonths = form.tenureUnit === 'Years' ? form.tenureValue * 12 : form.tenureValue

  const handleNext = () => {
    update({ ...form, tenureMonths, existingEmiTotal })
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

  const verifyAndContinue = (documents) => {
    verifyEKYC(documents)
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

        <div className="grid grid-cols-1 gap-4">
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

        <hr className="my-6" />
        <h3 className="text-lg font-semibold text-emerald-900">Existing Banking Loans &amp; Liabilities</h3>
        <div className="flex gap-2">
          {[['Yes', true], ['No', false]].map(([label, value]) => <button key={label} onClick={() => { update({ existingLoanFlag: value }); if (value && !loans.length) setData('existingLoans', [{ id: Date.now(), bank: '', type: 'Term Loan', outstanding: 0, emi: 0 }]); if (!value) setData('existingLoans', []) }} className={`flex-1 rounded-lg py-2 font-medium ${form.existingLoanFlag === value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>{label}</button>)}
        </div>
        {form.existingLoanFlag && <div className="space-y-3">
          {(() => { const loan = loans[0] || { id: 'existing-loan', bank: '', type: 'Term Loan', outstanding: 0, emi: 0 }; const saveLoan = fields => setData('existingLoans', [{ ...loan, ...fields }]); return <div className="rounded-lg border border-gray-200 bg-white p-4"><div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><label className="text-sm font-medium text-gray-700">Bank Name<select value={loan.bank} onChange={event => saveLoan({ bank: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 p-2 font-normal"><option value="">Select bank</option>{BANKS.map(bank => <option key={bank} value={bank}>{bank}</option>)}</select></label><label className="text-sm font-medium text-gray-700">Existing Loan Type<select value={loan.type} onChange={event => saveLoan({ type: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 p-2 font-normal">{EXISTING_LOAN_TYPES.map(type => <option key={type} value={type}>{type}</option>)}</select></label><FinancialRangeInput label="Existing Outstanding (BDT)" value={loan.outstanding} onChange={value => saveLoan({ outstanding: value })} min={0} max={10000000} step={50000} /><FinancialRangeInput label="EMI Amount (BDT)" value={loan.emi} onChange={value => saveLoan({ emi: value })} min={0} max={500000} step={5000} /></div></div> })()}
        </div>}

        <div className="flex justify-between pt-4">
          <button onClick={prev} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition font-medium">{lang.back}</button>
          <button onClick={handleNext} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium">{lang.next}</button>
        </div>
      </div>
      {showOutcome && <EMIOutcomeModal
        data={{ ...data, business: { ...form, existingEmiTotal } }}
        language={language}
        verified={isVerifiedUser || eKYCStatus === 'verified'}
        onContinue={continueToApplication}
        onVerify={verifyAndContinue}
        onSkip={() => { setShowOutcome(false); next(2) }}
        onLater={saveDraft}
        onClose={() => { setShowOutcome(false); next(2) }}
      />}
    </div>
  )
}
