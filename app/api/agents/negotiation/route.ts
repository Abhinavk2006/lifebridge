import { NextResponse } from "next/server";
import { runNegotiationAgent } from "@/lib/agents/negotiation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await runNegotiationAgent({
      claim_id: body.claim_id || "CLM-2026-8801",
      institutionName: body.institutionName || "State Bank of India",
      assetType: body.assetType || "SAVINGS_ACCOUNT",
      claimantName: body.claimantName || "Ananya Sharma",
      amountINR: body.amountINR || 245000,
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
