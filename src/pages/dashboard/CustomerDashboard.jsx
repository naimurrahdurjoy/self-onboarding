import React, { useState } from 'react'
import { ArrowRight, Calculator, Eye, FileText, Plus, Search } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { calculateLoanMetrics } from '../../utils/loanCalculator'

export default function CustomerDashboard({ language }) {
  const { user, applicationStatus, loanApplicationData } = useAuth()
  const navigate = useNavigate()
  const [limitVisible, setLimitVisible] = useState(false)
  const text = language === 'bn' ? {
    ready: 'আপনার ব্যবসার জন্য প্রস্তুত?', eligibility: 'ঋণ যোগ্যতা যাচাই করুন', complete: 'আবেদন সম্পূর্ণ করুন', viewEligibility: 'ঋণ যোগ্যতা দেখুন', max: 'সর্বোচ্চ', applications: 'আমার আবেদনসমূহ', noApplications: '📋 আপনার কোন সাম্প্রতিক আবেদন নেই', noActive: 'No active applications found', start: 'নতুন আবেদন শুরু করুন', newApplication: 'নতুন আবেদন', tracker: 'স্ট্যাটাস ট্র্যাকার', calculator: 'ক্যালকুলেটর', documents: 'নথি জমা', track: 'ট্র্যাক করুন'
  } : {
    ready: 'Ready for your business growth?', eligibility: 'Check Loan Eligibility', complete: 'Complete application to estimate limit', viewEligibility: 'View loan eligibility', max: 'Maximum', applications: 'My Applications', noApplications: 'No recent applications', noActive: 'No active applications found', start: 'Start New Loan Application', newApplication: 'New Application', tracker: 'Status Tracker', calculator: 'Calculator', documents: 'Submit Documents', track: 'Track'
  }
  const applications = Array.isArray(user?.applications) ? user.applications : []
  const displayName = user?.name || user?.fullName || 'User'
  const avatar = displayName.trim().charAt(0).toUpperCase() || 'U'
  const greeting = `Dear ${displayName},`
  const currentStatus = applicationStatus === 'Pending eKYC' ? 'Pending eKYC' : applicationStatus
  const business = loanApplicationData?.business || {}
  const hasFinancials = Boolean(loanApplicationData?.business && Object.values(business).some(value => Number(value) > 0))
  const eligibility = hasFinancials
    ? calculateLoanMetrics({ ...business, tenureMonths: business.tenureMonths || (business.tenureValue || 3) * 12 })
    : null

  return <div className="min-h-screen bg-[#f4f7f5] pb-20 text-[#17382b] md:pb-8">
    <main className="mx-auto max-w-6xl space-y-6 px-5 py-7"><div><p className="text-sm text-slate-500">{greeting}</p><h1 className="mt-1 text-2xl font-bold">{text.ready}</h1></div>
      <button onClick={() => hasFinancials && setLimitVisible(value => !value)} className={`flex w-full items-center justify-between rounded-xl bg-[#0b6b45] p-5 text-left text-white shadow-sm ${!hasFinancials ? 'cursor-default' : ''}`}><div><p className="text-sm text-[#c9ead9]">{hasFinancials ? text.eligibility : text.eligibility}</p><p className="mt-1 text-xl font-bold">{hasFinancials ? text.viewEligibility : text.complete}</p>{limitVisible && eligibility && <p className="mt-3 text-2xl font-bold text-[#f6c85f]">{text.max} ৳ {eligibility.eligibleLoanAmount.toLocaleString()}</p>}</div><ArrowRight className={`h-6 w-6 transition ${limitVisible ? 'rotate-90' : ''}`} /></button>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><QuickAction icon={Plus} label={text.newApplication} onClick={() => navigate('/wizard')} /><QuickAction icon={Search} label={text.tracker} onClick={() => document.getElementById('applications')?.scrollIntoView({ behavior: 'smooth' })} /><QuickAction icon={Calculator} label={text.calculator} onClick={() => navigate('/wizard')} /><QuickAction icon={FileText} label={text.documents} onClick={() => navigate('/profile')} /></div>
      <section id="applications"><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">{text.applications}</h2><span className="text-xs text-slate-400">{currentStatus}</span></div>{applications.length === 0 ? <div className="border border-dashed border-[#b8d1c1] bg-white p-8 text-center shadow-sm"><FileText className="mx-auto h-8 w-8 text-[#0b6b45]" /><p className="mt-3 font-bold">{text.noApplications}</p><p className="mt-1 text-sm text-slate-500">{text.noActive}</p><button onClick={() => navigate('/wizard')} className="mt-5 rounded-lg bg-[#0b6b45] px-5 py-3 text-sm font-bold text-white">{text.start}</button></div> : <div className="space-y-3">{applications.map(application => <article key={application.id} className="border border-[#d9e6de] bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold text-slate-400">{application.id || 'Application'}</p><h3 className="mt-1 font-bold">{application.title || application.businessName || 'SME Loan Application'}</h3><p className="mt-2 text-sm text-slate-500">{application.amount || application.requestedAmount || 'Amount pending'} · {application.date || application.createdAt || 'Date pending'}</p></div><span className="rounded-full bg-[#e4effa] px-3 py-1 text-xs font-bold text-[#12609c]">{application.status || 'In Review'}</span></div><button className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0b6b45]"><Eye className="h-4 w-4" /> {text.track}</button></article>)}</div>}</section>
    </main><nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-3 border-t border-slate-200 bg-white p-2 text-center text-[11px] font-bold text-slate-500 md:hidden"><button className="text-[#0b6b45]">⌂<br />{language === 'bn' ? 'হোম' : 'Home'}</button><button onClick={() => navigate('/wizard')}>＋<br />{text.newApplication}</button><button onClick={() => navigate('/profile')}>◯<br />{language === 'bn' ? 'প্রোফাইল' : 'Profile'}</button></nav>
  </div>
}

function QuickAction({ icon: Icon, label, onClick }) {
  return <button onClick={onClick} className="flex min-h-24 flex-col items-center justify-center gap-2 border border-[#d9e6de] bg-white p-3 text-center text-xs font-bold shadow-sm hover:border-[#0b6b45]"><Icon className="h-5 w-5 text-[#0b6b45]" />{label}</button>
}
