// ============================================
// 1. АНИМАЦИЯ HEADER ПРИ СКРОЛЛЕ
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
// 2. МЕГА-МЕНЮ
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
    }, 150);
  };

  megamenuTrigger.addEventListener("mouseenter", showMegamenu);
  megamenuTrigger.addEventListener("mouseleave", hideMegamenu);
  megamenu.addEventListener("mouseenter", showMegamenu);
  megamenu.addEventListener("mouseleave", hideMegamenu);
}

// ============================================
// 3. МОБИЛЬНОЕ МЕНЮ
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
// 4. АККОРДЕОНЫ (Универсальная функция)
// ============================================
function initAccordion(
  containerSelector,
  triggerSelector,
  contentSelector,
  iconSelector,
) {
  document
    .querySelectorAll(`${containerSelector} ${triggerSelector}`)
    .forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const parentItem =
          trigger.closest(".accordion-item") || trigger.closest(".faq-item");
        const content = parentItem.querySelector(contentSelector);
        const icon = iconSelector ? trigger.querySelector(iconSelector) : null;
        const isActive =
          parentItem.classList.contains("active") ||
          parentItem.classList.contains("open");

        // Закрываем все в этом контейнере
        document
          .querySelectorAll(
            `${containerSelector} .accordion-item, ${containerSelector} .faq-item`,
          )
          .forEach((item) => {
            item.classList.remove("active", "open");
            const itemTrigger = item.querySelector(triggerSelector);
            const itemContent = item.querySelector(contentSelector);
            const itemIcon = iconSelector
              ? itemTrigger.querySelector(iconSelector)
              : null;

            itemTrigger.setAttribute("aria-expanded", "false");
            if (itemContent) itemContent.classList.remove("open");
            if (itemIcon) itemIcon.style.transform = "rotate(0deg)";

            const plus = itemTrigger.querySelector(".icon-plus");
            const minus = itemTrigger.querySelector(".icon-minus");
            if (plus) plus.style.display = "block";
            if (minus) minus.style.display = "none";
          });

        // Открываем текущий, если он был закрыт
        if (!isActive) {
          parentItem.classList.add("active", "open");
          trigger.setAttribute("aria-expanded", "true");
          if (content) content.classList.add("open");
          if (icon) icon.style.transform = "rotate(180deg)";

          const plus = trigger.querySelector(".icon-plus");
          const minus = trigger.querySelector(".icon-minus");
          if (plus) plus.style.display = "none";
          if (minus) minus.style.display = "block";
        }
      });
    });
}

initAccordion(
  ".nav-mobile",
  ".accordion-trigger",
  ".accordion-content",
  ".accordion-icon",
);
initAccordion(".faq-list", ".accordion-trigger", ".faq-content", null);
initAccordion(
  ".service-price-accordion",
  ".accordion-trigger",
  ".accordion-content",
  ".accordion-icon",
);

// ============================================
// 5. ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРНЫХ ССЫЛОК
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.classList.contains("accordion-trigger")) return;

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
// 6. SWIPER СЛАЙДЕРЫ
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof Swiper !== "undefined") {
    new Swiper(".services-swiper", {
      slidesPerView: 1.1,
      spaceBetween: 10,
      loop: false,
      grabCursor: true,
      navigation: { nextEl: "#services-next", prevEl: "#services-prev" },
      breakpoints: {
        425: { slidesPerView: 1.5, spaceBetween: 20 },
        570: { slidesPerView: 2, spaceBetween: 20 },
        640: { slidesPerView: 2.5, spaceBetween: 20 },
        1024: { slidesPerView: 3.5, spaceBetween: 20 },
      },
    });

    new Swiper(".doctors-swiper", {
      effect: "coverflow",
      slidesPerView: 1.1,
      spaceBetween: 10,
      loop: false,
      grabCursor: true,
      centeredSlides: true,
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      navigation: { nextEl: "#doctors-next", prevEl: "#doctors-prev" },
      breakpoints: {
        425: { slidesPerView: 1.5, spaceBetween: 20 },
        570: { slidesPerView: 2, spaceBetween: 20 },
        640: { slidesPerView: 2.5, spaceBetween: 20 },
        1024: { slidesPerView: 3.5, spaceBetween: 20 },
      },
    });

    new Swiper(".testimonials-swiper", {
      slidesPerView: 1.5,
      spaceBetween: 20,
      loop: false,
      grabCursor: true,
      navigation: {
        nextEl: "#testimonials-next",
        prevEl: "#testimonials-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2.5, spaceBetween: 20 },
        1024: { slidesPerView: 3.5, spaceBetween: 20 },
      },
    });
  }
});

// ============================================
// 7. МОДАЛЬНОЕ ОКНО (ВЕРНУЛ ТВОЮ РАБОЧУЮ МАСКУ)
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("appointment-modal");
  if (!modal) return;

  const openBtns = document.querySelectorAll(".js-open-modal");
  const closeBtn = document.querySelector(".modal-close");
  const closeSuccessBtn = document.getElementById("modal-close-success");
  const formState = document.getElementById("modal-form-state");
  const successState = document.getElementById("modal-success-state");
  const form = document.getElementById("appointment-form");
  const phoneInput = document.getElementById("modal-phone");

  // Твоя оригинальная, рабочая маска
  const matrix = "+7 (___) ___-__-__";
  phoneInput.addEventListener("input", function (e) {
    let def = matrix.replace(/\D/g, "");
    let val = e.target.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && val.length > 0
        ? val.charAt(0)
        : val.length === 0
          ? ""
          : a;
    });
    let i = 0;
    e.target.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
          ? ""
          : a;
    });
  });

  phoneInput.addEventListener("blur", function (e) {
    if (e.target.value.length < 18) e.target.value = "";
  });

  phoneInput.addEventListener("focus", function (e) {
    if (e.target.value === "") e.target.value = "+7 (";
  });

  function openModal() {
    modal.classList.remove("is-hidden");
    document.body.style.overflow = "hidden";
    formState.classList.remove("is-hidden");
    successState.classList.add("is-hidden");
    form.reset();
    clearErrors();
  }

  function closeModal() {
    modal.classList.add("is-hidden");
    document.body.style.overflow = "";
  }

  openBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    }),
  );
  closeBtn.addEventListener("click", closeModal);
  closeSuccessBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("is-hidden"))
      closeModal();
  });

  function clearErrors() {
    document
      .querySelectorAll(".is-invalid")
      .forEach((el) => el.classList.remove("is-invalid"));
  }

  function showError(input) {
    input.classList.add("is-invalid");
    if (input.type === "checkbox")
      input.closest(".form-group").classList.add("is-invalid");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();
    let isValid = true;

    const nameInput = form.querySelector('[name="name"]');
    const phone = form.querySelector('[name="phone"]');
    const agreement = form.querySelector('[name="agreement"]');

    if (nameInput.value.trim().length < 2) {
      showError(nameInput);
      isValid = false;
    }
    if (phone.value.length !== 18) {
      showError(phone);
      isValid = false;
    }
    if (!agreement.checked) {
      showError(agreement);
      isValid = false;
    }

    if (isValid) {
      formState.classList.add("is-hidden");
      successState.classList.remove("is-hidden");
    }
  });
});

// ============================================
// 8. АНИМАЦИЯ ПРИ СКРОЛЛЕ (УПРОЩЁННАЯ И БЕЗОПАСНАЯ)
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Отключаем на мобильных для производительности и предотвращения багов
  if (window.innerWidth <= 768) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) return;

  const animatedElements = document.querySelectorAll("[data-animate]");
  if (animatedElements.length === 0) return;

  const cascadeGroups = document.querySelectorAll("[data-cascade]");
  cascadeGroups.forEach((group) => {
    const items = group.querySelectorAll("[data-animate]");
    items.forEach((item, index) => {
      if (!item.hasAttribute("data-delay")) {
        item.setAttribute("data-delay", (index + 1) * 100);
      }
    });
  });

  // Максимально простой и надёжный Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px", // Убрал -100px сверху, он вызывал мерцание
    },
  );

  animatedElements.forEach((el) => observer.observe(el));
});
