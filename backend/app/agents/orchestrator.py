"""
lifebridge/backend/app/agents/orchestrator.py
LangGraph multi-agent execution orchestrator state machine.
"""
from typing import Dict, Any, List
import logging
from app.agents.extraction import extraction_agent
from app.agents.verification import verification_agent
from app.agents.discovery import discovery_agent
from app.agents.negotiation import negotiation_agent
from app.agents.compliance import compliance_agent
from app.agents.simulation import simulation_agent

logger = logging.getLogger("lifebridge.agents.orchestrator")

class AgentOrchestrator:
    def __init__(self, case_id: str):
        self.case_id = case_id
        self.state = {
            "case_id": case_id,
            "stage": "negotiation",
            "active_agent": "Negotiation Agent 04",
            "progress_percent": 78,
            "human_approval_needed": True
        }

    def execute_next_step(self) -> Dict[str, Any]:
        """Runs the next node in the multi-agent execution graph."""
        logger.info(f"[Orchestrator] Dispatching next step for case '{self.case_id}'")
        return negotiation_agent.run("org-301", self.case_id)

    def dispatch_agent_by_role(self, role: str, target_inst_id: str = None) -> Dict[str, Any]:
        """Dispatches specialized agent node based on role request."""
        role_lower = role.lower()
        if "verif" in role_lower:
            return verification_agent.run("doc-202", self.case_id)
        elif "disc" in role_lower:
            return discovery_agent.run(self.case_id)
        elif "neg" in role_lower:
            return negotiation_agent.run(target_inst_id or "org-301", self.case_id)
        elif "comp" in role_lower:
            return compliance_agent.run(self.case_id, "High Court of Judicature at Bombay")
        elif "sim" in role_lower:
            return simulation_agent.run(self.case_id)
        else:
            return extraction_agent.run({"fileName": "Legal_Heir_Certificate_Bombay_High_Court.pdf"})

orchestrator = AgentOrchestrator("c-101")
