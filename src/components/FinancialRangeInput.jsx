import React from 'react'

export default function FinancialRangeInput({ label, value, onChange, min, max, step }) {
  const numericValue = Number(value) || 0

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(max, Math.max(min, numericValue))}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full cursor-pointer accent-emerald-700"
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value) || 0)}
        className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
      />
    </div>
  )
}
