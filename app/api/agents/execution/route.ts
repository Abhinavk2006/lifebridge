import { NextResponse } from "next/server";
import { runExecutionAgent } from "@/lib/agents/execution";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await runExecutionAgent({
      claim_id: body.claim_id || "CLM-2026-8801",
      institutionName: body.institutionName || "State Bank of India",
      amountINR: body.amountINR || 745000,
      recipientAccountMasked: body.recipientAccountMasked || "XXXX-XXXX-8812",
      legalHeirsCount: body.legalHeirsCount || 2,
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
