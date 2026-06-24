import { NextRequest, NextResponse } from "next/server";
import { authorizeWordPressSync, runWordPressSync } from "@/app/lib/wordpress-sync";

export async function POST(request: NextRequest) {
  try {
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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Errore sconosciuto durante la sincronizzazione.";
    console.error("[WP Sync Error]", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
