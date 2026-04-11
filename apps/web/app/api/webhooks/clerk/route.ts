export const runtime = "nodejs";

import type { WebhookEvent } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

import { db } from "@db";

import { Webhook } from "svix";

export async function POST(req: NextRequest) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("Webhook secret not configured", { status: 500 });
  }

  // svix requires the raw body bytes for signature verification — do NOT use req.json()
  const body = await req.text();

  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  let event: WebhookEvent;
  try {
    const wh = new Webhook(secret);
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch {
    return new Response("Invalid webhook signature", { status: 400 });
  }

  if (event.type === "user.created") {
    const providerUserId = event.data.id;
    // Upsert is idempotent — safe to replay
    await db.userProfile.upsert({
      where: { providerUserId },
      create: { providerUserId, interests: [], onboardingState: "PENDING" },
      update: {},
    });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
