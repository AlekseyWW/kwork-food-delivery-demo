// ===== Таймер обратного отсчёта =====
// Демо: отсчёт на 2 часа от момента открытия страницы.
// В реальном проекте дата окончания акции приходит с backend / из конфига.

(function () {
  const DURATION_MS = 2 * 60 * 60 * 1000; // 2 часа
  const endTime = Date.now() + DURATION_MS;

  const hhEl = document.getElementById('hh');
  const mmEl = document.getElementById('mm');
  const ssEl = document.getElementById('ss');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const diff = Math.max(0, endTime - Date.now());

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    hhEl.textContent = pad(hours);
    mmEl.textContent = pad(minutes);
    ssEl.textContent = pad(seconds);

    if (diff <= 0) {
      clearInterval(timerInterval);
    }
  }

  tick();
  const timerInterval = setInterval(tick, 1000);
})();

// ===== Переход на форму подтверждения заказа в мессенджере =====
// По ТЗ: клик на "Заказать" -> переход в мессенджер (Telegram deep link).
// Здесь показана модалка-подтверждение + сам deep link.
// В продакшене replace BOT_USERNAME на реального бота заказчика,
// параметр start= передаёт id товара/акции в бота (стандартный Telegram deep linking).

(function () {
  const orderBtn = document.getElementById('orderBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalConfirm = document.getElementById('modalConfirm');
  const modalClose = document.getElementById('modalClose');

  const BOT_USERNAME = 'your_order_bot'; // заменить на реального бота
  const OFFER_ID = 'spring-set-promo';

  function openModal() {
    modalOverlay.classList.add('active');
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
  }

  orderBtn.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });

  modalConfirm.addEventListener('click', function () {
    const deepLink = `https://t.me/${BOT_USERNAME}?start=${OFFER_ID}`;
    window.location.href = deepLink;
  });
})();
