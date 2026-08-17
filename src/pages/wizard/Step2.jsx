import React, { useState } from 'react'
import { Info, CheckCircle, Upload, Camera, Shield } from 'lucide-react'

const t = {
  en: {
    personalInfo: 'Personal Information & eKYC',
    mobile: 'Mobile Number',
    nidFront: 'NID Picture Upload (Front)',
    nidBack: 'NID Picture Upload (Back)',
    liveness: 'Liveness Check (Live Camera / Selfie)',
    livenessOn: 'Camera Active — Selfie Verified',
    livenessOff: 'Enable Liveness Verification',
    verifySubmit: 'Run Verification Checks',
    verifying: 'Running DEDUPE & CIB checks...',
    autoFilled: 'OCR Auto-Extracted Fields (Editable)',
    fullName: 'Name',
    dob: 'Date of Birth',
    nid: 'NID Number',
    gender: 'Gender',
    father: "Father's Name",
    mother: "Mother's Name",
    presentAddress: 'Present Address',
    permanentAddress: 'Permanent Address',
    tinNumber: 'TIN Number (Manual)',
    dedupeCleared: 'Dedupe Cleared / Sanction',
    cibCleared: 'CIB Cleared',
    scanning: 'Scanning OCR...',
    scanning98: '98% Confidence',
    back: 'Back',
    next: 'Next',
    ocrInfo: 'Upload NID to auto-fill fields'
  },
  bn: {
    personalInfo: 'ব্যক্তিগত তথ্য ও ই-কেওয়াইসি',
    mobile: 'মোবাইল নম্বর',
    nidFront: 'এনআইডি ছবি (সামনে)',
    nidBack: 'এনআইডি ছবি (পিছনে)',
    liveness: 'লাইভনেস চেক (ক্যামেরা / সেলফি)',
    livenessOn: 'ক্যামেরা সক্রিয় — সেলফি যাচাইকৃত',
    livenessOff: 'লাইভনেস যাচাই সক্রিয় করুন',
    verifySubmit: 'যাচাইকরণ চালান',
    verifying: 'ডিডুপ ও সিআইবি চেক চলছে...',
    autoFilled: 'ওসিআর স্বয়ং-নিষ্কাশিত ক্ষেত্র (সম্পাদনযোগ্য)',
    fullName: 'নাম',
    dob: 'জন্ম তারিখ',
    nid: 'এনআইডি নম্বর',
    gender: 'লিঙ্গ',
    father: 'পিতার নাম',
    mother: 'মাতার নাম',
    presentAddress: 'বর্তমান ঠিকানা',
    permanentAddress: 'স্থায়ী ঠিকানা',
    tinNumber: 'টিআইএন নম্বর (ম্যানুয়াল)',
    dedupeCleared: 'ডিডুপ ক্লিয়ার / স্যাংশন',
    cibCleared: 'সিআইবি ক্লিয়ার',
    scanning: 'ওসিআর স্ক্যান করছে...',
    scanning98: '৯৮% আত্মবিশ্বাস',
    back: 'পিছনে',
    next: 'পরবর্তী',
    ocrInfo: 'ক্ষেত্র স্বয়ংভরা করতে এনআইডি আপলোড করুন'
  }
}

const OCR_DEFAULTS = {
  fullName: 'Md. Test User',
  dob: '1985-05-10',
  nid: '1999999999',
  gender: 'Male',
  father: 'Abdul Karim',
  mother: 'Fatema Begum',
  presentAddress: 'House 12, Road 5, Dhanmondi, Dhaka',
  permanentAddress: 'Village: Test Para, District: Dhaka'
}

export default function Step2({ prev, next, data, setData, language }) {
  const [nidFrontFile, setNidFrontFile] = useState(null)
  const [nidBackFile, setNidBackFile] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [liveness, setLiveness] = useState(data.personal?.livenessVerified || false)

  const personal = { ...OCR_DEFAULTS, tinNumber: '', ...data.personal }
  const lang = t[language] || t.en

  const updatePersonal = (fields) => {
    setData('personal', fields)
  }

  const handleUpload = (setter) => (e) => {
    const f = e.target.files[0]
    if (f) {
      setter(f)
      setScanning(true)
      setTimeout(() => {
        setScanning(false)
        updatePersonal({ ...OCR_DEFAULTS, tinNumber: personal.tinNumber })
      }, 1200)
    }
  }

  const handleVerify = () => {
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      updatePersonal({
        dedupeStatus: 'cleared',
        cibStatus: 'cleared',
        livenessVerified: liveness
      })
    }, 1800)
  }

  const handleNext = () => {
    if (!personal.dedupeStatus) handleVerify()
    setTimeout(next, personal.dedupeStatus ? 0 : 1900)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-primary">{lang.personalInfo}</h2>

      <div className="space-y-4">
        {(personal.dedupeStatus || personal.cibStatus) && (
          <div className="grid grid-cols-2 gap-3">
            {personal.dedupeStatus && (
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">{lang.dedupeCleared}</span>
              </div>
            )}
            {personal.cibStatus && (
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">{lang.cibCleared}</span>
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{lang.mobile}</label>
          <input
            type="tel"
            value={data.mobile || ''}
            onChange={e => setData('root', { mobile: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            readOnly={!!data.mobile}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.nidFront}</label>
            <div className="flex items-center gap-2">
              <input type="file" accept="image/*" onChange={handleUpload(setNidFrontFile)} className="flex-1 border border-gray-300 p-2 rounded-lg text-sm" />
              {nidFrontFile && <Upload className="w-5 h-5 text-green-600" />}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{lang.nidBack}</label>
            <div className="flex items-center gap-2">
              <input type="file" accept="image/*" onChange={handleUpload(setNidBackFile)} className="flex-1 border border-gray-300 p-2 rounded-lg text-sm" />
              {nidBackFile && <Upload className="w-5 h-5 text-green-600" />}
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">{lang.liveness}</span>
            </div>
            <button
              onClick={() => {
                const nextVal = !liveness
                setLiveness(nextVal)
                updatePersonal({ livenessVerified: nextVal })
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                liveness ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {liveness ? lang.livenessOn : lang.livenessOff}
            </button>
          </div>
        </div>

        {scanning && (
          <div className="p-3 bg-blue-50 rounded-lg text-center animate-pulse text-sm text-blue-700">
            {lang.scanning}
          </div>
        )}

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-medium text-gray-700">{lang.autoFilled}</span>
            <Info className="w-4 h-4 text-gray-500" title={lang.ocrInfo} />
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{lang.scanning98}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['fullName', 'dob', 'nid', 'gender', 'father', 'mother', 'presentAddress', 'permanentAddress'].map(key => (
              <div key={key} className={key.includes('Address') ? 'col-span-2' : ''}>
                <label className="block text-xs text-gray-600 mb-1">{lang[key] || key}</label>
                <input
                  value={personal[key] || ''}
                  onChange={e => updatePersonal({ [key]: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs text-gray-600 mb-1">{lang.tinNumber}</label>
              <input
                value={personal.tinNumber || ''}
                onChange={e => updatePersonal({ tinNumber: e.target.value })}
                placeholder="Manual TIN entry"
                className="w-full border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleVerify}
          disabled={verifying}
          className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          {verifying ? lang.verifying : lang.verifySubmit}
        </button>

        <div className="flex justify-between pt-4">
          <button onClick={prev} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition font-medium">
            {lang.back}
          </button>
          <button onClick={handleNext} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium">
            {lang.next}
          </button>
        </div>
      </div>
    </div>
  )
}
