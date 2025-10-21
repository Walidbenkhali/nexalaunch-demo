document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const body = document.body;

  if (hamburger && mobileMenu && mobileMenuOverlay) {
    const toggleMobileMenu = () => {
      const isActive = hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      mobileMenuOverlay.classList.toggle('active');
      body.classList.toggle('menu-open');
      hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    };

    hamburger.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', toggleMobileMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  }

  const themeToggles = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')];
  
  const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    themeToggles.forEach(toggle => {
      if(toggle) {
        const icon = toggle.querySelector('span');
        if(icon) icon.textContent = theme === 'light' ? '🌙' : '☀️';
      }
    });
    localStorage.setItem('theme', theme);
  };
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  themeToggles.forEach(toggle => {
    if (toggle) {
      toggle.addEventListener('click', () => {
        const newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
      });
    }
  });

  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (slides.length > 1) {
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 5000);

    function showSlide(index) {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if(href && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
