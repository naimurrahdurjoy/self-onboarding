import React, { useState } from 'react'
import { CheckCircle, XCircle, Edit, Trash2, Lock, Activity, Shield, Users, AlertCircle, Eye, EyeOff } from 'lucide-react'

const t = {
  en: {
    adminTitle: 'Admin Control Panel',
    adminSubtitle: 'System Administration & User Management',
    userManagement: 'Staff User Management',
    pendingRegistrations: 'Pending Staff Registrations',
    auditLog: 'System Audit Log',
    totalUsers: 'Total Staff Users',
    activeUsers: 'Active Users',
    inactiveUsers: 'Inactive Users',
    totalLogins: 'Total Logins (Today)',
    name: 'Name',
    email: 'Email',
    role: 'Role',
    branch: 'Branch',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    disable: 'Disable',
    enable: 'Enable',
    active: 'Active',
    inactive: 'Inactive',
    suspended: 'Suspended',
    pending: 'Pending',
    approve: 'Approve',
    reject: 'Reject',
    pendingList: 'Pending Staff Registration Requests',
    registrationDate: 'Registration Date',
    approveBtn: 'Approve Registration',
    rejectBtn: 'Reject Registration',
    auditLogTitle: 'System Activity Log',
    timestamp: 'Timestamp',
    user: 'User',
    activity: 'Activity',
    details: 'Details',
    editUser: 'Edit User Information',
    roleLabel: 'Role',
    save: 'Save Changes',
    cancel: 'Cancel',
    securityControl: 'Security Control',
    disableAccount: 'Disable / Suspend Account',
    reason: 'Reason for Suspension',
    close: 'Close',
    viewDetails: 'View Details'
  },
  bn: {
    adminTitle: 'প্রশাসক নিয়ন্ত্রণ প্যানেল',
    adminSubtitle: 'সিস্টেম প্রশাসন ও ব্যবহারকারী ব্যবস্থাপনা',
    userManagement: 'কর্মী ব্যবহারকারী ব্যবস্থাপনা',
    pendingRegistrations: 'কর্মীদের নিবন্ধন অপেক্ষমাণ',
    auditLog: 'সিস্টেম অডিট লগ',
    totalUsers: 'মোট কর্মী ব্যবহারকারী',
    activeUsers: 'সক্রিয় ব্যবহারকারী',
    inactiveUsers: 'নিষ্ক্রিয় ব্যবহারকারী',
    totalLogins: 'মোট লগইন (আজ)',
    name: 'নাম',
    email: 'ইমেইল',
    role: 'ভূমিকা',
    branch: 'শাখা',
    status: 'অবস্থা',
    actions: 'পদক্ষেপ',
    edit: 'সম্পাদনা করুন',
    disable: 'অক্ষম করুন',
    enable: 'সক্ষম করুন',
    active: 'সক্রিয়',
    inactive: 'নিষ্ক্রিয়',
    suspended: 'স্থগিত',
    pending: 'অপেক্ষমাণ',
    approve: 'অনুমোদন করুন',
    reject: 'প্রত্যাখ্যান করুন',
    pendingList: 'অপেক্ষমাণ কর্মী নিবন্ধন অনুরোধ',
    registrationDate: 'নিবন্ধন তারিখ',
    approveBtn: 'নিবন্ধন অনুমোদন করুন',
    rejectBtn: 'নিবন্ধন প্রত্যাখ্যান করুন',
    auditLogTitle: 'সিস্টেম কার্যকলাপ লগ',
    timestamp: 'সময়স্ট্যাম্প',
    user: 'ব্যবহারকারী',
    activity: 'কার্যকলাপ',
    details: 'বিবরণ',
    editUser: 'ব্যবহারকারীর তথ্য সম্পাদনা করুন',
    roleLabel: 'ভূমিকা',
    save: 'পরিবর্তন সংরক্ষণ করুন',
    cancel: 'বাতিল করুন',
    securityControl: 'নিরাপত্তা নিয়ন্ত্রণ',
    disableAccount: 'অ্যাকাউন্ট অক্ষম / স্থগিত করুন',
    reason: 'স্থগিতির কারণ',
    close: 'বন্ধ করুন',
    viewDetails: 'বিবরণ দেখুন'
  }
}

const mockStaff = [
  { id: 1, name: 'Karim Ahmed', email: 'karim@bank.com', role: 'RO', branch: 'Dhaka Central', status: 'Active', joinDate: '2024-01-15' },
  { id: 2, name: 'Nazia Khan', email: 'nazia@bank.com', role: 'BDM', branch: 'Chattogram', status: 'Active', joinDate: '2024-02-20' },
  { id: 3, name: 'Rashed Ali', email: 'rashed@bank.com', role: 'RO', branch: 'Rajshahi', status: 'Inactive', joinDate: '2024-03-10' },
  { id: 4, name: 'Farzana Amin', email: 'farzana@bank.com', role: 'BDM', branch: 'Khulna', status: 'Active', joinDate: '2024-04-05' },
  { id: 5, name: 'Hasan Bhuiyan', email: 'hasan@bank.com', role: 'RO', branch: 'Sylhet', status: 'Active', joinDate: '2024-05-12' }
]

const mockPending = [
  { id: 101, name: 'Soha Rahman', email: 'soha@bank.com', role: 'RO', branch: 'Dhaka North', date: '2026-08-16', phone: '01700001111' },
  { id: 102, name: 'Rahim Hassan', email: 'rahim@bank.com', role: 'BDM', branch: 'Khulna', date: '2026-08-15', phone: '01700001112' }
]

const mockLogs = [
  { id: 1, timestamp: '2026-08-17 14:30', user: 'Karim Ahmed', activity: 'Login', details: 'RO Dashboard accessed from IP 192.168.1.1' },
  { id: 2, timestamp: '2026-08-17 14:15', user: 'Nazia Khan', activity: 'Lead Approved', details: 'Lead ID: 145 approved - ৳ 500,000' },
  { id: 3, timestamp: '2026-08-17 13:45', user: 'Admin', activity: 'User Status Changed', details: 'User Rashed Ali status changed to Inactive' },
  { id: 4, timestamp: '2026-08-17 13:20', user: 'Karim Ahmed', activity: 'SMS Sent', details: '5 SMS notifications sent to clients' },
  { id: 5, timestamp: '2026-08-17 12:50', user: 'Nazia Khan', activity: 'Report Generated', details: 'Credit Assessment Report exported' }
]

const branches = ['Dhaka Central', 'Dhaka North', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur']
const roles = ['RO', 'BDM', 'Admin']

export default function AdminView({ language }) {
  const [editingUser, setEditingUser] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [selectedPending, setSelectedPending] = useState(null)
  const [suspendReason, setSuspendReason] = useState('')
  const lang = t[language] || t.en

  const handleEditClick = (user) => {
    setEditingUser(user.id)
    setEditForm({ ...user })
  }

  const handleSaveUser = () => {
    alert('User information updated successfully!')
    setEditingUser(null)
    setEditForm({})
  }

  const handleApproveStaff = (id) => {
    alert('Staff registration approved! Welcome email sent.')
    setSelectedPending(null)
  }

  const handleRejectStaff = (id) => {
    alert('Staff registration rejected!')
    setSelectedPending(null)
  }

  const handleSuspendUser = (id) => {
    if (!suspendReason) {
      alert('Please enter reason for suspension')
      return
    }
    alert(`User account has been suspended.\nReason: ${suspendReason}`)
    setSuspendReason('')
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-primary">{lang.adminTitle}</h1>
        <p className="text-gray-600">{lang.adminSubtitle}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md border-l-4 border-blue-600">
          <div className="text-sm text-gray-700 font-medium">{lang.totalUsers}</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">18</div>
          <div className="text-xs text-gray-600 mt-1">Active in System</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md border-l-4 border-green-600">
          <div className="text-sm text-gray-700 font-medium">{lang.activeUsers}</div>
          <div className="text-3xl font-bold text-green-600 mt-2">16</div>
          <div className="text-xs text-gray-600 mt-1">Online Now</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-md border-l-4 border-red-600">
          <div className="text-sm text-gray-700 font-medium">{lang.inactiveUsers}</div>
          <div className="text-3xl font-bold text-red-600 mt-2">2</div>
          <div className="text-xs text-gray-600 mt-1">Offline</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md border-l-4 border-purple-600">
          <div className="text-sm text-gray-700 font-medium">{lang.totalLogins}</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">42</div>
          <div className="text-xs text-gray-600 mt-1">System Activity</div>
        </div>
      </div>

      {/* Staff User Management */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            {lang.userManagement}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{mockStaff.length} staff members registered in the system</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.name}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.email}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.role}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.branch}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.status}</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">{lang.actions}</th>
              </tr>
            </thead>
            <tbody>
              {mockStaff.map(staff => (
                <tr key={staff.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{staff.name}</div>
                    <div className="text-xs text-gray-500">ID: {staff.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{staff.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{staff.branch}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full inline-block ${
                      staff.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-3">
                    <button
                      onClick={() => handleEditClick(staff)}
                      className="text-blue-600 hover:text-blue-800 font-medium transition"
                      title="Edit User"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleSuspendUser(staff.id)}
                      className="text-red-600 hover:text-red-800 font-medium transition"
                      title="Suspend User"
                    >
                      <Lock className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Staff Registrations */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            {lang.pendingList}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{mockPending.length} applications awaiting approval</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.name}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.role}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.branch}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.registrationDate}</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">{lang.actions}</th>
              </tr>
            </thead>
            <tbody>
              {mockPending.map(pending => (
                <tr key={pending.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{pending.name}</div>
                    <div className="text-xs text-gray-500">{pending.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                      {pending.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{pending.branch}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{pending.date}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleApproveStaff(pending.id)}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" /> {lang.approve}
                    </button>
                    <button
                      onClick={() => handleRejectStaff(pending.id)}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition flex items-center gap-1"
                    >
                      <XCircle className="w-4 h-4" /> {lang.reject}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-teal-600" />
            {lang.auditLogTitle}
          </h2>
          <p className="text-sm text-gray-600 mt-1">Real-time system activity monitoring</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.timestamp}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.user}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.activity}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{lang.details}</th>
              </tr>
            </thead>
            <tbody>
              {mockLogs.map(log => (
                <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.timestamp}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full inline-block">
                      {log.activity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
