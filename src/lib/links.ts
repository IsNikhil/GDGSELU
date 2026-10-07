import { site } from "@/data/site";
import { isTBD } from "./utils";

/** Where "Join" buttons go. Falls back to the contact page until joinUrl is set. */
export const joinHref = isTBD(site.joinUrl) ? "/contact#join" : site.joinUrl;
