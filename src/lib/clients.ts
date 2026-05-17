import clientsData from "../../data/clients.json";
import type { Client } from "@/types/client";
import { getAllVideos } from "@/lib/videos";
import type { VideoEdit } from "@/types/video";

export function getAllClients(): Client[] {
  return clientsData as Client[];
}

export function findClientByEmail(email: string): Client | undefined {
  const normalized = email.trim().toLowerCase();
  return getAllClients().find((c) => c.email.toLowerCase() === normalized);
}

export function findClientById(id: string): Client | undefined {
  return getAllClients().find((c) => c.id === id);
}

export function getVideosForClient(clientId: string): VideoEdit[] {
  return getAllVideos().filter(
    (v) => v.audience === "client" && v.clientId === clientId
  );
}

export function getClientAccessCode(): string {
  return (
    process.env.CLIENT_ACCESS_CODE ||
    process.env.NEXT_PUBLIC_CLIENT_CODE ||
    "smilo2026"
  );
}
