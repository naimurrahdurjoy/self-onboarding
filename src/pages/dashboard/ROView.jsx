import React, { useState } from 'react'
import { Send, FileText, CheckCircle, XCircle, ChevronDown, Eye, MessageCircle, TrendingUp, AlertCircle, Smartphone } from 'lucide-react'

const t = {
  en: {
    roTitle: 'Relationship Officer Dashboard',
    roSubtitle: 'Manage SME leads and conduct credit verification',
    totalLeads: 'Total Leads',
    pendingVerification: 'Pending Verification',
    bdmApprovals: 'BDM Approvals Pending',
    totalLoanValue: 'Total Loan Value',
    smeLeads: 'SME Leads Master',
    applicant: 'Applicant Name',
    business: 'Business Name',
    location: 'Location',
    amount: 'Loan Amount',
    status: 'Status',
    actions: 'Actions',
    inspect: 'View Details',
    submitted: 'Submitted',
    inspectLead: 'Lead Details & Credit Review',
    financialInputs: 'Financial Inputs',
    eligibleLoan: 'Eligible Loan Amount',
    sendWelcome: 'Send Welcome Message',
    sendRoNotice: 'Send RO Contact Notice',
    customMessage: 'Send Custom SMS',
    forwardBdm: 'Forward to BDM',
    approveLead: 'Approve for BDM',
    rejectLead: 'Return to Client',
    exportCam: 'Export Credit Assessment',
    messageInput: 'Enter message...',
    send: 'Send',
    close: 'Close',
    smsNotifications: 'SMS Notifications',
    creditAssessment: 'Credit Assessment Details',
    dedupe: 'Dedupe Check',
    passed: 'PASSED',
    cibStatus: 'CIB Status',
    cleared: 'CLEARED',
    loanCalculator: 'Loan Calculator',
    clause1: 'Clause 1 (Stock + Receivable * 70%)',
    clause2: 'Clause 2 (Net Working Capital)',
    clause3: 'Clause 3 (DBR Ratio)',
    clause4: 'Clause 4 (Debt-Equity)',
    clause5: 'Clause 5 (EMI per Lac)'
  },
  bn: {
    roTitle: 'সম্পর্ক কর্মচারী ড্যাশবোর্ড',
    roSubtitle: 'এসএমই লিড পরিচালনা করুন এবং ঋণ যাচাইকরণ পরিচালনা করুন',
    totalLeads: 'মোট লিড',
    pendingVerification: 'যাচাই করা অপেক্ষমাণ',
    bdmApprovals: 'বিডিএম অনুমোদন অপেক্ষমাণ',
    totalLoanValue: 'মোট ঋণ মূল্য',
    smeLeads: 'এসএমই লিড মাস্টার',
    applicant: 'আবেদনকারীর নাম',
    business: 'ব্যবসার নাম',
    location: 'অবস্থান',
    amount: 'ঋণ পরিমাণ',
    status: 'অবস্থা',
    actions: 'পদক্ষেপ',
    inspect: 'বিস্তারিত দেখুন',
    submitted: 'জমা দেওয়া হয়েছে',
    inspectLead: 'লিড বিবরণ ও ঋণ পর্যালোচনা',
    financialInputs: 'আর্থিক ইনপুট',
    eligibleLoan: 'যোগ্য ঋণ পরিমাণ',
    sendWelcome: 'স্বাগত বার্তা পাঠান',
    sendRoNotice: 'আরও যোগাযোগ বিজ্ঞপ্তি পাঠান',
    customMessage: 'কাস্টম এসএমএস পাঠান',
    forwardBdm: 'বিডিএমে ফরোয়ার্ড করুন',
    approveLead: 'বিডিএমের জন্য অনুমোদন করুন',
    rejectLead: 'ক্লায়েন্টে ফেরত করুন',
    exportCam: 'ক্রেডিট মূল্যায়ন রপ্তানি করুন',
    messageInput: 'বার্তা লিখুন...',
    send: 'পাঠান',
    close: 'বন্ধ করুন',
    smsNotifications: 'এসএমএস বিজ্ঞপ্তি',
    creditAssessment: 'ক্রেডিট মূল্যায়ন বিস্তারিত',
    dedupe: 'ডুপ্লিকেট চেক',
    passed: 'সফল',
    cibStatus: 'সিআইবি স্ট্যাটাস',
    cleared: 'মুক্ত',
    loanCalculator: 'ঋণ ক্যালকুলেটর',
    clause1: 'ধারা ১ (স্টক + প্রাপ্যাধিকার * ৭০%)',
    clause2: 'ধারা ২ (নেট কার্যকরী পুঁজি)',
    clause3: 'ধারা ৩ (ডিবিআর অনুপাত)',
    clause4: 'ধারা ৪ (ঋণ-ইক্যুইটি)',
    clause5: 'ধারা ৫ (প্রতি লাকে ইএমআই)'
  }
}

const mockLeads = [
  { 
    id: 1, 
    applicant: 'Md. Test User', 
    business: 'Test Traders',
    location: 'Dhaka',
    amount: 500000, 
    status: 'Submitted', 
    date: '2026-08-17',
    mobile: '01700000001',
    dedupe: 'PASSED',
    cibStatus: 'CLEARED',
    eligibleAmount: 425000
  },
  { 
    id: 2, 
    applicant: 'Fatema Begum', 
    business: 'Fashion Hub',
    location: 'Chattogram',
    amount: 750000, 
    status: 'Submitted', 
    date: '2026-08-16',
    mobile: '01700000005',
    dedupe: 'PASSED',
    cibStatus: 'CLEARED',
    eligibleAmount: 575000
  },
  { 
    id: 3, 
    applicant: 'Abdul Khan', 
    business: 'Tech Solutions',
    location: 'Dhaka',
    amount: 1000000, 
    status: 'Submitted', 
    date: '2026-08-15',
    mobile: '01700000006',
    dedupe: 'PASSED',
    cibStatus: 'CLEARED',
    eligibleAmount: 700000
  },
  { 
    id: 4, 
    applicant: 'Rana Ahmed', 
    business: 'Import Export',
    location: 'Khulna',
    amount: 350000, 
    status: 'Submitted', 
    date: '2026-08-14',
    mobile: '01700000007',
    dedupe: 'PASSED',
    cibStatus: 'CLEARED',
    eligibleAmount: 280000
  },
  { 
    id: 5, 
    applicant: 'Sara Hossain', 
    business: 'Retail Trading',
    location: 'Rajshahi',
    amount: 600000, 
    status: 'Submitted', 
    date: '2026-08-13',
    mobile: '01700000008',
    dedupe: 'PASSED',
    cibStatus: 'CLEARED',
    eligibleAmount: 450000
  }
]

export default function ROView({ language }) {
  const [selectedLead, setSelectedLead] = useState(null)
  const [customMsg, setCustomMsg] = useState('')
  const [smsLog, setSmsLog] = useState([])
  const lang = t[language] || t.en

  const sendSMS = (type, leadId) => {
    let msg = ''
    const lead = mockLeads.find(l => l.id === leadId)
    
    if (type === 'welcome') {
      msg = 'Welcome to Disha SME Loan Portal. Thank you for applying.'
    } else if (type === 'roNotice') {
      msg = 'প্রিয় গ্রাহক শিঘ্রই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবে।'
    } else if (type === 'custom') {
      msg = customMsg
    }

    if (!msg) {
      alert('Please enter a message')
      return
    }

    setSmsLog([...smsLog, {
      timestamp: new Date().toLocaleTimeString(),
      to: lead?.mobile,
      message: msg,
      status: 'Sent'
    }])
    
    alert(`SMS sent to ${lead?.mobile}: ${msg}`)
    setCustomMsg('')
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-primary">{lang.roTitle}</h1>
        <p className="text-gray-600">{lang.roSubtitle}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md border-l-4 border-primary">
          <div className="text-sm text-gray-700 font-medium">{lang.totalLeads}</div>
          <div className="text-3xl font-bold text-primary mt-2">120</div>
          <div className="text-xs text-gray-600 mt-1">This Month</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-md border-l-4 border-yellow-500">
          <div className="text-sm text-gray-700 font-medium">{lang.pendingVerification}</div>
          <div className="text-3xl font-bold text-yellow-600 mt-2">12</div>
          <div className="text-xs text-gray-600 mt-1">Awaiting Review</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="text-sm text-gray-700 font-medium">{lang.bdmApprovals}</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">5</div>
          <div className="text-xs text-gray-600 mt-1">Forwarded</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="text-sm text-gray-700 font-medium">{lang.totalLoanValue}</div>
          <div className="text-2xl font-bold text-green-600 mt-2">৳ 45M</div>
          <div className="text-xs text-gray-600 mt-1">Under Review</div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{lang.smeLeads}</h2>
          <p className="text-sm text-gray-600 mt-1">5 SME applications ready for verification</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.applicant}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.business}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.location}</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">{lang.amount}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.status}</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">{lang.actions}</th>
              </tr>
            </thead>
            <tbody>
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{lead.applicant}</div>
                    <div className="text-xs text-gray-500">{lead.mobile}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{lead.business}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{lead.location}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-semibold text-gray-900">৳ {lead.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Requested</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{lead.status}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-opacity-90 transition"
                    >
                      <Eye className="w-4 h-4" />
                      {lang.inspect}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Details Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full md:w-2xl h-screen overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary to-green-600 text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{lang.inspectLead}</h3>
                <p className="text-sm text-green-100">{selectedLead.applicant} - {selectedLead.business}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-2xl hover:text-green-200 transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Applicant Overview */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3">Applicant Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-600">Name:</span> <span className="font-medium">{selectedLead.applicant}</span></div>
                  <div><span className="text-gray-600">Mobile:</span> <span className="font-medium">{selectedLead.mobile}</span></div>
                  <div><span className="text-gray-600">Business:</span> <span className="font-medium">{selectedLead.business}</span></div>
                  <div><span className="text-gray-600">Location:</span> <span className="font-medium">{selectedLead.location}</span></div>
                </div>
              </div>

              {/* Credit Assessment */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-gray-900 mb-3">{lang.creditAssessment}</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{lang.dedupe}</span>
                    <span className="px-3 py-1 bg-green-200 text-green-800 font-bold text-sm rounded-full flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> {lang.passed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{lang.cibStatus}</span>
                    <span className="px-3 py-1 bg-green-200 text-green-800 font-bold text-sm rounded-full flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> {lang.cleared}
                    </span>
                  </div>
                </div>
              </div>

              {/* Loan Calculator Summary */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-3">{lang.loanCalculator}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Requested Amount:</span> <span className="font-medium">৳ {selectedLead.amount.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>{lang.eligibleLoan}:</span> <span className="font-medium text-green-600">৳ {selectedLead.eligibleAmount.toLocaleString()}</span></div>
                  <div className="mt-3 pt-3 border-t text-xs text-gray-600">
                    <p>• {lang.clause1}: ৳ {(selectedLead.eligibleAmount * 0.7).toLocaleString()}</p>
                    <p>• {lang.clause3}: 2.5x (Acceptable)</p>
                  </div>
                </div>
              </div>

              {/* SMS Notifications */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-amber-600" />
                  {lang.smsNotifications}
                </h4>
                <div className="space-y-3">
                  <button
                    onClick={() => sendSMS('welcome', selectedLead.id)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 font-medium"
                  >
                    <Send className="w-4 h-4" />
                    {lang.sendWelcome}
                  </button>
                  <button
                    onClick={() => sendSMS('roNotice', selectedLead.id)}
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2 font-medium"
                  >
                    <Send className="w-4 h-4" />
                    {lang.sendRoNotice}
                  </button>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customMsg}
                      onChange={(e) => setCustomMsg(e.target.value)}
                      placeholder={lang.messageInput}
                      className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-sm"
                    />
                    <button
                      onClick={() => sendSMS('custom', selectedLead.id)}
                      className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition font-medium"
                    >
                      {lang.send}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition font-bold flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {lang.forwardBdm}
                </button>
                <button className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-bold flex items-center justify-center gap-2">
                  <XCircle className="w-5 h-5" />
                  {lang.rejectLead}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
