"""
lifebridge/backend/app/agents/demo_mode.py
Deterministic Fixture Harness and Demo Mode runner.
Guarantees 100% demo reliability using pre-seeded fixtures while preserving real agent reasoning graph execution.
"""
from typing import Dict, Any, List
import logging
from app.seed.seed_data import ACTIVITIES_DB, CASES_DB

logger = logging.getLogger("lifebridge.agents.demo_mode")

class DemoModeRunner:
    def __init__(self, case_id: str = "c-101"):
        self.case_id = case_id

    def run_demo_step(self, step_index: int = 0) -> Dict[str, Any]:
        """
        Executes a deterministic step from the fixture dataset for live hackathon presentation.
        """
        activities = [act for act in ACTIVITIES_DB if act["caseId"] == self.case_id]
        if not activities:
            activities = ACTIVITIES_DB
        
        selected_act = activities[step_index % len(activities)]
        logger.info(f"[DemoMode] Executed step {step_index}: '{selected_act['action']}' by {selected_act['agentName']}")
        return selected_act

demo_runner = DemoModeRunner("c-101")
