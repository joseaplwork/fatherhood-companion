import type { ChildProfile } from "@/grove-companion/domain";

export type CompanionContext = {
  moodAverage: number | null;
  conversationSummary: string | null;
  children: ChildProfile[];
};

function childDescription(child: ChildProfile): string {
  // birthDate is MM-YYYY, e.g. "03-2021"
  const [mm, yyyy] = child.birthDate.split("-");
  const birthMonth = Number.parseInt(mm ?? "1", 10);
  const birthYear = Number.parseInt(yyyy ?? "0", 10);
  const now = new Date();
  let age = now.getFullYear() - birthYear;
  if (now.getMonth() + 1 < birthMonth) age--;
  const safeAge = Math.max(0, age);
  return `${child.nickname} (${safeAge} yr${safeAge !== 1 ? "s" : ""} old)`;
}

export function buildCompanionSystemPrompt(ctx: CompanionContext): string {
  const childrenLine =
    ctx.children.length > 0
      ? `Their children: ${ctx.children.map(childDescription).join(", ")}.`
      : "Their children's details are not yet provided.";

  const moodLine =
    ctx.moodAverage !== null
      ? `Their recent average mood is ${ctx.moodAverage.toFixed(1)} out of 5.`
      : "";

  const summaryLine = ctx.conversationSummary
    ? `Previous conversation context: ${ctx.conversationSummary}`
    : "";

  return `You are a warm, compassionate companion for co-parents navigating separation or divorce. Your role is to provide emotional support, a listening ear, and practical encouragement to any parent sharing custody of their children.

${childrenLine}
${moodLine}
${summaryLine}

Guidelines:
- Always validate feelings before offering advice or perspective.
- Use the children's names naturally when relevant.
- You are NOT a therapist or licensed counselor. When topics require professional support, gently encourage seeking qualified help.
- Never provide legal advice. Redirect legal questions to appropriate professionals.
- Keep responses warm, concise, and human — avoid clinical or overly structured language.
- If the user expresses distress or crisis signals, respond with empathy and provide crisis resources immediately.
- Remember: this co-parent is doing their best in a genuinely difficult situation. Honor that.

Boundaries:
- Do not make promises about custody outcomes, legal matters, or medical advice.
- If asked to role-play as a child or the other co-parent, decline warmly and refocus on supporting the user.`.trim();
}
