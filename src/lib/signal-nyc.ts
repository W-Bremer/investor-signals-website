/** Signal NYC, October 15, 2026, Reserve Padel Hudson Yards. Photos live in /public/signal-nyc. */

export const FLICKR_ALBUM_URL = "https://www.flickr.com/photos/205058178@N05/albums/72177720336252460";
export const REQUEST_INVITE_URL = "https://synapsenetwork.co/request-invite";

export type Photo = { src: string; alt: string; width: number; height: number };

const ALT_PREFIX = "Signal NYC, Reserve Padel Hudson Yards: ";

function photo(file: string, shows: string): Photo {
  return { src: `/signal-nyc/${file}`, alt: ALT_PREFIX + shows, width: 2000, height: 1333 };
}

export const SIGNAL_NYC = {
  team: photo("signal-nyc-team.jpg", "Investor Signals team in front of the step-and-repeat banner"),
  crowd: photo("signal-nyc-crowd.jpg", "Packed crowd under the Reserve sign"),
  padelCap: photo("signal-nyc-padel-cap.jpg", "Guest in blue cap with racket on court"),
  wellsFargo: photo("signal-nyc-wells-fargo.jpg", "Guests talking, Wells Fargo sign behind"),
  toast: photo("signal-nyc-toast.jpg", "Group raising drinks"),
  suitPadel: photo("signal-nyc-suit-padel.jpg", "Guest in a navy suit mid-swing"),
  rackets: photo("signal-nyc-rackets.jpg", "Two women with rackets on court"),
  talkingShop: photo("signal-nyc-talking-shop.jpg", "Two guests in conversation, drinks in hand"),
} as const;

/** The /events gallery: the crowd shot leads wide, these six fill the 3 x 2 grid. */
export const GALLERY_GRID: Photo[] = [
  SIGNAL_NYC.padelCap,
  SIGNAL_NYC.wellsFargo,
  SIGNAL_NYC.toast,
  SIGNAL_NYC.suitPadel,
  SIGNAL_NYC.rackets,
  SIGNAL_NYC.talkingShop,
];

/** The three-photo row in Newsletter Issue 01. */
export const NEWSLETTER_ROW: Photo[] = [SIGNAL_NYC.padelCap, SIGNAL_NYC.wellsFargo, SIGNAL_NYC.toast];

export type TourEvent = {
  name: string;
  city: string;
  date: string;
  format: string;
  status: "Confirmed" | "Locked";
};

export const TOUR_EVENTS: TourEvent[] = [
  { name: "Signal SF", city: "San Francisco", date: "January 28, 2027", format: "Members event", status: "Confirmed" },
  { name: "Signal Alpine", city: "Park City, Utah", date: "Early March 2027", format: "Two-day summit at a ski lodge", status: "Confirmed" },
  { name: "Event 3", city: "TBA", date: "TBA", format: "", status: "Locked" },
  { name: "Event 4", city: "TBA", date: "TBA", format: "", status: "Locked" },
  { name: "Event 5", city: "TBA", date: "TBA", format: "", status: "Locked" },
];
