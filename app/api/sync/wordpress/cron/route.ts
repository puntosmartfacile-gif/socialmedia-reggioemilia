import { NextRequest, NextResponse } from "next/server";
import { authorizeWordPressSync, runWordPressSync } from "@/app/lib/wordpress-sync";

export async function GET(request: NextRequest) {
  const syncToken = request.headers.get("x-sync-token") ?? process.env.SYNC_SECRET;
  const auth = await authorizeWordPressSync(syncToken);

  if (!auth.authorized) {
    return NextResponse.json({ success: false, error: "Cron non autorizzato." }, { status: 401 });
  }

  const result = await runWordPressSync();
  return NextResponse.json({ success: result.status === "success", result });
}