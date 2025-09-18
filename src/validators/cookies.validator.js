import { VALIDATOR_MESSAGES } from "../constants/messages.js";

async function cookieValidator(cookies) {
  try {
    await externallyValidateCookie(cookies.testCookie);
  } catch {
    throw new Error(VALIDATOR_MESSAGES.INVALID_COOKIES);
  }
}

export { cookieValidator };
