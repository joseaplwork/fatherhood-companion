import { Input } from "../atoms/input";
import { Label } from "../atoms/label";
import { Textarea } from "../atoms/textarea";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  multiline?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  multiline = false,
  inputProps = {},
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {multiline ? (
        <Textarea
          id={htmlFor}
          error={!!error}
          rows={4}
          {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <Input
          id={htmlFor}
          error={!!error}
          {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <p className="font-body text-xs text-error">{error}</p>}
      {hint && !error && <p className="font-body text-xs text-on-surface-variant">{hint}</p>}
    </div>
  );
}
