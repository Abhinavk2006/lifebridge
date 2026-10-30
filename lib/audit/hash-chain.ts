import { AuditEvent, AgentResponse } from "@/lib/types/agent";

export const GENESIS_HASH = "0000000000000000000000000000000000000000000000000000000000000000";

async function computeSHA256(text: string): Promise<string> {
  if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } else {
    // Node.js environment
    const crypto = await import("crypto");
    return crypto.createHash("sha256").update(text).digest("hex");
  }
}

export async function createAuditEvent(
  claimId: string,
  actor: string,
  actorType: "AGENT" | "HUMAN" | "SYSTEM",
  action: string,
  details: string,
  previousHash: string = GENESIS_HASH,
  agentResponse?: AgentResponse
): Promise<AuditEvent> {
  const timestamp = new Date().toISOString();
  const rawPayload = `${previousHash}:${timestamp}:${claimId}:${actor}:${actorType}:${action}:${details}`;
  const hash = await computeSHA256(rawPayload);

  return {
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    claimId,
    timestamp,
    actor,
    actorType,
    action,
    details,
    agentResponse,
    hash,
    previousHash,
  };
}

export async function verifyAuditChain(events: AuditEvent[]): Promise<boolean> {
  if (events.length === 0) return true;
  let expectedPrevHash = GENESIS_HASH;

  for (const event of events) {
    if (event.previousHash !== expectedPrevHash) {
      return false;
    }
    const rawPayload = `${event.previousHash}:${event.timestamp}:${event.claimId}:${event.actor}:${event.actorType}:${event.action}:${event.details}`;
    const calculatedHash = await computeSHA256(rawPayload);
    if (calculatedHash !== event.hash) {
      return false;
    }
    expectedPrevHash = event.hash;
  }
  return true;
}
