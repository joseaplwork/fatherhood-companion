import { tool } from "ai";
import { z } from "zod";
import { CRISIS_KEYWORDS } from "@/grove-companion/domain";

export const crisisCheckTool = tool({
  description:
    "Evaluate whether a user message contains crisis or distress signals that require immediate escalation to crisis resources.",
  parameters: z.object({
    isCrisis: z.boolean().describe("Whether the message contains crisis signals"),
    severity: z
      .enum(["none", "mild", "moderate", "severe"])
      .describe("Severity level of distress detected"),
  }),
  execute: async ({ isCrisis, severity }) => {
    return { isCrisis, severity };
  },
});

/** Quick keyword-based pre-check before AI evaluation */
export function containsCrisisKeyword(text: string): boolean {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some((keyword: string) => lower.includes(keyword));
}

export const CRISIS_RESOURCES = `If you're in crisis or need immediate support:
- **988 Suicide & Crisis Lifeline**: Call or text **988** (US)
- **Crisis Text Line**: Text HOME to **741741**
- **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/

You don't have to face this alone. These services are free, confidential, and available 24/7.`;
