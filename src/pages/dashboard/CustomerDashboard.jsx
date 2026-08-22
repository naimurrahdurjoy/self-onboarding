import React, { useState } from 'react'
import { ArrowRight, Calculator, Eye, FileText, Menu, Plus, Search, X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const applications = [
  { id: 'DS-260815', title: 'Working Capital Loan', amount: '৳ ৫,০০,০০০', date: '১৫ আগস্ট ২০২৬', status: 'Pending eKYC', tone: 'amber' },
  { id: 'DS-260802', title: 'Business Expansion Loan', amount: '৳ ৩,৫০,০০০', date: '০২ আগস্ট ২০২৬', status: 'In Review', tone: 'blue' }
]

export default function CustomerDashboard({ language }) {
  const { user, applicationStatus } = useAuth()
  const navigate = useNavigate()
  const [limitVisible, setLimitVisible] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const greeting = `Dear ${user?.firstName || 'Customer'},`
  const currentStatus = applicationStatus === 'Pending eKYC' ? 'Pending eKYC' : applicationStatus

  return <div className="min-h-screen bg-[#f4f7f5] pb-20 text-[#17382b] md:pb-8">
    {drawerOpen && <><div className="fixed inset-0 z-40 bg-[#102c23]/40 md:hidden" onClick={() => setDrawerOpen(false)} /><aside className="fixed inset-y-0 right-0 z-50 w-72 bg-white p-6 shadow-2xl md:hidden"><div className="flex justify-between"><strong>Disha SME</strong><button onClick={() => setDrawerOpen(false)} aria-label="Close menu"><X /></button></div><div className="mt-8 space-y-2"><button className="w-full border border-slate-200 px-4 py-3 text-left font-semibold">Eng <span className="float-right text-slate-400">বাংলা</span></button><button onClick={() => navigate('/profile')} className="w-full px-4 py-3 text-left font-semibold text-slate-600">Profile & verification</button><button onClick={() => navigate('/wizard')} className="w-full px-4 py-3 text-left font-semibold text-slate-600">Loan services</button></div></aside></>}
    <header className="border-b border-[#d9e6de] bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0b6b45]">Disha SME</p><p className="text-xs text-slate-400">Customer portal</p></div><div className="flex items-center gap-3"><button className="hidden rounded-full border border-slate-200 px-3 py-2 text-xs font-bold sm:block">Eng <span className="mx-1 text-slate-300">|</span> বাংলা</button><button onClick={() => setDrawerOpen(true)} className="rounded-lg border border-slate-200 p-2 md:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></button><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dff1e7] font-bold text-[#0b6b45]">{user?.avatar || 'C'}</div></div></div></header>
    <main className="mx-auto max-w-6xl space-y-6 px-5 py-7"><div><p className="text-sm text-slate-500">{greeting}</p><h1 className="mt-1 text-2xl font-bold">আপনার ব্যবসার জন্য প্রস্তুত?</h1></div>
      <button onClick={() => setLimitVisible(value => !value)} className="flex w-full items-center justify-between rounded-xl bg-[#0b6b45] p-5 text-left text-white shadow-sm"><div><p className="text-sm text-[#c9ead9]">ঋণ যোগ্যতা</p><p className="mt-1 text-xl font-bold">ঋণ যোগ্যতা দেখুন</p>{limitVisible && <p className="mt-3 text-2xl font-bold text-[#f6c85f]">সর্বোচ্চ ৳ ৭,৫০,০০০</p>}</div><ArrowRight className={`h-6 w-6 transition ${limitVisible ? 'rotate-90' : ''}`} /></button>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><QuickAction icon={Plus} label="নতুন আবেদন" onClick={() => navigate('/wizard')} /><QuickAction icon={Search} label="স্ট্যাটাস ট্র্যাকার" onClick={() => document.getElementById('applications')?.scrollIntoView({ behavior: 'smooth' })} /><QuickAction icon={Calculator} label="ক্যালকুলেটর" onClick={() => navigate('/wizard')} /><QuickAction icon={FileText} label="নথি জমা" onClick={() => navigate('/profile')} /></div>
      <section id="applications"><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">আমার আবেদনসমূহ</h2><span className="text-xs text-slate-400">{currentStatus}</span></div><div className="space-y-3">{applications.map(application => <article key={application.id} className="border border-[#d9e6de] bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold text-slate-400">{application.id}</p><h3 className="mt-1 font-bold">{application.title}</h3><p className="mt-2 text-sm text-slate-500">{application.amount} · {application.date}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${application.tone === 'amber' ? 'bg-[#fff4d9] text-[#9a6a00]' : 'bg-[#e4effa] text-[#12609c]'}`}>{application.status}</span></div><button className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0b6b45]"><Eye className="h-4 w-4" /> ট্র্যাক করুন</button></article>)}</div></section>
    </main><nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-3 border-t border-slate-200 bg-white p-2 text-center text-[11px] font-bold text-slate-500 md:hidden"><button className="text-[#0b6b45]">⌂<br />হোম</button><button onClick={() => navigate('/wizard')}>＋<br />নতুন আবেদন</button><button onClick={() => navigate('/profile')}>◯<br />প্রোফাইল</button></nav>
  </div>
}

function QuickAction({ icon: Icon, label, onClick }) {
  return <button onClick={onClick} className="flex min-h-24 flex-col items-center justify-center gap-2 border border-[#d9e6de] bg-white p-3 text-center text-xs font-bold shadow-sm hover:border-[#0b6b45]"><Icon className="h-5 w-5 text-[#0b6b45]" />{label}</button>
}
