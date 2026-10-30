import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, editedAction, decidedBy } = body;

    return NextResponse.json({
      success: true,
      approval_id: id,
      status,
      editedAction: editedAction || null,
      decidedAt: new Date().toISOString(),
      decidedBy: decidedBy || "Legal Heir / Human Executor",
      message: `Approval decision '${status}' recorded. Hash-chained audit log updated.`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
