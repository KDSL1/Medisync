"""
MediSync 360 - MongoDB Atlas Database Seeding Script
Populates the MongoDB Atlas cluster with realistic multi-tenant healthcare data.
"""

import os
import sys
from datetime import datetime, timezone
from typing import List, Dict, Any
from dotenv import load_dotenv

# Ensure backend root is on sys.path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.core.database import get_database, check_database_health

load_dotenv()

# ==============================================================================
# SEED DATA DEFINITIONS
# ==============================================================================

SEED_TENANTS: List[Dict[str, Any]] = [
    {
        "id": "tenant-metro",
        "name": "Metro Health Multispecialty Clinic",
        "slug": "metro-health",
        "tagline": "Modern, Patient-First Outpatient Care",
        "phone": "+1 (555) 234-5678",
        "email": "frontdesk@metrohealth.example.com",
        "address": "742 Healthcare Parkway, Suite 300",
        "currency": "$",
        "adminEmail": "admin@metrohealth.example.com",
        "adminName": "Dr. Aris Thorne (CEO)",
        "isVerified": True,
        "tier": "ENTERPRISE",
        "abdmFacilityId": "IN-MH-74291",
        "activeSince": "2024-01-15",
        "departments": ["Cardiology", "Pulmonology", "Pediatrics", "Orthopedics"],
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "tenant-apex",
        "name": "Apex Cardiology & Diagnostic Centre",
        "slug": "apex-cardio",
        "tagline": "Precision Diagnostics & Heart Health",
        "phone": "+1 (555) 987-6543",
        "email": "care@apexcardio.example.com",
        "address": "120 Innovation Boulevard, Medical District",
        "currency": "$",
        "adminEmail": "director@apexcardio.example.com",
        "adminName": "Dr. Sarah Jenkins",
        "isVerified": True,
        "tier": "REGIONAL",
        "abdmFacilityId": "IN-AC-10294",
        "activeSince": "2024-06-20",
        "departments": ["Cardiology", "Pathology", "Radiology"],
        "createdAt": datetime.now(timezone.utc).isoformat()
    }
]

SEED_DEPARTMENTS: List[Dict[str, Any]] = [
    {
        "id": "dept-cardio",
        "name": "Cardiology",
        "code": "CARD",
        "headDoctor": "Dr. Vikram Mehta",
        "activeRooms": ["Room 204", "Room 205"],
        "operatingHours": "08:00 AM - 06:00 PM"
    },
    {
        "id": "dept-pulm",
        "name": "Pulmonology",
        "code": "PULM",
        "headDoctor": "Dr. Elena Rostova",
        "activeRooms": ["Room 108"],
        "operatingHours": "09:00 AM - 05:00 PM"
    },
    {
        "id": "dept-peds",
        "name": "Pediatrics",
        "code": "PEDS",
        "headDoctor": "Dr. Ananya Iyer",
        "activeRooms": ["Room 112"],
        "operatingHours": "09:00 AM - 04:00 PM"
    },
    {
        "id": "dept-ortho",
        "name": "Orthopedics",
        "code": "ORTH",
        "headDoctor": "Dr. Marcus Chen",
        "activeRooms": ["Room 305"],
        "operatingHours": "10:00 AM - 07:00 PM"
    }
]

SEED_DOCTORS: List[Dict[str, Any]] = [
    {
        "id": "doc-1",
        "name": "Dr. Vikram Mehta",
        "email": "dr.mehta@metrohealth.example.com",
        "title": "Senior Consultant Cardiologist",
        "department": "Cardiology",
        "qualification": "MD, DM (Cardiology), FACC",
        "roomNumber": "Room 204",
        "consultationFee": 65,
        "availableDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "dutyStatus": "IN_SESSION",
        "hospitalId": "tenant-metro",
        "isVerified": True,
        "verificationStatus": "VERIFIED",
        "activeToken": "CARD-101",
        "rating": 4.9,
        "totalConsultations": 1420
    },
    {
        "id": "doc-2",
        "name": "Dr. Elena Rostova",
        "email": "dr.rostova@metrohealth.example.com",
        "title": "Consultant Pulmonologist",
        "department": "Pulmonology",
        "qualification": "MD (Respiratory Medicine), FCCP",
        "roomNumber": "Room 108",
        "consultationFee": 55,
        "availableDays": ["Monday", "Wednesday", "Friday", "Saturday"],
        "dutyStatus": "ON_DUTY",
        "hospitalId": "tenant-metro",
        "isVerified": True,
        "verificationStatus": "VERIFIED",
        "rating": 4.8,
        "totalConsultations": 980
    },
    {
        "id": "doc-3",
        "name": "Dr. Ananya Iyer",
        "email": "dr.iyer@metrohealth.example.com",
        "title": "Specialist Pediatrician",
        "department": "Pediatrics",
        "qualification": "MBBS, DCH, DNB (Pediatrics)",
        "roomNumber": "Room 112",
        "consultationFee": 45,
        "availableDays": ["Tuesday", "Thursday", "Saturday"],
        "dutyStatus": "ON_DUTY",
        "hospitalId": "tenant-metro",
        "isVerified": True,
        "verificationStatus": "VERIFIED",
        "rating": 4.95,
        "totalConsultations": 1650
    },
    {
        "id": "doc-4",
        "name": "Dr. Marcus Chen",
        "email": "dr.chen@metrohealth.example.com",
        "title": "Orthopedic & Joint Surgeon",
        "department": "Orthopedics",
        "qualification": "MS (Orthopedics), MCh",
        "roomNumber": "Room 305",
        "consultationFee": 75,
        "availableDays": ["Monday", "Tuesday", "Thursday", "Friday"],
        "dutyStatus": "ON_BREAK",
        "hospitalId": "tenant-metro",
        "isVerified": False,
        "verificationStatus": "PENDING",
        "rating": 4.7,
        "totalConsultations": 740
    }
]

SEED_RECEPTIONISTS: List[Dict[str, Any]] = [
    {
        "id": "rec-01",
        "name": "Front Desk Reception",
        "email": "reception@metrohealth.example.com",
        "hospitalId": "tenant-metro",
        "counterNumber": "Desk 1 (Central Triage)",
        "isVerified": True,
        "verificationStatus": "VERIFIED"
    },
    {
        "id": "rec-02",
        "name": "Kavita Roy (OPD Counter)",
        "email": "kavita.roy@metrohealth.example.com",
        "hospitalId": "tenant-metro",
        "counterNumber": "Desk 2 (Express Intake)",
        "isVerified": True,
        "verificationStatus": "VERIFIED"
    }
]

SEED_PATIENTS: List[Dict[str, Any]] = [
    {
        "id": "pat-1",
        "name": "Rahul Sharma",
        "email": "rahul.sharma@example.com",
        "phone": "+1 (555) 839-2041",
        "gender": "MALE",
        "dob": "1990-06-14",
        "bloodGroup": "B Positive (B+)",
        "emergencyContact": "Sunita Sharma (Spouse) - +1 (555) 839-2042",
        "knownAllergies": ["Penicillin", "Sulfa Drugs"],
        "chronicConditions": ["Type 2 Diabetes Mellitus", "Mild Hypertension"],
        "hospitalId": "tenant-metro",
        "abhaId": "91-4829-1029-4820",
        "isVerified": True,
        "verificationStatus": "VERIFIED"
    },
    {
        "id": "pat-2",
        "name": "Emily Watson",
        "email": "emily.watson@example.com",
        "phone": "+1 (555) 492-1184",
        "gender": "FEMALE",
        "dob": "1978-11-22",
        "bloodGroup": "O Positive (O+)",
        "emergencyContact": "Mark Watson (Brother) - +1 (555) 492-9900",
        "knownAllergies": ["Latex"],
        "chronicConditions": ["Asthma (Mild Persistent)"],
        "hospitalId": "tenant-metro",
        "abhaId": "91-8812-3901-7721",
        "isVerified": False,
        "verificationStatus": "PENDING"
    },
    {
        "id": "pat-3",
        "name": "Priya Patel",
        "email": "priya.patel@example.com",
        "phone": "+1 (555) 301-4477",
        "gender": "FEMALE",
        "dob": "1998-03-05",
        "bloodGroup": "A Positive (A+)",
        "emergencyContact": "Karan Patel - +1 (555) 301-8899",
        "knownAllergies": [],
        "chronicConditions": [],
        "hospitalId": "tenant-metro",
        "abhaId": "91-3141-5926-5358",
        "isVerified": True,
        "verificationStatus": "VERIFIED"
    }
]

SEED_APPOINTMENTS: List[Dict[str, Any]] = [
    {
        "id": "apt-101",
        "patientId": "pat-1",
        "patientName": "Rahul Sharma",
        "doctorId": "doc-1",
        "doctorName": "Dr. Vikram Mehta",
        "department": "Cardiology",
        "date": "2026-09-18",
        "timeSlot": "10:00 AM",
        "status": "IN_CONSULTATION",
        "tokenNumber": "CARD-101",
        "reason": "Follow-up for blood pressure medication check and mild chest tightness",
        "feePaid": True,
        "amount": 65,
        "checkedInAt": "09:48 AM"
    },
    {
        "id": "apt-102",
        "patientId": "pat-2",
        "patientName": "Emily Watson",
        "doctorId": "doc-2",
        "doctorName": "Dr. Elena Rostova",
        "department": "Pulmonology",
        "date": "2026-09-18",
        "timeSlot": "10:30 AM",
        "status": "CHECKED_IN",
        "tokenNumber": "PULM-102",
        "reason": "Persistent wheezing and seasonal asthma trigger evaluation",
        "feePaid": True,
        "amount": 55,
        "checkedInAt": "10:15 AM"
    },
    {
        "id": "apt-103",
        "patientId": "pat-3",
        "patientName": "Priya Patel",
        "doctorId": "doc-1",
        "doctorName": "Dr. Vikram Mehta",
        "department": "Cardiology",
        "date": "2026-09-18",
        "timeSlot": "11:00 AM",
        "status": "BOOKED",
        "reason": "Routine annual cardiovascular screening and palpitations review",
        "feePaid": False,
        "amount": 65
    },
    {
        "id": "apt-100",
        "patientId": "pat-1",
        "patientName": "Rahul Sharma",
        "doctorId": "doc-2",
        "doctorName": "Dr. Elena Rostova",
        "department": "Pulmonology",
        "date": "2026-08-10",
        "timeSlot": "09:30 AM",
        "status": "COMPLETED",
        "tokenNumber": "PULM-089",
        "reason": "Post-viral cough recovery check",
        "feePaid": True,
        "amount": 55,
        "checkedInAt": "09:20 AM",
        "completedAt": "09:50 AM"
    }
]

SEED_VISIT_ENCOUNTERS: List[Dict[str, Any]] = [
    {
        "id": "vis-301",
        "appointmentId": "apt-100",
        "patientId": "pat-1",
        "doctorId": "doc-2",
        "doctorName": "Dr. Elena Rostova",
        "department": "Pulmonology",
        "hospitalName": "Metro Health Multispecialty Clinic",
        "visitDate": "2026-08-10",
        "chiefComplaint": "Dry hacking cough for 3 weeks following seasonal viral flu. No fever or hemoptysis.",
        "vitals": {
            "bloodPressure": "128/82 mmHg",
            "pulseRate": "76 bpm",
            "temperature": "98.4 °F",
            "weightKg": "78.5 kg",
            "spo2": "99% on room air"
        },
        "clinicalAssessment": "Post-infectious bronchial hyperreactivity. Clear bilateral breath sounds with mild expiratory rhonchi.",
        "doctorNotes": "Advised warm saline gargles, adequate hydration, and avoidance of cold drafts. Short-course bronchodilator inhaler prescribed.",
        "prescriptions": [
            {
                "id": "rx-1",
                "medication": "Budesonide / Formoterol Inhaler 200/6mcg",
                "dosage": "2 puffs",
                "frequency": "Twice daily (Morning & Night)",
                "duration": "14 days",
                "instructions": "Rinse mouth with water thoroughly after each inhalation"
            },
            {
                "id": "rx-2",
                "medication": "Levocetirizine 5mg",
                "dosage": "1 tablet",
                "frequency": "Once daily at bedtime",
                "duration": "7 days",
                "instructions": "Take after dinner"
            }
        ]
    },
    {
        "id": "vis-202",
        "patientId": "pat-1",
        "doctorId": "doc-1",
        "doctorName": "Dr. Vikram Mehta",
        "department": "Cardiology",
        "hospitalName": "Metro Health Multispecialty Clinic",
        "visitDate": "2026-05-15",
        "chiefComplaint": "Routine 6-month diabetic & cardiovascular review. Reports occasional morning headaches.",
        "vitals": {
            "bloodPressure": "142/90 mmHg (elevated)",
            "pulseRate": "82 bpm",
            "temperature": "98.6 °F",
            "weightKg": "80 kg",
            "spo2": "98%"
        },
        "clinicalAssessment": "Stage 1 Essential Hypertension in setting of established T2DM. Blood sugar moderately controlled.",
        "doctorNotes": "Initiated low-dose ACE inhibitor therapy. Emphasized dietary sodium restriction (< 2g/day) and 30 minutes daily brisk walking.",
        "prescriptions": [
            {
                "id": "rx-3",
                "medication": "Telmisartan 40mg",
                "dosage": "1 tablet",
                "frequency": "Once daily (Morning)",
                "duration": "90 days",
                "instructions": "Take consistently at 8:00 AM before breakfast"
            },
            {
                "id": "rx-4",
                "medication": "Metformin Hydrochloride 500mg (Extended Release)",
                "dosage": "1 tablet",
                "frequency": "Twice daily (1-0-1)",
                "duration": "90 days",
                "instructions": "Take with major meals to minimize gastric upset"
            }
        ]
    }
]

SEED_REPORTS: List[Dict[str, Any]] = [
    {
        "id": "rep-01",
        "patientId": "pat-1",
        "title": "Comprehensive Lipid & Cholesterol Profile",
        "category": "BLOOD_TEST",
        "uploadDate": "2026-09-02",
        "facilityName": "Metro Diagnostics Central Lab",
        "doctorName": "Dr. Vikram Mehta",
        "rawFindingsText": (
            "FASTING LIPID PROFILE\n"
            "Total Cholesterol: 228 mg/dL [Reference: < 200 mg/dL] - HIGH\n"
            "Triglycerides: 195 mg/dL [Reference: < 150 mg/dL] - HIGH\n"
            "HDL Cholesterol: 42 mg/dL [Reference: > 40 mg/dL] - NORMAL\n"
            "LDL Cholesterol (Calculated): 147 mg/dL [Reference: < 100 mg/dL] - ELEVATED\n"
            "Cholesterol / HDL Ratio: 5.4 [Reference: < 4.5] - ELEVATED"
        ),
        "aiExplanation": {
            "plainSummary": "Your cholesterol report indicates that your 'bad' cholesterol (LDL) and overall blood fats (Triglycerides) are moderately elevated, while your 'good' cholesterol (HDL) is within a safe baseline.",
            "urgencyLevel": "MODERATE",
            "findings": [
                {
                    "metric": "Total Cholesterol",
                    "value": "228 mg/dL",
                    "referenceRange": "Less than 200 mg/dL",
                    "status": "HIGH",
                    "laymanExplanation": "The total amount of fats in your bloodstream is slightly higher than optimal, which can build plaque in arteries over time."
                },
                {
                    "metric": "LDL ('Bad') Cholesterol",
                    "value": "147 mg/dL",
                    "referenceRange": "Less than 100 mg/dL",
                    "status": "HIGH",
                    "laymanExplanation": "LDL carries cholesterol into your arteries. Your level is elevated and warrants lifestyle modifications or statin review."
                },
                {
                    "metric": "HDL ('Good') Cholesterol",
                    "value": "42 mg/dL",
                    "referenceRange": "Greater than 40 mg/dL",
                    "status": "NORMAL",
                    "laymanExplanation": "HDL acts like a scavenger cleaning up fats. Yours is currently in an acceptable range."
                },
                {
                    "metric": "Triglycerides",
                    "value": "195 mg/dL",
                    "referenceRange": "Less than 150 mg/dL",
                    "status": "HIGH",
                    "laymanExplanation": "Fat stored from extra calories in your diet. Elevated triglycerides often relate to refined carbohydrates and sugar intake."
                }
            ],
            "questionsForDoctor": [
                "Do I need to adjust my diet first, or should we consider starting a cholesterol-lowering medication (statin)?",
                "How does my elevated LDL impact my cardiovascular risk given my mild hypertension?",
                "When should I repeat this fasting lipid panel to measure progress?"
            ],
            "actionableTips": [
                "Replace saturated cooking fats with heart-healthy monounsaturated oils (olive oil, mustard oil).",
                "Increase soluble dietary fiber (oats, legumes, leafy greens) which binds cholesterol in the digestive tract.",
                "Target at least 150 minutes of moderate aerobic exercise (brisk walking, cycling) per week."
            ],
            "disclaimer": "This explanation is generated by AI to help you understand medical findings and should be discussed directly with your physician."
        }
    },
    {
        "id": "rep-02",
        "patientId": "pat-1",
        "title": "Chest Radiograph (X-Ray PA View)",
        "category": "RADIOLOGY",
        "uploadDate": "2026-08-11",
        "facilityName": "Metro Imaging & Radiology Dept",
        "doctorName": "Dr. Elena Rostova",
        "rawFindingsText": (
            "CHEST PA VIEW RADIOGRAPH\n"
            "CLINICAL INDICATION: Post-viral persistent dry cough.\n"
            "FINDINGS:\n"
            "- Trachea is midline.\n"
            "- Lung fields show clear vascular markings without focal airspace consolidation, mass, or cavitation.\n"
            "- Costophrenic and cardiophrenic sulci are sharp and clear bilaterally; no pleural effusion or pneumothorax.\n"
            "- Cardiothoracic ratio is 0.48, well within normal limits (< 0.50)."
        ),
        "aiExplanation": {
            "plainSummary": "Your chest X-ray appears completely normal. There are no signs of infection, pneumonia, fluid buildup, or abnormal heart enlargement.",
            "urgencyLevel": "LOW",
            "findings": [
                {
                    "metric": "Lung Fields",
                    "value": "Clear bilaterally",
                    "referenceRange": "No infiltrate / mass",
                    "status": "NORMAL",
                    "laymanExplanation": "Both of your lungs are clear with healthy air distribution."
                },
                {
                    "metric": "Cardiothoracic Ratio",
                    "value": "0.48",
                    "referenceRange": "< 0.50",
                    "status": "NORMAL",
                    "laymanExplanation": "Your heart size is completely normal relative to your chest cavity."
                }
            ],
            "questionsForDoctor": [
                "Since the X-ray is normal, is my cough purely airway sensitivity from my previous cold?",
                "Should I continue the inhaler as prescribed?"
            ],
            "actionableTips": [
                "Keep airways hydrated using steam inhalation or warm broths.",
                "Avoid smoking, second-hand smoke, and harsh indoor aerosols."
            ],
            "disclaimer": "This explanation is generated by AI to help you understand medical findings and should be discussed directly with your physician."
        }
    }
]

# ==============================================================================
# SEEDING RUNNER
# ==============================================================================

def seed_database() -> Dict[str, Any]:
    print("=" * 65)
    print("MediSync 360 - Seeding MongoDB Atlas Cluster")
    print("=" * 65)

    health = check_database_health()
    print(f"Connection Status: {health['status'].upper()}")
    print(f"Target Database  : {health['database']}")
    if health.get("latency_ms"):
        print(f"Cluster Latency  : {health['latency_ms']} ms")

    if health["status"] != "connected":
        raise ConnectionError(f"Cannot seed: MongoDB Atlas connection failed ({health.get('error')})")

    db = get_database()
    collections_to_seed = [
        ("tenants", SEED_TENANTS, "id"),
        ("departments", SEED_DEPARTMENTS, "id"),
        ("doctors", SEED_DOCTORS, "id"),
        ("receptionists", SEED_RECEPTIONISTS, "id"),
        ("patients", SEED_PATIENTS, "id"),
        ("appointments", SEED_APPOINTMENTS, "id"),
        ("visit_encounters", SEED_VISIT_ENCOUNTERS, "id"),
        ("medical_reports", SEED_REPORTS, "id")
    ]

    results = {}

    for collection_name, data_list, unique_key in collections_to_seed:
        col = db[collection_name]
        
        # Clear existing seeded documents to prevent duplicates
        col.delete_many({})

        # Insert documents
        if data_list:
            inserted = col.insert_many(data_list)
            count = len(inserted.inserted_ids)
        else:
            count = 0

        # Create index on unique key
        col.create_index(unique_key, unique=True)
        results[collection_name] = count
        print(f"[OK] [{collection_name:18}] Successfully seeded {count:2} documents with index on '{unique_key}'")

    # Additional collection-specific indexes for fast queries
    db.tenants.create_index("slug", unique=True)
    db.doctors.create_index("hospitalId")
    db.doctors.create_index("department")
    db.patients.create_index("hospitalId")
    db.patients.create_index("email")
    db.appointments.create_index([("patientId", 1), ("date", -1)])
    db.appointments.create_index("tokenNumber")
    db.visit_encounters.create_index([("patientId", 1), ("visitDate", -1)])
    db.medical_reports.create_index([("patientId", 1), ("uploadDate", -1)])

    total_seeded = sum(results.values())
    print("-" * 65)
    print(f"All collections initialized! Total records seeded: {total_seeded}")
    print("=" * 65)

    return {
        "success": True,
        "database": health["database"],
        "collections": results,
        "total_seeded": total_seeded
    }

if __name__ == "__main__":
    try:
        res = seed_database()
        print("\nSeed completed successfully.")
    except Exception as e:
        print(f"\n[ERROR] Seeding failed: {e}", file=sys.stderr)
        sys.exit(1)
