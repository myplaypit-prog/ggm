"use client";

import { useState } from "react";
import { productImageUrl } from "@/lib/products";
import { CatFace } from "@/components/CatMascot";

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) {
    return (
      <div className="grid aspect-[4/3] w-full place-items-center rounded-blob border-2 border-dashed border-sand-200 bg-carrot-50">
        <div className="text-center">
          <CatFace size={96} color="cream" mood="sleepy" className="mx-auto animate-float" />
          <p className="mt-2 text-sm text-ink-soft">사진 없이 올라온 물건이에요</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="aspect-[4/3] w-full overflow-hidden rounded-blob border-2 border-sand-200 bg-carrot-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImageUrl(images[current])}
          alt={`${title} 사진 ${current + 1}`}
          className="size-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {images.map((path, i) => (
            <button
              key={path}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`사진 ${i + 1} 보기`}
              aria-pressed={i === current}
              className={`size-16 overflow-hidden rounded-xl border-2 transition ${
                i === current
                  ? "border-carrot-500 ring-2 ring-carrot-200"
                  : "border-sand-200 opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={productImageUrl(path)} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
