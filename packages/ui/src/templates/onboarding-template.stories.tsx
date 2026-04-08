import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { OnboardingTemplate } from "./onboarding-template";

const STEPS = [
  {
    title: "Welcome to Dad Companion",
    body: "A private space to track your wellbeing, reflect on your journey, and connect with a community of dads.",
  },
  {
    title: "How are you feeling?",
    body: "Log your mood each day. It only takes a second, and over time you'll spot patterns that help you thrive.",
  },
  {
    title: "You're not alone",
    body: "Connect with other single dads, find resources, and get AI-powered insights — all in one place.",
  },
];

function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const current = STEPS[step - 1];

  return (
    <OnboardingTemplate
      step={step}
      totalSteps={STEPS.length}
      onNext={() => setStep((s) => Math.min(s + 1, STEPS.length))}
      onSkip={() => setStep(STEPS.length)}
      isLastStep={step === STEPS.length}
    >
      <div className="flex flex-col gap-4 pt-8">
        <h1 className="font-display text-2xl font-semibold text-on-surface">{current?.title}</h1>
        <p className="font-body text-base text-on-surface-variant leading-relaxed">
          {current?.body}
        </p>
      </div>
    </OnboardingTemplate>
  );
}

const meta = {
  title: "Templates/OnboardingTemplate",
  component: OnboardingTemplate,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    step: { control: { type: "number", min: 1, max: 3 } },
    totalSteps: { control: false },
    canAdvance: { control: "boolean" },
    isLastStep: { control: "boolean" },
  },
} satisfies Meta<typeof OnboardingTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  name: "Interactive flow",
  args: {
    step: 1,
    totalSteps: 3,
    children: null,
  },
  render: () => <OnboardingFlow />,
};

export const Step1: Story = {
  name: "Step 1 — Welcome",
  args: {
    step: 1,
    totalSteps: 3,
    children: (
      <div className="flex flex-col gap-4 pt-8">
        <h1 className="font-display text-2xl font-semibold text-on-surface">
          Welcome to Dad Companion
        </h1>
        <p className="font-body text-base text-on-surface-variant leading-relaxed">
          A private space to track your wellbeing, reflect on your journey, and connect with a
          community of dads.
        </p>
      </div>
    ),
  },
};

export const LastStep: Story = {
  name: "Last step — Get started",
  args: {
    step: 3,
    totalSteps: 3,
    isLastStep: true,
    children: (
      <div className="flex flex-col gap-4 pt-8">
        <h1 className="font-display text-2xl font-semibold text-on-surface">You're not alone</h1>
        <p className="font-body text-base text-on-surface-variant leading-relaxed">
          Connect with other single dads, find resources, and get AI-powered insights — all in one
          place.
        </p>
      </div>
    ),
  },
};

export const Blocked: Story = {
  name: "Cannot advance",
  args: {
    step: 2,
    totalSteps: 3,
    canAdvance: false,
    children: (
      <div className="flex flex-col gap-4 pt-8">
        <h1 className="font-display text-2xl font-semibold text-on-surface">Complete this step</h1>
        <p className="font-body text-base text-on-surface-variant leading-relaxed">
          The Continue button is disabled until the user completes the required action.
        </p>
      </div>
    ),
  },
};
