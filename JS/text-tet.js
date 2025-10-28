const afterCountdownEl = document.getElementById("after-countdown");

if (distance <= 0) {
  if (afterCountdownEl) afterCountdownEl.style.display = "block";

  if (countdownTextEl) countdownTextEl.textContent = "Đã đến ";
  if (countdownEndTextEl) countdownEndTextEl.textContent = "rồi!";
} else {
  if (afterCountdownEl) afterCountdownEl.style.display = "none";
}
