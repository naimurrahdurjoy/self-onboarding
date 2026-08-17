import React, { useState } from 'react'
import { Upload, CheckCircle } from 'lucide-react'
import { BRANCHES, OPERATION_MODES, OWNERSHIP_OPTIONS } from '../../constants/options'

const t = {
  en: {
    tradeEntity: 'Trade License & Entity Details',
    operationMode: 'Operation Mode',
    proposalType: 'Proposal Type (Auto-derived from Dedupe)',
    businessName: 'Business Name (Auto from Section C)',
    entityType: 'Type of Entity',
    businessProduct: 'Business Product',
    startDate: 'Business Start Date',
    employees: 'Number of Employees',
    ownership: 'Majority Ownership Status',
    existingLoanFlag: 'Existing Loan Information',
    yes: 'Yes',
    no: 'No',
    tradeLicense: 'Trade License Upload Picture',
    tradeNumber: 'Trade License Number (OCR)',
    issueDate: 'Trade License Issue Date (OCR)',
    expiryDate: 'Trade License Expiry Date (OCR)',
    issueAuthority: 'Trade License Issue Authority (OCR)',
    eTin: 'ETIN',
    eTinVerified: 'ETIN Verified',
    trc: 'TRC (Tax Return Certificate)',
    bin: 'BIN Info',
    businessGrowth: 'Annual Business Growth (%)',
    registeredAddress: 'Registered Address (As per Trade License)',
    mobile: 'Mobile Number (From Profile)',
    nearestBranch: 'Nearest Branch Name',
    scanning: 'Extracting trade license data via OCR...',
    back: 'Back',
    next: 'Next'
  },
  bn: {
    tradeEntity: 'ট্রেড লাইসেন্স ও সত্তা বিবরণ',
    operationMode: 'পরিচালনার মোড',
    proposalType: 'প্রস্তাবের ধরন (ডিডুপ থেকে)',
    businessName: 'ব্যবসার নাম (সেকশন C থেকে)',
    entityType: 'প্রতিষ্ঠানের ধরন',
    businessProduct: 'ব্যবসায়িক পণ্য',
    startDate: 'ব্যবসা শুরুর তারিখ',
    employees: 'কর্মীদের সংখ্যা',
    ownership: 'সংখ্যাগরিষ্ঠ মালিকানা স্ট্যাটাস',
    existingLoanFlag: 'বিদ্যমান ঋণ তথ্য',
    yes: 'হ্যাঁ',
    no: 'না',
    tradeLicense: 'ট্রেড লাইসেন্স ছবি আপলোড',
    tradeNumber: 'ট্রেড লাইসেন্স নম্বর (ওসিআর)',
    issueDate: 'জারির তারিখ (ওসিআর)',
    expiryDate: 'মেয়াদ শেষ (ওসিআর)',
    issueAuthority: 'জারিকারী কর্তৃপক্ষ (ওসিআর)',
    eTin: 'ই-টিআন',
    eTinVerified: 'ই-টিআন যাচাইকৃত',
    trc: 'টিআরসি',
    bin: 'বিআইএন তথ্য',
    businessGrowth: 'বার্ষিক ব্যবসায়িক বৃদ্ধি (%)',
    registeredAddress: 'নিবন্ধিত ঠিকানা (ট্রেড লাইসেন্স অনুযায়ী)',
    mobile: 'মোবাইল নম্বর (প্রোফাইল থেকে)',
    nearestBranch: 'নিকটতম শাখার নাম',
    scanning: 'ওসিআর দিয়ে ট্রেড লাইসেন্স ডেটা নিষ্কাশন...',
    back: 'পিছনে',
    next: 'পরবর্তী'
  }
}

const OCR_TRADE = {
  tradeNumber: 'TL-2020-12345',
  issueDate: '2020-01-01',
  expiryDate: '2030-12-31',
  issueAuthority: 'Dhaka City Corporation',
  eTin: '123-456-789012',
  registeredAddress: 'Shop 45, New Market, Dhaka-1205'
}

export default function Step5({ prev, next, data, setData, language }) {
  const [scanning, setScanning] = useState(false)
  const form = {
    entityType: 'PROPRIETORSHIP',
    proposalType: data.personal?.dedupeStatus === 'cleared' ? 'NEW / SANCTION' : 'PENDING REVIEW',
    businessName: data.business?.businessName || '',
    mobile: data.mobile || '',
    ...data.trade
  }
  const lang = t[language] || t.en

  const update = (fields) => setData('trade', fields)

  const handleTradeUpload = (e) => {
    const f = e.target.files[0]
    if (f) {
      setScanning(true)
      setTimeout(() => {
        setScanning(false)
        update({ ...OCR_TRADE, eTinVerified: true })
      }, 1500)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-primary">{lang.tradeEntity}</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.operationMode}</label>
            <select value={form.operationMode} onChange={e => update({ operationMode: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              {OPERATION_MODES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.proposalType}</label>
            <input value={form.proposalType} readOnly className="w-full border border-gray-300 p-2 rounded-lg bg-blue-50 text-blue-800 font-medium" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.businessName}</label>
            <input value={form.businessName} readOnly className="w-full border border-gray-300 p-2 rounded-lg bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.entityType}</label>
            <input value={form.entityType} readOnly className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100 text-gray-600 font-medium" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.businessProduct}</label>
            <input value={form.businessProduct} onChange={e => update({ businessProduct: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.startDate}</label>
            <input type="date" value={form.startDate} onChange={e => update({ startDate: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.employees}</label>
            <input type="number" value={form.employees} onChange={e => update({ employees: parseInt(e.target.value) || 0 })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.ownership}</label>
            <select value={form.ownership} onChange={e => update({ ownership: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              {OWNERSHIP_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.existingLoanFlag}</label>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => update({ existingLoanFlag: true })}
                className={`flex-1 py-2 rounded-lg font-medium transition ${form.existingLoanFlag ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {lang.yes}
              </button>
              <button
                onClick={() => { update({ existingLoanFlag: false }); setData('existingLoans', []) }}
                className={`flex-1 py-2 rounded-lg font-medium transition ${!form.existingLoanFlag ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {lang.no}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{lang.tradeLicense}</label>
          <div className="flex items-center gap-2">
            <input type="file" accept="image/*,.pdf" onChange={handleTradeUpload} className="flex-1 border border-gray-300 p-2 rounded-lg" />
            <Upload className="w-5 h-5 text-gray-500" />
          </div>
          {scanning && <p className="text-sm text-blue-600 mt-1 animate-pulse">{lang.scanning}</p>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.tradeNumber}</label>
            <input value={form.tradeNumber || ''} onChange={e => update({ tradeNumber: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.issueDate}</label>
            <input type="date" value={form.issueDate || ''} onChange={e => update({ issueDate: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.expiryDate}</label>
            <input type="date" value={form.expiryDate || ''} onChange={e => update({ expiryDate: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.issueAuthority}</label>
            <input value={form.issueAuthority || ''} onChange={e => update({ issueAuthority: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.eTin}</label>
            <div className="flex gap-2">
              <input value={form.eTin || ''} onChange={e => update({ eTin: e.target.value })} className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              {form.eTinVerified && (
                <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium whitespace-nowrap">
                  <CheckCircle className="w-3 h-3" /> {lang.eTinVerified}
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.trc}</label>
            <input value={form.trc || ''} onChange={e => update({ trc: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.bin}</label>
            <input value={form.bin || ''} onChange={e => update({ bin: e.target.value })} placeholder="BIN or upload" className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.businessGrowth}</label>
            <input type="number" value={form.businessGrowth} onChange={e => update({ businessGrowth: parseFloat(e.target.value) || 0 })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{lang.registeredAddress}</label>
          <textarea value={form.registeredAddress || ''} onChange={e => update({ registeredAddress: e.target.value })} rows={2} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.mobile}</label>
            <input value={form.mobile} readOnly className="w-full border border-gray-300 p-2 rounded-lg bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.nearestBranch}</label>
            <select value={form.nearestBranch} onChange={e => update({ nearestBranch: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button onClick={prev} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition font-medium">{lang.back}</button>
          <button onClick={next} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium">{lang.next}</button>
        </div>
      </div>
    </div>
  )
}
