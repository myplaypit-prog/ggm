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
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
        {label}
      </span>
      {/* 평소엔 얇은 회색 선, 입력 중일 때만 오렌지 테두리 + 옅은 후광 */}
      <span
        className={`flex items-center gap-2 rounded-xl border bg-paper px-3.5 transition ${
          invalid
            ? "border-berry bg-berry-soft/50"
            : "border-sand-200 focus-within:border-carrot-400 focus-within:shadow-[0_0_0_3px_rgba(251,95,19,0.12)]"
        }`}
      >
        {icon && <span className="shrink-0 text-ink-faint">{icon}</span>}
        <input
          id={name}
          name={name}
          aria-invalid={invalid}
          className="w-full bg-transparent py-3 text-[15px] text-ink outline-none placeholder:text-ink-faint"
          {...input}
        />
        {trailing}
      </span>
      {error ? (
        <span className="mt-1.5 block text-xs font-semibold text-berry-ink">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs text-ink-faint">{hint}</span>
      ) : null}
    </label>
  );
}
