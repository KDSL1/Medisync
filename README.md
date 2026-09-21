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
* **Backend:** Python FastAPI, Uvicorn, Pydantic, PyMongo (Atlas Driver)
* **Database:** MongoDB Atlas Multi-Tenant Cluster
* **Deployment:** Docker & Docker Compose ready, Vercel & Railway / Render / AWS ECS compatible

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
python scripts/seed_db.py   # Seed MongoDB Atlas cluster
uvicorn app.main:app --reload --port 8000
```
* API Root: [http://localhost:8000](http://localhost:8000)
* Interactive Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
* Health & DB Telemetry: [http://localhost:8000/api/health](http://localhost:8000/api/health)
* Database Status: [http://localhost:8000/api/db-status](http://localhost:8000/api/db-status)

---

## 🐳 Docker Deployment (One-Command Launch)

Run both the frontend and backend microservices together using Docker Compose:

```bash
docker-compose up --build
```
* Frontend will be accessible at: `http://localhost:3000`
* Backend API will be accessible at: `http://localhost:8000`

---

## ☁️ Cloud Deployment Guidelines

### Vercel (Frontend)
1. Point root to `frontend/` directory in Vercel project settings.
2. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL (e.g. `https://api.medisync.example.com`)
   - `NEXT_PUBLIC_GEMINI_API_KEY`: Your Gemini API key

### Render / Railway / AWS (Backend)
1. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
2. Configure environment variables in dashboard:
   - `MONGODB_URI`: `mongodb+srv://...`
   - `MONGODB_DB_NAME`: `medisync_db`
   - `CORS_ORIGINS`: Your deployed Vercel frontend URL
   - `ENVIRONMENT`: `production`
   - `DEBUG`: `False`
