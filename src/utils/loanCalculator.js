export function calculateLoanMetrics(data = {}) {
  const {
    cash = 0,
    stock = 0,
    receivables = 0,
    payables = 0,
    monthlyIncome = 0,
    monthlyExpense = 0,
    personalExpense = 0,
    existingEmiTotal = 0,
    requested = 0,
    interestRate = 16.75,
    tenureMonths = 36,
    fixedAssets = 0
  } = data

  const netWorkingCapital = cash + stock + receivables - payables
  const primaryWCEligibility = (stock + receivables) * 0.7
  const netMonthlyIncome = monthlyIncome - monthlyExpense - personalExpense
  const totalMonthlyDebt = existingEmiTotal
  const dbrPercent =
    netMonthlyIncome > 0 ? (totalMonthlyDebt / netMonthlyIncome) * 100 : 0

  const maxDbrCap = 50
  const availableDbrRoom = Math.max(0, maxDbrCap - dbrPercent)
  const dbrBasedEligible =
    netMonthlyIncome > 0
      ? (availableDbrRoom / 100) * netMonthlyIncome * tenureMonths * 0.85
      : 0

  const assetBasedEligible = netWorkingCapital + fixedAssets * 0.3
  const rawEligible = Math.min(
    primaryWCEligibility,
    netWorkingCapital > 0 ? netWorkingCapital : primaryWCEligibility,
    dbrBasedEligible > 0 ? dbrBasedEligible : primaryWCEligibility,
    assetBasedEligible
  )
  const eligibleLoanAmount = Math.max(0, Math.round(rawEligible))
  const meetsRequested = requested > 0 ? eligibleLoanAmount >= requested : true
  const approvedAmount = requested > 0 ? Math.min(eligibleLoanAmount, requested) : eligibleLoanAmount

  const monthlyRate = interestRate / 100 / 12
  const proposedEmi =
    tenureMonths > 0 && approvedAmount > 0
      ? (approvedAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -tenureMonths))
      : 0

  return {
    netWorkingCapital: Math.round(netWorkingCapital),
    primaryWCEligibility: Math.round(primaryWCEligibility),
    dbrPercent: Math.round(dbrPercent * 100) / 100,
    netMonthlyIncome: Math.round(netMonthlyIncome),
    totalMonthlyDebt: Math.round(totalMonthlyDebt),
    eligibleLoanAmount,
    approvedAmount: Math.round(approvedAmount),
    meetsRequested,
    proposedEmi: Math.round(proposedEmi),
    dbrCompliant: dbrPercent <= maxDbrCap
  }
}
