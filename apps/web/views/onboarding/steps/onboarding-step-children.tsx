import { Button, FormField } from "@/grove-companion/ui";

import { BIRTH_YEARS, formatBirthDateLabel, MONTH_NAMES } from "../../../lib/utils/birth-date";

type ChildDraft = { nickname: string; birthDate: string };

type OnboardingStepChildrenProps = {
  childProfiles: ChildDraft[];
  childNickname: string;
  childMonth: string;
  childYear: string;
  onChildNicknameChange: (value: string) => void;
  onChildMonthChange: (value: string) => void;
  onChildYearChange: (value: string) => void;
  onAddChild: () => void;
  onRemoveChild: (index: number) => void;
};

export function OnboardingStepChildren({
  childProfiles,
  childNickname,
  childMonth,
  childYear,
  onChildNicknameChange,
  onChildMonthChange,
  onChildYearChange,
  onAddChild,
  onRemoveChild,
}: OnboardingStepChildrenProps) {
  const canAdd = Boolean(childNickname.trim() && childMonth && childYear);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-on-surface mb-2">Your children</h1>
        <p className="font-body text-sm text-on-surface-variant">
          Add your kids so the AI companion can give personalised advice.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <FormField
          label="Nickname"
          htmlFor="childNickname"
          inputProps={{
            placeholder: "What do they go by?",
            value: childNickname,
            onChange: (e) => onChildNicknameChange(e.target.value),
          }}
        />
        <div className="flex gap-3">
          <div className="flex-1">
            <label
              htmlFor="childMonth"
              className="font-body text-xs text-on-surface-variant mb-1 block"
            >
              Birth month
            </label>
            <select
              id="childMonth"
              value={childMonth}
              onChange={(e) => onChildMonthChange(e.target.value)}
              className="w-full rounded-full bg-surface-container-lowest px-4 py-2 font-body text-sm text-on-surface"
            >
              <option value="">Month</option>
              {MONTH_NAMES.map((name, i) => (
                <option key={name} value={String(i + 1).padStart(2, "0")}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-28">
            <label
              htmlFor="childYear"
              className="font-body text-xs text-on-surface-variant mb-1 block"
            >
              Birth year
            </label>
            <select
              id="childYear"
              value={childYear}
              onChange={(e) => onChildYearChange(e.target.value)}
              className="w-full rounded-full bg-surface-container-lowest px-4 py-2 font-body text-sm text-on-surface"
            >
              <option value="">Year</option>
              {BIRTH_YEARS.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button variant="secondary" onClick={onAddChild} disabled={!canAdd}>
          Add child
        </Button>
      </div>

      {childProfiles.length > 0 && (
        <ul className="flex flex-col gap-2">
          {childProfiles.map((child, i) => (
            <li
              // Index key is safe here: list is append-only until submit, max 10 items
              // biome-ignore lint/suspicious/noArrayIndexKey: intentional — see comment above
              key={i}
              className="flex items-center justify-between rounded-full bg-surface-container-low px-4 py-2"
            >
              <span className="font-body text-sm text-on-surface">
                {child.nickname} · {formatBirthDateLabel(child.birthDate)}
              </span>
              <button
                type="button"
                onClick={() => onRemoveChild(i)}
                className="font-body text-xs text-error hover:opacity-70"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
