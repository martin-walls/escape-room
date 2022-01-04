const start_time = new Date(sessionStorage["start_time"]);
const end_time = new Date(sessionStorage["end_time"]);
let elapsed_time = end_time - start_time;
// ms -> s
elapsed_time = elapsed_time / 1000;
elapsed_time = Math.round(elapsed_time);
document.getElementById("total-time").textContent = elapsed_time;

const numGuesses = JSON.parse(sessionStorage["num_guesses"]);
document.getElementById("num-guesses").textContent = numGuesses;

const numHints = JSON.parse(sessionStorage["num_hints_used"]);
document.getElementById("num-hints").textContent = numHints;
