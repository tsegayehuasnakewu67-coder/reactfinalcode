/**
 * Euclidean distance face-vector matcher.
 * Threshold < 0.6 is considered a match (face-api.js convention).
 */

const euclideanDistance = (a, b) => {
  if (!a || !b || a.length !== 128 || b.length !== 128) return Infinity;
  let sum = 0;
  for (let i = 0; i < 128; i++) {
    const d = a[i] - b[i];
    sum += d * d;
  }
  return Math.sqrt(sum);
};

/**
 * Find the closest matching employee from a list.
 * @param {number[]} incoming  - 128-element descriptor from live feed
 * @param {Array}    employees - Active employees with faceDescriptor
 * @param {number}   threshold - Maximum accepted distance (default 0.6)
 * @param {number}   minMargin - Required distance gap from the next-best match
 * @returns {{ matched, employee, distance, ambiguous }}
 */
const findBestMatch = (incoming, employees, threshold = 0.6, minMargin = 0) => {
  let best = null;
  let bestDist = Infinity;
  let secondBestDist = Infinity;

  for (const emp of employees) {
    if (!emp.faceDescriptor || emp.faceDescriptor.length !== 128) continue;
    const dist = euclideanDistance(incoming, emp.faceDescriptor);
    if (dist < bestDist) {
      secondBestDist = bestDist;
      bestDist = dist;
      best = emp;
    } else if (dist < secondBestDist) {
      secondBestDist = dist;
    }
  }

  const ambiguous = bestDist <= threshold && secondBestDist - bestDist < minMargin;
  const matched = bestDist <= threshold && !ambiguous;
  return {
    matched,
    employee: matched ? best : null,
    distance: bestDist,
    ambiguous,
  };
};

module.exports = { euclideanDistance, findBestMatch };
