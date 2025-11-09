function updateTime() {
  const now = new Date();
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");

  document.querySelector(
    "#hour .time"
  ).textContent = `${hours}:${minutes}:${seconds}`;
}

updateTime();

setInterval(updateTime, 1000);

window.updateCountdown = updateTime;
