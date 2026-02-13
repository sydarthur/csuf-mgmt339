(function (global) {
  const EARTH_RADIUS = 6378137;

  function mulberry32(seed) {
    let t = seed >>> 0;
    return function () {
      t += 0x6d2b79f5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  function mercatorProject(lat, lon) {
    const x = (lon * Math.PI * EARTH_RADIUS) / 180;
    const y =
      EARTH_RADIUS *
      Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
    return { x, y };
  }

  function mercatorUnproject(x, y) {
    const lon = (x / EARTH_RADIUS) * (180 / Math.PI);
    const lat =
      (2 * Math.atan(Math.exp(y / EARTH_RADIUS)) - Math.PI / 2) *
      (180 / Math.PI);
    return { lat, lon };
  }

  function computeCenter(points, useProjected) {
    let sumW = 0;
    let sumX = 0;
    let sumY = 0;
    points.forEach((p) => {
      if (!p.active) return;
      const w = p.weight;
      if (!Number.isFinite(w)) return;
      sumW += w;
      if (useProjected) {
        const proj = mercatorProject(p.lat, p.lon);
        sumX += w * proj.x;
        sumY += w * proj.y;
      } else {
        sumX += w * p.lon;
        sumY += w * p.lat;
      }
    });
    if (sumW === 0) return null;
    if (useProjected) {
      return mercatorUnproject(sumX / sumW, sumY / sumW);
    }
    return { lat: sumY / sumW, lon: sumX / sumW };
  }

  function computeObjective(points, center, useProjected) {
    if (!center) return 0;
    let total = 0;
    points.forEach((p) => {
      if (!p.active) return;
      const w = p.weight;
      if (!Number.isFinite(w)) return;
      let dx;
      let dy;
      if (useProjected) {
        const proj = mercatorProject(p.lat, p.lon);
        const cproj = mercatorProject(center.lat, center.lon);
        dx = proj.x - cproj.x;
        dy = proj.y - cproj.y;
      } else {
        dx = p.lon - center.lon;
        dy = p.lat - center.lat;
      }
      const dist = Math.sqrt(dx * dx + dy * dy);
      total += w * dist;
    });
    return total;
  }

  const api = {
    mulberry32,
    mercatorProject,
    mercatorUnproject,
    computeCenter,
    computeObjective,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    global.FacilityMath = api;
  }
})(typeof window !== "undefined" ? window : global);
