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
