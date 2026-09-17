"use client";

import Script from "next/script";

/**
 * The firm's booking calendar (LeadConnector). The companion script
 * auto-sizes the iframe to the widget; the min-height keeps the page
 * from jumping while it loads.
 */
export function BookingCalendar() {
  return (
    <div className="border border-navy/10 bg-white shadow-note">
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/JG2TsDet4jef6BwPQmGV"
        title="Schedule a consultation with Investor Signals"
        scrolling="no"
        id="JG2TsDet4jef6BwPQmGV_booking"
        className="block w-full border-0"
        style={{ minHeight: "700px", overflow: "hidden" }}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
