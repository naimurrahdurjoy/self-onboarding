# SME Loan Self-Onboarding Prototype

A production-ready prototype for an SME Loan Self-Onboarding Web Application, Applicant Status Portal, and Multi-Role Management Dashboard built with React, Tailwind CSS, and Lucide React icons.

## Features

### 1. Client-Side SME Self-Onboarding & Status Portal (7-Step Wizard)
- **Step 1**: Registration & Login with OTP mock (accepts any 6-digit code)
- **Step 2**: Personal Information (e-KYC) with NID upload mock and auto-OCR filled fields (98% confidence badge)
- **Step 3**: Business & Financial Information with dynamic inputs
- **Step 4**: SME Loan Calculator with Excel-based formulas (Clause 1-5, DBR, D-E Ratio calculations)
- **Step 5**: Other Business Information (Trade License, Tax IDs, Location, Division/District selection)
- **Step 6**: Existing Loan Information with "Add More" button for multiple loans
- **Step 7**: Preview, Submit, and Live Status Portal with 6-stage progress tracker

### 2. Design System & Theme
- **Color Palette**: Bangladesh FinTech style (Deep Forest Green `#0D5C3A`, Light Green background `#E8F5E9`)
- **Layout**: Mobile-first responsive with Tailwind CSS
- **Icons**: Lucide React icons throughout
- **Internationalization**: Bilingual support (English & বাংলা) with language toggle

### 3. Multi-Role Architecture
1. **Client (Applicant)**: Complete onboarding wizard + status tracking portal
2. **RO (Relationship Officer)**: Lead verification, financial metric adjustment, SMS notifications
3. **BDM (Business Development Manager)**: Credit assessment, approval/rejection, branch assignment
4. **Admin (System Administrator)**: Staff management, registration approval, user suspension, audit logs

### 4. Staff Dashboards
- **Executive KPI Cards**: Total leads, pending verifications, BDM approvals, loan value
- **Leads Master Table**: All applicant records with status and action buttons
- **Detailed Lead Inspection**: Financial summary, calculator adjustments, communication tools
- **Decision Controls**: Forward to BDM, approve, reject, export CAM PDF
- **Admin Panel**: User management, staff registration approval, security controls, activity audit log

### 5. Mock Environment Features
- **OTP**: Accepts ANY 6-digit code as valid
- **File Uploads**: Accept any file, show 1-second "Scanning OCR..." spinner, auto-fill with dummy data
- **Automated Checks**: Green "PASSED / CLEARED" badges for Dedupe & CIB checks
- **Client Communication**: Pre-formatted messages + custom message input

## Installation

```bash
npm install
```

## Development Server

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

## Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   └── Header.jsx               # Role switcher & language toggle
├── pages/
│   ├── Wizard.jsx              # 7-step onboarding wizard
│   ├── Dashboard.jsx           # Multi-role dashboard router
│   ├── wizard/
│   │   ├── Step1.jsx          # Registration & Login
│   │   ├── Step2.jsx          # Personal Information (e-KYC)
│   │   ├── Step3.jsx          # Business & Financials
│   │   ├── Step4.jsx          # Loan Calculator
│   │   ├── Step5.jsx          # Other Business Info
│   │   ├── Step6.jsx          # Existing Loans
│   │   └── Step7.jsx          # Preview & Submit + Status Portal
│   └── dashboard/
│       ├── ROView.jsx         # RO Dashboard
│       ├── BDMView.jsx        # BDM Dashboard
│       └── AdminView.jsx      # Admin Control Panel
├── App.jsx                     # Main app component
├── main.jsx                    # Entry point
└── styles.css                  # Tailwind CSS

index.html                      # HTML template
vite.config.js                  # Vite configuration
tailwind.config.js              # Tailwind CSS configuration
postcss.config.js               # PostCSS configuration
package.json                    # Dependencies
```

## Key Technologies

- **React 18.2**: UI library
- **Vite 5.1**: Build tool & dev server
- **Tailwind CSS 3.3**: Utility-first CSS framework
- **Lucide React 0.263**: Icon library
- **React Router 6.14**: Client-side routing
- **i18next & react-i18next**: Internationalization (ready for i18n)

## Usage Guide

### Client Onboarding
1. Select role "Client" from header dropdown
2. Go to "/" (home page)
3. Complete all 7 steps of the wizard
4. Submit application to see live status tracking

### Staff Dashboards
1. Change role in header (RO, BDM, or Admin)
2. Navigate to "/dashboard"
3. View KPI cards and leads table
4. Click "Inspect" to view detailed lead information
5. Take actions (approve, reject, forward, send messages)

### Languages
Toggle between English and বাংলা using the language selector in the header. All forms, buttons, and notifications update in real-time.

## Mock Behaviors

- **OTP Verification**: Accepts any 6-digit code (no real verification)
- **File Uploads**: Accepts any file type without validation
- **OCR Scanning**: Shows 1-second spinner, then auto-fills with dummy data
- **Status Checks**: Automatically displays "PASSED" for Dedupe and "CLEARED" for CIB
- **Notifications**: Pre-formatted Bangla SMS message for RO contact notice
- **Status Progression**: Auto-advances through 6 stages in Step 7

## Color Scheme

| Element | Color | Code |
|---------|-------|------|
| Primary (Green) | Deep Forest Green | `#0D5C3A` |
| Background | Light Green | `#E8F5E9` |
| Cards | Crisp White | `#FFFFFF` |
| Borders | Soft Gray | `#E0E0E0` |

## Accessibility & Responsiveness

- Mobile-first design approach
- Responsive grid layouts (1 col mobile → 4 col desktop)
- WCAG-compliant color contrast ratios
- Keyboard navigation support via Tailwind focus states
- Icon + text labels for clarity

## Notes

This is a **prototype** demonstrating the complete user flows and design system. For production:
- Replace mock OTP with real authentication
- Implement actual file upload & OCR processing
- Connect to real backend APIs
- Add comprehensive error handling & validation
- Implement real database for audit logs
- Add role-based access control (RBAC) middleware
- Set up secure session management

## License

© 2026 SME Loan Onboarding System. All rights reserved.
