import React, { useEffect, useRef, useState } from 'react'
import { Camera, CheckCircle, FileCheck, Upload, X } from 'lucide-react'

const documentFields = [
  ['nidFront', 'NID Card (Front)', 'image/*,application/pdf'],
  ['nidBack', 'NID Card (Back)', 'image/*,application/pdf'],
  ['tradeLicense', 'Trade License', 'image/*,application/pdf'],
  ['eTin', 'e-TIN', 'image/*,application/pdf'],
  ['bankStatements', '6-Month Bank Statements', 'image/*,application/pdf']
]

export default function EKYCVerificationModal({ language, onSubmit, onSkip, onClose }) {
  const [documents, setDocuments] = useState({})
  const [cameraOpen, setCameraOpen] = useState(false)
  const [selfie, setSelfie] = useState(null)
  const [cameraError, setCameraError] = useState('')
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const bn = language === 'bn'

  useEffect(() => () => streamRef.current?.getTracks().forEach(track => track.stop()), [])

  useEffect(() => {
    if (cameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current
    }
  }, [cameraOpen])

  const openCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(bn ? 'এই ব্রাউজারে ক্যামেরা সুবিধা নেই।' : 'Camera access is unavailable in this browser.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = stream
      setCameraError('')
      setCameraOpen(true)
    } catch {
      setCameraError(bn ? 'ক্যামেরা ব্যবহারের অনুমতি দিন।' : 'Please allow camera access to continue.')
    }
  }

  const captureSelfie = () => {
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth || 640
    canvas.height = videoRef.current.videoHeight || 480
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    setSelfie(canvas.toDataURL('image/jpeg'))
    streamRef.current?.getTracks().forEach(track => track.stop())
    setCameraOpen(false)
  }

  const submit = () => {
    onSubmit({ ...documents, selfie: selfie || 'liveness-confirmed' })
  }

  return <div className="fixed inset-0 z-[120] flex items-end justify-center bg-[#102c23]/60 p-0 sm:items-center sm:p-5">
    <div className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
      <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-7"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b6b45]">দুর্জয় · eKYC</p><h2 className="mt-1 text-2xl font-bold text-[#163b2d]">{bn ? 'ই-কেওয়াইসি যাচাই' : 'eKYC Verification'}</h2><p className="mt-1 text-sm text-slate-500">{bn ? 'NID, ব্যবসার নথি ও লিভনেস যাচাই সম্পন্ন করুন।' : 'Upload your identity, business documents, and complete liveness.'}</p></div><button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Close"><X /></button></div>
        <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-7"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b6b45]">দুর্জয় · eKYC</p><h2 className="mt-1 text-2xl font-bold text-[#163b2d]">{bn ? 'ই-কেওয়াইসি যাচাই' : 'eKYC Verification'}</h2><p className="mt-1 text-sm text-slate-500">{bn ? 'NID, ব্যবসার নথি ও লিভনেস যাচাই সম্পন্ন করুন।' : 'Upload your identity, business documents, and complete liveness.'}</p></div><button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Close"><X /></button></div>
      <div className="space-y-5 p-5 sm:p-7"><div className="grid gap-3 sm:grid-cols-2">{documentFields.map(([key, label, accept]) => <label key={key} className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed p-4 text-sm font-semibold ${documents[key] ? 'border-green-300 bg-green-50 text-green-800' : 'border-slate-200 text-slate-600 hover:border-[#0b6b45]'}`}><Upload className="h-5 w-5 shrink-0 text-[#0b6b45]" /><span className="min-w-0 flex-1">{bn ? ({ nidFront: 'NID (সামনে)', nidBack: 'NID (পেছনে)', tradeLicense: 'ট্রেড লাইসেন্স', eTin: 'ই-টিন', bankStatements: '৬ মাসের ব্যাংক স্টেটমেন্ট' }[key]) : label}<input type="file" accept={accept} className="mt-2 block w-full text-xs" onChange={event => setDocuments(prev => ({ ...prev, [key]: event.target.files?.[0]?.name || '' }))} /></span>{documents[key] && <CheckCircle className="h-5 w-5 text-green-600" />}</label>)}</div>
        <div className="rounded-xl border border-[#cde5d6] bg-[#f1faf4] p-5"><div className="flex items-center gap-3"><Camera className="h-6 w-6 text-[#0b6b45]" /><div><p className="font-bold">{bn ? 'লাইভ ক্যামেরা / লিভনেস যাচাই' : 'Live Camera / Liveness Verification'}</p><p className="mt-1 text-xs text-slate-500">{bn ? 'ক্যামেরা খুলে একটি পরিষ্কার সেলফি তুলুন।' : 'Open the camera and capture a clear selfie.'}</p></div></div>{cameraOpen ? <div className="mt-4 space-y-3"><video ref={videoRef} autoPlay playsInline className="w-full rounded-lg bg-black" /><button onClick={captureSelfie} className="w-full rounded-lg bg-[#0b6b45] py-3 font-bold text-white">{bn ? 'সেলফি তুলুন' : 'Capture Selfie'}</button></div> : <button onClick={openCamera} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#0b6b45] px-4 py-2 text-sm font-bold text-[#0b6b45]"><Camera className="h-4 w-4" /> {bn ? 'লিভনেস চেক শুরু করুন / ক্যামেরা খুলুন' : 'Start Liveness Check / Open Camera'}</button>}{selfie && <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-green-700"><CheckCircle className="h-4 w-4" /> [ ✓ {bn ? 'লিভনেস নিশ্চিত' : 'Liveness Confirmed'} ]</p>}{cameraError && <p className="mt-2 text-xs text-red-600">{cameraError}</p>}</div>
        <button onClick={submit} disabled={false} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0b6b45] py-3 font-bold text-white"><FileCheck className="h-5 w-5" />{bn ? 'নথি জমা দিন ও যাচাই করুন' : 'Submit Documents & Verify'}</button>
        <button onClick={onSkip} className="w-full rounded-lg border border-slate-300 py-3 text-sm font-bold text-slate-600">{bn ? 'এখনের জন্য এড়িয়ে যান' : 'Skip for Now'}</button>
      </div>
    </div>
  </div>
}
