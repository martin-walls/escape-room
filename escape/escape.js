const CODE_WORD = "GEBURTSTAG";

updateGuessAndHintCount();
updateTimer();

function validate(inputbox) {
  if (event.key === "Enter") {
    console.log(inputbox.value);

    const guess = inputbox.value.toUpperCase();

    // clear input box
    inputbox.value = "";

    sessionStorage["num_guesses"] = JSON.parse(sessionStorage["num_guesses"]) + 1;

    if (guess === CODE_WORD) {
      // store end time
      sessionStorage["end_time"] = new Date();
      // redirect to well done page
      window.location.href = "/finish";
    } else {
      // wrong code
      document.getElementById("previous-guess").textContent = guess;
      document.getElementById("failed-attempt").style.visibility = "visible";

      let incorrectGuesses = JSON.parse(sessionStorage["incorrect_guesses"]);
      incorrectGuesses.push(guess);
      sessionStorage["incorrect_guesses"] = JSON.stringify(incorrectGuesses);

      updateGuessAndHintCount();
    }
  }
}

function updateGuessAndHintCount() {
  const numGuesses = JSON.parse(sessionStorage["num_guesses"]);
  document.getElementById("num-guesses").textContent = numGuesses;
  document.getElementById("guess-penalty-value").textContent = numGuesses + ":00";

  const numHints = JSON.parse(sessionStorage["num_hints_used"]);
  document.getElementById("num-hints").textContent = numHints;
  document.getElementById("hints-penalty-value").textContent = numHints + ":00";

  const usedHints = JSON.parse(sessionStorage["used_hints"]);
  for (let i = 0; i < usedHints.length; i++) {
    document.getElementById("hintBtn" + usedHints[i]).classList.add("hint-item-used");
  }
}

function showHint(hintId) {
  // don't show confirmation if hint has already been used
  const usedHints = JSON.parse(sessionStorage["used_hints"]);
  if (usedHints.includes(hintId)) {
    showHintConfirmed(hintId);
    return;
  }
  // show confirmation
  document.getElementById("hint-confirmation").style.display = "block";
  document.getElementById("hint-show-bg").style.display = "block";
  // set hintId in title
  document.getElementById("hint-confirmation-hintid").textContent = hintId;
  // set onclick functions for dialog buttons
  document.getElementById("confirmation-btn-no").onclick = () => hideHint();
  document.getElementById("confirmation-btn-yes").onclick = () => showHintConfirmed(hintId);
}

function showHintConfirmed(hintId) {
  document.getElementById("hint-confirmation").style.display = "none";
  const hintBox = document.getElementById("hintShow" + hintId);
  hintBox.style.display = "block";
  document.getElementById("hint-show-bg").style.display = "block";
  const usedHints = JSON.parse(sessionStorage["used_hints"]);
  if (!usedHints.includes(hintId)) {
    usedHints.push(hintId);
    sessionStorage["used_hints"] = JSON.stringify(usedHints);
    sessionStorage["num_hints_used"] = JSON.parse(sessionStorage["num_hints_used"]) + 1;

    updateGuessAndHintCount();
  }
}


function hideHint() {
  const hints = document.getElementsByClassName("hint-show");
  for (let i = 0; i < hints.length; i++) {
    hints[i].style.display = "none";
  }
  document.getElementById("hint-show-bg").style.display = "none";
}

function updateTimer() {
  const now = new Date();
  const start_time = new Date(sessionStorage["start_time"]);
  // elapsed time in seconds
  const elapsed_time = Math.round((now - start_time) / 1000);

  const numGuesses = JSON.parse(sessionStorage["num_guesses"]);
  const numHints = JSON.parse(sessionStorage["num_hints_used"]);

  const seconds = elapsed_time % 60;
  let minutes = (elapsed_time - seconds) / 60;

  minutes += numGuesses + numHints;

  document.getElementById("timer-mins").textContent = leftPadZeros(minutes);
  document.getElementById("timer-secs").textContent = leftPadZeros(seconds);

  setTimeout(updateTimer, 300);
}

function leftPadZeros(x) {
  if (x < 10) {
    return "0" + x;
  }
  return x;
}
