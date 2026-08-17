import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Shield, CheckCircle, AlertCircle, Upload, Loader } from 'lucide-react'

const t = {
  en: {
    userProfile: 'User Profile',
    verified: 'Verified ✓',
    eKYCPending: 'eKYC Pending ⚠️',
    eKYCVerifying: 'Verifying eKYC...',
    personalInfo: 'Personal Information',
    mfsProfile: 'MFS Profile Settings',
    documents: 'Document Upload',
    fullName: 'Full Name (As per NID)',
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    nidNumber: 'NID Number',
    presentAddress: 'Present Address',
    permanentAddress: 'Permanent Address',
    eTINNumber: 'e-TIN Number (Optional)',
    nomineeDetails: 'Nominee Details',
    nomineeName: 'Nominee Name',
    nomineeRelation: 'Relation',
    nomineeNID: 'Nominee NID',
    nidFront: 'NID Front',
    nidBack: 'NID Back',
    liveSelfie: 'Live Selfie / Liveness Check',
    submitProfile: 'Submit Profile / Verify eKYC',
    editProfile: 'Edit Profile',
    save: 'Save Changes',
    cancel: 'Cancel',
    uploadFile: 'Upload File',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    verifyingWithEC: 'eKYC Verifying with Election Commission Database...',
    verificationComplete: 'eKYC Verification Complete!',
    lockedField: 'Auto-verified field (locked)'
  },
  bn: {
    userProfile: 'ব্যবহারকারী প্রোফাইল',
    verified: 'যাচাইকৃত ✓',
    eKYCPending: 'eKYC অপেক্ষমান ⚠️',
    eKYCVerifying: 'eKYC যাচাই করা হচ্ছে...',
    personalInfo: 'ব্যক্তিগত তথ্য',
    mfsProfile: 'MFS প্রোফাইল সেটিংস',
    documents: 'ডকুমেন্ট আপলোড',
    fullName: 'পূর্ণ নাম (NID অনুযায়ী)',
    fatherName: 'পিতার নাম',
    motherName: 'মাতার নাম',
    dateOfBirth: 'জন্ম তারিখ',
    gender: 'লিঙ্গ',
    nidNumber: 'NID নম্বর',
    presentAddress: 'বর্তমান ঠিকানা',
    permanentAddress: 'স্থায়ী ঠিকানা',
    eTINNumber: 'e-TIN নম্বর (ঐচ্ছিক)',
    nomineeDetails: 'মনোনীত ব্যক্তির বিবরণ',
    nomineeName: 'মনোনীত ব্যক্তির নাম',
    nomineeRelation: 'সম্পর্ক',
    nomineeNID: 'মনোনীত NID',
    nidFront: 'NID সামনের দিক',
    nidBack: 'NID পেছনের দিক',
    liveSelfie: 'লাইভ সেলফি / লাইভনেস চেক',
    submitProfile: 'প্রোফাইল জমা দিন / eKYC যাচাই করুন',
    editProfile: 'প্রোফাইল সম্পাদনা করুন / eKYC পুনরায় ক্যালিব্রেট করুন',
    save: 'পরিবর্তনগুলি সংরক্ষণ করুন',
    cancel: 'বাতিল করুন',
    uploadFile: 'ফাইল আপলোড করুন',
    male: 'পুরুষ',
    female: 'মহিলা',
    other: 'অন্যান্য',
    verifyingWithEC: 'eKYC নির্বাচন কমিশন ডেটাবেসের সাথে যাচাই করা হচ্ছে...',
    verificationComplete: 'eKYC যাচাইকরণ সম্পূর্ণ!',
    lockedField: 'স্বয়ংক্রিয় যাচাইকৃত ক্ষেত্র (লক করা)'
  }
}

export default function UserProfile({ language = 'en' }) {
  const lang = t[language] || t.en
  const { user, updateUserProfile, verifyEKYC, eKYCStatus } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [uploadedDocs, setUploadedDocs] = useState({})

  const [profileData, setProfileData] = useState({
    fullName: user?.name || '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: '',
    nidNumber: '',
    presentAddress: '',
    permanentAddress: '',
    eTINNumber: '',
    nomineeName: '',
    nomineeRelation: '',
    nomineeNID: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveProfile = () => {
    updateUserProfile(profileData)
    setIsEditing(false)
  }

  const handleVerifyEKYC = () => {
    setIsVerifying(true)
    verifyEKYC()
    setTimeout(() => {
      setIsVerifying(false)
    }, 1500)
  }

  const handleFileUpload = (docType) => {
    // Mock file upload
    setUploadedDocs(prev => ({
      ...prev,
      [docType]: `${docType}-uploaded-${Date.now()}`
    }))
  }

  return (
    <div className="min-h-screen bg-lightgreen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Verification Status Banner */}
        {eKYCStatus === 'verified' && (
          <div className="mb-6 p-6 bg-green-100 border-2 border-green-400 rounded-xl flex items-center gap-4">
            <Shield className="w-8 h-8 text-green-600" />
            <div>
              <p className="font-bold text-green-900">{lang.verificationComplete}</p>
              <p className="text-green-800 text-sm">eKYC verified with Election Commission Database</p>
            </div>
          </div>
        )}

        {isVerifying && (
          <div className="mb-6 p-6 bg-blue-100 border-2 border-blue-400 rounded-xl flex items-center gap-4">
            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="font-bold text-blue-900">{lang.verifyingWithEC}</p>
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.avatar || 'U'}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">{user?.name}</h1>
                <p className="text-gray-600">{user?.mobile}</p>
                {user?.email && <p className="text-gray-600">{user?.email}</p>}
              </div>
            </div>

            <div className="text-right">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${
                eKYCStatus === 'verified' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {eKYCStatus === 'verified' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {lang.verified}
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    {lang.eKYCPending}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information & MFS Profile */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">{lang.mfsProfile}</h2>
            {(!isEditing || eKYCStatus === 'verified') && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-bold"
              >
                {lang.editProfile}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.fullName}</label>
              <input
                type="text"
                name="fullName"
                value={profileData.fullName}
                onChange={handleInputChange}
                disabled={!isEditing || (eKYCStatus === 'verified')}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  isEditing && eKYCStatus !== 'verified'
                    ? 'border-primary focus:border-primary'
                    : 'border-gray-300 bg-gray-100 cursor-not-allowed'
                }`}
                title={eKYCStatus === 'verified' ? lang.lockedField : ''}
              />
            </div>

            {/* Father's Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.fatherName}</label>
              <input
                type="text"
                name="fatherName"
                value={profileData.fatherName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  isEditing
                    ? 'border-primary focus:border-primary'
                    : 'border-gray-300 bg-gray-100'
                }`}
              />
            </div>

            {/* Mother's Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.motherName}</label>
              <input
                type="text"
                name="motherName"
                value={profileData.motherName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  isEditing
                    ? 'border-primary focus:border-primary'
                    : 'border-gray-300 bg-gray-100'
                }`}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.dateOfBirth}</label>
              <input
                type="date"
                name="dateOfBirth"
                value={profileData.dateOfBirth}
                onChange={handleInputChange}
                disabled={!isEditing || (eKYCStatus === 'verified')}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  isEditing && eKYCStatus !== 'verified'
                    ? 'border-primary focus:border-primary'
                    : 'border-gray-300 bg-gray-100 cursor-not-allowed'
                }`}
                title={eKYCStatus === 'verified' ? lang.lockedField : ''}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.gender}</label>
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  isEditing
                    ? 'border-primary focus:border-primary'
                    : 'border-gray-300 bg-gray-100'
                }`}
              >
                <option value="">Select Gender</option>
                <option value="male">{lang.male}</option>
                <option value="female">{lang.female}</option>
                <option value="other">{lang.other}</option>
              </select>
            </div>

            {/* NID Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.nidNumber}</label>
              <input
                type="text"
                name="nidNumber"
                value={profileData.nidNumber}
                onChange={handleInputChange}
                disabled={!isEditing || (eKYCStatus === 'verified')}
                placeholder="10 or 17 digits"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  isEditing && eKYCStatus !== 'verified'
                    ? 'border-primary focus:border-primary'
                    : 'border-gray-300 bg-gray-100 cursor-not-allowed'
                }`}
                title={eKYCStatus === 'verified' ? lang.lockedField : ''}
              />
            </div>

            {/* Present Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.presentAddress}</label>
              <textarea
                name="presentAddress"
                value={profileData.presentAddress}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="3"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  isEditing
                    ? 'border-primary focus:border-primary'
                    : 'border-gray-300 bg-gray-100'
                }`}
              />
            </div>

            {/* Permanent Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.permanentAddress}</label>
              <textarea
                name="permanentAddress"
                value={profileData.permanentAddress}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="3"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  isEditing
                    ? 'border-primary focus:border-primary'
                    : 'border-gray-300 bg-gray-100'
                }`}
              />
            </div>

            {/* e-TIN Number */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang.eTINNumber}
              </label>
              <input
                type="text"
                name="eTINNumber"
                value={profileData.eTINNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  isEditing
                    ? 'border-primary focus:border-primary'
                    : 'border-gray-300 bg-gray-100'
                }`}
              />
            </div>
          </div>

          {/* Nominee Details */}
          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <h3 className="text-xl font-bold text-primary mb-6">{lang.nomineeDetails}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.nomineeName}</label>
                <input
                  type="text"
                  name="nomineeName"
                  value={profileData.nomineeName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    isEditing
                      ? 'border-primary focus:border-primary'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.nomineeRelation}</label>
                <input
                  type="text"
                  name="nomineeRelation"
                  value={profileData.nomineeRelation}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    isEditing
                      ? 'border-primary focus:border-primary'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{lang.nomineeNID}</label>
                <input
                  type="text"
                  name="nomineeNID"
                  value={profileData.nomineeNID}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    isEditing
                      ? 'border-primary focus:border-primary'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Edit Buttons */}
          {isEditing && (
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition font-bold"
              >
                {lang.save}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 border-2 border-primary text-primary py-3 rounded-lg hover:bg-green-50 transition font-bold"
              >
                {lang.cancel}
              </button>
            </div>
          )}
        </div>

        {/* Document Upload */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">{lang.documents}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NID Front */}
            <div className="border-2 border-dashed border-primary rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="font-semibold text-gray-700 mb-2">{lang.nidFront}</p>
              <p className="text-xs text-gray-500 mb-4">JPG, PNG (Max 5MB)</p>
              <button
                onClick={() => handleFileUpload('nidFront')}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
              >
                {uploadedDocs.nidFront ? '✓ Uploaded' : lang.uploadFile}
              </button>
            </div>

            {/* NID Back */}
            <div className="border-2 border-dashed border-primary rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="font-semibold text-gray-700 mb-2">{lang.nidBack}</p>
              <p className="text-xs text-gray-500 mb-4">JPG, PNG (Max 5MB)</p>
              <button
                onClick={() => handleFileUpload('nidBack')}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
              >
                {uploadedDocs.nidBack ? '✓ Uploaded' : lang.uploadFile}
              </button>
            </div>

            {/* Live Selfie */}
            <div className="border-2 border-dashed border-primary rounded-lg p-6 text-center md:col-span-2">
              <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="font-semibold text-gray-700 mb-2">{lang.liveSelfie}</p>
              <p className="text-xs text-gray-500 mb-4">JPG, PNG (Max 5MB)</p>
              <button
                onClick={() => handleFileUpload('liveSelfie')}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
              >
                {uploadedDocs.liveSelfie ? '✓ Uploaded' : lang.uploadFile}
              </button>
            </div>
          </div>
        </div>

        {/* Submit/Verify Button */}
        {eKYCStatus !== 'verified' && (
          <button
            onClick={handleVerifyEKYC}
            disabled={isVerifying}
            className="w-full bg-gradient-to-r from-primary to-green-600 text-white py-4 rounded-lg hover:opacity-90 transition font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isVerifying && <Loader className="w-5 h-5 animate-spin" />}
            {lang.submitProfile}
          </button>
        )}
      </div>
    </div>
  )
}
