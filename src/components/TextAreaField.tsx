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
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <textarea
        id={name}
        name={name}
        aria-invalid={invalid}
        className={`w-full resize-y rounded-2xl border-2 bg-paper px-3.5 py-3 text-[15px] leading-relaxed text-ink outline-none transition placeholder:text-ink-soft/60 ${
          invalid ? "border-berry bg-berry/5" : "border-sand-200 focus:border-carrot-400"
        }`}
        {...textarea}
      />
      {error ? (
        <span className="mt-1.5 block text-xs font-medium text-berry">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs text-ink-soft">{hint}</span>
      ) : null}
    </label>
  );
}
