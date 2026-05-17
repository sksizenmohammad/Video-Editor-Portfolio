import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { VideoEdit } from "@/types/video";

const DATA_PATH = path.join(process.cwd(), "data", "videos.json");

function checkAuth(request: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${password}`;
}

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const videos = JSON.parse(raw) as VideoEdit[];
    return NextResponse.json(videos);
  } catch {
    return NextResponse.json({ error: "Failed to load videos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const newVideo = (await request.json()) as VideoEdit;
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const videos = JSON.parse(raw) as VideoEdit[];

    const updated = [
      { ...newVideo, id: String(Date.now()) },
      ...videos.map((v) => ({
        ...v,
        isLatest: newVideo.isLatest ? false : v.isLatest,
      })),
    ];

    await fs.writeFile(DATA_PATH, JSON.stringify(updated, null, 2), "utf-8");
    return NextResponse.json({ success: true, video: updated[0] });
  } catch {
    return NextResponse.json({ error: "Failed to save video" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const videos = (JSON.parse(raw) as VideoEdit[]).filter((v) => v.id !== id);
    await fs.writeFile(DATA_PATH, JSON.stringify(videos, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
