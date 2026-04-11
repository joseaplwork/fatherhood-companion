import { INTEREST_KEYS, type InterestKey } from "../../../lib/schemas/onboarding";
import { INTEREST_LABELS } from "../onboarding-constants";

type OnboardingStepInterestsProps = {
  selected: InterestKey[];
  onToggle: (key: InterestKey) => void;
};

export function OnboardingStepInterests({ selected, onToggle }: OnboardingStepInterestsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-on-surface mb-2">
          What matters to you?
        </h1>
        <p className="font-body text-sm text-on-surface-variant">
          Pick the topics you care about most. Your AI companion and resource feed will be tailored
          to these.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {INTEREST_KEYS.map((key) => {
          const isSelected = selected.includes(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggle(key)}
              className={[
                "rounded-full px-4 py-2 font-body text-sm transition-colors",
                isSelected
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest",
              ].join(" ")}
            >
              {INTEREST_LABELS[key]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
