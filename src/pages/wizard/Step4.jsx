import React, { useMemo } from 'react'
import { Info, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { calculateLoanMetrics } from '../../utils/loanCalculator'

const t = {
  en: {
    loanCalculator: 'SME Loan Calculator Engine',
    netWC: 'Net Working Capital',
    netWCFormula: 'Cash + Stock + Receivables − Payables',
    primaryWC: 'Primary Working Capital Eligibility',
    primaryWCFormula: '(Stock + Receivables) × 70%',
    dbr: 'Debt Burden Ratio (DBR %)',
    dbrFormula: 'Total Monthly Debt Payments ÷ Net Monthly Income',
    eligibleLoan: 'Eligible Loan Amount',
    requestedLoan: 'Requested Loan Amount',
    approvedAmount: 'Approved Amount (min of eligible & requested)',
    netIncome: 'Net Monthly Income',
    totalDebt: 'Total Monthly Debt Payments',
    proposedEmi: 'Proposed EMI',
    meetsRequested: 'Meets Requested Amount',
    back: 'Back',
    next: 'Next'
  },
  bn: {
    loanCalculator: 'এসএমই ঋণ ক্যালকুলেটর ইঞ্জিন',
    netWC: 'নেট ওয়ার্কিং ক্যাপিটাল',
    netWCFormula: 'নগদ + স্টক + প্রাপ্য − প্রদেয়',
    primaryWC: 'প্রাথমিক ওয়ার্কিং ক্যাপিটাল যোগ্যতা',
    primaryWCFormula: '(স্টক + প্রাপ্য) × ৭০%',
    dbr: 'ঋণ বোঝা অনুপাত (ডিবিআর %)',
    dbrFormula: 'মোট মাসিক ঋণ পরিশোধ ÷ নেট মাসিক আয়',
    eligibleLoan: 'যোগ্য ঋণ পরিমাণ',
    requestedLoan: 'অনুরোধকৃত ঋণ পরিমাণ',
    approvedAmount: 'অনুমোদিত পরিমাণ',
    netIncome: 'নেট মাসিক আয়',
    totalDebt: 'মোট মাসিক ঋণ পরিশোধ',
    proposedEmi: 'প্রস্তাবিত ইএমআই',
    meetsRequested: 'অনুরোধ পূরণ হয়',
    back: 'পিছনে',
    next: 'পরবর্তী'
  }
}

export default function Step4({ prev, next, data, setData, language }) {
  const lang = t[language] || t.en
  const biz = data.business || {}

  const existingEmiTotal = (data.existingLoans || []).reduce((sum, l) => sum + (l.emi || 0), 0)
  const tenureMonths = biz.tenureMonths || (biz.tenureUnit === 'Years' ? biz.tenureValue * 12 : biz.tenureValue) || 36

  const calcInput = {
    cash: biz.cash,
    stock: biz.stock,
    receivables: biz.receivables,
    payables: biz.payables,
    fixedAssets: biz.fixedAssets,
    monthlyIncome: biz.monthlyIncome,
    monthlyExpense: biz.monthlyExpense,
    personalExpense: biz.personalExpense,
    existingEmiTotal,
    requested: biz.requested,
    interestRate: biz.interestRate,
    tenureMonths
  }

  const out = useMemo(() => calculateLoanMetrics(calcInput), [JSON.stringify(calcInput)])

  const handleNext = () => {
    setData('calculator', out)
    next()
  }

  const MetricCard = ({ title, formula, value, suffix = '৳', highlight }) => (
    <div className={`p-4 rounded-lg border shadow-sm ${highlight ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <Info className="w-4 h-4 text-gray-400" title={formula} />
      </div>
      <p className="text-xs text-gray-500 mb-2">{formula}</p>
      <div className={`text-2xl font-bold ${highlight ? 'text-green-600' : 'text-primary'}`}>
        {suffix === '৳' ? `৳ ${value.toLocaleString()}` : `${value}${suffix}`}
      </div>
    </div>
  )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-primary">{lang.loanCalculator}</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard title={lang.netWC} formula={lang.netWCFormula} value={out.netWorkingCapital} />
          <MetricCard title={lang.primaryWC} formula={lang.primaryWCFormula} value={out.primaryWCEligibility} />
          <MetricCard title={lang.dbr} formula={lang.dbrFormula} value={out.dbrPercent} suffix="%" />
          <MetricCard title={lang.netIncome} formula="Income − Business Expense − Personal Expense" value={out.netMonthlyIncome} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title={lang.requestedLoan} formula="From Business & Financials" value={biz.requested || 0} />
          <MetricCard title={lang.eligibleLoan} formula="Dynamic computation" value={out.eligibleLoanAmount} highlight />
          <MetricCard title={lang.approvedAmount} formula="min(Eligible, Requested)" value={out.approvedAmount} highlight />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">{lang.totalDebt}</div>
            <div className="text-xl font-bold text-gray-900">৳ {out.totalMonthlyDebt.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">{lang.proposedEmi}</div>
            <div className="text-xl font-bold text-gray-900">৳ {out.proposedEmi.toLocaleString()}</div>
          </div>
        </div>

        <div className={`p-4 rounded-lg flex items-center gap-3 ${out.meetsRequested ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
          {out.meetsRequested ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          )}
          <div>
            <p className="font-medium text-gray-800">{lang.meetsRequested}</p>
            <p className="text-sm text-gray-600">
              {out.meetsRequested
                ? 'Eligible amount meets or exceeds requested loan.'
                : `Eligible ৳${out.eligibleLoanAmount.toLocaleString()} is below requested ৳${(biz.requested || 0).toLocaleString()}.`}
            </p>
          </div>
          <TrendingUp className="w-5 h-5 text-primary ml-auto" />
        </div>

        <div className="flex justify-between pt-4">
          <button onClick={prev} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition font-medium">{lang.back}</button>
          <button onClick={handleNext} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium">{lang.next}</button>
        </div>
      </div>
    </div>
  )
}
