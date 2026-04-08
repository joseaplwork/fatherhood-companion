import type { ReactNode } from "react";

import { Button } from "../atoms/button";
import { ProgressBar } from "../atoms/progress-bar";

type OnboardingTemplateProps = {
  children: ReactNode;
  step: number;
  totalSteps: number;
  onNext?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  canAdvance?: boolean;
  isLastStep?: boolean;
};

export function OnboardingTemplate({
  children,
  step,
  totalSteps,
  onNext,
  onSkip,
  nextLabel = "Continue",
  canAdvance = true,
  isLastStep = false,
}: OnboardingTemplateProps) {
  const progress = step / totalSteps;

  return (
    <main className="flex min-h-screen flex-col bg-surface px-6 py-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-xs text-on-surface-variant">
            Step {step} of {totalSteps}
          </span>
          {!isLastStep && onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="font-body text-xs text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Skip
            </button>
          )}
        </div>
        <ProgressBar value={progress} />
      </div>

      {/* Content */}
      <div className="flex-1">{children}</div>

      {/* CTA */}
      <div className="mt-8">
        <Button onClick={onNext} disabled={!canAdvance} variant="primary" className="w-full">
          {isLastStep ? "Get Started" : nextLabel}
        </Button>
      </div>
    </main>
  );
}
