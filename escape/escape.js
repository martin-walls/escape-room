const CODE_WORD = "GEBURTSTAG";

updateGuessAndHintCount();

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
  document.getElementById("num-guesses").textContent = JSON.parse(sessionStorage["num_guesses"]);

  document.getElementById("num-hints").textContent = JSON.parse(sessionStorage["num_hints_used"]);
}
