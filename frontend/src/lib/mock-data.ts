import { 
  Tenant, 
  DoctorProfile, 
  PatientProfile, 
  Appointment, 
  VisitEncounter, 
  MedicalReport 
} from './types';

export const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'tenant-metro',
    name: 'Metro Health Multispecialty Clinic',
    slug: 'metro-health',
    tagline: 'Modern, Patient-First Outpatient Care',
    phone: '+1 (555) 234-5678',
    email: 'frontdesk@metrohealth.example.com',
    address: '742 Healthcare Parkway, Suite 300',
    currency: '$',
  },
  {
    id: 'tenant-apex',
    name: 'Apex Cardiology & Diagnostic Centre',
    slug: 'apex-cardio',
    tagline: 'Precision Diagnostics & Heart Health',
    phone: '+1 (555) 987-6543',
    email: 'care@apexcardio.example.com',
    address: '120 Innovation Boulevard, Medical District',
    currency: '$',
  }
];

export const INITIAL_DOCTORS: DoctorProfile[] = [
  {
    id: 'doc-1',
    name: 'Dr. Vikram Mehta',
    title: 'Senior Consultant Cardiologist',
    department: 'Cardiology',
    qualification: 'MD, DM (Cardiology), FACC',
    roomNumber: 'Room 204',
    consultationFee: 65,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    dutyStatus: 'IN_SESSION',
  },
  {
    id: 'doc-2',
    name: 'Dr. Elena Rostova',
    title: 'Consultant Pulmonologist',
    department: 'Pulmonology',
    qualification: 'MD (Respiratory Medicine), FCCP',
    roomNumber: 'Room 108',
    consultationFee: 55,
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    dutyStatus: 'ON_DUTY',
  },
  {
    id: 'doc-3',
    name: 'Dr. Ananya Iyer',
    title: 'Specialist Pediatrician',
    department: 'Pediatrics',
    qualification: 'MBBS, DCH, DNB (Pediatrics)',
    roomNumber: 'Room 112',
    consultationFee: 45,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    dutyStatus: 'ON_DUTY',
  },
  {
    id: 'doc-4',
    name: 'Dr. Marcus Chen',
    title: 'Orthopedic & Joint Surgeon',
    department: 'Orthopedics',
    qualification: 'MS (Orthopedics), MCh',
    roomNumber: 'Room 305',
    consultationFee: 75,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    dutyStatus: 'ON_BREAK',
  },
];

export const INITIAL_PATIENTS: PatientProfile[] = [
  {
    id: 'pat-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+1 (555) 839-2041',
    gender: 'MALE',
    dob: '1990-06-14',
    bloodGroup: 'B Positive (B+)',
    emergencyContact: 'Sunita Sharma (Spouse) - +1 (555) 839-2042',
    knownAllergies: ['Penicillin', 'Sulfa Drugs'],
    chronicConditions: ['Type 2 Diabetes Mellitus', 'Mild Hypertension'],
  },
  {
    id: 'pat-2',
    name: 'Emily Watson',
    email: 'emily.watson@example.com',
    phone: '+1 (555) 492-1184',
    gender: 'FEMALE',
    dob: '1978-11-22',
    bloodGroup: 'O Positive (O+)',
    emergencyContact: 'Mark Watson (Brother) - +1 (555) 492-9900',
    knownAllergies: ['Latex'],
    chronicConditions: ['Asthma (Mild Persistent)'],
  },
  {
    id: 'pat-3',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+1 (555) 301-4477',
    gender: 'FEMALE',
    dob: '1998-03-05',
    bloodGroup: 'A Positive (A+)',
    emergencyContact: 'Karan Patel - +1 (555) 301-8899',
    knownAllergies: [],
    chronicConditions: [],
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    patientId: 'pat-1',
    patientName: 'Rahul Sharma',
    doctorId: 'doc-1',
    doctorName: 'Dr. Vikram Mehta',
    department: 'Cardiology',
    date: '2026-09-18',
    timeSlot: '10:00 AM',
    status: 'IN_CONSULTATION',
    tokenNumber: 'CARD-101',
    reason: 'Follow-up for blood pressure medication check and mild chest tightness',
    feePaid: true,
    amount: 65,
    checkedInAt: '09:48 AM',
  },
  {
    id: 'apt-102',
    patientId: 'pat-2',
    patientName: 'Emily Watson',
    doctorId: 'doc-2',
    doctorName: 'Dr. Elena Rostova',
    department: 'Pulmonology',
    date: '2026-09-18',
    timeSlot: '10:30 AM',
    status: 'CHECKED_IN',
    tokenNumber: 'PULM-102',
    reason: 'Persistent wheezing and seasonal asthma trigger evaluation',
    feePaid: true,
    amount: 55,
    checkedInAt: '10:15 AM',
  },
  {
    id: 'apt-103',
    patientId: 'pat-3',
    patientName: 'Priya Patel',
    doctorId: 'doc-1',
    doctorName: 'Dr. Vikram Mehta',
    department: 'Cardiology',
    date: '2026-09-18',
    timeSlot: '11:00 AM',
    status: 'BOOKED',
    reason: 'Routine annual cardiovascular screening and palpitations review',
    feePaid: false,
    amount: 65,
  },
  {
    id: 'apt-100',
    patientId: 'pat-1',
    patientName: 'Rahul Sharma',
    doctorId: 'doc-2',
    doctorName: 'Dr. Elena Rostova',
    department: 'Pulmonology',
    date: '2026-08-10',
    timeSlot: '09:30 AM',
    status: 'COMPLETED',
    tokenNumber: 'PULM-089',
    reason: 'Post-viral cough recovery check',
    feePaid: true,
    amount: 55,
    checkedInAt: '09:20 AM',
    completedAt: '09:50 AM',
  }
];

export const INITIAL_VISIT_ENCOUNTERS: VisitEncounter[] = [
  {
    id: 'vis-301',
    appointmentId: 'apt-100',
    patientId: 'pat-1',
    doctorId: 'doc-2',
    doctorName: 'Dr. Elena Rostova',
    department: 'Pulmonology',
    hospitalName: 'Metro Health Multispecialty Clinic',
    visitDate: '2026-08-10',
    chiefComplaint: 'Dry hacking cough for 3 weeks following seasonal viral flu. No fever or hemoptysis.',
    vitals: {
      bloodPressure: '128/82 mmHg',
      pulseRate: '76 bpm',
      temperature: '98.4 °F',
      weightKg: '78.5 kg',
      spo2: '99% on room air',
    },
    clinicalAssessment: 'Post-infectious bronchial hyperreactivity. Clear bilateral breath sounds with mild expiratory rhonchi.',
    doctorNotes: 'Advised warm saline gargles, adequate hydration, and avoidance of cold drafts. Short-course bronchodilator inhaler prescribed.',
    prescriptions: [
      {
        id: 'rx-1',
        medication: 'Budesonide / Formoterol Inhaler 200/6mcg',
        dosage: '2 puffs',
        frequency: 'Twice daily (Morning & Night)',
        duration: '14 days',
        instructions: 'Rinse mouth with water thoroughly after each inhalation',
      },
      {
        id: 'rx-2',
        medication: 'Levocetirizine 5mg',
        dosage: '1 tablet',
        frequency: 'Once daily at bedtime',
        duration: '7 days',
        instructions: 'Take after dinner',
      },
    ],
  },
  {
    id: 'vis-202',
    patientId: 'pat-1',
    doctorId: 'doc-1',
    doctorName: 'Dr. Vikram Mehta',
    department: 'Cardiology',
    hospitalName: 'Metro Health Multispecialty Clinic',
    visitDate: '2026-05-15',
    chiefComplaint: 'Routine 6-month diabetic & cardiovascular review. Reports occasional morning headaches.',
    vitals: {
      bloodPressure: '142/90 mmHg (elevated)',
      pulseRate: '82 bpm',
      temperature: '98.6 °F',
      weightKg: '80 kg',
      spo2: '98%',
    },
    clinicalAssessment: 'Stage 1 Essential Hypertension in setting of established T2DM. Blood sugar moderately controlled.',
    doctorNotes: 'Initiated low-dose ACE inhibitor therapy. Emphasized dietary sodium restriction (< 2g/day) and 30 minutes daily brisk walking.',
    prescriptions: [
      {
        id: 'rx-3',
        medication: 'Telmisartan 40mg',
        dosage: '1 tablet',
        frequency: 'Once daily (Morning)',
        duration: '90 days',
        instructions: 'Take consistently at 8:00 AM before breakfast',
      },
      {
        id: 'rx-4',
        medication: 'Metformin Hydrochloride 500mg (Extended Release)',
        dosage: '1 tablet',
        frequency: 'Twice daily (1-0-1)',
        duration: '90 days',
        instructions: 'Take with major meals to minimize gastric upset',
      },
    ],
  }
];

export const INITIAL_REPORTS: MedicalReport[] = [
  {
    id: 'rep-01',
    patientId: 'pat-1',
    title: 'Comprehensive Lipid & Cholesterol Profile',
    category: 'BLOOD_TEST',
    uploadDate: '2026-09-02',
    facilityName: 'Metro Diagnostics Central Lab',
    doctorName: 'Dr. Vikram Mehta',
    rawFindingsText: `FASTING LIPID PROFILE
Total Cholesterol: 228 mg/dL [Reference: < 200 mg/dL] - HIGH
Triglycerides: 195 mg/dL [Reference: < 150 mg/dL] - HIGH
HDL Cholesterol: 42 mg/dL [Reference: > 40 mg/dL] - NORMAL
LDL Cholesterol (Calculated): 147 mg/dL [Reference: < 100 mg/dL] - ELEVATED
Cholesterol / HDL Ratio: 5.4 [Reference: < 4.5] - ELEVATED`,
    aiExplanation: {
      plainSummary: 'Your cholesterol report indicates that your "bad" cholesterol (LDL) and overall blood fats (Triglycerides) are moderately elevated, while your "good" cholesterol (HDL) is within a safe baseline.',
      urgencyLevel: 'MODERATE',
      findings: [
        {
          metric: 'Total Cholesterol',
          value: '228 mg/dL',
          referenceRange: 'Less than 200 mg/dL',
          status: 'HIGH',
          laymanExplanation: 'The total amount of fats in your bloodstream is slightly higher than optimal, which can build plaque in arteries over time.',
        },
        {
          metric: 'LDL ("Bad") Cholesterol',
          value: '147 mg/dL',
          referenceRange: 'Less than 100 mg/dL',
          status: 'HIGH',
          laymanExplanation: 'LDL carries cholesterol into your arteries. Your level is elevated and warrants lifestyle modifications or statin review.',
        },
        {
          metric: 'HDL ("Good") Cholesterol',
          value: '42 mg/dL',
          referenceRange: 'Greater than 40 mg/dL',
          status: 'NORMAL',
          laymanExplanation: 'HDL acts like a scavenger cleaning up fats. Yours is currently in an acceptable range.',
        },
        {
          metric: 'Triglycerides',
          value: '195 mg/dL',
          referenceRange: 'Less than 150 mg/dL',
          status: 'HIGH',
          laymanExplanation: 'Fat stored from extra calories in your diet. Elevated triglycerides often relate to refined carbohydrates and sugar intake.',
        }
      ],
      questionsForDoctor: [
        'Do I need to adjust my diet first, or should we consider starting a cholesterol-lowering medication (statin)?',
        'How does my elevated LDL impact my cardiovascular risk given my mild hypertension?',
        'When should I repeat this fasting lipid panel to measure progress?'
      ],
      actionableTips: [
        'Replace saturated cooking fats with heart-healthy monounsaturated oils (olive oil, mustard oil).',
        'Increase soluble dietary fiber (oats, legumes, leafy greens) which binds cholesterol in the digestive tract.',
        'Target at least 150 minutes of moderate aerobic exercise (brisk walking, cycling) per week.'
      ],
      disclaimer: 'This explanation is generated by AI to help you understand medical findings and should be discussed directly with your physician.'
    }
  },
  {
    id: 'rep-02',
    patientId: 'pat-1',
    title: 'Chest Radiograph (X-Ray PA View)',
    category: 'RADIOLOGY',
    uploadDate: '2026-08-11',
    facilityName: 'Metro Imaging & Radiology Dept',
    doctorName: 'Dr. Elena Rostova',
    rawFindingsText: `CHEST PA VIEW RADIOGRAPH
CLINICAL INDICATION: Post-viral persistent dry cough.
FINDINGS:
- Trachea is midline.
- Lung fields show clear vascular markings without focal airspace consolidation, mass, or cavitation.
- Costophrenic and cardiophrenic sulci are sharp and clear bilaterally; no pleural effusion or pneumothorax.
- Cardiothoracic ratio is 0.48, well within normal limits (< 0.50).
- Visualized bony thorax and soft tissue structures are intact.
IMPRESSION: Clear lung fields bilaterally. No acute pulmonary infiltrate, effusion, or active disease.`,
    aiExplanation: {
      plainSummary: 'Your chest X-ray is clean and reassuring. Both lungs are clear with no signs of pneumonia, fluid buildup, or heart enlargement.',
      urgencyLevel: 'LOW',
      findings: [
        {
          metric: 'Lung Fields',
          value: 'Clear bilaterally',
          referenceRange: 'Clear',
          status: 'NORMAL',
          laymanExplanation: 'No signs of lung infection, pneumonia, or suspicious shadows were found.',
        },
        {
          metric: 'Heart Size (Cardiothoracic Ratio)',
          value: '0.48 (Normal)',
          referenceRange: '< 0.50',
          status: 'NORMAL',
          laymanExplanation: 'Your heart size is completely normal and proportionate to your chest width.',
        },
        {
          metric: 'Pleural Spaces (Sulci)',
          value: 'Sharp and clear',
          referenceRange: 'Clear',
          status: 'NORMAL',
          laymanExplanation: 'There is no fluid accumulated around the lining of either lung.',
        }
      ],
      questionsForDoctor: [
        'Since my X-ray is normal, is my cough purely due to airway irritation/allergy?',
        'How long will it take for the airway sensitivity to resolve?'
      ],
      actionableTips: [
        'Avoid exposure to active/passive tobacco smoke and dusty environments.',
        'Use steam inhalation once or twice daily to soothe irritated bronchi.'
      ],
      disclaimer: 'AI report translations provide informational context and do not substitute for official radiological consultation.'
    }
  }
];
