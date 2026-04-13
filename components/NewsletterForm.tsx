"use client";

import { useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        window.gtag?.("event", "newsletter_signup", {
          event_category: "link_in_bio",
          event_label: "newsletter_form",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="px-4 pb-3">
        <div className="bg-white rounded-lg p-3 text-center text-sm text-[#222]">
          You&rsquo;re subscribed. Check your inbox.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 pb-3">
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-0 px-3 py-2.5 rounded-lg bg-white border border-[#dadada] text-sm text-[#222] placeholder:text-[#7a7979] focus:outline-none focus:border-[#db3334]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2.5 rounded-lg bg-[#db3334] text-white text-sm font-semibold hover:bg-[#c42d2e] transition-colors disabled:opacity-60 shrink-0"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-[#db3334] mt-1.5">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
