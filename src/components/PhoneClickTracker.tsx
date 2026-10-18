"use client";

import { useEffect } from "react";

/**
 * Click-to-call tracking for Risk Free Marketing sites.
 *
 * Every Yes Crew GTM container has a GA4 event tag that fires on the custom
 * dataLayer event `click_phone`, but nothing on the sites pushed it, so GA4
 * (and the Command Center's Marketing pages) read 0 click-to-calls. This
 * listens for clicks on any `tel:` link and pushes that event, with the
 * number, link text and page. On a site that loads gtag.js directly instead
 * of GTM, it sends the same event through gtag.
 */
export default function PhoneClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const payload = {
        event: "click_phone",
        phone_number: href.replace(/^tel:/i, ""),
        link_text: (link.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 80),
        page_path: window.location.pathname,
      };
      const w = window as unknown as {
        dataLayer?: Record<string, unknown>[];
        google_tag_manager?: unknown;
        gtag?: (...args: unknown[]) => void;
      };
      w.dataLayer = w.dataLayer ?? [];
      w.dataLayer.push(payload);
      // Without a GTM container the dataLayer push is inert; gtag.js needs an explicit event call.
      if (!w.google_tag_manager && typeof w.gtag === "function") {
        const { event, ...params } = payload;
        w.gtag("event", event, params);
      }
    };
    // Capture phase so the push happens before the browser opens the dialer.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
