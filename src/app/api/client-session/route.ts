import { NextRequest, NextResponse } from "next/server";
import { findClientById, getVideosForClient } from "@/lib/clients";
import { verifyClientToken } from "@/lib/session";

export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const clientId = verifyClientToken(token);
  if (!clientId) {
    return NextResponse.json(
      { error: "Session expired. Please log in again." },
      { status: 401 }
    );
  }

  const client = findClientById(clientId);
  if (!client) {
    return NextResponse.json({ error: "Client not found." }, { status: 401 });
  }

  const videos = getVideosForClient(clientId);

  return NextResponse.json({
    client: {
      id: client.id,
      name: client.name,
      email: client.email,
    },
    videos,
  });
}
