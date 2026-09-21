"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  MAX_IMAGE_BYTES,
  MAX_IMAGES,
  PRODUCT_BUCKET,
  productImageUrl,
} from "@/lib/products";
import { CatFace } from "@/components/CatMascot";
import { AlertIcon, LoaderIcon, SparkleIcon } from "@/components/Icons";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/**
 * 상품 사진 업로더.
 * 파일을 고르면 곧바로 Supabase Storage 에 올리고,
 * 올라간 경로를 hidden input(name="images") 으로 폼에 실어 보냅니다.
 */
export function ImageUploader({
  userId,
  defaultPaths = [],
}: {
  userId: string;
  defaultPaths?: string[];
}) {
  const [paths, setPaths] = useState<string[]>(defaultPaths);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;

    setError("");
    const room = MAX_IMAGES - paths.length;
    if (room <= 0) {
      setError(`사진은 ${MAX_IMAGES}장까지 올릴 수 있어요.`);
      return;
    }

    const files = Array.from(fileList).slice(0, room);
    const supabase = createClient();
    setBusy(true);

    const uploaded: string[] = [];
    for (const file of files) {
      if (!ALLOWED.includes(file.type)) {
        setError("jpg, png, webp, gif 파일만 올릴 수 있어요.");
        continue;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        setError("사진 한 장은 5MB 이하여야 해요.");
        continue;
      }

      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${userId}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(PRODUCT_BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (upErr) setError(`사진을 올리지 못했어요: ${upErr.message}`);
      else uploaded.push(path);
    }

    if (uploaded.length > 0) setPaths((prev) => [...prev, ...uploaded]);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeAt(index: number) {
    setPaths((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <span className="mb-2 flex items-baseline gap-2 text-sm font-medium text-ink">
        사진
        <span className="text-xs font-normal text-ink-soft">
          {paths.length} / {MAX_IMAGES} · 첫 번째 사진이 대표 사진이 돼요
        </span>
      </span>

      {paths.map((p) => (
        <input key={p} type="hidden" name="images" value={p} />
      ))}

      <div className="flex flex-wrap gap-2.5">
        {/* 추가 버튼 */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy || paths.length >= MAX_IMAGES}
          className="btn-squish grid size-24 shrink-0 place-items-center rounded-2xl border border-dashed border-carrot-300 bg-carrot-50 text-carrot-600 transition hover:border-carrot-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? (
            <LoaderIcon size={24} className="animate-spin" />
          ) : (
            <span className="flex flex-col items-center gap-1">
              <CatFace size={38} color="orange" mood="wow" />
              <span className="text-[11px] font-bold">사진 넣기</span>
            </span>
          )}
        </button>

        {/* 올라간 사진들 */}
        {paths.map((path, i) => (
          <div
            key={path}
            className="relative size-24 shrink-0 overflow-hidden rounded-2xl border border-sand-200 bg-carrot-50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={productImageUrl(path)}
              alt={`상품 사진 ${i + 1}`}
              className="size-full object-cover"
            />
            {i === 0 && (
              <span className="absolute bottom-0 inset-x-0 bg-carrot-500/90 py-0.5 text-center text-[10px] font-bold text-white">
                대표
              </span>
            )}
            <button
              type="button"
              onClick={() => removeAt(i)}
              aria-label={`사진 ${i + 1} 빼기`}
              className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-ink/70 text-sm leading-none text-white transition hover:bg-berry"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED.join(",")}
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error ? (
        <span className="mt-2 flex items-center gap-1.5 text-xs font-medium text-berry">
          <AlertIcon size={14} />
          {error}
        </span>
      ) : (
        <span className="mt-2 flex items-center gap-1.5 text-xs text-ink-soft">
          <SparkleIcon size={13} className="text-sun" />
          사진이 없어도 올릴 수 있어요. 대신 고양이가 자리를 지켜 줘요.
        </span>
      )}
    </div>
  );
}
