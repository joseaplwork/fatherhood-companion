"use client";

import { useCallback, useState } from "react";
import type { ResourceCategory } from "@/grove-companion/domain";

import { completeOnboarding } from "../../lib/actions/onboarding";
import { useReloadUser } from "../../lib/auth-client";
import { buildBirthDateString } from "../../lib/utils/birth-date";

import { TOTAL_STEPS } from "./onboarding-constants";

type ChildDraft = { nickname: string; birthDate: string };

export function useOnboardingFlow() {
  const reloadUser = useReloadUser();

  const [step, setStep] = useState(1);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [children, setChildren] = useState<ChildDraft[]>([]);
  const [childNickname, setChildNickname] = useState("");
  const [childMonth, setChildMonth] = useState("");
  const [childYear, setChildYear] = useState("");
  const [interests, setInterests] = useState<ResourceCategory[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addChild = useCallback(() => {
    if (!childNickname.trim() || !childMonth || !childYear) return;
    setChildren((prev) => [
      ...prev,
      { nickname: childNickname.trim(), birthDate: buildBirthDateString(childMonth, childYear) },
    ]);
    setChildNickname("");
    setChildMonth("");
    setChildYear("");
  }, [childMonth, childNickname, childYear]);

  const removeChild = useCallback((index: number) => {
    setChildren((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const toggleInterest = useCallback((key: ResourceCategory) => {
    setInterests((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }, []);

  const finish = useCallback(async () => {
    setSubmitting(true);
    setError(null);

    try {
      const result = await completeOnboarding({ bio, location, children, interests });

      if ("error" in result) {
        setError(result.error);
        return;
      }

      // Reload the user so the fresh JWT with onboardingComplete=true
      // is sent on the next navigation request — middleware reads it directly.
      await reloadUser();
      window.location.assign("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [bio, children, interests, location, reloadUser]);

  const goNext = useCallback(() => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    } else {
      void finish();
    }
  }, [finish, step]);

  const skipStep = useCallback(() => {
    setStep((s) => s + 1);
  }, []);

  return {
    step,
    totalSteps: TOTAL_STEPS,
    submitting,
    error,
    bio,
    setBio,
    location,
    setLocation,
    children,
    childNickname,
    setChildNickname,
    childMonth,
    setChildMonth,
    childYear,
    setChildYear,
    interests,
    addChild,
    removeChild,
    toggleInterest,
    goNext,
    skipStep,
  };
}
