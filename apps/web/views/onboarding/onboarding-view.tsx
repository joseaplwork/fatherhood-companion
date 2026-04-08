"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, FormField, OnboardingTemplate } from "@ui";

import { completeOnboarding } from "../../lib/actions/onboarding";

type Child = { name: string; birthYear: number };

const TOTAL_STEPS = 3;

export function OnboardingView() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [children, setChildren] = useState<Child[]>([]);
  const [childName, setChildName] = useState("");
  const [childYear, setChildYear] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFinish() {
    setSubmitting(true);
    setError(null);
    const result = await completeOnboarding({ bio, location, children });
    if ("error" in result) {
      setError(result.error);
      setSubmitting(false);
      return;
    }
    router.push("/dashboard");
  }

  function addChild() {
    const year = Number.parseInt(childYear, 10);
    if (!childName.trim() || !year) return;
    setChildren((prev) => [...prev, { name: childName.trim(), birthYear: year }]);
    setChildName("");
    setChildYear("");
  }

  function removeChild(index: number) {
    setChildren((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <OnboardingTemplate
      step={step}
      totalSteps={TOTAL_STEPS}
      onNext={step < TOTAL_STEPS ? () => setStep((s) => s + 1) : handleFinish}
      onSkip={step < TOTAL_STEPS ? () => setStep((s) => s + 1) : undefined}
      isLastStep={step === TOTAL_STEPS}
      canAdvance={!submitting}
    >
      {step === 1 && (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-display text-2xl font-semibold text-on-surface mb-2">
              Welcome, Dad
            </h1>
            <p className="font-body text-sm text-on-surface-variant">
              Tell us a bit about yourself so we can personalise your experience.
            </p>
          </div>
          <FormField
            label="Your bio"
            htmlFor="bio"
            multiline
            inputProps={{
              placeholder: "A few words about who you are…",
              value: bio,
              onChange: (e) => setBio(e.target.value),
              rows: 4,
            }}
          />
          <FormField
            label="Location (optional)"
            htmlFor="location"
            inputProps={{
              placeholder: "City, Country",
              value: location,
              onChange: (e) => setLocation(e.target.value),
            }}
          />
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-display text-2xl font-semibold text-on-surface mb-2">
              Your children
            </h1>
            <p className="font-body text-sm text-on-surface-variant">
              Add your kids so the AI companion can give personalised advice.
            </p>
          </div>

          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <FormField
                label="Name"
                htmlFor="childName"
                inputProps={{
                  placeholder: "Child's name",
                  value: childName,
                  onChange: (e) => setChildName(e.target.value),
                }}
              />
            </div>
            <div className="w-28">
              <FormField
                label="Birth year"
                htmlFor="childYear"
                inputProps={{
                  type: "number",
                  placeholder: "2018",
                  value: childYear,
                  onChange: (e) => setChildYear(e.target.value),
                }}
              />
            </div>
            <Button variant="secondary" onClick={addChild}>
              Add
            </Button>
          </div>

          {children.length > 0 && (
            <ul className="flex flex-col gap-2">
              {children.map((child, i) => (
                <li
                  // biome-ignore lint/suspicious/noArrayIndexKey: locally managed list
                  key={i}
                  className="flex items-center justify-between rounded-full bg-surface-container-low px-4 py-2"
                >
                  <span className="font-body text-sm text-on-surface">
                    {child.name} · {new Date().getFullYear() - child.birthYear}y
                  </span>
                  <button
                    type="button"
                    onClick={() => removeChild(i)}
                    className="font-body text-xs text-error hover:opacity-70"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-display text-2xl font-semibold text-on-surface mb-2">
              You&apos;re all set!
            </h1>
            <p className="font-body text-sm text-on-surface-variant">
              Your Dad Companion is ready. Start by logging today&apos;s mood or chatting with your
              AI buddy.
            </p>
          </div>

          <div className="rounded-2xl bg-primary-fixed px-6 py-5">
            <p className="font-body text-sm text-on-primary-fixed">
              Tip: Log a mood entry every day for 7 days to unlock your first AI insight.
            </p>
          </div>

          {error && <p className="font-body text-sm text-error">{error}</p>}
        </div>
      )}
    </OnboardingTemplate>
  );
}
