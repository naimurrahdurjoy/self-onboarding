export const BANGLADESH_DIVISIONS = [
  'Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'
]

export const DIVISION_DISTRICTS_MAP = {
  Dhaka: ['Dhaka', 'Gazipur', 'Kishoreganj', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Faridpur', 'Gopalganj', 'Madaripur', 'Rajbari', 'Shariatpur'],
  Chattogram: ['Chattogram', "Cox's Bazar", 'Bandarban', 'Rangamati', 'Khagrachhari', 'Noakhali', 'Feni', 'Lakshmipur', 'Cumilla', 'Chandpur', 'Brahmanbaria'],
  Rajshahi: ['Rajshahi', 'Bogura', 'Joypurhat', 'Naogaon', 'Natore', 'Nawabganj', 'Pabna', 'Sirajganj'],
  Khulna: ['Khulna', 'Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira'],
  Barishal: ['Barishal', 'Barguna', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur'],
  Sylhet: ['Sylhet', 'Habiganj', 'Moulvibazar', 'Sunamganj'],
  Rangpur: ['Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon'],
  Mymensingh: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur']
}

export const DISTRICT_BRANCHES_MAP = {
  Dhaka: ['Dhaka Central Main Branch', 'Gulshan Branch', 'Motijheel SME Branch', 'Uttara Branch', 'Dhanmondi SME Service Center', 'Mirpur SME Center', 'Savar SME Hub'],
  Gazipur: ['Gazipur Sadar Branch', 'Tongi SME Branch', 'Chowrasta Branch'],
  Narayanganj: ['Narayanganj Main Branch', 'Nitaiganj SME Center', 'Kanchpur Branch'],
  Chattogram: ['Agrabad Commercial Area Branch', 'Khatunganj SME Branch', 'GEC Circle Branch', 'Chawkbazar SME Hub', 'Halishahar Branch'],
  "Cox's Bazar": ["Cox's Bazar Main Branch", 'Teknaf SME Center'],
  Bogura: ['Bogura Main Branch', 'Santu SME Center'],
  Rajshahi: ['Rajshahi Sadar SME Branch', 'Shaheb Bazar Branch'],
  Khulna: ['Khulna Main Branch', 'KDA Avenue SME Center'],
  Barishal: ['Barishal Sadar Branch', 'Chawk Bazar Branch'],
  Sylhet: ['Sylhet Zindabazar Branch', 'Kadamtoli SME Center'],
  Rangpur: ['Rangpur City Branch', 'Station Road SME Center'],
  Mymensingh: ['Mymensingh Main Branch', 'Ganginar Par SME Hub']
}

export function getDistrictBranches(district) {
  return DISTRICT_BRANCHES_MAP[district] || (district ? [`${district} Main Branch`, `${district} SME Service Center`] : [])
}
