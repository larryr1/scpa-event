const uuidv4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

/**
 * Test to see of a string is in the format of a UUIDv4 value.
 * @param {string} str The string to test.
 * @returns {boolean} A boolean representing whether or not the string is a UUIDv4.
 */
export const isUUIDV4 = (str) => {
    return uuidv4Regex.test(String(str) || "");
}