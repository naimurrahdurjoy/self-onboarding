import React, { useState } from 'react'
import {
  BarChart3, User as UserRound, Briefcase as BriefcaseBusiness, HelpCircle as CircleHelp, BookOpen,
  Check, Mail, Shield as ShieldCheck, Smartphone, FileCheck as FileCheck2, Key as KeyRound, Phone,
  Menu, X, ChevronRight
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const navItems = [
  { key: 'dashboard', icon: BarChart3, path: '/dashboard' },
  { key: 'profile', icon: UserRound, path: '/profile' },
  { key: 'services', icon: BriefcaseBusiness, path: '/wizard' },
  { key: 'faqs', icon: CircleHelp, path: '/dashboard' },
  { key: 'guide', icon: BookOpen, path: '/dashboard' }
]

const copy = {
  bn: {
    dashboard: 'ড্যাশবোর্ড', profile: 'প্রোফাইল', services: 'এসএমই ঋণ সেবাসমূহ', faqs: 'জিজ্ঞাসিত প্রশ্নাবলী', guide: 'নির্দেশিকা / ম্যানুয়াল',
    portal: 'সরকারি সেবা পোর্টাল', verifyButton: '[ প্রোফাইল তথ্য যাচাই ]', statusTitle: 'যাচাইয়ের অবস্থা', mobile: 'মোবাইল নম্বর', email: 'ই-মেইল', nid: 'জাতীয় পরিচয়পত্র', trade: 'ট্রেড লাইসেন্স', verified: 'ভেরিফাইড', pending: 'অপেক্ষমাণ', citizen: 'নাগরিক প্রোফাইল', title: 'প্রোফাইল যাচাই', subtitle: 'আপনার পরিচয় ও ব্যবসায়িক তথ্যের নিরাপদ রেকর্ড', accountVerified: '✓ জাতীয় পরিচয়পত্র দ্বারা ভেরিফাইডকৃত অ্যাকাউন্ট', accountPending: '⏳ ভেরিফিকেশন অপেক্ষমাণ', documents: 'ভেরিফাইড ডকুমেন্ট', records: 'সরকারি রেকর্ড থেকে সর্বশেষ তথ্য', lastUpdated: 'সর্বশেষ আপডেট', changeMobile: 'মোবাইল নম্বর পরিবর্তন করুন', changePassword: 'পাসওয়ার্ড পরিবর্তন করুন', waiting: 'আপডেট প্রয়োজন'
  },
  en: {
    dashboard: 'Dashboard', profile: 'Profile', services: 'SME Loan Services', faqs: 'FAQs', guide: 'User Guide',
    portal: 'Government service portal', verifyButton: '[ Verify Profile Information ]', statusTitle: 'Verification Status', mobile: 'Mobile Number', email: 'Email', nid: 'National ID', trade: 'Trade License', verified: 'Verified', pending: 'Pending', citizen: 'Citizen Profile', title: 'Profile Verification', subtitle: 'Secure record of your identity & business details', accountVerified: '✓ National ID verified account', accountPending: '⏳ Verification Pending', documents: 'Verified Documents', records: 'Latest information from government records', lastUpdated: 'Last Updated', changeMobile: 'Change Mobile Number', changePassword: 'Change Password', waiting: 'Pending —'
  }
}

export default function Profile({ language = 'bn' }) {
  const { user, eKYCStatus } = useAuth()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const text = copy[language] || copy.bn
  const isEkycVerified = Boolean(user?.verificationStatus === 'verified' || user?.isEkycVerified || user?.eKYCVerified || eKYCStatus === 'verified')
  const isNidVerified = user?.isNidVerified === undefined ? isEkycVerified : user.isNidVerified === true
  const isTradeLicenseVerified = Boolean(user?.isTradeLicenseVerified)
  const isVerified = isEkycVerified
  const documents = [
    [text.nid, isNidVerified ? text.verified : text.pending, isNidVerified ? '৯৮%' : '—', isNidVerified ? '১৫ আগস্ট ২০২৬' : text.waiting, isNidVerified],
    [text.trade, isTradeLicenseVerified ? text.verified : text.pending, isTradeLicenseVerified ? '৯৫%' : '—', isTradeLicenseVerified ? '১৫ আগস্ট ২০২৬' : text.waiting, isTradeLicenseVerified],
    [text.mobile, text.verified, '১০০%', '০১ আগস্ট ২০২৬', true],
    [text.email, text.pending, '—', text.waiting, false]
  ]
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
            <p className="mt-1 text-sm text-slate-500">{text.portal}</p>
          </div>
          <button className="md:hidden" onClick={() => setDrawerOpen(false)} aria-label="মেনু বন্ধ করুন"><X /></button>
        </div>
        <nav className="space-y-1">
          {navItems.map(({ key, icon: Icon, path }) => {
            const active = path === '/profile'
            return <button key={key} onClick={() => go(path)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold transition ${active ? 'bg-[#e4f4ec] text-[#08683f]' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Icon className="h-5 w-5" /> <span>{text[key]}</span>{active && <ChevronRight className="ml-auto h-4 w-4" />}
            </button>
          })}
        </nav>
        <div className="mt-10 border-t border-slate-100 pt-7">
          <button onClick={() => go('/wizard')} className="mb-6 w-full rounded-full border-2 border-[#0b6b45] px-4 py-2 text-sm font-bold text-[#0b6b45] hover:bg-[#e4f4ec]">{text.verifyButton}</button>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">{text.statusTitle}</p>
          <div className="space-y-3 text-sm">
            <Status label={text.mobile} verified text={text.verified} pending={text.pending} />
            <Status label={text.email} verified={Boolean(user?.isEmailVerified)} text={text.verified} pending={text.pending} />
            <Status label={text.nid} verified={isNidVerified} text={text.verified} pending={text.pending} />
            <Status label={text.trade} verified={isTradeLicenseVerified} text={text.verified} pending={text.pending} />
          </div>
        </div>
      </aside>
      <main className="mx-auto max-w-6xl px-5 py-8 md:ml-72 md:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div><p className="mb-2 text-sm font-semibold text-[#0b6b45]">{text.citizen} / ০১</p><h1 className="text-3xl font-bold tracking-tight text-[#163b2d]">{text.title}</h1><p className="mt-2 text-sm text-slate-500">{text.subtitle}</p></div>
          <span className="hidden rounded-full bg-[#e4f4ec] px-4 py-2 text-sm font-bold text-[#08683f] sm:block">{isVerified ? '● যাচাই সম্পন্ন' : '● যাচাই অপেক্ষমাণ'}</span>
        </div>
        <section className="border border-[#d7e5dc] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-7 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dff1e7] text-[#0b6b45]"><UserRound className="h-8 w-8" /></div><div><h2 className="text-xl font-bold">{displayName}</h2><p className="mt-1 text-sm text-slate-500">{mobile}</p><span className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${isNidVerified ? 'bg-[#e4f4ec] text-[#08683f]' : 'bg-amber-100 text-amber-800'}`}><ShieldCheck className="h-4 w-4" /> {isNidVerified ? text.accountVerified : text.accountPending}</span></div></div>
            <div className="flex flex-wrap gap-2"><button className="inline-flex items-center gap-2 border border-slate-200 px-3 py-2 text-xs font-bold hover:border-[#0b6b45]"><Phone className="h-4 w-4" /> {text.changeMobile}</button><button className="inline-flex items-center gap-2 border border-slate-200 px-3 py-2 text-xs font-bold hover:border-[#0b6b45]"><KeyRound className="h-4 w-4" /> {text.changePassword}</button></div>
          </div>
          <div className="pt-7"><div className="mb-5 flex items-center justify-between"><div><h3 className="text-lg font-bold">{text.documents}</h3><p className="mt-1 text-sm text-slate-500">{text.records}</p></div><FileCheck2 className="h-6 w-6 text-[#0b6b45]" /></div><div className="divide-y divide-slate-100 border-y border-slate-100">{documents.map(([label, status, confidence, date, verified]) => <div key={label} className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8"><div className="flex items-center gap-3">{label === text.mobile ? <Smartphone className="h-5 w-5 text-slate-400" /> : label === text.email ? <Mail className="h-5 w-5 text-slate-400" /> : <FileCheck2 className="h-5 w-5 text-slate-400" />}<span className="font-semibold">{label}</span></div><span className={`text-sm font-bold ${verified ? 'text-[#087447]' : 'text-slate-400'}`}>{verified && <Check className="mr-1 inline h-4 w-4" />}{status} · {confidence}</span><span className="text-xs text-slate-400 sm:text-right">{text.lastUpdated}<br />{date}</span></div>)}</div></div>
        </section>
      </main>
    </div>
  )
}

function Status({ label, verified = false, text, pending }) {
  return <div className="flex items-center justify-between"><span className="text-slate-600">{label}</span><span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${verified ? 'bg-[#e4f4ec] text-[#087447]' : 'bg-slate-100 text-slate-400'}`}>{verified ? <Check className="h-3 w-3" /> : '⏳'} {verified ? text : pending}</span></div>
}
