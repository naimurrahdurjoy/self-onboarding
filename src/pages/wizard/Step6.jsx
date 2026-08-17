import React from 'react'
import { Plus, Trash2, Upload } from 'lucide-react'
import { BANKS, EXISTING_LOAN_TYPES } from '../../constants/options'

const t = {
  en: {
    existingLoans: 'Existing Banking Loans',
    conditionalNote: 'This section is active because Existing Loan Information is set to Yes.',
    bankName: 'Bank Name',
    loanType: 'Existing Loan Type',
    outstanding: 'Existing Outstanding',
    emi: 'EMI Amount',
    sanctionAdvice: 'Sanction Advice Document Upload',
    statement: 'Transaction Statement Document Upload',
    addMore: 'Add More Option',
    remove: 'Remove',
    back: 'Back',
    next: 'Next'
  },
  bn: {
    existingLoans: 'বিদ্যমান ব্যাংক ঋণ',
    conditionalNote: 'বিদ্যমান ঋণ তথ্য "হ্যাঁ" সেট থাকায় এই সেকশন সক্রিয়।',
    bankName: 'ব্যাংকের নাম',
    loanType: 'বিদ্যমান ঋণের ধরন',
    outstanding: 'বিদ্যমান বকেয়া',
    emi: 'ইএমআই পরিমাণ',
    sanctionAdvice: 'মঞ্জুরি পরামর্শ ডকুমেন্ট',
    statement: 'লেনদেন বিবৃতি ডকুমেন্ট',
    addMore: 'আরও যোগ করুন',
    remove: 'সরান',
    back: 'পিছনে',
    next: 'পরবর্তী'
  }
}

const emptyLoan = () => ({
  id: Date.now(),
  bank: '',
  type: 'Term Loan',
  outstanding: 0,
  emi: 0,
  sanctionFile: null,
  statementFile: null
})

export default function Step6({ prev, next, data, setData, language }) {
  const loans = data.existingLoans?.length ? data.existingLoans : [emptyLoan()]
  const lang = t[language] || t.en

  const setLoans = (updated) => setData('existingLoans', updated)

  const addLoan = () => setLoans([...loans, { ...emptyLoan(), id: Date.now() }])
  const removeLoan = (id) => setLoans(loans.filter(l => l.id !== id))
  const updateLoan = (id, key, value) => setLoans(loans.map(l => l.id === id ? { ...l, [key]: value } : l))

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-primary">{lang.existingLoans}</h2>
      <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg mb-4 border border-blue-200">{lang.conditionalNote}</p>

      <div className="space-y-4">
        {loans.map((loan, idx) => (
          <div key={loan.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-gray-700">Loan Card #{idx + 1}</span>
              {loans.length > 1 && (
                <button onClick={() => removeLoan(loan.id)} className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm">
                  <Trash2 className="w-4 h-4" /> {lang.remove}
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{lang.bankName}</label>
                  <select value={loan.bank} onChange={e => updateLoan(loan.id, 'bank', e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select Bank</option>
                    {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{lang.loanType}</label>
                  <select value={loan.type} onChange={e => updateLoan(loan.id, 'type', e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    {EXISTING_LOAN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{lang.outstanding}</label>
                  <input type="number" value={loan.outstanding} onChange={e => updateLoan(loan.id, 'outstanding', parseFloat(e.target.value) || 0)} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{lang.emi}</label>
                  <input type="number" value={loan.emi} onChange={e => updateLoan(loan.id, 'emi', parseFloat(e.target.value) || 0)} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{lang.sanctionAdvice}</label>
                  <div className="flex flex-col sm:flex-row items-stretch gap-2">
                    <input type="file" accept=".pdf,.jpg,.png" onChange={e => updateLoan(loan.id, 'sanctionFile', e.target.files[0])} className="w-full flex-1 border border-gray-300 p-2 rounded-lg text-sm" />
                    {loan.sanctionFile && <Upload className="w-4 h-4 text-green-600 self-center" />}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{lang.statement}</label>
                  <div className="flex flex-col sm:flex-row items-stretch gap-2">
                    <input type="file" accept=".pdf,.jpg,.png" onChange={e => updateLoan(loan.id, 'statementFile', e.target.files[0])} className="w-full flex-1 border border-gray-300 p-2 rounded-lg text-sm" />
                    {loan.statementFile && <Upload className="w-4 h-4 text-green-600 self-center" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button onClick={addLoan} className="w-full py-2 border-2 border-dashed border-primary text-primary rounded-lg hover:bg-primary hover:bg-opacity-10 transition font-medium flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" /> {lang.addMore}
        </button>

        <div className="flex justify-between pt-4">
          <button onClick={prev} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition font-medium">{lang.back}</button>
          <button onClick={next} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium">{lang.next}</button>
        </div>
      </div>
    </div>
  )
}
