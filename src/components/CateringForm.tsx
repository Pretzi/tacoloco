"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  backgroundColor: "oklch(8% 0.015 255 / 0.04)",
  border: "1px solid oklch(8% 0.015 255 / 0.15)",
  padding: "0.75rem 1rem",
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-sm)",
  color: "var(--color-ink)",
  outline: "none",
  transition: "border-color 150ms ease",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: "0.6875rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "oklch(8% 0.015 255 / 0.5)",
  marginBottom: "0.4rem",
};

function Field({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>;
}

export function CateringForm() {
  const t = useTranslations("pages.catering.form");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = "var(--color-accent)";
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = "oklch(8% 0.015 255 / 0.15)";
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name")    as HTMLInputElement).value,
      email:   (form.elements.namedItem("email")   as HTMLInputElement).value,
      phone:   (form.elements.namedItem("phone")   as HTMLInputElement).value,
      date:    (form.elements.namedItem("date")    as HTMLInputElement).value,
      guests:  (form.elements.namedItem("guests")  as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { setStatus("sent"); form.reset(); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        style={{
          padding: "var(--space-xl)",
          border: "1px solid oklch(75% 0.15 145 / 0.35)",
          backgroundColor: "oklch(75% 0.15 145 / 0.08)",
        }}
      >
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "oklch(80% 0.12 145)", lineHeight: 1.6 }}>
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <div className="grid sm:grid-cols-2" style={{ gap: "var(--space-md)" }}>
        <Field>
          <label htmlFor="name" style={labelStyle}>{t("name")} *</label>
          <input type="text" id="name" name="name" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
        </Field>
        <Field>
          <label htmlFor="email" style={labelStyle}>{t("email")} *</label>
          <input type="email" id="email" name="email" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
        </Field>
        <Field>
          <label htmlFor="phone" style={labelStyle}>{t("phone")}</label>
          <input type="tel" id="phone" name="phone" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
        </Field>
        <Field>
          <label htmlFor="date" style={labelStyle}>{t("date")}</label>
          <input type="date" id="date" name="date" style={{ ...inputStyle, colorScheme: "light" }} onFocus={handleFocus} onBlur={handleBlur} />
        </Field>
        <div className="sm:col-span-2">
          <Field>
            <label htmlFor="guests" style={labelStyle}>{t("guests")}</label>
            <input
              type="text" id="guests" name="guests"
              placeholder={t("guestsPlaceholder")}
              style={{ ...inputStyle, color: undefined }}
              className="placeholder:text-ink/30"
              onFocus={handleFocus} onBlur={handleBlur}
            />
          </Field>
        </div>
      </div>

      <Field>
        <label htmlFor="message" style={labelStyle}>{t("message")} *</label>
        <textarea
          id="message" name="message" rows={4} required
          placeholder={t("messagePlaceholder")}
          style={{ ...inputStyle, resize: "vertical", color: undefined } as React.CSSProperties}
          className="placeholder:text-ink/30"
          onFocus={handleFocus} onBlur={handleBlur}
        />
      </Field>

      {status === "error" && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "oklch(65% 0.22 27)" }}>
          {t("error")}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            fontWeight: 700,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            backgroundColor: "var(--color-accent)",
            color: "var(--color-accent-ink)",
            padding: "0.875rem 1.75rem",
            border: "none",
            cursor: status === "sending" ? "not-allowed" : "pointer",
            opacity: status === "sending" ? 0.6 : 1,
            transition: "background-color 180ms var(--ease-out)",
          }}
          onMouseEnter={e => { if (status !== "sending") e.currentTarget.style.backgroundColor = "var(--color-accent-h)"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "var(--color-accent)"; }}
        >
          {status === "sending" ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}
