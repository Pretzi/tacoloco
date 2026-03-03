"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

export function CateringForm() {
  const t = useTranslations("pages.catering.form");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      date: (form.elements.namedItem("date") as HTMLInputElement).value,
      guests: (form.elements.namedItem("guests") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center sm:p-10">
        <p className="text-lg font-semibold text-green-800">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary">
            {t("name")} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-lg border border-primary/20 px-4 py-2.5 text-primary shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary">
            {t("email")} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-lg border border-primary/20 px-4 py-2.5 text-primary shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-primary">
            {t("phone")}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="mt-1 block w-full rounded-lg border border-primary/20 px-4 py-2.5 text-primary shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-primary">
            {t("date")}
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="mt-1 block w-full rounded-lg border border-primary/20 px-4 py-2.5 text-primary shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="guests" className="block text-sm font-medium text-primary">
            {t("guests")}
          </label>
          <input
            type="text"
            id="guests"
            name="guests"
            placeholder={t("guestsPlaceholder")}
            className="mt-1 block w-full rounded-lg border border-primary/20 px-4 py-2.5 text-primary shadow-sm placeholder:text-primary/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-primary">
          {t("message")} *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder={t("messagePlaceholder")}
          className="mt-1 block w-full rounded-lg border border-primary/20 px-4 py-2.5 text-primary shadow-sm placeholder:text-primary/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
        />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center rounded-xl bg-secondary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-secondary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
