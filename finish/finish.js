const start_time = new Date(sessionStorage["start_time"]);
const end_time = new Date(sessionStorage["end_time"]);
let elapsed_time = end_time - start_time;

if (elapsed_time < 0) {
  window.location.replace("/escape");
}

// ms -> s
elapsed_time = Math.round(elapsed_time / 1000);

const numGuesses = JSON.parse(sessionStorage["num_guesses"]);
const numHints = JSON.parse(sessionStorage["num_hints_used"]);

let seconds = elapsed_time % 60;
let minutes = Math.floor(elapsed_time / 60) % 60;
const hours = Math.floor(elapsed_time / 3600);
minutes += numGuesses + numHints;

seconds = leftPadZeros(seconds);
minutes = leftPadZeros(minutes);

document.getElementById("total-time").textContent = (hours > 0 ? hours + ":" : "") + minutes + ":" + seconds;

document.getElementById("num-guesses").textContent = numGuesses;

document.getElementById("num-hints").textContent = numHints;

function leftPadZeros(x) {
  if (x < 10) {
    return "0" + x;
  }
  return x;
}

// confetti
var defaults = { startVelocity: 30, spread: 360, ticks: 60 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function confettiAtInterval(interval_min, interval_max, xmin, xmax) {
  window.confetti(Object.assign(
    {}, defaults, { origin: { x: randomInRange(xmin, xmax), y: Math.random() - 0.1 } }
  ));

  setTimeout(function() {
    confettiAtInterval(interval_min, interval_max, xmin, xmax);
  }, randomInRange(interval_min, interval_max));
}

// confetti burst at start
// -- confetti cannons from bottom for 4 secs
var initialConfettiEnd = Date.now() + (4 * 1000);
(function confetti_frame() {

  var opts = {particleCount: 5, angle: 90, spread: 20, startVelocity: 70};

  window.confetti(Object.assign(
    {}, opts, { origin: { x: 0.17, y: 1 } }
  ));
  window.confetti(Object.assign(
    {}, opts, { origin: { x: 0.33, y: 1 } }
  ));
  window.confetti(Object.assign(
    {}, opts, { origin: { x: 0.5, y: 1 } }
  ));
  window.confetti(Object.assign(
    {}, opts, { origin: { x: 0.67, y: 1 } }
  ));
  window.confetti(Object.assign(
    {}, opts, { origin: { x: 0.83, y: 1 } }
  ));

  if (Date.now() < initialConfettiEnd) {
    requestAnimationFrame(confetti_frame);
  } else {
    confettiAtInterval(200, 700, 0.1, 0.4);
    confettiAtInterval(200, 700, 0.6, 0.9);
  }
}());
