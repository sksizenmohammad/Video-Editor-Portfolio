import { NextRequest, NextResponse } from "next/server";
import {
  findClientByEmail,
  getClientAccessCode,
  getVideosForClient,
} from "@/lib/clients";
import { createClientToken } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const accessCode =
      typeof body.accessCode === "string" ? body.accessCode.trim() : "";

    if (!email || !accessCode) {
      return NextResponse.json(
        { error: "Gmail and access code are required." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid Gmail address." },
        { status: 400 }
      );
    }

    if (accessCode !== getClientAccessCode()) {
      return NextResponse.json(
        { error: "Invalid access code. Contact your editor for the correct code." },
        { status: 401 }
      );
    }

    const client = findClientByEmail(email);
    if (!client) {
      return NextResponse.json(
        {
          error:
            "This Gmail is not registered for the client portal. Email smilographer@gmail.com to request access.",
        },
        { status: 403 }
      );
    }

    const videos = getVideosForClient(client.id);
    const token = createClientToken(client.id);

    return NextResponse.json({
      token,
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
      },
      videos,
    });
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
