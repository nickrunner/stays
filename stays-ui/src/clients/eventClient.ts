import { Analytics, getAnalytics, logEvent } from "firebase/analytics";

export class EventClient {
  analytics: Analytics;
  public constructor() {
    this.analytics = getAnalytics();
  }

  public log(key: string) {
    if (process.env.NODE_ENV === "production") {
      if (this.analytics) {
        logEvent(this.analytics, key);
      }
    }
  }
  public setPage(url: string) {
    if (process.env.NODE_ENV === "production") {
      if (this.analytics) {
        logEvent(this.analytics, "page_view", {
          page_location: url
        });
      }
    }
  }
}
