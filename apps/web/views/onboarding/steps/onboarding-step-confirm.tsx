import { RESOURCE_CATEGORY_LABELS, type ResourceCategory } from "@/grove-companion/domain";

type OnboardingStepConfirmProps = {
  childProfiles: { nickname: string }[];
  interests: ResourceCategory[];
  error: string | null;
};

export function OnboardingStepConfirm({
  childProfiles,
  interests,
  error,
}: OnboardingStepConfirmProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-on-surface mb-2">
          You&apos;re all set!
        </h1>
        <p className="font-body text-sm text-on-surface-variant">
          Your Dad Companion is ready. Start by logging today&apos;s mood or chatting with your AI
          buddy.
        </p>
      </div>

      <div className="rounded-2xl bg-primary-fixed px-6 py-5 flex flex-col gap-2">
        {childProfiles.length > 0 && (
          <p className="font-body text-sm text-on-primary-fixed">
            <span className="font-semibold">Kids:</span>{" "}
            {childProfiles.map((c) => c.nickname).join(", ")}
          </p>
        )}
        {interests.length > 0 && (
          <p className="font-body text-sm text-on-primary-fixed">
            <span className="font-semibold">Interests:</span>{" "}
            {interests.map((k) => RESOURCE_CATEGORY_LABELS[k]).join(", ")}
          </p>
        )}
        <p className="font-body text-sm text-on-primary-fixed">
          Tip: Log a mood entry every day for 7 days to unlock your first AI insight.
        </p>
      </div>

      {error && <p className="font-body text-sm text-error">{error}</p>}
    </div>
  );
}
