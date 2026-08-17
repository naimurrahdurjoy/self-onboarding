import React, { useState } from 'react'
import { CheckCircle, XCircle, Eye, FileText, MapPin, TrendingUp, AlertCircle } from 'lucide-react'

const t = {
  en: {
    bdmTitle: 'Business Development Manager Dashboard',
    bdmSubtitle: 'Review credit assessments and make final approval decisions',
    totalLeads: 'Total Leads',
    pendingBdm: 'Pending BDM Review',
    approved: 'Approved',
    rejected: 'Rejected',
    approvalList: 'Credit Approval List',
    applicant: 'Applicant Name',
    business: 'Business Name',
    location: 'Location',
    amount: 'Requested Amount',
    roRecommendation: 'RO Recommendation',
    status: 'Status',
    actions: 'Actions',
    inspect: 'Review',
    pending: 'Pending BDM',
    inspectDetails: 'Credit Assessment & Decision',
    approveLead: 'Approve Loan',
    rejectLead: 'Reject Application',
    assignBranch: 'Assign to Branch',
    selectBranch: 'Select Branch',
    exportApproval: 'Export Approval Letter',
    back: 'Back',
    creditScore: 'Credit Score',
    recommendation: 'RO Recommendation',
    decisionNotes: 'Decision Notes',
    notesInput: 'Enter decision notes...',
    submit: 'Submit Decision',
    close: 'Close',
    eligibleAmount: 'Eligible Loan Amount',
    interestRate: 'Interest Rate',
    tenure: 'Tenure (Months)',
    sanctionLetter: 'Sanction Letter',
    generateLetter: 'Generate & Send Sanction Letter'
  },
  bn: {
    bdmTitle: 'ব্যবসায়িক উন্নয়ন ব্যবস্থাপক ড্যাশবোর্ড',
    bdmSubtitle: 'ক্রেডিট মূল্যায়ন পর্যালোচনা করুন এবং চূড়ান্ত অনুমোদন সিদ্ধান্ত নিন',
    totalLeads: 'মোট লিড',
    pendingBdm: 'বিডিএম পর্যালোচনা অপেক্ষমাণ',
    approved: 'অনুমোদিত',
    rejected: 'প্রত্যাখ্যাত',
    approvalList: 'ক্রেডিট অনুমোদন তালিকা',
    applicant: 'আবেদনকারীর নাম',
    business: 'ব্যবসার নাম',
    location: 'অবস্থান',
    amount: 'অনুরোধকৃত পরিমাণ',
    roRecommendation: 'আরও সুপারিশ',
    status: 'অবস্থা',
    actions: 'পদক্ষেপ',
    inspect: 'পর্যালোচনা করুন',
    pending: 'বিডিএম অপেক্ষমাণ',
    inspectDetails: 'ক্রেডিট মূল্যায়ন ও সিদ্ধান্ত',
    approveLead: 'ঋণ অনুমোদন করুন',
    rejectLead: 'আবেদন প্রত্যাখ্যান করুন',
    assignBranch: 'শাখায় নিয়োগ করুন',
    selectBranch: 'শাখা নির্বাচন করুন',
    exportApproval: 'অনুমোদন চিঠি রপ্তানি করুন',
    back: 'পিছনে',
    creditScore: 'ক্রেডিট স্কোর',
    recommendation: 'আরও সুপারিশ',
    decisionNotes: 'সিদ্ধান্ত নোট',
    notesInput: 'সিদ্ধান্ত নোট লিখুন...',
    submit: 'সিদ্ধান্ত জমা দিন',
    close: 'বন্ধ করুন',
    eligibleAmount: 'যোগ্য ঋণ পরিমাণ',
    interestRate: 'সুদের হার',
    tenure: 'মেয়াদ (মাস)',
    sanctionLetter: 'মঞ্জুরি চিঠি',
    generateLetter: 'মঞ্জুরি চিঠি তৈরি করুন এবং পাঠান'
  }
}

const mockApprovals = [
  {
    id: 1,
    applicant: 'Md. Test User',
    business: 'Test Traders',
    location: 'Dhaka',
    amount: 500000,
    eligible: 425000,
    status: 'Pending BDM',
    roRec: 'Recommended',
    creditScore: 78,
    date: '2026-08-17',
    interestRate: 16.75
  },
  {
    id: 2,
    applicant: 'Fatema Begum',
    business: 'Fashion Hub',
    location: 'Chattogram',
    amount: 750000,
    eligible: 575000,
    status: 'Pending BDM',
    roRec: 'Recommended',
    creditScore: 82,
    date: '2026-08-16',
    interestRate: 16.75
  },
  {
    id: 3,
    applicant: 'Abdul Khan',
    business: 'Tech Solutions',
    location: 'Dhaka',
    amount: 1000000,
    eligible: 700000,
    status: 'Pending BDM',
    roRec: 'Recommended',
    creditScore: 85,
    date: '2026-08-15',
    interestRate: 16.50
  }
]

const branches = ['Dhaka Central', 'Dhaka North', 'Chattogram', 'Rajshahi', 'Khulna', 'Sylhet', 'Rangpur']

export default function BDMView({ language }) {
  const [selectedApproval, setSelectedApproval] = useState(null)
  const [decisionNotes, setDecisionNotes] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')
  const lang = t[language] || t.en

  const handleApprove = () => {
    alert(`Loan approved! Assigned to branch: ${selectedBranch}`)
    setSelectedApproval(null)
    setDecisionNotes('')
    setSelectedBranch('')
  }

  const handleReject = () => {
    if (!decisionNotes) {
      alert('Please enter rejection reason')
      return
    }
    alert(`Application rejected. Reason: ${decisionNotes}`)
    setSelectedApproval(null)
    setDecisionNotes('')
    setSelectedBranch('')
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-primary">{lang.bdmTitle}</h1>
        <p className="text-gray-600">{lang.bdmSubtitle}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md border-l-4 border-purple-600">
          <div className="text-sm text-gray-700 font-medium">{lang.totalLeads}</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">45</div>
          <div className="text-xs text-gray-600 mt-1">This Month</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-md border-l-4 border-red-500">
          <div className="text-sm text-gray-700 font-medium">{lang.pendingBdm}</div>
          <div className="text-3xl font-bold text-red-600 mt-2">8</div>
          <div className="text-xs text-gray-600 mt-1">Awaiting Decision</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="text-sm text-gray-700 font-medium">{lang.approved}</div>
          <div className="text-3xl font-bold text-green-600 mt-2">32</div>
          <div className="text-xs text-gray-600 mt-1">This Month</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-md border-l-4 border-orange-500">
          <div className="text-sm text-gray-700 font-medium">{lang.rejected}</div>
          <div className="text-3xl font-bold text-orange-600 mt-2">5</div>
          <div className="text-xs text-gray-600 mt-1">Rejected</div>
        </div>
      </div>

      {/* Approval List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{lang.approvalList}</h2>
          <p className="text-sm text-gray-600 mt-1">3 applications ready for BDM decision</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.applicant}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.business}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.location}</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">{lang.amount}</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">{lang.roRecommendation}</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">{lang.actions}</th>
              </tr>
            </thead>
            <tbody>
              {mockApprovals.map((approval) => (
                <tr key={approval.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{approval.applicant}</div>
                    <div className="text-xs text-gray-500">ID: {approval.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{approval.business}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{approval.location}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-semibold text-gray-900">৳ {approval.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">৳ {approval.eligible.toLocaleString()} eligible</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      <CheckCircle className="w-4 h-4" />
                      {approval.roRec}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedApproval(approval)}
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

      {/* Approval Details Drawer */}
      {selectedApproval && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full md:w-2xl h-screen overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary to-green-600 text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{lang.inspectDetails}</h3>
                <p className="text-sm text-green-100">{selectedApproval.applicant} - ৳ {selectedApproval.amount.toLocaleString()}</p>
              </div>
              <button
                onClick={() => setSelectedApproval(null)}
                className="text-2xl hover:text-green-200 transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Applicant Overview */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3">Applicant & Business Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-600">Name:</span> <span className="font-medium">{selectedApproval.applicant}</span></div>
                  <div><span className="text-gray-600">Business:</span> <span className="font-medium">{selectedApproval.business}</span></div>
                  <div><span className="text-gray-600">Location:</span> <span className="font-medium">{selectedApproval.location}</span></div>
                  <div><span className="text-gray-600">Requested:</span> <span className="font-medium">৳ {selectedApproval.amount.toLocaleString()}</span></div>
                </div>
              </div>

              {/* Credit Assessment */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-3">{lang.creditScore}</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Score:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{width: `${selectedApproval.creditScore}%`}}></div>
                      </div>
                      <span className="font-bold text-lg">{selectedApproval.creditScore}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{lang.roRecommendation}:</span>
                    <span className="px-3 py-1 bg-green-200 text-green-800 font-bold text-sm rounded-full flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> {selectedApproval.roRec}
                    </span>
                  </div>
                </div>
              </div>

              {/* Loan Terms */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-bold text-gray-900 mb-3">Loan Terms & Conditions</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Requested Amount:</span>
                    <span className="font-medium">৳ {selectedApproval.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">{lang.eligibleAmount}:</span>
                    <span className="font-medium text-green-600">৳ {selectedApproval.eligible.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">{lang.interestRate}:</span>
                    <span className="font-medium">{selectedApproval.interestRate}% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">{lang.tenure}:</span>
                    <span className="font-medium">36-60 months</span>
                  </div>
                </div>
              </div>

              {/* Branch Assignment */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">{lang.assignBranch}</h4>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">{lang.selectBranch}</option>
                  {branches.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Decision Notes */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">{lang.decisionNotes}</h4>
                <textarea
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder={lang.notesInput}
                  rows="4"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              {/* Sanction Letter */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  {lang.sanctionLetter}
                </h4>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium">
                  {lang.generateLetter}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={handleApprove}
                  disabled={!selectedBranch}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-bold flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-5 h-5" />
                  {lang.approveLead}
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-bold flex items-center justify-center gap-2"
                >
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
