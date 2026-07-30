"""
main.py — LifeBridge AI Backend API Gateway & Real-Time Ticker
FastAPI async server providing REST endpoints for Phase 3 frontend services and WebSockets for live ticker feed.
"""
import asyncio
import json
import time
from typing import List
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.router import api_router
from app.seed.seed_data import CASES_DB, INSTITUTIONS_DB, ACTIVITIES_DB, DOCUMENTS_DB, DAG_NODES_DB

app = FastAPI(
    title="LifeBridge AI Backend & Agent Orchestration Mesh",
    description="Enterprise API gateway for estate settlement, document verification, and agent ticker WebSockets.",
    version="2.4.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include v1 REST API router
app.include_router(api_router, prefix="/api")

# WebSocket Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception:
                pass

manager = ConnectionManager()

@app.get("/")
def read_root():
    return {
        "service": "LifeBridge AI Backend API",
        "status": "HEALTHY",
        "version": "2.4.0",
        "docs": "/docs",
        "websocket_endpoint": "/ws/agent-ticker"
    }

# Legacy root /api/cases and /api/institutions compatibility endpoints for direct fetch
@app.get("/api/cases")
def get_cases_legacy():
    return CASES_DB

@app.get("/api/institutions")
def get_institutions_legacy():
    return INSTITUTIONS_DB

@app.post("/api/institutions/{inst_id}/waive-fee")
def waive_fee_legacy(inst_id: str):
    for inst in INSTITUTIONS_DB:
        if inst["id"] == inst_id:
            inst["status"] = "settled"
            inst["feeWaiverAmount"] = 450.0
            return {
                "status": "SUCCESS",
                "message": f"Approved $450 fee waiver for {inst['name']}",
                "institution": inst
            }
    return {"status": "ERROR", "message": "Institution not found"}

@app.websocket("/ws/agent-ticker")
async def websocket_agent_ticker(websocket: WebSocket):
    await manager.connect(websocket)
    ticker_templates = ACTIVITIES_DB

    try:
        idx = 0
        while True:
            item = ticker_templates[idx % len(ticker_templates)].copy()
            item["id"] = f"act-ws-{int(time.time() * 1000)}"
            item["timestamp"] = "Just now"
            await websocket.send_text(json.dumps(item))
            idx += 1
            await asyncio.sleep(5.0)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
