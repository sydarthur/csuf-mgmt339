/* Shared click-through engine: one slide at a time, .frag items reveal one per "next". */
(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  if (!slides.length) return;
  var cur = 0;
  var prevBtn = document.getElementById("prev");
  var nextBtn = document.getElementById("next");
  var count = document.getElementById("count");
  var progress = document.getElementById("progress");

  function frags(i) { return Array.prototype.slice.call(slides[i].querySelectorAll(".frag")); }

  function show(i, revealAll) {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach(function (s, j) { s.classList.toggle("active", j === cur); });
    frags(cur).forEach(function (f) { f.classList.toggle("shown", !!revealAll); });
    update();
  }

  function update() {
    var f = frags(cur);
    var hidden = f.filter(function (x) { return !x.classList.contains("shown"); }).length;
    var atEnd = cur === slides.length - 1 && hidden === 0;
    prevBtn.disabled = cur === 0 && f.length === hidden;
    nextBtn.disabled = atEnd;
    count.textContent = (cur + 1) + " / " + slides.length;
    progress.style.width = ((cur + 1) / slides.length * 100) + "%";
    try { history.replaceState(null, "", "#" + (cur + 1)); } catch (e) {}
  }

  function next() {
    var hidden = frags(cur).filter(function (x) { return !x.classList.contains("shown"); });
    if (hidden.length) { hidden[0].classList.add("shown"); update(); return; }
    if (cur < slides.length - 1) show(cur + 1, false);
  }

  function prev() {
    var shown = frags(cur).filter(function (x) { return x.classList.contains("shown"); });
    if (shown.length) { shown[shown.length - 1].classList.remove("shown"); update(); return; }
    if (cur > 0) show(cur - 1, true);
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  document.addEventListener("keydown", function (e) {
    var t = e.target && e.target.tagName;
    if (t === "INPUT" || t === "TEXTAREA" || t === "SELECT") return;
    if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].indexOf(e.key) > -1) { e.preventDefault(); next(); }
    else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].indexOf(e.key) > -1) { e.preventDefault(); prev(); }
    else if (e.key === "Home") show(0, false);
    else if (e.key === "End") show(slides.length - 1, true);
  });

  var m = /#(\d+)/.exec(location.hash);
  show(m ? +m[1] - 1 : 0, false);
})();
