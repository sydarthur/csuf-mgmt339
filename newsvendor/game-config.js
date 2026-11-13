// Newsvendor Sprint 1 — browser-side mirror of research-config.yaml.
// Keep these two files in sync by hand (documented limitation, Sprint 1).

const NEWSVENDOR_CONFIG = {
  // Paste the Apps Script web app URL from SETUP.md here (ends in /exec).
  // Left blank, the game still plays end to end but only logs to the
  // console instead of the Sheet — useful for local testing.
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyHGWNBksZMhIksWbz0mQktBzgWTnrU8syzIQELRLkUhjoN0mAHsBEwqSCtcwp4dW48/exec',

  PRICE: 12,
  COST: { high_margin: 3, low_margin: 9 },
  OPTIMAL_ORDER: { high_margin: 75, low_margin: 25 }, // never shown to students

  PRACTICE_ROUNDS: 1,
  COUNTED_ROUNDS: 20,

  // index 0 = practice round; indices 1-20 = rounds 1-20. Identical for
  // every student and both conditions (seed 133913, discrete uniform 0-100).
  DEMAND_SEQUENCE: [
    38, 96, 52, 73, 80, 47, 39, 51, 67, 30,
    29, 39, 60, 45, 27, 94, 75, 83, 65, 15, 73
  ]
};
