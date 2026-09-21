// 디자인 확인용 임시 페이지 — 확인이 끝나면 지웁니다.
import { CAT_COLOR_KEYS, CAT_COLORS, CatFace, type CatMood } from "@/components/CatMascot";

const MOODS: CatMood[] = ["happy", "wink", "sleepy", "wow", "love"];

export default function DesignPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="font-display text-3xl">고양이 5마리 · 표정 5가지</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {CAT_COLOR_KEYS.map((k) => (
          <div key={k} className="card-soft p-4 text-center">
            <CatFace size={160} color={k} mood="happy" className="mx-auto" />
            <p className="mt-2 font-display text-lg">{CAT_COLORS[k].name}</p>
            <p className="text-xs text-ink-soft">{CAT_COLORS[k].tagline}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-6">
        {MOODS.map((m) => (
          <div key={m} className="card-soft p-4 text-center">
            <CatFace size={140} color="orange" mood={m} />
            <p className="mt-1 text-sm">{m}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-end gap-6">
        {[24, 32, 48, 72].map((s) => (
          <div key={s} className="card-soft p-3 text-center">
            <CatFace size={s} color="calico" mood="happy" />
            <p className="mt-1 text-[10px]">{s}px</p>
          </div>
        ))}
      </div>
    </div>
  );
}
