const start_time = new Date(sessionStorage["start_time"]);
const end_time = new Date();
let elapsed_time = end_time - start_time;
// ms -> s
elapsed_time = elapsed_time / 1000;
elapsed_time = Math.round(elapsed_time);
document.getElementById("total_time").textContent = elapsed_time;
