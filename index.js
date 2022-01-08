function startGame() {
  sessionStorage["start_time"] = new Date();
  sessionStorage["end_time"] = 0;
  sessionStorage["incorrect_guesses"] = JSON.stringify([]);
  sessionStorage["num_guesses"] = 0;
  sessionStorage["num_hints_used"] = 0;
  sessionStorage["used_hints"] = JSON.stringify([]);
  window.location.href = "/escape";
}
