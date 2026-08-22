import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// Default profile structure
const defaultProfile = {
  fullName: '',
  nidNumber: '',
  fatherName: '',
  motherName: '',
  dateOfBirth: '',
  gender: '',
  presentAddress: '',
  permanentAddress: '',
  eTin: '',
  nomineeDetails: ''
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [eKYCStatus, setEKYCStatus] = useState(null) // null, 'pending', 'verified', 'failed'
  const [userProfile, setUserProfile] = useState(defaultProfile)
  const [applicationStatus, setApplicationStatus] = useState('Not Started') // Not Started, Submitted, eKYC Verified, Assigned to RO, Credit Review, Sanctioned
  const [loanApplicationData, setLoanApplicationData] = useState({})

  // Restore active session only when explicitly available; otherwise always start
  // at the login screen to avoid stale or duplicate sessions being treated as valid.
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedSession = localStorage.getItem('authSession') === 'active'
    const savedEKYC = localStorage.getItem('eKYCStatus')
    const savedProfile = localStorage.getItem('userProfile')
    const savedAppStatus = localStorage.getItem('applicationStatus')
    const savedLoanData = localStorage.getItem('loanApplicationData')

    if (savedSession && savedUser) {
      const parsedUser = JSON.parse(savedUser)
      const restoredUser = savedEKYC === 'verified'
        ? { ...parsedUser, isEkycVerified: true, eKYCVerified: true, nidVerified: true }
        : parsedUser
      setUser(restoredUser)
      setIsAuthenticated(true)
      setEKYCStatus(savedEKYC || 'pending')
      setUserProfile(savedProfile ? JSON.parse(savedProfile) : defaultProfile)
      setApplicationStatus(savedAppStatus || 'Not Started')
      setLoanApplicationData(savedLoanData ? JSON.parse(savedLoanData) : {})
      if (restoredUser !== parsedUser) {
        localStorage.setItem('user', JSON.stringify(restoredUser))
      }
    } else {
      setUser(null)
      setIsAuthenticated(false)
      setEKYCStatus(null)
      setUserProfile(defaultProfile)
      setApplicationStatus('Not Started')
      setLoanApplicationData({})
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      localStorage.removeItem('eKYCStatus')
      localStorage.removeItem('userProfile')
      localStorage.removeItem('applicationStatus')
      localStorage.removeItem('loanApplicationData')
      localStorage.removeItem('authSession')
    }
    setLoading(false)
  }, [])

  const resolveRole = (mobile) => {
    const roleMap = {
      '01700000001': 'Client',
      '01700000002': 'RO',
      '01700000003': 'BDM',
      '01700000004': 'Admin'
    }
    return roleMap[mobile] || 'Client'
  }

  const login = (mobile, password) => {
    const role = resolveRole(mobile)
    const mockUser = {
      id: `user_${Date.now()}`,
      mobile,
      password,
      role,
      name: 'User Name',
      email: '',
      avatar: mobile.slice(-1),
      createdAt: new Date()
    }

    let nextEKYC = 'pending'
    let nextAppStatus = 'Not Started'

    if (mobile === '01700000001') {
      mockUser.name = 'রেজিস্টার্ড ক্লায়েন্ট'
      mockUser.email = 'client@example.com'
      mockUser.eKYCVerified = true
      mockUser.isEkycVerified = true
      mockUser.nidVerified = true
      nextEKYC = 'verified'
      nextAppStatus = 'eKYC Verified'
      const profile = {
        fullName: 'রেজিস্টার্ড ক্লায়েন্ট',
        nidNumber: '1234567890123',
        fatherName: 'Father Name',
        motherName: 'Mother Name',
        dateOfBirth: '1990-01-01',
        gender: 'Male',
        presentAddress: 'Dhaka, Bangladesh',
        permanentAddress: 'Dhaka, Bangladesh',
        eTin: '123-456-789',
        nomineeDetails: 'Nominee Name'
      }
      mockUser.profileData = profile
      setUserProfile(profile)
      localStorage.setItem('userProfile', JSON.stringify(profile))
    } else if (mobile === '01700000002') {
      mockUser.name = 'Regional Officer'
      nextEKYC = 'verified'
    } else if (mobile === '01700000003') {
      mockUser.name = 'BDM Officer'
      nextEKYC = 'verified'
    } else if (mobile === '01700000004') {
      mockUser.name = 'Admin User'
      nextEKYC = 'verified'
    }

    setUser(mockUser)
    setIsAuthenticated(true)
    setEKYCStatus(nextEKYC)
    setApplicationStatus(nextAppStatus)
    localStorage.setItem('user', JSON.stringify(mockUser))
    localStorage.setItem('authSession', 'active')
    localStorage.setItem('role', mockUser.role)
    localStorage.setItem('eKYCStatus', nextEKYC)
    localStorage.setItem('applicationStatus', nextAppStatus)
  }

  const register = (userData) => {
    const newUser = {
      id: `user_${Date.now()}`,
      ...userData,
      avatar: userData.mobile.slice(-1),
      createdAt: new Date(),
      eKYCVerified: false,
      isEkycVerified: false,
      nidVerified: false,
      profileData: defaultProfile
    }

    setUser(newUser)
    setIsAuthenticated(true)
    setEKYCStatus('pending')
    setApplicationStatus('Not Started')
    setLoanApplicationData({})
    localStorage.setItem('user', JSON.stringify(newUser))
    localStorage.setItem('authSession', 'active')
    localStorage.setItem('eKYCStatus', 'pending')
    localStorage.setItem('applicationStatus', 'Not Started')
    localStorage.removeItem('loanApplicationData')
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setEKYCStatus(null)
    setUserProfile(defaultProfile)
    localStorage.removeItem('user')
    localStorage.removeItem('authSession')
    localStorage.removeItem('role')
    localStorage.removeItem('eKYCStatus')
    localStorage.removeItem('userProfile')
    localStorage.removeItem('applicationStatus')
    localStorage.removeItem('loanApplicationData')
  }

  const updateUserProfile = (updatedData) => {
    const updated = { ...user, ...updatedData }
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  const updateProfileDetails = (updatedProfile) => {
    const updated = { ...userProfile, ...updatedProfile }
    setUserProfile(updated)
    localStorage.setItem('userProfile', JSON.stringify(updated))
  }

  const updateUserDocuments = (documents) => {
    const updated = { ...user, uploadedDocuments: { ...(user?.uploadedDocuments || {}), ...documents } }
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  const verifyEKYC = (documents = {}) => {
    setEKYCStatus('verifying')
    // Simulate 1.5 second verification
    setTimeout(() => {
      setEKYCStatus('verified')
      const updated = { ...user, uploadedDocuments: { ...(user?.uploadedDocuments || {}), ...documents }, eKYCVerified: true, isEkycVerified: true, nidVerified: true, isNidVerified: true, profileData: userProfile }
      setUser(updated)
      setApplicationStatus('eKYC Verified')
      localStorage.setItem('user', JSON.stringify(updated))
      localStorage.setItem('eKYCStatus', 'verified')
      localStorage.setItem('applicationStatus', 'eKYC Verified')
    }, 1500)
  }

  const updateApplicationStatus = (status) => {
    setApplicationStatus(status)
    localStorage.setItem('applicationStatus', status)
  }

  const updateLoanApplicationData = (data) => {
    setLoanApplicationData(data)
    localStorage.setItem('loanApplicationData', JSON.stringify(data))
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    eKYCStatus,
    userProfile,
    applicationStatus,
    loanApplicationData,
    login,
    register,
    logout,
    updateUserProfile,
    updateProfileDetails,
    updateUserDocuments,
    verifyEKYC,
    updateApplicationStatus,
    updateLoanApplicationData
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
