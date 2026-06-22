import { NextRequest, NextResponse } from "next/server";
import { authorizeWordPressSync, runWordPressSync } from "@/app/lib/wordpress-sync";

export async function POST(request: NextRequest) {
  const syncToken = request.headers.get("x-sync-token") ?? undefined;
  const auth = await authorizeWordPressSync(syncToken);

  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: auth.reason ?? "Non autorizzato." },
      { status: 401 },
    );
  }

  const result = await runWordPressSync();
  return NextResponse.json({ success: result.status === "success", result });
}

export async function GET(request: NextRequest) {
  return POST(request);
}