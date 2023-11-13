import Analytics from "analytics";
// @ts-ignore
// no types for this plugin
import googleAnalytics from '@analytics/google-analytics'

import Router from "next/router";

// Initialize analytics and plugins
// Documentation: https://getanalytics.io
const analytics = Analytics({
  debug: process.env.NODE_ENV !== "production",
  plugins: [
    // @ts-ignore
    // no types for this plugin
    googleAnalytics({
      measurementIds: [process.env.NEXT_PUBLIC_GA_TRACKING_ID || ""],
    }),
  ],
});

// Track initial pageview
if (typeof window !== "undefined") {
  analytics.page();
}

// Track pageview on route change
Router.events.on("routeChangeComplete", (url) => {
  analytics.page();
});

export default analytics;
