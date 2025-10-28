function getWeekday() {
  const today = new Date();
  const weekdays = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  return weekdays[today.getDay()];
}

function getGregorianDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

function getLunarDate() {
  try {
    const today = new Date();
    const day = today
      .toLocaleDateString("vi-VN-u-ca-chinese", { day: "numeric" })
      .replace(/\D/g, "");
    const month = today
      .toLocaleDateString("vi-VN-u-ca-chinese", { month: "numeric" })
      .replace(/\D/g, "");
    const year = today
      .toLocaleDateString("vi-VN-u-ca-chinese", { year: "numeric" })
      .replace(/\D/g, "");
    return `${day}/${month}/${year}`;
  } catch (e) {
    return "Không hỗ trợ";
  }
}

document.querySelector("#today .weekday").textContent = getWeekday();
document.querySelector("#today .date-gregorian").textContent =
  getGregorianDate();
document.querySelector("#today .date-lunar").textContent = getLunarDate();
