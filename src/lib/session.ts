import { createHmac, timingSafeEqual } from "crypto";

function getSecret(): string {
  return (
    process.env.SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "change-me-in-production"
  );
}

export function createClientToken(clientId: string): string {
  const expires = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const payload = `${clientId}.${expires}`;
  const signature = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

export function verifyClientToken(token: string): string | null {
  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return null;

    const payload = Buffer.from(payloadB64, "base64url").toString("utf8");
    const expected = createHmac("sha256", getSecret())
      .update(payload)
      .digest("base64url");

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const [clientId, expiresStr] = payload.split(".");
    const expires = Number(expiresStr);
    if (!clientId || Number.isNaN(expires) || Date.now() > expires) {
      return null;
    }

    return clientId;
  } catch {
    return null;
  }
}
