document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");
  const landing = document.getElementById("landing");
  const messageView = document.getElementById("messageView");
  const messageText = document.getElementById("messageText");

  // Pesan personal versi imut - Ganti dengan pesan Anda
  const personalMessage = `sebelum 2025 ini berakhir dan berganti menjadi tahun 2026, ahmuy mau bilang makasih buat shafiruy, km bener-bener bikin hidup aku berwarna shaff!, gua bener bener bangga sama lu yang udah ngejalanin hidup yang terasa biasa aja untuk di dengar namun kalau diijalanin pasti berat buat u kann, i feel u shaf, shafira wanita kuat!, proudd!!!!

tahun ini buat ahmuy beneran ditutup oleh kebahagiaan engga kaya tahun tahun sebelum nya, dan kebahagiaan itu muncul dari diri shafira, ibarat ruangan gelap diterangin sama lampu yaitu km.

makasihh banyak udah mejadi pendengar yang baik di setiap cerita-cerita ahmad, dan juga menjadi bagian terbaik di tahun inii.`;

  // Typewriter effect
  function typeWriter(text, element, speed = 45) {
    element.innerHTML = "";
    element.classList.add("typewriter");
    let i = 0;

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // FUNGSI UNTUK MEMBUAT EFEK CONFETTI
  function shootConfetti() {
    // Warna-warna yang sesuai dengan tema imut
    const colors = [
      "#ff8fab",
      "#ffc8dd",
      "#ffb6c1",
      "#a2d2ff",
      "#bde0fe",
      "#ffafcc",
    ];

    // Durasi confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Confetti dari tengah atas
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: 0.5, y: 0 },
          colors: colors,
        })
      );
    }, 250);
  }

  // Open message
  openBtn.addEventListener("click", function () {
    // Add loading effect to button
    this.innerHTML =
      '<span class="button-text">Tunggu yaa...</span><span class="button-icon">🎀</span>';
    this.disabled = true;
    this.style.animation = "none"; // Stop wobble

    setTimeout(() => {
      // Fade out landing
      landing.classList.add("fade-out");

      setTimeout(() => {
        // Show message view
        messageView.classList.remove("hidden");

        setTimeout(() => {
          messageView.classList.add("active");

          // JALANKAN EFEK CONFETTI SAAT PESAN MUNCUL
          shootConfetti();

          // --> TAMBAHKAN BARIS INI <--
          // Pastikan body bisa di-scroll saat pesan terbuka
          document.body.style.overflow = "auto";

          // Start typewriter effect after a short delay
          setTimeout(() => {
            typeWriter(personalMessage, messageText, 40);
          }, 600);
        }, 100);
      }, 500);
    }, 1000);
  });

  // Close message
  closeBtn.addEventListener("click", function () {
    messageView.classList.remove("active");

    setTimeout(() => {
      messageView.classList.add("hidden");
      landing.classList.remove("fade-out");

      // Reset button
      openBtn.innerHTML =
        '<span class="button-text">Buka Pesan</span><span class="button-icon">💖</span>';
      openBtn.disabled = false;
      openBtn.style.animation = ""; // Resume wobble

      // Clear message text
      messageText.innerHTML = "";
      messageText.classList.remove("typewriter");

      // --> TAMBAHKAN BARIS INI <--
      // Kembalikan overflow ke hidden untuk mencegah scroll di landing page
      document.body.style.overflow = "hidden";
    }, 500);
  });

  // Add keyboard support
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && messageView.classList.contains("active")) {
      closeBtn.click();
    }
  });
});
