"use client";

import { useState } from "react";
import { CAT_COLORS, CAT_COLOR_KEYS, CatFace, type CatColorKey } from "./CatMascot";
import { CheckIcon } from "./Icons";

/**
 * 내 분신이 될 고양이 고르기.
 * 컬러칩처럼 생긴 버튼을 눌러 고르면 hidden input 값이 바뀝니다.
 */
export function AvatarPicker({ defaultValue = "orange" }: { defaultValue?: CatColorKey }) {
  const [selected, setSelected] = useState<CatColorKey>(defaultValue);

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-ink">
        내 고양이 고르기{" "}
        <span className="font-normal text-ink-soft">— {CAT_COLORS[selected].name}</span>
      </span>

      <input type="hidden" name="avatarKey" value={selected} />

      <div className="flex flex-wrap gap-2.5">
        {CAT_COLOR_KEYS.map((key) => {
          const isSelected = key === selected;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              aria-pressed={isSelected}
              title={CAT_COLORS[key].name}
              className={`btn-squish relative grid size-16 place-items-center rounded-2xl border-2 transition ${
                isSelected
                  ? "border-carrot-500 bg-carrot-50 shadow-[0_4px_0_0_var(--color-carrot-300)]"
                  : "border-carrot-100 bg-paper hover:border-carrot-300"
              }`}
            >
              <CatFace size={46} color={key} mood={isSelected ? "happy" : "sleepy"} />
              {isSelected && (
                <span className="absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full bg-leaf-500 text-white">
                  <CheckIcon size={15} />
                </span>
              )}
              <span className="sr-only">{CAT_COLORS[key].name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
