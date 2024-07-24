/**
 * Compares arguments x and y and returns a boolean representing whether the keys and values of the passed arguments are equal or not.
 * Ripped from https://stackoverflow.com/a/32922084
 * @param {*} x The first object.
 * @param {*} y The second object.
 * @returns {*} The indicating value.
 */
export function deepEqual(x, y) {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
      ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
}