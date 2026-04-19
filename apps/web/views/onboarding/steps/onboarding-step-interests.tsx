import {
  RESOURCE_CATEGORY_LABELS,
  RESOURCE_CATEGORY_VALUES,
  type ResourceCategory,
} from "@/grove-companion/domain";

type OnboardingStepInterestsProps = {
  selected: ResourceCategory[];
  onToggle: (key: ResourceCategory) => void;
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
        {RESOURCE_CATEGORY_VALUES.map((key) => {
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
              {RESOURCE_CATEGORY_LABELS[key]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
