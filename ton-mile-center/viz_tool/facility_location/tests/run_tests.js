const assert = require("assert");
const math = require("../../public/facility_math");

function approxEqual(a, b, eps = 1e-6) {
  return Math.abs(a - b) < eps;
}

function testSimpleCenter() {
  const points = [
    { lat: 0, lon: 0, weight: 1, active: true },
    { lat: 0, lon: 10, weight: 1, active: true },
  ];
  const center = math.computeCenter(points, false);
  assert(approxEqual(center.lat, 0));
  assert(approxEqual(center.lon, 5));
}

function testWeightedCenter() {
  const points = [
    { lat: 0, lon: 0, weight: 1, active: true },
    { lat: 0, lon: 10, weight: 3, active: true },
  ];
  const center = math.computeCenter(points, false);
  assert(approxEqual(center.lon, 7.5));
}

function testProjectedCenter() {
  const points = [
    { lat: 0, lon: -90, weight: 1, active: true },
    { lat: 0, lon: 90, weight: 1, active: true },
  ];
  const center = math.computeCenter(points, true);
  assert(approxEqual(center.lat, 0, 1e-3));
  assert(approxEqual(center.lon, 0, 1e-3));
}

function testActiveToggle() {
  const points = [
    { lat: 0, lon: 0, weight: 1, active: true },
    { lat: 0, lon: 10, weight: 1, active: false },
  ];
  const center = math.computeCenter(points, false);
  assert(approxEqual(center.lon, 0));
}

testSimpleCenter();
testWeightedCenter();
testProjectedCenter();
testActiveToggle();

console.log("Facility math tests passed.");
