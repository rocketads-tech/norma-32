// ============================================
// АНИМАЦИЯ HEADER ПРИ СКРОЛЛЕ
// ============================================
const header = document.getElementById("header");
let lastScroll = 0;
let ticking = false;
const PLACE_THRESHOLD = 40;

function updateHeader() {
  const currentScroll = window.pageYOffset;

  // Скрытие/показ хедера
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }

  // Возврат на своё место (когда до верха < 40px)
  if (currentScroll < PLACE_THRESHOLD) {
    header.classList.add("in-place");
  } else {
    header.classList.remove("in-place");
  }

  lastScroll = currentScroll;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateHeader);
    ticking = true;
  }
});

window.addEventListener("load", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll < PLACE_THRESHOLD) {
    header.classList.add("in-place");
  }
});

// ============================================
// МЕГА-МЕНЮ (надёжная логика hover)
// ============================================
const megamenuTrigger = document.getElementById("megamenuTrigger");
const megamenu = document.getElementById("megamenu");

if (megamenuTrigger && megamenu) {
  let megamenuTimeout;

  const showMegamenu = () => {
    clearTimeout(megamenuTimeout);
    megamenu.classList.add("active");
  };

  const hideMegamenu = () => {
    megamenuTimeout = setTimeout(() => {
      megamenu.classList.remove("active");
    }, 150); // 150мс достаточно, чтобы перевести мышь с кнопки на меню
  };

  megamenuTrigger.addEventListener("mouseenter", showMegamenu);
  megamenuTrigger.addEventListener("mouseleave", hideMegamenu);

  megamenu.addEventListener("mouseenter", showMegamenu);
  megamenu.addEventListener("mouseleave", hideMegamenu);
}

// ============================================
// МОБИЛЬНОЕ МЕНЮ (Открытие/закрытие панели)
// ============================================
const menuToggle = document.getElementById("menuToggle");
const navMobile = document.getElementById("navMobile");
const mobileOverlay = document.getElementById("mobileOverlay");
const mobileCloseBtn = document.getElementById("mobileCloseBtn");

function openMobileMenu() {
  document.body.classList.add("menu-open");
  mobileOverlay.classList.add("active");
  setTimeout(() => {
    navMobile.classList.add("active");
  }, 50);
}

function closeMobileMenu() {
  navMobile.classList.remove("active");
  setTimeout(() => {
    mobileOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  }, 350);
}

if (menuToggle) menuToggle.addEventListener("click", openMobileMenu);
if (mobileCloseBtn) mobileCloseBtn.addEventListener("click", closeMobileMenu);
if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileMenu);

if (navMobile) {
  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

// ============================================
// АККОРДЕОН МОБИЛЬНОГО МЕНЮ (Только один открытый)
// ============================================
document.querySelectorAll(".nav-mobile .accordion-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    
    const parentItem = trigger.closest(".accordion-item");
    const content = trigger.nextElementSibling;
    const icon = trigger.querySelector(".accordion-icon");
    const isActive = parentItem.classList.contains("active");

    // 1. Закрываем ВСЕ открытые пункты в мобильном меню
    document.querySelectorAll(".nav-mobile .accordion-item").forEach((item) => {
      item.classList.remove("active");
      const itemTrigger = item.querySelector(".accordion-trigger");
      const itemContent = item.querySelector(".accordion-content");
      const itemIcon = item.querySelector(".accordion-icon");

      itemTrigger.setAttribute("aria-expanded", "false");
      if (itemContent) itemContent.classList.remove("open");
      if (itemIcon) itemIcon.style.transform = "rotate(0deg)";
    });

    // 2. Если кликнутый пункт был закрыт, открываем его
    if (!isActive) {
      parentItem.classList.add("active");
      trigger.setAttribute("aria-expanded", "true");
      if (content) content.classList.add("open");
      if (icon) icon.style.transform = "rotate(180deg)";
    }
  });
});

// ============================================
// FAQ АККОРДЕОН (Только один открытый)
// ============================================
document.querySelectorAll(".faq-section .accordion-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    
    const parentItem = trigger.closest(".faq-item");
    const content = parentItem.querySelector(".faq-content");
    const isActive = parentItem.classList.contains("active");
    
    // 1. Закрываем все пункты FAQ
    document.querySelectorAll(".faq-section .faq-item").forEach((item) => {
      item.classList.remove("active");
      const itemTrigger = item.querySelector(".accordion-trigger");
      const itemContent = item.querySelector(".faq-content");
      
      itemTrigger.setAttribute("aria-expanded", "false");
      if (itemContent) itemContent.classList.remove("open");
      
      const plus = itemTrigger.querySelector(".icon-plus");
      const minus = itemTrigger.querySelector(".icon-minus");
      if (plus) plus.style.display = "block";
      if (minus) minus.style.display = "none";
    });

    // 2. Если кликнутый пункт был закрыт, открываем его
    if (!isActive) {
      parentItem.classList.add("active");
      trigger.setAttribute("aria-expanded", "true");
      if (content) content.classList.add("open");
      
      const plus = trigger.querySelector(".icon-plus");
      const minus = trigger.querySelector(".icon-minus");
      if (plus) plus.style.display = "none";
      if (minus) minus.style.display = "block";
    }
  });
});

// ============================================
// 4. ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРНЫХ ССЫЛОК
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Игнорируем кнопки мобильного аккордеона, у них href нет или он не якорь
    if (this.classList.contains("mobile-dropdown-toggle")) return;

    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ==========================================
// Swiper - Инициализация всех слайдеров
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper !== 'undefined') {
    
    // Слайдер услуг
    new Swiper('.services-swiper', {
      slidesPerView: 1.5,
      spaceBetween: 20,
      loop: false,
      grabCursor: true,
      navigation: {
        nextEl: '#services-next',
        prevEl: '#services-prev',
      },
      breakpoints: {
        640: { slidesPerView: 2.5, spaceBetween: 20 },
        1024: { slidesPerView: 3.5, spaceBetween: 20 },
        1400: { slidesPerView: 4.5, spaceBetween: 20 },
      },
    });

    // Слайдер врачей
    new Swiper('.doctors-swiper', {
      slidesPerView: 1.5,
      spaceBetween: 20,
      loop: false,
      grabCursor: true,
      navigation: {
        nextEl: '#doctors-next',
        prevEl: '#doctors-prev',
      },
      breakpoints: {
        640: { slidesPerView: 2.5, spaceBetween: 20 },
        1024: { slidesPerView: 3.5, spaceBetween: 20 },
        1400: { slidesPerView: 4.5, spaceBetween: 20 },
      },
    });

    // Слайдер отзывов
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1.5,
      spaceBetween: 20,
      loop: false,
      grabCursor: true,
      navigation: {
        nextEl: '#testimonials-next',
        prevEl: '#testimonials-prev',
      },
      breakpoints: {
        640: { slidesPerView: 2.5, spaceBetween: 20 },
        1024: { slidesPerView: 3.5, spaceBetween: 20 },
        2100: { slidesPerView: 4.5, spaceBetween: 20 },
      },
    });

  }
});
