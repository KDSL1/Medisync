"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Tenant, 
  DoctorProfile, 
  PatientProfile, 
  ReceptionistProfile,
  Appointment, 
  VisitEncounter, 
  MedicalReport,
  AuthUser
} from './types';
import { 
  INITIAL_TENANTS, 
  INITIAL_DOCTORS, 
  INITIAL_PATIENTS, 
  INITIAL_RECEPTIONISTS,
  INITIAL_APPOINTMENTS, 
  INITIAL_VISIT_ENCOUNTERS, 
  INITIAL_REPORTS 
} from './mock-data';

interface StoreContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  login: (role: UserRole, email?: string, isVerified?: boolean) => void;
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
  receptionists: ReceptionistProfile[];
  appointments: Appointment[];
  visits: VisitEncounter[];
  reports: MedicalReport[];
  
  // Hierarchy Provisioning & Verification Actions
  provisionHospital: (tenantData: Omit<Tenant, 'id'>) => Tenant;
  verifyHospital: (tenantId: string, isVerified: boolean) => void;
  provisionDoctor: (doctorData: Omit<DoctorProfile, 'id'>) => DoctorProfile;
  verifyDoctor: (doctorId: string, isVerified: boolean) => void;
  provisionReceptionist: (receptionistData: Omit<ReceptionistProfile, 'id'>) => ReceptionistProfile;
  verifyReceptionist: (receptionistId: string, isVerified: boolean) => void;
  verifyPatient: (patientId: string, isVerified: boolean) => void;
  verifyCurrentUser: () => void;
  toggleCurrentUserVerification: () => void;

  // Operational Actions
  bookAppointment: (patientId: string, doctorId: string, date: string, timeSlot: string, reason: string) => Appointment;
  checkInAppointment: (appointmentId: string) => Appointment | null;
  startConsultation: (appointmentId: string) => void;
  completeConsultation: (appointmentId: string, visitData: Omit<VisitEncounter, 'id' | 'appointmentId'>) => void;
  cancelAppointment: (appointmentId: string) => void;
  registerWalkIn: (
    patientData: Omit<PatientProfile, 'id' | 'isVerified' | 'verificationStatus'>, 
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
  TENANTS_LIST: 'medisync_tenants_list',
  APPOINTMENTS: 'medisync_appointments',
  VISITS: 'medisync_visits',
  REPORTS: 'medisync_reports',
  PATIENTS: 'medisync_patients',
  DOCTORS: 'medisync_doctors',
  RECEPTIONISTS: 'medisync_receptionists',
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRoleState] = useState<UserRole>('PATIENT');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: INITIAL_PATIENTS[0].id,
    name: INITIAL_PATIENTS[0].name,
    email: INITIAL_PATIENTS[0].email,
    role: 'PATIENT',
    isVerified: true,
    verificationStatus: 'VERIFIED',
    tenantId: INITIAL_PATIENTS[0].hospitalId || INITIAL_TENANTS[0].id
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [activeTenant, setActiveTenantState] = useState<Tenant>(INITIAL_TENANTS[0]);
  const [tenants, setTenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [patients, setPatients] = useState<PatientProfile[]>(INITIAL_PATIENTS);
  const [doctors, setDoctors] = useState<DoctorProfile[]>(INITIAL_DOCTORS);
  const [receptionists, setReceptionists] = useState<ReceptionistProfile[]>(INITIAL_RECEPTIONISTS);
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

      const savedTenantsList = localStorage.getItem(STORAGE_KEYS.TENANTS_LIST);
      if (savedTenantsList) setTenants(JSON.parse(savedTenantsList));

      const savedApts = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      if (savedApts) setAppointments(JSON.parse(savedApts));

      const savedVisits = localStorage.getItem(STORAGE_KEYS.VISITS);
      if (savedVisits) setVisits(JSON.parse(savedVisits));

      const savedReports = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (savedReports) setReports(JSON.parse(savedReports));

      const savedPatients = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      if (savedPatients) setPatients(JSON.parse(savedPatients));

      const savedDoctors = localStorage.getItem(STORAGE_KEYS.DOCTORS);
      if (savedDoctors) setDoctors(JSON.parse(savedDoctors));

      const savedReceptionists = localStorage.getItem(STORAGE_KEYS.RECEPTIONISTS);
      if (savedReceptionists) setReceptionists(JSON.parse(savedReceptionists));
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
      userObj = { 
        id: currentPatient.id, 
        name: currentPatient.name, 
        email: currentPatient.email, 
        role: 'PATIENT',
        isVerified: currentPatient.isVerified,
        verificationStatus: currentPatient.verificationStatus,
        tenantId: currentPatient.hospitalId || activeTenant.id
      };
    } else if (role === 'DOCTOR') {
      userObj = { 
        id: currentDoctor.id, 
        name: currentDoctor.name, 
        email: currentDoctor.email || 'dr.mehta@metrohealth.example.com', 
        role: 'DOCTOR',
        isVerified: currentDoctor.isVerified,
        verificationStatus: currentDoctor.verificationStatus,
        tenantId: currentDoctor.hospitalId || activeTenant.id
      };
    } else if (role === 'RECEPTIONIST') {
      userObj = { 
        id: 'rec-01', 
        name: 'Front Desk Reception', 
        email: 'reception@metrohealth.example.com', 
        role: 'RECEPTIONIST',
        isVerified: true,
        verificationStatus: 'VERIFIED',
        tenantId: activeTenant.id
      };
    } else if (role === 'MANAGEMENT') {
      userObj = { 
        id: 'admin-01', 
        name: activeTenant.adminName || 'Dr. Aris Thorne (CEO)', 
        email: activeTenant.adminEmail, 
        role: 'MANAGEMENT',
        isVerified: activeTenant.isVerified,
        verificationStatus: activeTenant.isVerified ? 'VERIFIED' : 'PENDING',
        tenantId: activeTenant.id
      };
    } else {
      userObj = { 
        id: 'super-admin-root', 
        name: 'Super Admin (Platform Owner)', 
        email: 'superadmin@medisync360.com', 
        role: 'SUPER_ADMIN',
        isVerified: true,
        verificationStatus: 'VERIFIED'
      };
    }
    setCurrentUser(userObj);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userObj));
  };

  const login = (role: UserRole, email?: string, isVerified?: boolean) => {
    setActiveRole(role);
    if (isVerified !== undefined && currentUser) {
      const updatedUser: AuthUser = {
        ...currentUser,
        role,
        email: email || currentUser.email,
        isVerified,
        verificationStatus: isVerified ? 'VERIFIED' : 'PENDING'
      };
      setCurrentUser(updatedUser);
      if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    }
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
    return activeRole === 'PATIENT' || activeRole === 'DOCTOR' || activeRole === 'SUPER_ADMIN';
  };

  const setActiveTenant = (tenant: Tenant) => {
    setActiveTenantState(tenant);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.TENANT, JSON.stringify(tenant));
  };

  const saveTenants = (tList: Tenant[]) => {
    setTenants(tList);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.TENANTS_LIST, JSON.stringify(tList));
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

  const saveDoctors = (d: DoctorProfile[]) => {
    setDoctors(d);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(d));
  };

  const saveReceptionists = (r: ReceptionistProfile[]) => {
    setReceptionists(r);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.RECEPTIONISTS, JSON.stringify(r));
  };

  // ----------------------------------------------------
  // Level 1: Super Admin Provisioning & Verification
  // ----------------------------------------------------
  const provisionHospital = (tenantData: Omit<Tenant, 'id'>): Tenant => {
    const newTenant: Tenant = {
      ...tenantData,
      id: `tenant-${Date.now()}`,
      activeSince: new Date().toISOString().split('T')[0],
    };
    const updated = [newTenant, ...tenants];
    saveTenants(updated);
    return newTenant;
  };

  const verifyHospital = (tenantId: string, isVerified: boolean) => {
    const updated = tenants.map(t => 
      t.id === tenantId ? { ...t, isVerified } : t
    );
    saveTenants(updated);
    if (activeTenant.id === tenantId) {
      setActiveTenantState({ ...activeTenant, isVerified });
    }
  };

  // ----------------------------------------------------
  // Level 2: Hospital Admin Staff & Patient Verification
  // ----------------------------------------------------
  const provisionDoctor = (doctorData: Omit<DoctorProfile, 'id'>): DoctorProfile => {
    const newDoc: DoctorProfile = {
      ...doctorData,
      id: `doc-${Date.now()}`,
    };
    const updated = [newDoc, ...doctors];
    saveDoctors(updated);
    return newDoc;
  };

  const verifyDoctor = (doctorId: string, isVerified: boolean) => {
    const updated = doctors.map(d => 
      d.id === doctorId 
        ? { ...d, isVerified, verificationStatus: isVerified ? ('VERIFIED' as const) : ('PENDING' as const) } 
        : d
    );
    saveDoctors(updated);
    if (currentDoctor.id === doctorId) {
      setCurrentDoctor({ 
        ...currentDoctor, 
        isVerified, 
        verificationStatus: isVerified ? 'VERIFIED' : 'PENDING' 
      });
    }
  };

  const provisionReceptionist = (receptionistData: Omit<ReceptionistProfile, 'id'>): ReceptionistProfile => {
    const newRec: ReceptionistProfile = {
      ...receptionistData,
      id: `rec-${Date.now()}`,
    };
    const updated = [newRec, ...receptionists];
    saveReceptionists(updated);
    return newRec;
  };

  const verifyReceptionist = (receptionistId: string, isVerified: boolean) => {
    const updated = receptionists.map(r => 
      r.id === receptionistId 
        ? { ...r, isVerified, verificationStatus: isVerified ? ('VERIFIED' as const) : ('PENDING' as const) } 
        : r
    );
    saveReceptionists(updated);
  };

  const verifyPatient = (patientId: string, isVerified: boolean) => {
    const updated = patients.map(p => 
      p.id === patientId 
        ? { ...p, isVerified, verificationStatus: isVerified ? ('VERIFIED' as const) : ('PENDING' as const) } 
        : p
    );
    savePatients(updated);
    if (currentPatient.id === patientId) {
      setCurrentPatient({ 
        ...currentPatient, 
        isVerified, 
        verificationStatus: isVerified ? 'VERIFIED' : 'PENDING' 
      });
    }
  };

  // Instant 1-click verification for currentUser (administrative demo simulator)
  const verifyCurrentUser = () => {
    if (!currentUser) return;
    const updated: AuthUser = {
      ...currentUser,
      isVerified: true,
      verificationStatus: 'VERIFIED'
    };
    setCurrentUser(updated);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));

    // Also update respective list record
    if (currentUser.role === 'DOCTOR') {
      verifyDoctor(currentUser.id, true);
    } else if (currentUser.role === 'PATIENT') {
      verifyPatient(currentUser.id, true);
    } else if (currentUser.role === 'MANAGEMENT' && activeTenant) {
      verifyHospital(activeTenant.id, true);
    }
  };

  const toggleCurrentUserVerification = () => {
    if (!currentUser) return;
    const newStatus = !currentUser.isVerified;
    const updated: AuthUser = {
      ...currentUser,
      isVerified: newStatus,
      verificationStatus: newStatus ? 'VERIFIED' : 'PENDING'
    };
    setCurrentUser(updated);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
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
    patientData: Omit<PatientProfile, 'id' | 'isVerified' | 'verificationStatus'>, 
    doctorId: string, 
    reason: string
  ): { patient: PatientProfile; appointment: Appointment } => {
    const newPatient: PatientProfile = {
      ...patientData,
      id: `pat-${Date.now()}`,
      isVerified: true,
      verificationStatus: 'VERIFIED',
      hospitalId: activeTenant.id,
      abhaId: `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`
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
    setReceptionists(INITIAL_RECEPTIONISTS);
    setTenants(INITIAL_TENANTS);
    setActiveTenantState(INITIAL_TENANTS[0]);
    setActiveRoleState('PATIENT');
    setCurrentPatient(INITIAL_PATIENTS[0]);
    setCurrentDoctor(INITIAL_DOCTORS[0]);
    setCurrentUser({
      id: INITIAL_PATIENTS[0].id,
      name: INITIAL_PATIENTS[0].name,
      email: INITIAL_PATIENTS[0].email,
      role: 'PATIENT',
      isVerified: true,
      verificationStatus: 'VERIFIED',
      tenantId: INITIAL_TENANTS[0].id
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
      receptionists,
      appointments,
      visits,
      reports,
      provisionHospital,
      verifyHospital,
      provisionDoctor,
      verifyDoctor,
      provisionReceptionist,
      verifyReceptionist,
      verifyPatient,
      verifyCurrentUser,
      toggleCurrentUserVerification,
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
