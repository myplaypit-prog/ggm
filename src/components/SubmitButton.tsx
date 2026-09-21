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
      className={`btn-squish btn-primary flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 font-display text-lg disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
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
