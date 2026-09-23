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
// МОБИЛЬНОЕ МЕНЮ (Off-canvas с последовательной анимацией)
// ============================================
const menuToggle = document.getElementById("menuToggle");
const navMobile = document.getElementById("navMobile");
const mobileOverlay = document.getElementById("mobileOverlay");
const mobileCloseBtn = document.getElementById("mobileCloseBtn");

function openMobileMenu() {
  // 1. Блокируем скролл страницы
  document.body.classList.add("menu-open");
  // 2. Показываем подложку
  mobileOverlay.classList.add("active");
  // 3. С небольшой задержкой запускаем выезд меню
  setTimeout(() => {
    navMobile.classList.add("active");
  }, 50);
}

function closeMobileMenu() {
  // 1. Убираем меню (оно уезжает за левый край)
  navMobile.classList.remove("active");
  // 2. Ждём окончания анимации меню (300-400мс), затем убираем подложку и разблокируем скролл
  setTimeout(() => {
    mobileOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  }, 350);
}

if (menuToggle) {
  menuToggle.addEventListener("click", openMobileMenu);
}

if (mobileCloseBtn) {
  mobileCloseBtn.addEventListener("click", closeMobileMenu);
}

if (mobileOverlay) {
  // Закрытие при клике на затемнённую область
  mobileOverlay.addEventListener("click", closeMobileMenu);
}

// Аккордеон внутри мобильного меню
if (navMobile) {
  const mobileDropdowns = navMobile.querySelectorAll(".mobile-dropdown");

  mobileDropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".mobile-dropdown-toggle");
    if (toggle) {
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        // Закрываем другие открытые пункты
        mobileDropdowns.forEach((other) => {
          if (other !== dropdown) {
            other.classList.remove("active");
          }
        });
        // Переключаем текущий
        dropdown.classList.toggle("active");
      });
    }
  });

  // Закрытие меню при клике на любую ссылку внутри
  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });
}

// ============================================
// ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРНЫХ ССЫЛОК
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

// ============================================
// УНИВЕРСАЛЬНЫЙ АККОРДЕОН
// ============================================
document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const isExpanded = trigger.getAttribute("aria-expanded") === "true";
    const content = trigger.nextElementSibling;

    // Обновляем ARIA-атрибут
    trigger.setAttribute("aria-expanded", !isExpanded);

    // Переключаем класс для CSS-анимации
    content.classList.toggle("open", !isExpanded);
  });
});