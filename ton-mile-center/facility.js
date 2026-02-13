const { mulberry32, computeCenter, computeObjective } = FacilityMath;
const { REGION_MAP, REGIONS, METROS } = FacilityData;

const mapEl = document.getElementById("map");
if (!window.L) {
  mapEl.innerHTML = '<div style="padding:16px;color:white;">Map failed to load. Leaflet is unavailable (check network/CDN).</div>';
  throw new Error('Leaflet not loaded');
}

function showMapError(message) {
  mapEl.innerHTML = `<div style="padding:16px;color:white;">${message}</div>`;
}

const map = L.map("map", { zoomControl: false }).setView([39.5, -98.35], 4);
const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
});

tileLayer.on('tileerror', () => {
  showMapError('Map tiles failed to load. Check network access or try again.');
});

tileLayer.addTo(map);
L.control.zoom({ position: "bottomright" }).addTo(map);

const pointsLayer = L.markerClusterGroup
  ? L.markerClusterGroup({
      disableClusteringAtZoom: 7,
      maxClusterRadius: 40,
    })
  : L.layerGroup();
map.addLayer(pointsLayer);
const inactiveLayer = L.layerGroup().addTo(map);
const regionOverlayLayer = L.layerGroup().addTo(map);

const facilityMarker = L.circleMarker([39, -98], {
  radius: 10,
  color: "#22c55e",
  fillColor: "#22c55e",
  fillOpacity: 0.9,
  weight: 3,
}).addTo(map);

const trailLayer = L.layerGroup().addTo(map);
const MAX_TRAIL = 12;
const trailPositions = [];

const stateToggles = new Map();
const regionToggles = new Map();
const regionRates = new Map();

let points = [];
let lockedPoints = new Map();
let currentCenter = { lat: 39, lon: -98 };
let reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let globalVolumeMult = 1;

const REGION_BOXES = {
  West: [[32, -125], [49, -114]],
  Southwest: [[25, -115], [37, -101]],
  Mountain: [[35, -114], [49, -102]],
  Plains: [[35, -102], [49, -90]],
  Midwest: [[36, -94], [49, -82]],
  South: [[29, -102], [37, -82]],
  Southeast: [[24, -88], [36, -75]],
  Northeast: [[40, -80], [47, -67]],
};

const elements = {
  pointsCount: document.getElementById("pointsCount"),
  pointsCountInput: document.getElementById("pointsCountInput"),
  datasetMode: document.getElementById("datasetMode"),
  seed: document.getElementById("seed"),
  regen: document.getElementById("regen"),
  reset: document.getElementById("reset"),
  volumeDist: document.getElementById("volumeDist"),
  volumeMult: document.getElementById("volumeMult"),
  volumeMultInput: document.getElementById("volumeMultInput"),
  baseRate: document.getElementById("baseRate"),
  projToggle: document.getElementById("projToggle"),
  regionRates: document.getElementById("regionRates"),
  regionToggles: document.getElementById("regionToggles"),
  stateSearch: document.getElementById("stateSearch"),
  stateList: document.getElementById("stateList"),
  inspector: document.getElementById("inspector"),
  outputs: document.getElementById("outputs"),
  regionTable: document.getElementById("regionTable"),
  regionLegend: document.getElementById("regionLegend"),
};

function weightedChoice(rng) {
  const total = METROS.reduce((sum, m) => sum + m.weight, 0);
  let target = rng() * total;
  for (const metro of METROS) {
    target -= metro.weight;
    if (target <= 0) return metro;
  }
  return METROS[METROS.length - 1];
}

function generateVolume(rng) {
  const dist = elements.volumeDist.value;
  if (dist === "lognormal") {
    const u1 = rng() || 1e-6;
    const u2 = rng() || 1e-6;
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.exp(1.2 + 0.6 * z);
  }
  if (dist === "custom") {
    return 1;
  }
  return 0.6 + rng() * 1.2;
}

function jitterPoint(metro, rng) {
  const lat = metro.lat + (rng() - 0.5) * 1.2;
  const lon = metro.lon + (rng() - 0.5) * 1.2;
  return { lat, lon };
}

function randomUSPoint(rng) {
  const lat = 25 + rng() * 24;
  const lon = -125 + rng() * 59;
  return { lat, lon };
}

function nearestMetro(lat, lon) {
  let best = METROS[0];
  let bestDist = Infinity;
  for (const metro of METROS) {
    const dx = lat - metro.lat;
    const dy = lon - metro.lon;
    const dist = dx * dx + dy * dy;
    if (dist < bestDist) {
      bestDist = dist;
      best = metro;
    }
  }
  return best;
}

function buildPoints() {
  const count = Number(elements.pointsCount.value);
  const seed = Number(elements.seed.value) || 42;
  const rng = mulberry32(seed);
  const nextPoints = [];
  const mode = elements.datasetMode.value;

  while (nextPoints.length < count) {
    let metro;
    let coords;
    if (mode === "uniform") {
      coords = randomUSPoint(rng);
      metro = nearestMetro(coords.lat, coords.lon);
    } else {
      metro = weightedChoice(rng);
      coords = jitterPoint(metro, rng);
    }
    const region = REGION_MAP[metro.state] || "South";
    const id = `${metro.state}-${nextPoints.length}`;
    const locked = lockedPoints.get(id);

    nextPoints.push(
      locked || {
        id,
        lat: coords.lat,
        lon: coords.lon,
        state: metro.state,
        region,
        baseVolume: generateVolume(rng),
        volume: 0,
        rateOverride: null,
        active: true,
        locked: false,
      }
    );
  }

  points = nextPoints;
  updateActiveFilters();
  updateRates();
  renderPoints();
  computeAndRender();
}

function updateActiveFilters() {
  points.forEach((p) => {
    const regionActive = regionToggles.get(p.region) ?? true;
    const stateActive = stateToggles.get(p.state) ?? true;
    p.active = regionActive && stateActive;
  });
}

function updateRates() {
  const base = Number(elements.baseRate.value) || 1;
  globalVolumeMult = Number(elements.volumeMult.value) || 1;
  points.forEach((p) => {
    p.volume = p.baseVolume * globalVolumeMult;
    const regionRate = regionRates.get(p.region) ?? 1;
    const override = p.rateOverride ?? null;
    const rate = override !== null ? override : base * regionRate;
    p.rate = rate;
    p.weight = p.volume * rate;
  });
}

function renderPoints() {
  pointsLayer.clearLayers();
  inactiveLayer.clearLayers();

  points.forEach((p) => {
    const color = p.active ? "#38bdf8" : "#94a3b8";
    const layer = L.circleMarker([p.lat, p.lon], {
      radius: p.active ? 4 : 3,
      color,
      fillColor: color,
      fillOpacity: p.active ? 0.7 : 0.4,
      weight: 1,
    });
    layer.on("click", () => openInspector(p));
    if (p.active) {
      layer.addTo(pointsLayer);
    } else {
      layer.addTo(inactiveLayer);
    }
  });
}

function openInspector(point) {
  const html = `
    <div><strong>${point.state}</strong> (${point.region})</div>
    <div>Base volume: <input type="number" id="insVolume" value="${point.baseVolume.toFixed(2)}" step="0.1"/></div>
    <div>Effective volume: ${point.volume.toFixed(2)}</div>
    <div>Rate override: <input type="number" id="insRate" value="${point.rateOverride ?? ""}" step="0.1" placeholder="base*region"/></div>
    <div>
      <label><input type="checkbox" id="insLock" ${point.locked ? "checked" : ""}/> Lock point</label>
    </div>
  `;
  elements.inspector.innerHTML = html;

  const volInput = document.getElementById("insVolume");
  const rateInput = document.getElementById("insRate");
  const lockInput = document.getElementById("insLock");

  volInput.addEventListener("input", () => {
    point.baseVolume = Number(volInput.value) || point.baseVolume;
    updateRates();
    computeAndRender();
  });
  rateInput.addEventListener("input", () => {
    const val = rateInput.value === "" ? null : Number(rateInput.value);
    point.rateOverride = Number.isFinite(val) ? val : null;
    updateRates();
    computeAndRender();
  });
  lockInput.addEventListener("change", () => {
    point.locked = lockInput.checked;
    if (point.locked) {
      lockedPoints.set(point.id, { ...point });
    } else {
      lockedPoints.delete(point.id);
    }
  });
}

function computeAndRender() {
  updateActiveFilters();
  updateRates();

  const useProjected = elements.projToggle.checked;
  const center = computeCenter(points, useProjected);
  if (!center) return;

  animateMarker(center);
  updateOutputs(center);
  updateRegionTable();
}

function animateMarker(center) {
  const start = { ...currentCenter };
  const end = center;
  const duration = reduceMotion ? 0 : 300;

  if (duration === 0) {
    facilityMarker.setLatLng([end.lat, end.lon]);
    currentCenter = end;
    updateTrail(end);
    return;
  }

  const startTime = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - startTime) / duration);
    const lat = start.lat + (end.lat - start.lat) * t;
    const lon = start.lon + (end.lon - start.lon) * t;
    facilityMarker.setLatLng([lat, lon]);
    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      currentCenter = end;
      updateTrail(end);
    }
  }
  requestAnimationFrame(tick);
}

function updateTrail(center) {
  if (reduceMotion) return;
  trailPositions.unshift(center);
  if (trailPositions.length > MAX_TRAIL) trailPositions.pop();
  trailLayer.clearLayers();
  trailPositions.forEach((p, idx) => {
    L.circleMarker([p.lat, p.lon], {
      radius: 4 - idx * 0.2,
      color: "#facc15",
      fillColor: "#facc15",
      fillOpacity: 0.2,
      weight: 1,
    }).addTo(trailLayer);
  });
}

function updateOutputs(center) {
  const activePoints = points.filter((p) => p.active);
  const totalWeight = activePoints.reduce((sum, p) => sum + p.weight, 0);
  const objective = computeObjective(activePoints, center, elements.projToggle.checked);

  elements.outputs.innerHTML = `
    <div>Facility lat: <strong>${center.lat.toFixed(4)}</strong></div>
    <div>Facility lon: <strong>${center.lon.toFixed(4)}</strong></div>
    <div>Total weight: <strong>${totalWeight.toFixed(1)}</strong></div>
    <div>Active points: <strong>${activePoints.length}</strong></div>
    <div>Objective proxy: <strong>${objective.toFixed(1)}</strong></div>
  `;
}

function updateRegionTable() {
  const rows = REGIONS.map((region) => {
    const regionPoints = points.filter((p) => p.region === region && p.active);
    const volumeSum = regionPoints.reduce((s, p) => s + p.volume, 0);
    const avgRate =
      regionPoints.length > 0
        ? regionPoints.reduce((s, p) => s + p.rate, 0) / regionPoints.length
        : 0;
    const weightSum = regionPoints.reduce((s, p) => s + p.weight, 0);
    return { region, volumeSum, avgRate, weightSum };
  });

  elements.regionTable.innerHTML = `
    <tr><th>Region</th><th>Volume</th><th>Avg rate</th><th>Weight</th></tr>
    ${rows
      .map(
        (r) =>
          `<tr><td>${r.region}</td><td>${r.volumeSum.toFixed(
            1
          )}</td><td>${r.avgRate.toFixed(2)}</td><td>${r.weightSum.toFixed(
            1
          )}</td></tr>`
      )
      .join("")}
  `;
}

function setupRegionControls() {
  elements.regionRates.innerHTML = "";
  elements.regionToggles.innerHTML = "";
  elements.regionLegend.innerHTML = "";

  REGIONS.forEach((region, idx) => {
    regionRates.set(region, 1 + (idx % 3) * 0.1);
    regionToggles.set(region, true);

    const field = document.createElement("div");
    field.className = "field";
    field.innerHTML = `
      <label>${region} multiplier</label>
      <input type="number" data-region="${region}" step="0.1" value="${regionRates.get(
        region
      )}"/>
    `;
    elements.regionRates.appendChild(field);

    const toggle = document.createElement("label");
    toggle.className = "state-item";
    toggle.innerHTML = `<input type="checkbox" data-region="${region}" checked /> ${region}`;
    elements.regionToggles.appendChild(toggle);

    const legend = document.createElement("span");
    legend.textContent = region;
    elements.regionLegend.appendChild(legend);
  });

  drawRegionOverlays();

  elements.regionRates.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      const region = input.dataset.region;
      regionRates.set(region, Number(input.value) || 1);
      computeAndRender();
    });
  });

  elements.regionToggles.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      const region = input.dataset.region;
      regionToggles.set(region, input.checked);
      computeAndRender();
      renderPoints();
    });
  });
}

function drawRegionOverlays() {
  regionOverlayLayer.clearLayers();
  Object.entries(REGION_BOXES).forEach(([region, bounds]) => {
    if (!REGIONS.includes(region)) return;
    L.rectangle(bounds, {
      color: "rgba(148,163,184,0.35)",
      weight: 1,
      fill: false,
      dashArray: "4 6",
    }).addTo(regionOverlayLayer);
  });
}

function setupStateControls() {
  const states = Array.from(
    new Set(METROS.map((m) => m.state).sort())
  );
  elements.stateList.innerHTML = "";
  states.forEach((state) => {
    stateToggles.set(state, true);
    const label = document.createElement("label");
    label.className = "state-item";
    label.innerHTML = `<input type="checkbox" data-state="${state}" checked /> ${state}`;
    elements.stateList.appendChild(label);
  });

  elements.stateList.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      const state = input.dataset.state;
      stateToggles.set(state, input.checked);
      computeAndRender();
      renderPoints();
    });
  });

  elements.stateSearch.addEventListener("input", () => {
    const query = elements.stateSearch.value.toLowerCase();
    elements.stateList.querySelectorAll(".state-item").forEach((item) => {
      const matches = item.textContent.toLowerCase().includes(query);
      item.style.display = matches ? "flex" : "none";
    });
  });
}

function debounce(fn, delay = 120) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const debouncedCompute = debounce(() => {
  computeAndRender();
  renderPoints();
}, 80);

function bindControls() {
  elements.pointsCount.addEventListener("input", () => {
    elements.pointsCountInput.value = elements.pointsCount.value;
  });
  elements.pointsCountInput.addEventListener("input", () => {
    elements.pointsCount.value = elements.pointsCountInput.value;
  });
  elements.volumeMult.addEventListener("input", () => {
    elements.volumeMultInput.value = elements.volumeMult.value;
    debouncedCompute();
  });
  elements.volumeMultInput.addEventListener("input", () => {
    elements.volumeMult.value = elements.volumeMultInput.value;
    debouncedCompute();
  });
  elements.baseRate.addEventListener("input", debouncedCompute);
  elements.projToggle.addEventListener("change", debouncedCompute);
  elements.volumeDist.addEventListener("change", () => buildPoints());
  elements.datasetMode.addEventListener("change", () => buildPoints());

  elements.regen.addEventListener("click", () => {
    buildPoints();
  });
  elements.reset.addEventListener("click", () => {
    elements.pointsCount.value = 150;
    elements.pointsCountInput.value = 150;
    elements.seed.value = 42;
    elements.volumeDist.value = "uniform";
    elements.volumeMult.value = 1;
    elements.volumeMultInput.value = 1;
    elements.datasetMode.value = "metro";
    elements.baseRate.value = 1;
    elements.projToggle.checked = true;
    regionToggles.forEach((_, r) => regionToggles.set(r, true));
    stateToggles.forEach((_, s) => stateToggles.set(s, true));
    setupRegionControls();
    setupStateControls();
    buildPoints();
  });

  document.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => applyPreset(btn.dataset.preset));
  });
}

function applyPreset(preset) {
  if (preset === "exit-ca") {
    stateToggles.set("California", false);
  }
  if (preset === "exit-ne") {
    REGIONS.filter((r) => r === "Northeast").forEach((r) =>
      regionToggles.set(r, false)
    );
  }
  if (preset === "west-costs") {
    ["West", "Mountain"].forEach((r) =>
      regionRates.set(r, (regionRates.get(r) || 1) * 1.2)
    );
    setupRegionControls();
  }
  if (preset === "double-tx") {
    points.forEach((p) => {
      if (p.state === "Texas") p.volume *= 2;
    });
  }
  renderPoints();
  computeAndRender();
}

setupRegionControls();
setupStateControls();
bindControls();
buildPoints();
