"use client";

import { useFormStatus } from "react-dom";
import { LoaderIcon } from "./Icons";

export function SubmitButton({
  children,
  pendingLabel = "잠시만요...",
  className = "",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn-squish btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[16px] font-bold disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {pending ? (
        <>
          <LoaderIcon size={20} className="animate-spin" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}
