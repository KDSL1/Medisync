import os
import time
from typing import Optional, Dict, Any
from dotenv import load_dotenv
import certifi
from pymongo import MongoClient
from pymongo.database import Database
from pymongo.errors import PyMongoError, ServerSelectionTimeoutError

load_dotenv()

MONGODB_URI = os.getenv(
    "MONGODB_URI",
    "mongodb+srv://divyasreelekha777_db_user:zLzBbRGG7w6vCKG3@cluster0.794qvgm.mongodb.net/?retryWrites=true&w=majority"
)
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "medisync_db")

_client: Optional[MongoClient] = None

def get_mongo_client() -> MongoClient:
    """
    Returns or initializes the thread-safe MongoDB Atlas client singleton.
    """
    global _client
    if _client is None:
        try:
            _client = MongoClient(
                MONGODB_URI,
                tlsCAFile=certifi.where(),
                serverSelectionTimeoutMS=8000,
                connectTimeoutMS=10000,
                socketTimeoutMS=15000,
                maxPoolSize=50,
                minPoolSize=5,
                retryWrites=True,
                appName="MediSyncHealthcare"
            )
        except Exception as e:
            raise RuntimeError(f"Failed to initialize MongoDB Atlas client: {e}")
    return _client

def get_database(db_name: Optional[str] = None) -> Database:
    """
    Returns the target database instance.
    """
    client = get_mongo_client()
    return client[db_name or MONGODB_DB_NAME]

def get_collection(collection_name: str, db_name: Optional[str] = None):
    """
    Helper to access a specific collection.
    """
    db = get_database(db_name)
    return db[collection_name]

def check_database_health() -> Dict[str, Any]:
    """
    Pings MongoDB Atlas cluster and returns latency and health metadata.
    """
    start_time = time.time()
    try:
        client = get_mongo_client()
        res = client.admin.command('ping')
        latency_ms = round((time.time() - start_time) * 1000, 2)
        return {
            "status": "connected" if res.get("ok") == 1 else "degraded",
            "database": MONGODB_DB_NAME,
            "latency_ms": latency_ms,
            "provider": "MongoDB Atlas",
            "error": None
        }
    except (ServerSelectionTimeoutError, PyMongoError) as pe:
        return {
            "status": "disconnected",
            "database": MONGODB_DB_NAME,
            "latency_ms": None,
            "provider": "MongoDB Atlas",
            "error": str(pe)
        }
    except Exception as ex:
        return {
            "status": "error",
            "database": MONGODB_DB_NAME,
            "latency_ms": None,
            "provider": "MongoDB Atlas",
            "error": str(ex)
        }

def get_database_stats() -> Dict[str, Any]:
    """
    Returns count summary of all core collections in the database.
    """
    health = check_database_health()
    if health["status"] != "connected":
        return {
            "health": health,
            "counts": {}
        }
    
    db = get_database()
    tracked_collections = [
        "tenants",
        "doctors",
        "patients",
        "receptionists",
        "appointments",
        "visit_encounters",
        "medical_reports",
        "departments"
    ]
    
    counts = {}
    for col_name in tracked_collections:
        try:
            counts[col_name] = db[col_name].count_documents({})
        except Exception:
            counts[col_name] = 0
            
    return {
        "health": health,
        "counts": counts,
        "total_records": sum(counts.values())
    }
