from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI(
    title="MediSync Healthcare API",
    description="Multi-tenant Hospital Management & AI-Powered Digital Health Record Engine",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health", tags=["System"])
async def health_check():
    return {
        "status": "online",
        "service": "MediSync Healthcare API",
        "timestamp": datetime.utcnow().isoformat(),
        "modules": {
            "auth": "active",
            "patient_portal": "active",
            "doctor_cockpit": "active",
            "reception_queue": "active",
            "management_analytics": "active",
            "ai_report_explainer": "ready"
        }
    }

@app.get("/", tags=["System"])
async def root():
    return {
        "message": "Welcome to MediSync Healthcare API. Access documentation at /docs",
        "version": "1.0.0"
    }
