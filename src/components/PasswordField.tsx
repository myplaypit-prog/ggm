"use client";

import { useState } from "react";
import { TextField } from "./TextField";
import { EyeIcon, EyeOffIcon, LockIcon } from "./Icons";

export function PasswordField({
  label,
  name,
  error,
  hint,
  placeholder,
  autoComplete = "current-password",
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const [shown, setShown] = useState(false);

  return (
    <TextField
      label={label}
      name={name}
      type={shown ? "text" : "password"}
      icon={<LockIcon size={19} />}
      error={error}
      hint={hint}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required
      trailing={
        <button
          type="button"
          onClick={() => setShown((v) => !v)}
          aria-label={shown ? "비밀번호 숨기기" : "비밀번호 보기"}
          className="shrink-0 rounded-full p-1.5 text-ink-soft transition hover:bg-carrot-50 hover:text-carrot-600"
        >
          {shown ? <EyeOffIcon size={19} /> : <EyeIcon size={19} />}
        </button>
      }
    />
  );
}
