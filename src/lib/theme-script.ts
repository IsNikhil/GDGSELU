import { announcement } from "@/data/site";

export const THEME_STORAGE = "theme";
export const ANNOUNCEMENT_STORAGE = "announcement-dismissed";
// Changing the announcement text shows the bar again to people who dismissed the old one.
export const ANNOUNCEMENT_KEY = `v1:${announcement.text}`;

/** Runs before first paint: sets the theme and hides a dismissed announcement bar. */
export const themeScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE)});if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.setAttribute("data-theme",t);if(localStorage.getItem(${JSON.stringify(ANNOUNCEMENT_STORAGE)})===${JSON.stringify(ANNOUNCEMENT_KEY)}){d.setAttribute("data-announcement","hidden")}}catch(e){}})()`;
