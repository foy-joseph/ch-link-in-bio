"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function ClickTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (!href.startsWith("http")) return;

      const url = new URL(href);
      const gtag = window.gtag;
      if (!gtag) return;

      // Article clicks
      if (url.hostname === "thecatholicherald.com" && url.searchParams.get("utm_content")?.startsWith("pos_")) {
        const position = url.searchParams.get("utm_content")?.replace("pos_", "");
        const slug = url.pathname.replace("/", "");
        gtag("event", "article_click", {
          event_category: "link_in_bio",
          event_label: slug,
          link_position: position,
          link_url: url.pathname,
        });
        return;
      }

      // Subscribe CTA
      if (url.pathname === "/subscribe") {
        gtag("event", "subscribe_click", {
          event_category: "link_in_bio",
          event_label: "subscribe_cta",
        });
        return;
      }

      // Social links
      const socialPlatforms: Record<string, string> = {
        "instagram.com": "instagram",
        "x.com": "x",
        "twitter.com": "x",
        "facebook.com": "facebook",
        "youtube.com": "youtube",
        "linkedin.com": "linkedin",
      };

      for (const [domain, platform] of Object.entries(socialPlatforms)) {
        if (url.hostname.includes(domain)) {
          gtag("event", "social_click", {
            event_category: "link_in_bio",
            event_label: platform,
          });
          return;
        }
      }

      // Any other outbound link
      gtag("event", "outbound_click", {
        event_category: "link_in_bio",
        event_label: url.href,
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
