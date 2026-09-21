import type { InputHTMLAttributes, ReactNode } from "react";

type Props = {
  label: string;
  name: string;
  icon?: ReactNode;
  error?: string;
  hint?: string;
  trailing?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, name, icon, error, hint, trailing, ...input }: Props) {
  const invalid = Boolean(error);

  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
        {label}
      </span>
      <span
        className={`flex items-center gap-2 rounded-2xl border-2 bg-paper px-3.5 transition ${
          invalid
            ? "border-berry bg-berry/5"
            : "border-carrot-200 focus-within:border-carrot-400"
        }`}
      >
        {icon && <span className="shrink-0 text-carrot-400">{icon}</span>}
        <input
          id={name}
          name={name}
          aria-invalid={invalid}
          className="w-full bg-transparent py-3 text-[15px] text-ink outline-none placeholder:text-ink-soft/60"
          {...input}
        />
        {trailing}
      </span>
      {error ? (
        <span className="mt-1.5 block text-xs font-medium text-berry">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs text-ink-soft">{hint}</span>
      ) : null}
    </label>
  );
}
