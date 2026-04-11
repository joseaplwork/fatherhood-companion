import { FormField } from "@ui";

type OnboardingStepBioProps = {
  bio: string;
  location: string;
  onBioChange: (value: string) => void;
  onLocationChange: (value: string) => void;
};

export function OnboardingStepBio({
  bio,
  location,
  onBioChange,
  onLocationChange,
}: OnboardingStepBioProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-on-surface mb-2">Welcome, Dad</h1>
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
          onChange: (e) => onBioChange(e.target.value),
          rows: 4,
        }}
      />
      <FormField
        label="Location (optional)"
        htmlFor="location"
        inputProps={{
          placeholder: "City, Country",
          value: location,
          onChange: (e) => onLocationChange(e.target.value),
        }}
      />
    </div>
  );
}
