import { NextResponse } from "next/server";
import { runDiscoveryAgent } from "@/lib/agents/discovery";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await runDiscoveryAgent({
      claim_id: body.claim_id || "CLM-2026-8801",
      deceasedName: body.deceasedName || "Late Ramesh Chandra Sharma",
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
