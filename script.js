const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#primary-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.getAttribute('data-open') === 'true';
    siteNav.setAttribute('data-open', String(!isOpen));
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.setAttribute('data-open', 'false');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (heroSlides.length > 1 && !reduceMotion.matches) {
  let activeSlide = heroSlides.findIndex((slide) => slide.classList.contains('is-active'));
  activeSlide = activeSlide >= 0 ? activeSlide : 0;
  heroSlides[activeSlide].classList.add('is-active');

  window.setInterval(() => {
    const previousSlide = activeSlide;
    activeSlide = (activeSlide + 1) % heroSlides.length;
    heroSlides[activeSlide].classList.add('is-active');

    window.setTimeout(() => {
      heroSlides[previousSlide].classList.remove('is-active');
    }, 1900);
  }, 6500);
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
