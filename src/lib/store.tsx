"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Tenant, 
  DoctorProfile, 
  PatientProfile, 
  Appointment, 
  VisitEncounter, 
  MedicalReport,
  AuthUser
} from './types';
import { 
  INITIAL_TENANTS, 
  INITIAL_DOCTORS, 
  INITIAL_PATIENTS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_VISIT_ENCOUNTERS, 
  INITIAL_REPORTS 
} from './mock-data';

interface StoreContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  login: (role: UserRole, email?: string) => void;
  logout: () => void;
  isAuthorizedForPatientPortal: () => boolean;

  activeTenant: Tenant;
  setActiveTenant: (tenant: Tenant) => void;
  tenants: Tenant[];
  currentPatient: PatientProfile;
  setCurrentPatient: (patient: PatientProfile) => void;
  currentDoctor: DoctorProfile;
  setCurrentDoctor: (doctor: DoctorProfile) => void;
  doctors: DoctorProfile[];
  patients: PatientProfile[];
  appointments: Appointment[];
  visits: VisitEncounter[];
  reports: MedicalReport[];
  
  // Operational Actions
  bookAppointment: (patientId: string, doctorId: string, date: string, timeSlot: string, reason: string) => Appointment;
  checkInAppointment: (appointmentId: string) => Appointment | null;
  startConsultation: (appointmentId: string) => void;
  completeConsultation: (appointmentId: string, visitData: Omit<VisitEncounter, 'id' | 'appointmentId'>) => void;
  cancelAppointment: (appointmentId: string) => void;
  registerWalkIn: (
    patientData: Omit<PatientProfile, 'id'>, 
    doctorId: string, 
    reason: string
  ) => { patient: PatientProfile; appointment: Appointment };
  uploadReport: (report: Omit<MedicalReport, 'id' | 'uploadDate'>) => MedicalReport;
  resetDemoData: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const STORAGE_KEYS = {
  ROLE: 'medisync_active_role',
  USER: 'medisync_current_user',
  TENANT: 'medisync_active_tenant',
  APPOINTMENTS: 'medisync_appointments',
  VISITS: 'medisync_visits',
  REPORTS: 'medisync_reports',
  PATIENTS: 'medisync_patients',
  DOCTORS: 'medisync_doctors',
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRoleState] = useState<UserRole>('PATIENT');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: INITIAL_PATIENTS[0].id,
    name: INITIAL_PATIENTS[0].name,
    email: INITIAL_PATIENTS[0].email,
    role: 'PATIENT'
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [activeTenant, setActiveTenantState] = useState<Tenant>(INITIAL_TENANTS[0]);
  const [tenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [patients, setPatients] = useState<PatientProfile[]>(INITIAL_PATIENTS);
  const [doctors, setDoctors] = useState<DoctorProfile[]>(INITIAL_DOCTORS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [visits, setVisits] = useState<VisitEncounter[]>(INITIAL_VISIT_ENCOUNTERS);
  const [reports, setReports] = useState<MedicalReport[]>(INITIAL_REPORTS);
  const [currentPatient, setCurrentPatient] = useState<PatientProfile>(INITIAL_PATIENTS[0]);
  const [currentDoctor, setCurrentDoctor] = useState<DoctorProfile>(INITIAL_DOCTORS[0]);

  // Load persisted state from localStorage on client mount
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
      if (savedRole) setActiveRoleState(savedRole as UserRole);

      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }

      const savedTenant = localStorage.getItem(STORAGE_KEYS.TENANT);
      if (savedTenant) setActiveTenantState(JSON.parse(savedTenant));

      const savedApts = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      if (savedApts) setAppointments(JSON.parse(savedApts));

      const savedVisits = localStorage.getItem(STORAGE_KEYS.VISITS);
      if (savedVisits) setVisits(JSON.parse(savedVisits));

      const savedReports = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (savedReports) setReports(JSON.parse(savedReports));

      const savedPatients = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      if (savedPatients) setPatients(JSON.parse(savedPatients));
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  // Sync to localStorage
  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.ROLE, role);
    
    // Auto-update currentUser according to role for smooth demonstration
    let userObj: AuthUser;
    if (role === 'PATIENT') {
      userObj = { id: currentPatient.id, name: currentPatient.name, email: currentPatient.email, role: 'PATIENT' };
    } else if (role === 'DOCTOR') {
      userObj = { id: currentDoctor.id, name: currentDoctor.name, email: 'dr.mehta@metrohealth.example.com', role: 'DOCTOR' };
    } else if (role === 'RECEPTIONIST') {
      userObj = { id: 'rec-01', name: 'Front Desk Reception', email: 'reception@metrohealth.example.com', role: 'RECEPTIONIST' };
    } else {
      userObj = { id: 'admin-01', name: 'Dr. Aris Thorne (CEO)', email: 'admin@metrohealth.example.com', role: 'MANAGEMENT' };
    }
    setCurrentUser(userObj);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userObj));
  };

  const login = (role: UserRole, email?: string) => {
    setActiveRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  };

  // Critical Security Rule: ONLY Patient and Doctor are authorized to access Patient PHI/Portal!
  const isAuthorizedForPatientPortal = (): boolean => {
    return activeRole === 'PATIENT' || activeRole === 'DOCTOR';
  };

  const setActiveTenant = (tenant: Tenant) => {
    setActiveTenantState(tenant);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.TENANT, JSON.stringify(tenant));
  };

  const saveAppointments = (apts: Appointment[]) => {
    setAppointments(apts);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(apts));
  };

  const saveVisits = (v: VisitEncounter[]) => {
    setVisits(v);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(v));
  };

  const saveReports = (r: MedicalReport[]) => {
    setReports(r);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(r));
  };

  const savePatients = (p: PatientProfile[]) => {
    setPatients(p);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(p));
  };

  // Helper to generate dynamic token numbers like CARD-105 or PULM-103
  const generateToken = (dept: string): string => {
    const prefix = dept.slice(0, 4).toUpperCase();
    const existingForDept = appointments.filter(a => a.department === dept && a.tokenNumber);
    const count = existingForDept.length + 101;
    return `${prefix}-${count}`;
  };

  // 1. Book an appointment
  const bookAppointment = (
    patientId: string, 
    doctorId: string, 
    date: string, 
    timeSlot: string, 
    reason: string
  ): Appointment => {
    const patient = patients.find(p => p.id === patientId) || currentPatient;
    const doctor = doctors.find(d => d.id === doctorId) || doctors[0];

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: patient.id,
      patientName: patient.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: doctor.department,
      date,
      timeSlot,
      status: 'BOOKED',
      reason,
      feePaid: false,
      amount: doctor.consultationFee,
    };

    saveAppointments([newApt, ...appointments]);
    return newApt;
  };

  // 2. Check in appointment at Receptionist desk
  const checkInAppointment = (appointmentId: string): Appointment | null => {
    const target = appointments.find(a => a.id === appointmentId);
    if (!target) return null;

    const token = target.tokenNumber || generateToken(target.department);
    const updated: Appointment = {
      ...target,
      status: 'CHECKED_IN',
      tokenNumber: token,
      feePaid: true,
      checkedInAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newApts = appointments.map(a => a.id === appointmentId ? updated : a);
    saveAppointments(newApts);
    return updated;
  };

  // 3. Start consultation in Doctor's room
  const startConsultation = (appointmentId: string) => {
    const newApts = appointments.map(a => 
      a.id === appointmentId ? { ...a, status: 'IN_CONSULTATION' as const } : a
    );
    saveAppointments(newApts);
  };

  // 4. Complete consultation and push into Patient's Timeline
  const completeConsultation = (
    appointmentId: string, 
    visitData: Omit<VisitEncounter, 'id' | 'appointmentId'>
  ) => {
    const completedAtTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Update appointment
    const newApts = appointments.map(a => 
      a.id === appointmentId ? { ...a, status: 'COMPLETED' as const, completedAt: completedAtTime } : a
    );
    saveAppointments(newApts);

    // Create permanent Visit Encounter
    const newVisit: VisitEncounter = {
      ...visitData,
      id: `vis-${Date.now()}`,
      appointmentId,
    };

    saveVisits([newVisit, ...visits]);
  };

  // 5. Cancel appointment
  const cancelAppointment = (appointmentId: string) => {
    const newApts = appointments.map(a => 
      a.id === appointmentId ? { ...a, status: 'CANCELLED' as const } : a
    );
    saveAppointments(newApts);
  };

  // 6. Fast walk-in registration at front desk
  const registerWalkIn = (
    patientData: Omit<PatientProfile, 'id'>, 
    doctorId: string, 
    reason: string
  ): { patient: PatientProfile; appointment: Appointment } => {
    const newPatient: PatientProfile = {
      ...patientData,
      id: `pat-${Date.now()}`,
    };

    const updatedPatients = [newPatient, ...patients];
    savePatients(updatedPatients);

    const doctor = doctors.find(d => d.id === doctorId) || doctors[0];
    const token = generateToken(doctor.department);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: newPatient.id,
      patientName: newPatient.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: doctor.department,
      date: new Date().toISOString().split('T')[0],
      timeSlot: nowTime,
      status: 'CHECKED_IN',
      tokenNumber: token,
      reason,
      feePaid: true,
      amount: doctor.consultationFee,
      checkedInAt: nowTime,
    };

    saveAppointments([newApt, ...appointments]);
    return { patient: newPatient, appointment: newApt };
  };

  // 7. Upload new report
  const uploadReport = (reportData: Omit<MedicalReport, 'id' | 'uploadDate'>): MedicalReport => {
    const newReport: MedicalReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
    };

    saveReports([newReport, ...reports]);
    return newReport;
  };

  // Reset to initial demo state
  const resetDemoData = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    setAppointments(INITIAL_APPOINTMENTS);
    setVisits(INITIAL_VISIT_ENCOUNTERS);
    setReports(INITIAL_REPORTS);
    setPatients(INITIAL_PATIENTS);
    setDoctors(INITIAL_DOCTORS);
    setActiveRoleState('PATIENT');
    setCurrentPatient(INITIAL_PATIENTS[0]);
    setCurrentDoctor(INITIAL_DOCTORS[0]);
    setCurrentUser({
      id: INITIAL_PATIENTS[0].id,
      name: INITIAL_PATIENTS[0].name,
      email: INITIAL_PATIENTS[0].email,
      role: 'PATIENT'
    });
    setIsAuthenticated(true);
  };

  return (
    <StoreContext.Provider value={{
      activeRole,
      setActiveRole,
      currentUser,
      isAuthenticated,
      login,
      logout,
      isAuthorizedForPatientPortal,
      activeTenant,
      setActiveTenant,
      tenants,
      currentPatient,
      setCurrentPatient,
      currentDoctor,
      setCurrentDoctor,
      doctors,
      patients,
      appointments,
      visits,
      reports,
      bookAppointment,
      checkInAppointment,
      startConsultation,
      completeConsultation,
      cancelAppointment,
      registerWalkIn,
      uploadReport,
      resetDemoData,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
