(function () {
  'use strict';

  const CFG = NEWSVENDOR_CONFIG;
  const TOTAL_ROUNDS = CFG.PRACTICE_ROUNDS + CFG.COUNTED_ROUNDS; // 21, incl. practice

  // ---------- condition assignment (deterministic hash, 50/50) ----------
  function fnv1a(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  function assignCondition(studentId) {
    return (fnv1a(studentId.trim().toLowerCase()) % 2 === 0) ? 'high_margin' : 'low_margin';
  }

  function getUrlParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  // ---------- local state (per-browser; see Sprint 1 limitations) ----------
  function stateKey(studentId) {
    return `nv_state_${studentId.trim().toLowerCase()}`;
  }

  function loadState(studentId) {
    try {
      return JSON.parse(localStorage.getItem(stateKey(studentId)) || 'null');
    } catch (e) {
      return null;
    }
  }

  function saveState(state) {
    localStorage.setItem(stateKey(state.studentId), JSON.stringify(state));
  }

  // ---------- logging (fire-and-forget POST, no CORS preflight) ----------
  function postLog(payload) {
    if (!CFG.GOOGLE_SCRIPT_URL) {
      console.log('[newsvendor] (GOOGLE_SCRIPT_URL not set) would log:', payload);
      return;
    }
    fetch(CFG.GOOGLE_SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) })
      .catch((err) => console.warn('[newsvendor] logging failed', err));
  }

  function logRound(state, round) {
    postLog({
      action: 'logRound',
      student_id: state.studentId,
      section: state.section,
      condition: state.condition,
      attempt: state.attempt,
      round: round.round,
      order_qty: round.order_qty,
      demand: round.demand,
      units_sold: round.units_sold,
      leftover: round.leftover,
      round_profit: round.round_profit,
      cumulative_profit: round.cumulative_profit,
      decision_time_ms: round.decision_time_ms,
      timestamp: round.timestamp
    });
  }

  function logStudent(state) {
    const countedOrders = state.history.filter((h) => h.round >= 1).map((h) => h.order_qty);
    const totalProfit = state.history
      .filter((h) => h.round >= 1)
      .reduce((sum, h) => sum + h.round_profit, 0);
    const meanOrder = countedOrders.length
      ? countedOrders.reduce((a, b) => a + b, 0) / countedOrders.length
      : '';
    postLog({
      action: 'upsertStudent',
      student_id: state.studentId,
      section: state.section,
      condition: state.condition,
      attempt: state.attempt,
      started_at: state.startedAt,
      finished_at: state.finishedAt || '',
      completed: state.completed,
      total_profit: state.completed ? totalProfit : '',
      mean_order: state.completed ? meanOrder : ''
    });
  }

  // ---------- game flow ----------
  let roundShownAt = null;

  function startGame(studentId, section) {
    let state = loadState(studentId);
    const forced = getUrlParam('test_condition');
    const forcedCondition = (forced === 'high_margin' || forced === 'low_margin') ? forced : null;

    if (!state || state.completed) {
      const prevAttempt = state ? state.attempt : 0;
      state = {
        studentId: studentId.trim(),
        section: section.trim(),
        condition: forcedCondition || assignCondition(studentId),
        attempt: prevAttempt + 1,
        startedAt: new Date().toISOString(),
        finishedAt: null,
        completed: false,
        roundIndex: 0,
        history: []
      };
      saveState(state);
      logStudent(state);
      renderInstructions(state);
    } else {
      // Resuming an in-progress attempt (e.g. after a reload) — skip
      // straight back to the round they left off on, don't restart.
      renderRound(state);
    }
  }

  function cumulativeSoFar(state) {
    return state.history
      .filter((h) => h.round >= 1)
      .reduce((sum, h) => sum + h.round_profit, 0);
  }

  function submitOrder(state, orderQty) {
    const demand = CFG.DEMAND_SEQUENCE[state.roundIndex];
    const cost = CFG.COST[state.condition];
    const unitsSold = Math.min(orderQty, demand);
    const leftover = Math.max(orderQty - demand, 0);
    const roundProfit = CFG.PRICE * unitsSold - cost * orderQty;
    const decisionTimeMs = roundShownAt ? Math.round(performance.now() - roundShownAt) : null;
    const cumulativeProfit = state.roundIndex === 0
      ? roundProfit
      : cumulativeSoFar(state) + roundProfit;

    const round = {
      round: state.roundIndex,
      order_qty: orderQty,
      demand,
      units_sold: unitsSold,
      leftover,
      round_profit: roundProfit,
      cumulative_profit: cumulativeProfit,
      decision_time_ms: decisionTimeMs,
      timestamp: new Date().toISOString()
    };

    state.history.push(round);
    saveState(state);
    logRound(state, round);
    renderReveal(state, round);
  }

  function advanceRound(state) {
    state.roundIndex += 1;
    if (state.roundIndex >= TOTAL_ROUNDS) {
      state.completed = true;
      state.finishedAt = new Date().toISOString();
      saveState(state);
      logStudent(state);
      renderEnd(state);
    } else {
      saveState(state);
      renderRound(state);
    }
  }

  // ---------- rendering ----------
  const app = document.getElementById('app');

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'html') node.innerHTML = v;
      else node.setAttribute(k, v);
    });
    (children || []).forEach((c) => node.appendChild(c));
    return node;
  }

  function renderEntry() {
    app.innerHTML = '';
    const card = el('div', { class: 'card' }, [
      el('h1', {}, [document.createTextNode('Morning Stand')]),
      el('p', { class: 'lede' }, [document.createTextNode(
        'You run a small stand that sells one fresh-made item each morning. ' +
        'Whatever you don’t sell by the end of the day is wasted — and every ' +
        'customer you can’t serve is a sale you miss. Each round, you decide ' +
        'how much to stock before you know how many customers will show up.'
      )]),
      el('label', { for: 'nv-id' }, [document.createTextNode('CSUF ID or Canvas name')]),
      el('input', { id: 'nv-id', type: 'text', autocomplete: 'off' }, []),
      el('label', { for: 'nv-section' }, [document.createTextNode('Section')]),
      el('input', { id: 'nv-section', type: 'text', autocomplete: 'off', placeholder: 'e.g. Section 1' }, []),
      el('button', { id: 'nv-start', class: 'btn-primary' }, [document.createTextNode('Start')]),
      el('p', { class: 'fine-print' }, [document.createTextNode(
        'This is a short bonus exercise — about 10–15 minutes, 20 rounds plus one practice round.'
      )])
    ]);
    app.appendChild(card);

    document.getElementById('nv-start').addEventListener('click', () => {
      const studentId = document.getElementById('nv-id').value.trim();
      const section = document.getElementById('nv-section').value.trim();
      if (!studentId) {
        alert('Please enter your CSUF ID or Canvas name.');
        return;
      }
      startGame(studentId, section);
    });
  }

  function renderInstructions(state) {
    app.innerHTML = '';
    const cost = CFG.COST[state.condition];
    const card = el('div', { class: 'card' }, [
      el('h1', {}, [document.createTextNode('How it works')]),
      el('ul', { class: 'instructions' }, [
        el('li', {}, [document.createTextNode(`Each unit sells for $${CFG.PRICE}.`)]),
        el('li', {}, [document.createTextNode(`Each unit costs you $${cost} to stock.`)]),
        el('li', {}, [document.createTextNode('Demand each day is equally likely to be anywhere from 0 to 100 customers.')]),
        el('li', {}, [document.createTextNode('You decide how many units to stock before you see that day’s demand.')]),
        el('li', {}, [document.createTextNode('Unsold units are wasted. Customers you can’t serve are simply lost — no extra penalty beyond the missed sale.')]),
        el('li', {}, [document.createTextNode(`You'll do 1 practice round (not scored), then ${CFG.COUNTED_ROUNDS} real rounds.`)])
      ]),
      el('p', { class: 'fine-print' }, [document.createTextNode(
        'We won’t tell you the "best" answer here — we’ll talk through what happened as a class afterward.'
      )]),
      el('button', { id: 'nv-begin', class: 'btn-primary' }, [document.createTextNode('Begin practice round')])
    ]);
    app.appendChild(card);
    document.getElementById('nv-begin').addEventListener('click', () => renderRound(state));
  }

  function historyTable(state) {
    if (!state.history.length) return el('p', { class: 'fine-print' }, [document.createTextNode('No rounds yet.')]);
    const rows = state.history.map((h) => el('tr', {}, [
      el('td', {}, [document.createTextNode(h.round === 0 ? 'Practice' : String(h.round))]),
      el('td', {}, [document.createTextNode(String(h.order_qty))]),
      el('td', {}, [document.createTextNode(String(h.demand))]),
      el('td', {}, [document.createTextNode(String(h.units_sold))]),
      el('td', {}, [document.createTextNode(String(h.leftover))]),
      el('td', {}, [document.createTextNode(`$${h.round_profit}`)]),
      el('td', {}, [document.createTextNode(h.round >= 1 ? `$${h.cumulative_profit}` : '—')])
    ]));
    return el('table', { class: 'history' }, [
      el('thead', {}, [el('tr', {}, [
        'Round', 'Order', 'Demand', 'Sold', 'Leftover', 'Profit', 'Cumulative'
      ].map((t) => el('th', {}, [document.createTextNode(t)])))]),
      el('tbody', {}, rows)
    ]);
  }

  function renderRound(state) {
    app.innerHTML = '';
    const cost = CFG.COST[state.condition];
    const label = state.roundIndex === 0 ? 'Practice round' : `Round ${state.roundIndex} of ${CFG.COUNTED_ROUNDS}`;
    roundShownAt = performance.now();

    const input = el('input', { id: 'nv-order', type: 'number', min: '0', max: '100', step: '1' }, []);
    const card = el('div', { class: 'card' }, [
      el('h1', {}, [document.createTextNode(label)]),
      el('div', { class: 'stats' }, [
        el('div', { class: 'stat' }, [el('span', { class: 'stat-label' }, [document.createTextNode('Price')]), el('span', { class: 'stat-value' }, [document.createTextNode(`$${CFG.PRICE}`)])]),
        el('div', { class: 'stat' }, [el('span', { class: 'stat-label' }, [document.createTextNode('Cost')]), el('span', { class: 'stat-value' }, [document.createTextNode(`$${cost}`)])]),
        el('div', { class: 'stat' }, [el('span', { class: 'stat-label' }, [document.createTextNode('Demand')]), el('span', { class: 'stat-value' }, [document.createTextNode('0–100')])])
      ]),
      el('label', { for: 'nv-order' }, [document.createTextNode('How many units will you stock today?')]),
      input,
      el('button', { id: 'nv-submit', class: 'btn-primary' }, [document.createTextNode('Submit order')]),
      el('h2', { class: 'history-heading' }, [document.createTextNode('Your rounds so far')]),
      historyTable(state)
    ]);
    app.appendChild(card);
    input.focus();

    document.getElementById('nv-submit').addEventListener('click', () => {
      const val = parseInt(input.value, 10);
      if (isNaN(val) || val < 0 || val > 100) {
        alert('Please enter a whole number between 0 and 100.');
        return;
      }
      submitOrder(state, val);
    });
  }

  function renderReveal(state, round) {
    app.innerHTML = '';
    const card = el('div', { class: 'card' }, [
      el('h1', {}, [document.createTextNode(round.round === 0 ? 'Practice round result' : `Round ${round.round} result`)]),
      el('div', { class: 'stats' }, [
        el('div', { class: 'stat' }, [el('span', { class: 'stat-label' }, [document.createTextNode('You stocked')]), el('span', { class: 'stat-value' }, [document.createTextNode(String(round.order_qty))])]),
        el('div', { class: 'stat' }, [el('span', { class: 'stat-label' }, [document.createTextNode('Demand was')]), el('span', { class: 'stat-value' }, [document.createTextNode(String(round.demand))])]),
        el('div', { class: 'stat' }, [el('span', { class: 'stat-label' }, [document.createTextNode('Sold')]), el('span', { class: 'stat-value' }, [document.createTextNode(String(round.units_sold))])]),
        el('div', { class: 'stat' }, [el('span', { class: 'stat-label' }, [document.createTextNode('Leftover')]), el('span', { class: 'stat-value' }, [document.createTextNode(String(round.leftover))])])
      ]),
      el('p', { class: 'profit-line' }, [document.createTextNode(`Round profit: $${round.round_profit}`)]),
      round.round >= 1
        ? el('p', { class: 'profit-line' }, [document.createTextNode(`Cumulative profit: $${round.cumulative_profit}`)])
        : el('p', { class: 'fine-print' }, [document.createTextNode('(Practice round — not counted toward your total.)')]),
      el('button', { id: 'nv-continue', class: 'btn-primary' }, [document.createTextNode('Continue')])
    ]);
    app.appendChild(card);
    document.getElementById('nv-continue').addEventListener('click', () => advanceRound(state));
  }

  function renderEnd(state) {
    app.innerHTML = '';
    const countedOrders = state.history.filter((h) => h.round >= 1).map((h) => h.order_qty);
    const totalProfit = state.history.filter((h) => h.round >= 1).reduce((s, h) => s + h.round_profit, 0);
    const meanOrder = (countedOrders.reduce((a, b) => a + b, 0) / countedOrders.length).toFixed(1);
    const card = el('div', { class: 'card' }, [
      el('h1', {}, [document.createTextNode('Done, thanks.')]),
      el('p', { class: 'profit-line' }, [document.createTextNode(`Total profit: $${totalProfit}`)]),
      el('p', { class: 'profit-line' }, [document.createTextNode(`Average order: ${meanOrder} units`)]),
      el('p', { class: 'fine-print' }, [document.createTextNode('Your instructor will go over the class results soon.')])
    ]);
    app.appendChild(card);
  }

  renderEntry();
})();
