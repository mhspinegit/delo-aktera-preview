"use strict";
(() => {
  // Keep local previews and copies on other domains out of production reports.
  if (location.protocol !== 'https:' || !['delo-aktera.org', 'www.delo-aktera.org'].includes(location.hostname)) return;
  if (window.__deloAnalyticsInitialized) return;
  window.__deloAnalyticsInitialized = true;

  const measurementId = 'G-PMFQMFKDGM';
  const pageUrl = new URL(location.origin + location.pathname);
  const incomingUrl = new URL(location.href);
  // Preserve campaign attribution, excluding arbitrary query values and hashes.
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const value = incomingUrl.searchParams.get(key);
    if (value) pageUrl.searchParams.set(key, value);
  }
  let referrer = '';
  try {
    const url = new URL(document.referrer);
    if (url.protocol === 'https:' || url.protocol === 'http:') referrer = url.origin + url.pathname;
  } catch { /* A direct visit has no referrer. */ }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_location: pageUrl.href,
    page_referrer: referrer,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.append(tag);
})();
