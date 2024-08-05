import { createHash } from "crypto";

const applicationSalt = "SCPA Event Test";

/**
 * Creates a SHA-256 hash from a password, with a salt appended to the password.
 * @param {string} password The password to hash.
 * @param {string} salt The salt to append to the password.
 * @returns {string} A salted hash of the password.
 */
export const createSaltedHash = (password, salt) => {
  return createHash('sha256').update(password + salt + applicationSalt).digest("hex");
}