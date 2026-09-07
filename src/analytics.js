export function trackEvent(name) {
  window.gtag?.("event", name, {
    event_category: "engagement",
  });
}
