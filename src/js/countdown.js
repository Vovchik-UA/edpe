function pad2(n) {
  return String(n).padStart(2, "0");
}

function startCountdown() {
  const root = document.querySelector(".countdown");
  if (!root) return;

  const deadlineStr = root.getAttribute("data-deadline");
  const deadline = new Date(deadlineStr);

  const elWeeks = document.getElementById("cd-weeks");
  const elDays = document.getElementById("cd-days");
  const elHours = document.getElementById("cd-hours");
  const elMinutes = document.getElementById("cd-minutes");
  const elSeconds = document.getElementById("cd-seconds");

  if (!deadlineStr || Number.isNaN(deadline.getTime())) {
    console.error("Countdown: invalid data-deadline:", deadlineStr);
    return;
  }

  function tick() {
    const now = new Date();
    let diffMs = deadline - now;

    if (diffMs <= 0) {
      elWeeks.textContent = "00";
      elDays.textContent = "00";
      elHours.textContent = "00";
      elMinutes.textContent = "00";
      elSeconds.textContent = "00";
      return;
    }

    const totalSeconds = Math.floor(diffMs / 1000);

    const weekSec = 7 * 24 * 60 * 60;
    const daySec = 24 * 60 * 60;
    const hourSec = 60 * 60;
    const minSec = 60;

    const weeks = Math.floor(totalSeconds / weekSec);
    const days = Math.floor((totalSeconds % weekSec) / daySec);
    const hours = Math.floor((totalSeconds % daySec) / hourSec);
    const minutes = Math.floor((totalSeconds % hourSec) / minSec);
    const seconds = totalSeconds % 60;

    elWeeks.textContent = pad2(weeks);
    elDays.textContent = pad2(days);
    elHours.textContent = pad2(hours);
    elMinutes.textContent = pad2(minutes);
    elSeconds.textContent = pad2(seconds);
  }

  tick();
  setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", startCountdown);
