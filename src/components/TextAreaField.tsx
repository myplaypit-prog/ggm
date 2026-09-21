import type { TextareaHTMLAttributes } from "react";

type Props = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ label, name, error, hint, ...textarea }: Props) {
  const invalid = Boolean(error);

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <textarea
        id={name}
        name={name}
        aria-invalid={invalid}
        className={`w-full resize-y rounded-xl border bg-paper px-3.5 py-3 text-[15px] leading-relaxed text-ink outline-none transition placeholder:text-ink-faint ${
          invalid
            ? "border-berry bg-berry-soft/50"
            : "border-sand-200 focus:border-carrot-400 focus:shadow-[0_0_0_3px_rgba(251,95,19,0.12)]"
        }`}
        {...textarea}
      />
      {error ? (
        <span className="mt-1.5 block text-xs font-semibold text-berry-ink">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs text-ink-faint">{hint}</span>
      ) : null}
    </label>
  );
}
