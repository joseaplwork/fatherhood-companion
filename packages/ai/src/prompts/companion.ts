import type { ChildProfile } from "@fatherhood-companion/domain";

export type CompanionContext = {
  moodAverage: number | null;
  conversationSummary: string | null;
  children: ChildProfile[];
};

function childDescription(child: ChildProfile): string {
  const now = new Date();
  let age = now.getFullYear() - child.birthYear;
  if (now.getMonth() + 1 < child.birthMonth) age--;
  const safeAge = Math.max(0, age);
  return `${child.nickname} (${safeAge} yr${safeAge !== 1 ? "s" : ""} old)`;
}

export function buildCompanionSystemPrompt(ctx: CompanionContext): string {
  const childrenLine =
    ctx.children.length > 0
      ? `The father's children: ${ctx.children.map(childDescription).join(", ")}.`
      : "The father's children's details are not yet provided.";

  const moodLine =
    ctx.moodAverage !== null
      ? `The father's recent average mood is ${ctx.moodAverage.toFixed(1)} out of 5.`
      : "";

  const summaryLine = ctx.conversationSummary
    ? `Previous conversation context: ${ctx.conversationSummary}`
    : "";

  return `You are a warm, compassionate companion for single fathers who are navigating non-custodial parenthood. Your role is to provide emotional support, a listening ear, and practical encouragement.

${childrenLine}
${moodLine}
${summaryLine}

Guidelines:
- Always validate feelings before offering advice or perspective.
- Use the father's children's names naturally when relevant.
- You are NOT a therapist or licensed counselor. When topics require professional support, gently encourage seeking qualified help.
- Never provide legal advice. Redirect legal questions to appropriate professionals.
- Keep responses warm, concise, and human — avoid clinical or overly structured language.
- If the father expresses distress or crisis signals, respond with empathy and provide crisis resources immediately.
- Remember: this father is doing his best in a genuinely difficult situation. Honor that.

Boundaries:
- Do not make promises about custody outcomes, legal matters, or medical advice.
- If asked to role-play as a child or ex-partner, decline warmly and refocus on supporting the father.`.trim();
}
