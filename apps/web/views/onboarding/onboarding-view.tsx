"use client";

import { OnboardingTemplate } from "@/grove-companion/ui";

import { OnboardingStepBio } from "./steps/onboarding-step-bio";
import { OnboardingStepChildren } from "./steps/onboarding-step-children";
import { OnboardingStepConfirm } from "./steps/onboarding-step-confirm";
import { OnboardingStepInterests } from "./steps/onboarding-step-interests";
import { useOnboardingFlow } from "./use-onboarding-flow";

export function OnboardingView() {
  const flow = useOnboardingFlow();

  return (
    <OnboardingTemplate
      step={flow.step}
      totalSteps={flow.totalSteps}
      onNext={flow.goNext}
      onSkip={flow.step < flow.totalSteps ? flow.skipStep : undefined}
      isLastStep={flow.step === flow.totalSteps}
      canAdvance={!flow.submitting}
    >
      {flow.step === 1 && (
        <OnboardingStepBio
          bio={flow.bio}
          location={flow.location}
          onBioChange={flow.setBio}
          onLocationChange={flow.setLocation}
        />
      )}
      {flow.step === 2 && (
        <OnboardingStepChildren
          childProfiles={flow.children}
          childNickname={flow.childNickname}
          childMonth={flow.childMonth}
          childYear={flow.childYear}
          onChildNicknameChange={flow.setChildNickname}
          onChildMonthChange={flow.setChildMonth}
          onChildYearChange={flow.setChildYear}
          onAddChild={flow.addChild}
          onRemoveChild={flow.removeChild}
        />
      )}
      {flow.step === 3 && (
        <OnboardingStepInterests selected={flow.interests} onToggle={flow.toggleInterest} />
      )}
      {flow.step === 4 && (
        <OnboardingStepConfirm
          childProfiles={flow.children}
          interests={flow.interests}
          error={flow.error}
        />
      )}
    </OnboardingTemplate>
  );
}
