# Viz Tool

Interactive browser-based visualizer for `data/etl/monthly_panel_enriched.dta`.

## Run

```bash
python3 viz_tool/app.py
```

Then open:
```
http://127.0.0.1:8001
```

## Options

```bash
python3 viz_tool/app.py --data data/etl/monthly_panel_enriched.dta --port 8001
```

## Notes
- Filters: state, optional second state, date window, region, HH size.
- Output metric: mean absolute difference between two states (when selected).
- If the server reports a time parsing error, check `MONTH` or `MONTH_SLOT` formats.

## Facility Location (2D)

Open:
```
http://127.0.0.1:8001/facility.html
```

Tests (requires Node):
```
node viz_tool/facility_location/tests/run_tests.js
```

Highlights:
- Weights: `w_i = volume_i * rate_i`
- Center of gravity computed in Web Mercator (recommended) or raw lat/lon
- Region/state toggles to simulate market exit
Try:
- Exit a region/state and watch the facility jump.
- Increase a region multiplier +20% and compare the shift.
- Double demand in one state to see the pull.
