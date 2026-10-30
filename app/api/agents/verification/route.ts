import { NextResponse } from "next/server";
import { runVerificationAgent } from "@/lib/agents/verification";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await runVerificationAgent({
      claim_id: body.claim_id || "CLM-2026-8801",
      submittedDocuments: body.submittedDocuments || [
        { documentType: "Death Certificate", fileName: "death_cert.pdf" },
      ],
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
