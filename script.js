document.addEventListener('DOMContentLoaded', () => {

  /* ============ AÑO EN FOOTER ============ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============ MENÚ MÓVIL ============ */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ============ CARRUSEL HÉROE ============ */
  const track = document.getElementById('heroTrack');
  const slides = track ? Array.from(track.querySelectorAll('.hero-slide')) : [];
  const dotsContainer = document.getElementById('heroDots');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  if (slides.length > 0) {
    let currentIndex = slides.findIndex(s => s.classList.contains('is-active'));
    if (currentIndex === -1) currentIndex = 0;

    const AUTOPLAY_DELAY = 5000;
    let autoplayTimer = null;

    // Generar los puntos de navegación dinámicamente
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('hero-dot');
      dot.setAttribute('aria-label', `Ir a la diapositiva ${i + 1}`);
      if (i === currentIndex) dot.classList.add('is-active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.hero-dot'));

    function updateSlides() {
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === currentIndex);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      updateSlides();
      restartAutoplay();
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    function startAutoplay() {
      autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    function restartAutoplay() {
      clearInterval(autoplayTimer);
      startAutoplay();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Pausar en hover para dar tiempo a leer
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
      heroSection.addEventListener('mouseleave', startAutoplay);
    }

    // Soporte básico de swipe en móvil
    let touchStartX = 0;
    if (heroSection) {
      heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      heroSection.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? prevSlide() : nextSlide();
        }
      }, { passive: true });
    }

    startAutoplay();
  }

  /* ============ FORMULARIO DE RESERVA (demo) ============ */
  const bookingForm = document.getElementById('bookingForm');
  const formNote = document.getElementById('formNote');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(bookingForm);
      const nombre = data.get('nombre');

      formNote.textContent = `Gracias, ${nombre}. Hemos recibido su solicitud y le confirmaremos por WhatsApp en breve.`;
      bookingForm.reset();
    });
  }

});