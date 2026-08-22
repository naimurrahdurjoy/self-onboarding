import React, { useState } from 'react'
import {
  BarChart3, User as UserRound, Briefcase as BriefcaseBusiness, HelpCircle as CircleHelp, BookOpen,
  Check, Mail, Shield as ShieldCheck, Smartphone, FileCheck as FileCheck2, Key as KeyRound, Phone,
  Menu, X, ChevronRight
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'ড্যাশবোর্ড', icon: BarChart3, path: '/dashboard' },
  { label: 'প্রোফাইল', icon: User, path: '/profile' },
  { label: 'এসএমই ঋণ সেবাসমূহ', icon: Briefcase, path: '/wizard' },
  { label: 'জিজ্ঞাসিত প্রশ্নাবলী', icon: HelpCircle, path: '/dashboard' },
  { label: 'নির্দেশিকা / ম্যানুয়াল', icon: BookOpen, path: '/dashboard' }
]

const documents = [
  ['জাতীয় পরিচয়পত্র', 'ভেরিফাইড', '৯৮%', '১৫ আগস্ট ২০২৬', true],
  ['ট্রেড লাইসেন্স', 'ভেরিফাইড', '৯৫%', '১৫ আগস্ট ২০২৬', true],
  ['মোবাইল নম্বর', 'ভেরিফাইড', '১০০%', '০১ আগস্ট ২০২৬', true],
  ['ই-মেইল', 'যাচাই করা হয়নি', '—', 'আপডেট প্রয়োজন', false]
]

export default function Profile({ language = 'bn' }) {
  const { user, eKYCStatus } = useAuth()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isVerified = eKYCStatus === 'verified'
  const displayName = user?.name || 'মোহাম্মদ জাহাঙ্গীর আলম'
  const mobile = user?.mobile || '০১৭০০০০০০০০'

  const go = (path) => {
    setDrawerOpen(false)
    navigate(path)
  }

  return (
    <div className="min-h-screen bg-[#f4f7f5] text-[#18352b]">
      <button className="fixed right-4 top-20 z-30 rounded-lg bg-[#0b6b45] p-3 text-white shadow-lg md:hidden" onClick={() => setDrawerOpen(true)} aria-label="মেনু খুলুন">
        <Menu className="h-5 w-5" />
      </button>
      {drawerOpen && <div className="fixed inset-0 z-40 bg-[#102c23]/40 md:hidden" onClick={() => setDrawerOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-[#d8e4dd] bg-white p-5 transition-transform md:sticky md:top-0 md:float-left md:block md:h-screen md:translate-x-0 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0b6b45]">Disha SME</p>
            <p className="mt-1 text-sm text-slate-500">সরকারি সেবা পোর্টাল</p>
          </div>
          <button className="md:hidden" onClick={() => setDrawerOpen(false)} aria-label="মেনু বন্ধ করুন"><X /></button>
        </div>
        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon, path }) => {
            const active = path === '/profile'
            return <button key={label} onClick={() => go(path)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold transition ${active ? 'bg-[#e4f4ec] text-[#08683f]' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Icon className="h-5 w-5" /> <span>{label}</span>{active && <ChevronRight className="ml-auto h-4 w-4" />}
            </button>
          })}
        </nav>
        <div className="mt-10 border-t border-slate-100 pt-7">
          <button onClick={() => go('/wizard')} className="mb-6 w-full rounded-full border-2 border-[#0b6b45] px-4 py-2 text-sm font-bold text-[#0b6b45] hover:bg-[#e4f4ec]">[ প্রোফাইল তথ্য যাচাই ]</button>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">যাচাইয়ের অবস্থা</p>
          <div className="space-y-3 text-sm">
            <Status label="মোবাইল নম্বর" verified />
            <Status label="ই-মেইল" />
            <Status label="জাতীয় পরিচয়পত্র" verified />
            <Status label="ট্রেড লাইসেন্স" verified />
          </div>
        </div>
      </aside>
      <main className="mx-auto max-w-6xl px-5 py-8 md:ml-72 md:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div><p className="mb-2 text-sm font-semibold text-[#0b6b45]">নাগরিক প্রোফাইল / ০১</p><h1 className="text-3xl font-bold tracking-tight text-[#163b2d]">প্রোফাইল যাচাই</h1><p className="mt-2 text-sm text-slate-500">আপনার পরিচয় ও ব্যবসায়িক তথ্যের নিরাপদ রেকর্ড</p></div>
          <span className="hidden rounded-full bg-[#e4f4ec] px-4 py-2 text-sm font-bold text-[#08683f] sm:block">{isVerified ? '● যাচাই সম্পন্ন' : '● যাচাই অপেক্ষমাণ'}</span>
        </div>
        <section className="border border-[#d7e5dc] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-7 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dff1e7] text-[#0b6b45]"><UserRound className="h-8 w-8" /></div><div><h2 className="text-xl font-bold">{displayName}</h2><p className="mt-1 text-sm text-slate-500">{mobile} · সদস্য desde ২০২৬</p><span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#e4f4ec] px-3 py-1 text-xs font-bold text-[#08683f]"><ShieldCheck className="h-4 w-4" /> ✓ জাতীয় পরিচয়পত্র দ্বারা ভেরিফাইডকৃত অ্যাকাউন্ট</span></div></div>
            <div className="flex flex-wrap gap-2"><button className="inline-flex items-center gap-2 border border-slate-200 px-3 py-2 text-xs font-bold hover:border-[#0b6b45]"><Phone className="h-4 w-4" /> মোবাইল নম্বর পরিবর্তন করুন</button><button className="inline-flex items-center gap-2 border border-slate-200 px-3 py-2 text-xs font-bold hover:border-[#0b6b45]"><KeyRound className="h-4 w-4" /> পাসওয়ার্ড পরিবর্তন করুন</button></div>
          </div>
          <div className="pt-7"><div className="mb-5 flex items-center justify-between"><div><h3 className="text-lg font-bold">ভেরিফাইড ডকুমেন্ট</h3><p className="mt-1 text-sm text-slate-500">সরকারি রেকর্ড থেকে সর্বশেষ তথ্য</p></div><FileCheck2 className="h-6 w-6 text-[#0b6b45]" /></div><div className="divide-y divide-slate-100 border-y border-slate-100">{documents.map(([label, status, confidence, date, verified]) => <div key={label} className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8"><div className="flex items-center gap-3">{label === 'মোবাইল নম্বর' ? <Smartphone className="h-5 w-5 text-slate-400" /> : label === 'ই-মেইল' ? <Mail className="h-5 w-5 text-slate-400" /> : <FileCheck2 className="h-5 w-5 text-slate-400" />}<span className="font-semibold">{label}</span></div><span className={`text-sm font-bold ${verified ? 'text-[#087447]' : 'text-slate-400'}`}>{verified && <Check className="mr-1 inline h-4 w-4" />}{status} · {confidence}</span><span className="text-xs text-slate-400 sm:text-right">সর্বশেষ আপডেট<br />{date}</span></div>)}</div></div>
        </section>
      </main>
    </div>
  )
}

function Status({ label, verified = false }) {
  return <div className="flex items-center justify-between"><span className="text-slate-600">{label}</span><span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${verified ? 'bg-[#e4f4ec] text-[#087447]' : 'bg-slate-100 text-slate-400'}`}>{verified ? <Check className="h-3 w-3" /> : '○'} {verified ? '✓' : 'অপেক্ষমাণ'}</span></div>
}
