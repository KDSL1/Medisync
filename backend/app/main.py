import os
from datetime import datetime
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env
load_dotenv()

app = FastAPI(
    title=os.getenv("APP_TITLE", "MediSync Healthcare API"),
    description="Multi-tenant Hospital Management & AI-Powered Digital Health Record Engine",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
cors_origins_env = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
allowed_origins = [origin.strip() for origin in cors_origins_env.split(",") if origin.strip()]
if "*" not in allowed_origins:
    allowed_origins.append("*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.core.database import check_database_health, get_database_stats
from scripts.seed_db import seed_database

@app.get("/api/health", tags=["System"])
async def health_check():
    db_health = check_database_health()
    return {
        "status": "online",
        "service": "MediSync Healthcare API",
        "timestamp": datetime.utcnow().isoformat(),
        "database": db_health,
        "modules": {
            "auth": "active",
            "patient_portal": "active",
            "doctor_cockpit": "active",
            "reception_queue": "active",
            "management_analytics": "active",
            "ai_report_explainer": "ready"
        }
    }

@app.get("/api/db-status", tags=["Database"])
async def database_status():
    """
    Returns live MongoDB Atlas connection status and document counts per collection.
    """
    return get_database_stats()

@app.post("/api/seed", tags=["Database"])
async def trigger_seed():
    """
    Triggers database seeding with sample multi-tenant healthcare data.
    """
    try:
        result = seed_database()
        return {"status": "success", "result": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/", tags=["System"])
async def root():
    return {
        "message": "Welcome to MediSync Healthcare API. Access documentation at /docs",
        "version": "1.0.0"
    }
