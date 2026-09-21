"use client";

import { useState } from "react";

type Option = { key: string; label: string; hint?: string };

/**
 * 컬러칩처럼 눌러서 고르는 라디오 그룹.
 * 고른 값은 name 이름의 hidden input 으로 폼에 실려 갑니다.
 */
export function ChipGroup({
  name,
  label,
  options,
  defaultValue,
  error,
  columns = "flex",
}: {
  name: string;
  label: string;
  options: readonly Option[];
  defaultValue?: string;
  error?: string;
  columns?: "flex" | "grid";
}) {
  const [selected, setSelected] = useState(defaultValue ?? "");

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <input type="hidden" name={name} value={selected} />

      <div className={columns === "grid" ? "grid grid-cols-2 gap-2 sm:grid-cols-4" : "flex flex-wrap gap-2"}>
        {options.map((opt) => {
          const on = opt.key === selected;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => setSelected(opt.key)}
              aria-pressed={on}
              className={`btn-squish rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${
                on
                  ? "border-carrot-400 bg-carrot-50 font-bold text-carrot-700 shadow-[0_0_0_3px_rgba(251,95,19,0.14)]"
                  : "border-sand-200 bg-paper text-ink hover:border-sand-300 hover:bg-sand-50"
              }`}
            >
              <span className="block">{opt.label}</span>
              {opt.hint && (
                <span className="mt-0.5 block text-[11px] font-normal text-ink-faint">
                  {opt.hint}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {error && <span className="mt-1.5 block text-xs font-semibold text-berry-ink">{error}</span>}
    </div>
  );
}
