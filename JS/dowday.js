document.addEventListener("DOMContentLoaded", function () {
  const eventDaysWrapper = document.getElementById("event-days-wrapper");
  const eventDaysEl = document.getElementById("days-left");
  const afterCountdownEl = document.getElementById("after-countdown");
  const totalEventDays = 7;

  let fireworksStarted = false;

  const afterCountdownMessages = [
    {
      title: "Chúc năm mới an khang – thịnh vượng",
      subtitle:
        "Xuân về may mắn đầy tay, <br>Vạn điều như ý, ngàn ngày bình an.",
    },
    {
      title: "Chúc năm mới sức khỏe dồi dào",
      subtitle:
        "Mai vàng nở rộ đón xuân sang, <br>Đào thắm khoe sắc ngập tràn yêu thương.",
    },
    {
      title: "Chúc một năm mới bình an - mạnh khỏe",
      subtitle:
        "Lộc xuân đâm chồi nảy mầm hy vọng, <br>Phúc đến ngập tràn mọi nẻo đường vui.",
    },
    {
      title: "Năm mới, khởi đầu mới - may mắn mới - thành tựu mới.",
      subtitle:
        "Bánh chưng xanh gói cả trời thương nhớ, <br>Câu đối đỏ trao trọn nghĩa tình thân.",
    },
    {
      title: "Chúc năm mới phát tài phát lộc",
      subtitle:
        "Xuân mới gieo duyên, đời thêm hạnh phúc, <br>Tết về đơm lộc, tình mãi vẹn nguyên.",
    },
    {
      title: "Chúc năm mới may mắn",
      subtitle:
        "Mâm cỗ đầy, gia đình cùng đoàn tụ, <br>Lộc tràn nhà, hạnh phúc mãi tròn đầy.",
    },
    {
      title: "Chúc năm mới hạnh phúc",
      subtitle:
        "Tết đến hân hoan, lòng người rạo rực, <br>Xuân về náo nức, phố phường rộn vang.",
    },
  ];

  const afterCountdownTexts = [
    '<span class="after-day-text">Hôm Nay: <span style="color: rgb(255, 230, 0);">Mùng 1 TẾT</span></span>',
    '<span class="after-day-text">Hôm Nay: <span style="color: rgb(255, 230, 0);">Mùng 2 TẾT</span></span>',
    '<span class="after-day-text">Hôm Nay: <span style="color: rgb(255, 230, 0);">Mùng 3 TẾT</span></span>',
    '<span class="after-day-text">Hôm Nay: <span style="color: rgb(255, 230, 0);">Mùng 4 TẾT</span></span>',
    '<span class="after-day-text">Hôm Nay: <span style="color: rgb(255, 230, 0);">Mùng 5 TẾT</span></span>',
    '<span class="after-day-text">Hôm Nay: <span style="color: rgb(255, 230, 0);">Mùng 6 TẾT</span></span>',
    '<span class="after-day-text">Hôm Nay: <span style="color: rgb(255, 230, 0);">Mùng 7 TẾT</span></span>',
  ];

  function updateCountdown() {
    const now = new Date().getTime();
    const countdownEl = document.getElementById("countdown");
    const countdownTextEl = document.getElementById("countdown-text");
    const countdownEndTextEl = document.getElementById("countdown-end-text");

    const distance = targetDate.getTime() - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.ceil((distance % (1000 * 60)) / 1000);

      countdownEl.innerHTML = `
        <div class="count-days">
          <span class="count-num">${days}</span> NGÀY
        </div>
        <div class="count-time">
          <span class="count-num">${hours}</span> GIỜ 
          <span class="count-num">${minutes}</span> PHÚT 
          <span class="count-num">${seconds}</span> GIÂY
        </div>
      `;

      if (eventDaysWrapper) eventDaysWrapper.style.display = "none";
      if (afterCountdownEl) afterCountdownEl.style.display = "none";
      return;
    }

    const daysPassed = Math.floor(
      (now - targetDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const messageIndex = Math.min(
      daysPassed,
      afterCountdownMessages.length - 1
    );
    const message = afterCountdownMessages[messageIndex];

    countdownEl.innerHTML = `
      <div class="event-ended">
        <h2 class="event-ended-1">${message.title}</h2>
        <h3 class="event-ended-2">${message.subtitle}</h3>
      </div>
    `;

    if (!fireworksStarted) {
      fireworksStarted = true;
      startFireworks();
    }

    if (countdownTextEl) countdownTextEl.textContent = "Đã đến ";
    if (countdownEndTextEl) countdownEndTextEl.textContent = "rồi!";

    if (eventDaysWrapper) eventDaysWrapper.style.display = "block";
    const daysLeft = Math.max(totalEventDays - daysPassed, 0);
    if (eventDaysEl) eventDaysEl.textContent = daysLeft;

    if (afterCountdownEl) {
      afterCountdownEl.style.display = "block";
      afterCountdownEl.innerHTML = afterCountdownTexts[messageIndex];
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
