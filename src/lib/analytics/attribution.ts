"use client";

import { OrderAttribution } from "@/types/catalog";

const ATTR_KEY = "dw_attribution";

export function captureAttributionFromUrl() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const data: OrderAttribution = {};
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  const utmTerm = params.get("utm_term");
  const utmContent = params.get("utm_content");
  const gclid = params.get("gclid");

  if (utmSource) data.utmSource = utmSource;
  if (utmMedium) data.utmMedium = utmMedium;
  if (utmCampaign) data.utmCampaign = utmCampaign;
  if (utmTerm) data.utmTerm = utmTerm;
  if (utmContent) data.utmContent = utmContent;
  if (gclid) data.gclid = gclid;

  if (Object.keys(data).length > 0) {
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(data));
  }
}

export function getAttribution(): OrderAttribution | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = sessionStorage.getItem(ATTR_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export function appendAttributionToUrl(url: string): string {
  const attr = getAttribution();
  if (!attr) return url;
  const u = new URL(url, window.location.origin);
  if (attr.utmSource) u.searchParams.set("utm_source", attr.utmSource);
  if (attr.utmMedium) u.searchParams.set("utm_medium", attr.utmMedium);
  if (attr.utmCampaign) u.searchParams.set("utm_campaign", attr.utmCampaign);
  if (attr.gclid) u.searchParams.set("gclid", attr.gclid);
  return u.pathname + u.search;
}
