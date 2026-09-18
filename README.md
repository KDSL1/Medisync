# MediSync 360 — Multi-Tenant Healthcare Platform

MediSync 360 is a modern, patient-centric hospital outpatient operations and digital health record platform designed with 4 synchronized operational portals and built-in AI report comprehension.

---

## 🌟 Core Portals

1. **🧑‍🦰 Patient Portal (`/patient`)**
   - Lifelong health timeline logging previous clinic visits, diagnoses, and prescriptions.
   - Document vault for blood tests, X-rays, and pathology reports.
   - **AI Medical Report Explainer** converting complex diagnostic terminology into 6th-grade plain English.
   - 3-step outpatient appointment booking wizard.

2. **🛎️ Receptionist Portal (`/reception`)**
   - Real-time OPD queue manager and numbered token dispatch (`CARD-101`).
   - Doctor duty status board (`ON_DUTY`, `IN_SESSION`, `ON_BREAK`).
   - 60-second walk-in patient intake form with printable token slip.
   - Front-desk consultation billing POS with printable tax invoice.

3. **👨‍⚕️ Doctor Portal (`/doctor`)**
   - Live waiting room queue synchronized with reception check-ins.
   - Patient Medical Dossier with historical encounters and one-click AI report review.
   - SOAP clinical encounter form (Subjective, Objective vitals, Assessment diagnosis, Plan).
   - Digital prescription builder with dynamic dosage, frequency (`1-0-1`), and instructions.

4. **🏢 Management Portal (`/management`)**
   - Executive analytics: Today's footfall, revenue metrics, doctors on duty, and average consultation turnaround time.
   - Hourly patient footfall distribution chart and department volume percentage breakdowns.
   - Doctor staff roster with room numbers, consultation fees, and duty status.
   - Hospital department management console.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide React
* **Backend:** Python FastAPI, Uvicorn, Pydantic
* **State & Architecture:** Reactive client-side store with `localStorage` persistence and Multi-Tenant scoping

---

## 🚀 Getting Started

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)
