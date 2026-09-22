"use client";

import { useState } from "react";
import { CAT_COLORS, CAT_COLOR_KEYS, CatFace, type CatColorKey } from "./CatArtwork";
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
        <span className="font-normal text-ink-soft">
          — {CAT_COLORS[selected].name} · {CAT_COLORS[selected].tagline}
        </span>
      </span>

      <input type="hidden" name="avatarKey" value={selected} />

      {/* 5마리가 좁은 카드 안에서도 한 줄에 들어가도록 5칸 격자로 둡니다 */}
      <div className="grid grid-cols-5 gap-2">
        {CAT_COLOR_KEYS.map((key) => {
          const isSelected = key === selected;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              aria-pressed={isSelected}
              title={CAT_COLORS[key].name}
              className={`btn-squish relative grid aspect-square w-full place-items-center rounded-xl border transition ${
                isSelected
                  ? "border-carrot-400 bg-carrot-50 shadow-[0_0_0_3px_rgba(251,95,19,0.15)]"
                  : "border-sand-200 bg-paper hover:border-sand-300"
              }`}
            >
              <CatFace
                size={44}
                color={key}
                mood={isSelected ? "happy" : "sleepy"}
                className="h-auto w-[86%]"
              />
              {isSelected && (
                <span className="absolute -right-1.5 -top-1.5 grid size-5.5 place-items-center rounded-full bg-leaf-500 text-white">
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
