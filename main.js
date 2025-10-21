document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const body = document.body;

  const toggleMobileMenu = () => {
    const isOpen = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    body.classList.toggle('menu-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  };

  if (hamburger && mobileMenu && mobileMenuOverlay) {
    hamburger.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', toggleMobileMenu));
  }

  // Theme toggle
  const themeToggles = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')];
  const setTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    themeToggles.forEach(btn => {
      if (!btn) return;
      const span = btn.querySelector('span');
      if (span) span.textContent = theme === 'light' ? '🌙' : '☀️';
    });
    localStorage.setItem('theme', theme);
  };
  setTheme(localStorage.getItem('theme') || 'light');
  themeToggles.forEach(btn => btn && btn.addEventListener('click', () => {
    setTheme(document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  }));

  // Hero slideshow
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let current = 0;
  const show = (i) => {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  };
  const next = () => { current = (current + 1) % slides.length; show(current); };
  if (slides.length > 1) {
    let timer = setInterval(next, 5000);
    dots.forEach((d, i) => d.addEventListener('click', () => {
      current = i; show(current); clearInterval(timer); timer = setInterval(next, 5000);
    }));
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Fade-in on scroll
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
});
