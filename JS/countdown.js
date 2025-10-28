const targetDate = new Date("Feb 17, 2026 00:00:00");

function getWeekday(date) {
  const weekdays = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  return weekdays[date.getDay()];
}

function formatGregorian(date) {
  const weekday = `<span class="weekday">${getWeekday(date)},</span>`;
  const day = `<span class="day">${String(date.getDate()).padStart(
    2,
    "0"
  )}</span>`;
  const month = `<span class="month">${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}</span>`;
  const year = `<span class="year">${date.getFullYear()}</span>`;
  return `${weekday} <span class="date-gregorian">${day}/${month}/${year}</span>`;
}

function formatLunar(date) {
  try {
    const day = date
      .toLocaleDateString("vi-VN-u-ca-chinese", { day: "numeric" })
      .replace(/\D/g, "");
    const month = date
      .toLocaleDateString("vi-VN-u-ca-chinese", { month: "numeric" })
      .replace(/\D/g, "");
    const year = date
      .toLocaleDateString("vi-VN-u-ca-chinese", { year: "numeric" })
      .replace(/\D/g, "");
    return `<span class="date-lunar"><span class="lunar-day">${day}</span>/<span class="lunar-month">${month}</span>/<span class="lunar-year">${year}</span></span>`;
  } catch (e) {
    return "Không hỗ trợ";
  }
}

document.getElementById(
  "event-date"
).innerHTML = `<strong>Ngày diễn ra: ${formatGregorian(
  targetDate
)} (Dương lịch) | ${formatLunar(targetDate)} (Âm lịch)</strong>`;

const eventDaysEl = document.getElementById("days-left");

updateCountdown();
const timer = setInterval(updateCountdown, 1000);
