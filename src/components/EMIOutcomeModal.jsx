import React, { useState } from 'react'
import { Check, ChevronRight, FileCheck2, X, ShieldCheck } from 'lucide-react'
import { calculateLoanMetrics } from '../utils/loanCalculator'
import EKYCVerificationModal from './eKYCVerificationModal'

const money = value => `৳ ${Math.round(value).toLocaleString()}`

export default function EMIOutcomeModal({ data, language, verified, onContinue, onVerify, onSkip, onLater, onClose }) {
  const business = data.business || {}
  const [amount, setAmount] = useState(business.requested || 500000)
  const [tenure, setTenure] = useState(business.tenureValue || 3)
  const [rate, setRate] = useState(business.interestRate || 16.75)
  const [showGate, setShowGate] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const tenureMonths = tenure * 12
  const metrics = calculateLoanMetrics({ ...business, requested: amount, interestRate: rate, tenureMonths })
  const interest = Math.max(0, metrics.proposedEmi * tenureMonths - metrics.approvedAmount)
  const total = metrics.approvedAmount + interest
  const bn = language === 'bn'

  const confirm = () => {
    if (verified) onContinue({ ...metrics, tenureMonths })
    else setShowGate(true)
  }

  return <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#102c23]/55 p-0 sm:items-center sm:p-5">
    <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
      <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-7"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b6b45]">Disha SME · Outcome</p><h2 className="mt-1 text-2xl font-bold text-[#163b2d]">{bn ? 'আপনার ঋণের সম্ভাব্য ফলাফল' : 'Your loan outcome'}</h2><p className="mt-1 text-sm text-slate-500">{bn ? 'আপনার ব্যবসার তথ্য অনুযায়ী অনুমান' : 'Estimate based on your business information'}</p></div><button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Close"><X /></button></div>
      {!showGate ? <div className="space-y-6 p-5 sm:p-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3"><Slider label={bn ? 'ঋণের পরিমাণ' : 'Loan amount'} value={amount} min={50000} max={3000000} step={25000} onChange={setAmount} format={money} /><Slider label={bn ? 'মেয়াদ (বছর)' : 'Tenure (years)'} value={tenure} min={1} max={7} step={1} onChange={setTenure} format={value => `${value} ${bn ? 'বছর' : 'years'}`} /><Slider label={bn ? 'সুদের হার' : 'Interest rate'} value={rate} min={10} max={25} step={0.25} onChange={setRate} format={value => `${value.toFixed(2)}%`} /></div>
        <div className="rounded-xl bg-[#0b6b45] p-5 text-white"><p className="text-sm text-[#c8ead8]">{bn ? 'আনুমানিক মাসিক কিস্তি' : 'Estimated monthly EMI'}</p><p className="mt-1 text-3xl font-bold">{money(metrics.proposedEmi)} <span className="text-base font-normal text-[#c8ead8]">/ month</span></p><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full bg-[#f6c85f]" style={{ width: `${total ? Math.min(100, metrics.approvedAmount / total * 100) : 0}%` }} /></div><div className="mt-3 flex justify-between text-xs text-[#d3eee0]"><span>Principal {money(metrics.approvedAmount)}</span><span>Interest {money(interest)}</span></div></div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-sm"><span className="text-slate-500">{bn ? 'সুদের হার' : 'Interest rate'}</span><strong>{rate.toFixed(2)}%</strong></div>
        <p className="text-xs leading-5 text-slate-400">{bn ? 'এই ফলাফলটি একটি প্রাথমিক অনুমান। চূড়ান্ত ঋণ অনুমোদন নিয়ন্ত্রক নীতি ও যাচাইয়ের ফলাফলের ওপর নির্ভরশীল।' : 'This is an indicative estimate. Final approval is subject to regulatory policy, document review, and verification.'}</p>
        <button onClick={confirm} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0b6b45] py-3 font-bold text-white hover:bg-[#075a39]">{bn ? 'নিশ্চিত করুন ও এগিয়ে যান' : 'Confirm & Proceed'} <ChevronRight className="h-5 w-5" /></button>
      </div> : showVerification ? <EKYCVerificationModal language={language} onSubmit={onVerify} onSkip={onSkip} onClose={onClose} /> : <Gate language={language} onVerify={() => setShowVerification(true)} onLater={onLater} onBack={() => setShowGate(false)} />}
    </div>
  </div>
}

function Slider({ label, value, min, max, step, onChange, format }) {
  return <label className="block"><span className="mb-2 flex justify-between text-sm font-bold"><span>{label}</span><span className="text-[#0b6b45]">{format(value)}</span></span><input type="range" min={min} max={max} step={step} value={value} onChange={event => onChange(Number(event.target.value))} className="w-full accent-[#0b6b45]" /></label>
}

function Gate({ language, onVerify, onLater, onBack }) {
  const bn = language === 'bn'
  const items = bn ? ['জাতীয় পরিচয়পত্র', 'ট্রেড লাইসেন্স', 'ই-টিন', 'ব্যাংক স্টেটমেন্ট'] : ['NID Card', 'Trade License', 'e-TIN', 'Bank Statements']
  return <div className="p-5 sm:p-7"><div className="mb-6 flex items-start gap-3"><div className="rounded-full bg-[#e4f4ec] p-3 text-[#0b6b45]"><ShieldCheck /></div><div><h2 className="text-xl font-bold">{bn ? 'ভেরিফিকেশন সম্পন্ন করুন' : 'Complete Verification'}</h2><p className="mt-1 text-sm text-slate-500">{bn ? 'আবেদন জমা দিতে নিচের নথিগুলো প্রস্তুত রাখুন।' : 'Keep these documents ready to submit your application.'}</p></div></div><div className="mb-7 space-y-3">{items.map(item => <div key={item} className="flex items-center gap-3 border-b border-slate-100 py-3 text-sm font-semibold"><FileCheck2 className="h-5 w-5 text-[#0b6b45]" />{item}<Check className="ml-auto h-5 w-5 text-[#0b6b45]" /></div>)}</div><div className="space-y-3"><button onClick={onVerify} className="w-full rounded-lg bg-[#0b6b45] py-3 font-bold text-white">{bn ? 'এখনই ই-কেওয়াইসি ভেরিফাই করুন' : 'Verify eKYC now'}</button><button onClick={onLater} className="w-full rounded-lg border border-slate-300 py-3 font-bold text-slate-700">{bn ? 'পরে করবো' : 'I will do this later'}</button><button onClick={onBack} className="w-full py-2 text-sm font-semibold text-slate-500">{bn ? 'ফলাফলে ফিরে যান' : 'Back to outcome'}</button></div></div>
}

