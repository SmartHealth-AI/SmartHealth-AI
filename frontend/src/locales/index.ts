import get from "lodash/get";

// import { en } from "./en";
import { vi } from "./vi";

export const translate = (messageCode: string) => get(vi, messageCode);
