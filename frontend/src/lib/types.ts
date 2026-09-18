export type UserRole = 'PATIENT' | 'RECEPTIONIST' | 'DOCTOR' | 'MANAGEMENT';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  currency: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dob: string;
  bloodGroup: string;
  emergencyContact: string;
  knownAllergies: string[];
  chronicConditions: string[];
}

export interface DoctorProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  qualification: string;
  roomNumber: string;
  consultationFee: number;
  availableDays: string[];
  dutyStatus: 'ON_DUTY' | 'IN_SESSION' | 'ON_BREAK' | 'OFF_DUTY';
}

export type AppointmentStatus = 'BOOKED' | 'CHECKED_IN' | 'IN_CONSULTATION' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:30 AM"
  status: AppointmentStatus;
  tokenNumber?: string; // e.g. "CARD-101"
  reason: string;
  feePaid: boolean;
  amount: number;
  checkedInAt?: string;
  completedAt?: string;
}

export interface PrescriptionItem {
  id: string;
  medication: string;
  dosage: string;
  frequency: string; // e.g. "1-0-1" or "Once daily"
  duration: string; // e.g. "7 days"
  instructions: string; // e.g. "Take after meals"
}

export interface VisitEncounter {
  id: string;
  appointmentId?: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  department: string;
  hospitalName: string;
  visitDate: string;
  chiefComplaint: string;
  vitals: {
    bloodPressure?: string;
    pulseRate?: string;
    temperature?: string;
    weightKg?: string;
    spo2?: string;
  };
  clinicalAssessment: string; // SOAP - Assessment / Diagnosis
  doctorNotes: string; // SOAP - Plan & advice
  prescriptions: PrescriptionItem[];
}

export interface MetricFinding {
  metric: string;
  value: string;
  referenceRange?: string;
  status: 'NORMAL' | 'HIGH' | 'LOW' | 'FLAGGED';
  laymanExplanation: string;
}

export interface AIReportExplanation {
  plainSummary: string;
  urgencyLevel: 'LOW' | 'MODERATE' | 'ATTENTION_REQUIRED';
  findings: MetricFinding[];
  questionsForDoctor: string[];
  actionableTips: string[];
  disclaimer: string;
}

export interface MedicalReport {
  id: string;
  patientId: string;
  title: string;
  category: 'BLOOD_TEST' | 'RADIOLOGY' | 'CARDIOLOGY' | 'PRESCRIPTION' | 'PATHOLOGY';
  uploadDate: string;
  fileUrl?: string;
  facilityName: string;
  doctorName?: string;
  rawFindingsText: string;
  aiExplanation?: AIReportExplanation;
}
