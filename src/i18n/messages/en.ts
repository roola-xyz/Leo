/**
 * Every word Leo's own components say, in English.
 *
 * The type for the other eleven: a language that misses a key does not
 * compile. Kept small on purpose — these are the composites every site
 * carries, not any product's own words, which live in that product.
 */
const en = {
  "menu.account": "Account",
  "menu.appearance": "Appearance",
  "menu.language": "Language",
  "menu.manageAccount": "Manage your Roola account",
  "menu.signOut": "Sign out",
  "menu.back": "Back",
  "menu.close": "Close",
  "menu.managedBy": "Managed by {organisation}",
  "menu.privacy": "Privacy Policy",
  "menu.terms": "Terms of Service",

  "theme.system": "Match system",
  "theme.light": "Light",
  "theme.dark": "Dark",

  "apps.label": "Roola apps",
  "apps.loading": "Loading…",
  "apps.favourites": "Your favourites",
  "apps.edit": "Edit favourites",
  "apps.done": "Done",
  "apps.add": "Add {app} to favourites",
  "apps.remove": "Remove {app} from favourites",
  "apps.reorder": "Drag a tile to reorder, or use the arrow keys.",

  "report.done": "Thank you",
  "report.note": "Anything else? (optional)",
  "report.submit": "Report",
  "report.failed": "That could not be sent. Please try again.",
  "report.close": "Close",
  "report.ok": "Done",
  "report.loading": "Loading…",
  "report.cancel": "Cancel",

  "verification.title": "Identity check requested",
  "verification.body": "<b>{agent}</b> from Roola support is asking you to confirm it is really you.",
  "verification.reason": "Reason given",
  "verification.challenge": "The agent should read out this number",
  "verification.mismatch": "If it does not match what you are being told, press Deny.",
  "verification.expires": "Expires in {seconds}s",
  "verification.deny": "Deny",
  "verification.approve": "It’s me",

  "waiting.joined": "You are on the list",
  "waiting.joinedBody":
    "We will email <strong>{email}</strong> the day {name} opens. Nothing else, and nothing before then.",
  "waiting.closed": "{name} is not open yet",
  "waiting.tagline": "Leave your address and we will tell you the moment it is.",
  "waiting.email": "Email address",
  "waiting.name": "Your name (optional)",
  "waiting.join": "Join the waiting list",
  "waiting.open": "The waiting list is open",
  "waiting.promise": "One email when we open. You can ask us to forget your address at any time.",
  "waiting.promiseAccount": "Next you will make your Roola account, with {name} already on it — so the day it opens, you sign straight in.",
  "waiting.failed": "That did not go through. Try again in a minute.",
} as const;

export type LeoMessages = { [K in keyof typeof en]: string };

export default en as LeoMessages;
