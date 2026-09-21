"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { createProductAction, updateProductAction } from "@/lib/product-actions";
import { initialProductFormState } from "@/lib/product-state";
import {
  CATEGORIES,
  CONDITIONS,
  STATUSES,
  type Product,
} from "@/lib/products";
import { Notice } from "@/components/AuthShell";
import { TextField } from "@/components/TextField";
import { TextAreaField } from "@/components/TextAreaField";
import { SubmitButton } from "@/components/SubmitButton";
import { ChipGroup } from "./ChipGroup";
import { ImageUploader } from "./ImageUploader";
import { AlertIcon, PinIcon, TagIcon } from "@/components/Icons";

export function ProductForm({
  mode,
  userId,
  defaultRegion = "",
  product,
}: {
  mode: "create" | "edit";
  userId: string;
  defaultRegion?: string;
  product?: Product;
}) {
  const action = mode === "create" ? createProductAction : updateProductAction;
  const [state, formAction] = useActionState(action, initialProductFormState);

  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [free, setFree] = useState(product ? product.price === 0 : false);

  return (
    <>
      {state.status === "error" && (
        <Notice tone="error" icon={<AlertIcon size={18} />}>
          {state.message}
        </Notice>
      )}

      {/* key 를 바꿔 폼을 다시 그리면 제출 후에도 입력값이 유지됩니다 */}
      <form key={state.attempt} action={formAction} className="grid gap-10">
        {mode === "edit" && <input type="hidden" name="id" value={product!.id} />}

        <Step n={1} title="사진과 제목" desc="사진이 있으면 훨씬 빨리 팔려요.">
          <ImageUploader userId={userId} defaultPaths={product?.images ?? []} />
          <TextField
            label="제목"
            name="title"
            placeholder="예) 거의 안 신은 운동화 275"
            maxLength={60}
            defaultValue={product?.title ?? ""}
            error={state.fieldErrors.title}
            hint="2~60자. 뭘 파는지 한눈에 보이게 적어 주세요."
            required
          />
        </Step>

        <Step n={2} title="어떤 물건인가요" desc="딱 맞는 게 없으면 그 외 뭐든지를 골라도 괜찮아요.">
          <ChipGroup
            name="category"
            label="카테고리"
            options={CATEGORIES}
            defaultValue={product?.category ?? ""}
            error={state.fieldErrors.category}
            columns="grid"
          />
          <ChipGroup
            name="condition"
            label="상품 상태"
            options={CONDITIONS}
            defaultValue={product?.condition ?? "used"}
            error={state.fieldErrors.condition}
            columns="grid"
          />
        </Step>

        <Step n={3} title="가격과 동네" desc="나눔도 환영이에요.">
          <div>
            <TextField
              label="가격"
              name="price"
              inputMode="numeric"
              placeholder="0"
              icon={<TagIcon size={19} />}
              value={free ? "0" : price}
              readOnly={free}
              onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ""))}
              error={state.fieldErrors.price}
              hint={
                free
                  ? "나눔으로 올라가요. 고마워요!"
                  : price
                    ? `${Number(price).toLocaleString("ko-KR")}원`
                    : "숫자만 적어 주세요."
              }
            />
            {/* 켜면 색이 바뀌는 토글. 지금 켜졌는지 한눈에 보이게 했어요 */}
            <label
              className={`btn-squish mt-2.5 inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
                free
                  ? "border-carrot-400 bg-carrot-50 text-carrot-700"
                  : "border-sand-200 bg-paper text-ink-soft hover:border-sand-300"
              }`}
            >
              <input
                type="checkbox"
                checked={free}
                onChange={(e) => {
                  setFree(e.target.checked);
                  if (e.target.checked) setPrice("0");
                }}
                className="size-4 accent-[var(--color-carrot-500)]"
              />
              그냥 나눔할래요
            </label>
          </div>

          <TextField
            label="거래 동네"
            name="region"
            placeholder={defaultRegion || "역삼동"}
            maxLength={20}
            icon={<PinIcon size={19} />}
            defaultValue={product?.region ?? defaultRegion}
            hint="비워 두면 내 프로필의 동네로 올라가요."
          />
        </Step>

        <Step n={4} title="설명" desc="솔직하게 적을수록 연락이 빨리 와요.">
          <TextAreaField
            label="설명"
            name="description"
            rows={7}
            maxLength={2000}
            placeholder={"언제 샀는지, 얼마나 썼는지, 흠집은 없는지 편하게 적어 주세요.\n만물마켓에는 정말 뭐든지 올릴 수 있어요!"}
            defaultValue={product?.description ?? ""}
            error={state.fieldErrors.description}
          />

          {mode === "edit" && (
            <ChipGroup
              name="status"
              label="판매 상태"
              options={STATUSES}
              defaultValue={product?.status ?? "selling"}
            />
          )}
        </Step>

        <div className="hairline flex gap-3 pt-8">
          <Link
            href={mode === "edit" ? `/products/${product!.id}` : "/products"}
            className="btn-squish grid shrink-0 place-items-center rounded-xl border border-sand-200 bg-paper px-6 text-[15px] font-bold text-ink-soft hover:border-sand-300"
          >
            취소
          </Link>
          <SubmitButton pendingLabel={mode === "create" ? "올리는 중..." : "고치는 중..."}>
            {mode === "create" ? "만물마켓에 올리기" : "수정 완료"}
          </SubmitButton>
        </div>
      </form>
    </>
  );
}

/**
 * 폼을 단계별로 묶어 주는 상자.
 * 입력칸이 여덟 개쯤 되면 죽 늘어놓기만 해도 질려 보여서,
 * "1 사진과 제목 / 2 어떤 물건인가요 ..." 처럼 나눠 두면 훨씬 덜 부담스럽습니다.
 */
function Step({
  n,
  title,
  desc,
  children,
}: {
  n: number;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-5">
      <div className="flex items-start gap-3">
        <span className="tabular mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-carrot-50 font-display text-[13px] text-carrot-600">
          {n}
        </span>
        <div>
          <h2 className="text-[17px] text-ink">{title}</h2>
          {desc && <p className="mt-0.5 text-[13px] text-ink-faint">{desc}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
