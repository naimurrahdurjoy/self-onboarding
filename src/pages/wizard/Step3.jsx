import React from 'react'
import { DEFAULT_INTEREST_RATE, LOAN_PURPOSES } from '../../constants/options'

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

export default function Step3({ prev, next, data, setData, language }) {
  const form = { interestRate: DEFAULT_INTEREST_RATE, tenureUnit: 'Years', tenureValue: 3, ...data.business }
  const lang = t[language] || t.en

  const update = (fields) => setData('business', fields)

  const tenureMonths = form.tenureUnit === 'Years' ? form.tenureValue * 12 : form.tenureValue

  const handleNext = () => {
    update({ ...form, tenureMonths })
    next()
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

        <div className="grid grid-cols-2 gap-4">
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

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.interestRate}</label>
            <input type="number" value={form.interestRate} readOnly className="w-full border border-gray-300 p-2 rounded-lg bg-gray-50 text-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.requested}</label>
            <input type="number" value={form.requested} onChange={e => update({ requested: parseFloat(e.target.value) || 0 })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.tenure}</label>
            <div className="flex gap-2">
              <input type="number" value={form.tenureValue} onChange={e => update({ tenureValue: parseFloat(e.target.value) || 0 })} className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              <select value={form.tenureUnit} onChange={e => update({ tenureUnit: e.target.value })} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Months">{lang.months}</option>
                <option value="Years">{lang.years}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.monthlyIncome}</label>
            <input type="number" value={form.monthlyIncome} onChange={e => update({ monthlyIncome: parseFloat(e.target.value) || 0 })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.monthlyExpense}</label>
            <input type="number" value={form.monthlyExpense} onChange={e => update({ monthlyExpense: parseFloat(e.target.value) || 0 })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.personalExpense}</label>
            <input type="number" value={form.personalExpense} onChange={e => update({ personalExpense: parseFloat(e.target.value) || 0 })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">Asset & Working Capital Metrics</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              ['cash', lang.cash],
              ['stock', lang.stock],
              ['receivables', lang.receivables],
              ['payables', lang.payables],
              ['fixedAssets', lang.fixedAssets]
            ].map(([key, label]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input type="number" value={form[key]} onChange={e => update({ [key]: parseFloat(e.target.value) || 0 })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button onClick={prev} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition font-medium">{lang.back}</button>
          <button onClick={handleNext} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium">{lang.next}</button>
        </div>
      </div>
    </div>
  )
}
