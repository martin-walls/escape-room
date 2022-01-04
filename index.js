function startGame() {
  sessionStorage["start_time"] = new Date();
  sessionStorage["incorrect_guesses"] = JSON.stringify([]);
  sessionStorage["num_guesses"] = 0;
  sessionStorage["num_hints_used"] = 0;
  window.location.href = "/escape";
}
