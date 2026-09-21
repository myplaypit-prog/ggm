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
      <form key={state.attempt} action={formAction} className="grid gap-6">
        {mode === "edit" && <input type="hidden" name="id" value={product!.id} />}

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

        {/* 가격 + 나눔 */}
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
                ? "나눔으로 올라가요. 고마워요! 🐾"
                : price
                  ? `${Number(price).toLocaleString("ko-KR")}원`
                  : "숫자만 적어 주세요."
            }
          />
          <label className="mt-2.5 inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-leaf-200 bg-leaf-50 px-3.5 py-1.5 text-sm font-medium text-leaf-700">
            <input
              type="checkbox"
              checked={free}
              onChange={(e) => {
                setFree(e.target.checked);
                if (e.target.checked) setPrice("0");
              }}
              className="size-4 accent-[var(--color-leaf-500)]"
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

        <div className="flex gap-3">
          <Link
            href={mode === "edit" ? `/products/${product!.id}` : "/products"}
            className="btn-squish grid shrink-0 place-items-center rounded-2xl border-2 border-sand-200 bg-paper px-5 font-display text-lg text-ink-soft hover:border-carrot-300"
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
