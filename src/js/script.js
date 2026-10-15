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
document.querySelectorAll(".faq-list .accordion-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();

    const parentItem = trigger.closest(".faq-item");
    const content = parentItem.querySelector(".faq-content");
    const isActive = parentItem.classList.contains("active");

    // 1. Закрываем все пункты FAQ
    document.querySelectorAll(".faq-list .faq-item").forEach((item) => {
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
// АККОРДЕОН ЦЕН
// ============================================
document.querySelectorAll(".service-price-accordion .accordion-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    
    const parentItem = trigger.closest(".accordion-item");
    const content = parentItem.querySelector(".accordion-content");
    const icon = trigger.querySelector(".accordion-icon");
    const isActive = parentItem.classList.contains("open");

    // Закрываем все открытые пункты (опционально - убери если нужно несколько открытых)
    parentItem.closest(".service-price-accordion").querySelectorAll(".accordion-item").forEach((item) => {
      item.classList.remove("open");
      const itemTrigger = item.querySelector(".accordion-trigger");
      const itemContent = item.querySelector(".accordion-content");
      const itemIcon = item.querySelector(".accordion-icon");
      
      itemTrigger.setAttribute("aria-expanded", "false");
      if (itemContent) itemContent.classList.remove("open");
      if (itemIcon) itemIcon.style.transform = "rotate(0deg)";
    });

    // Если кликнутый пункт был закрыт, открываем его
    if (!isActive) {
      parentItem.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
      if (content) content.classList.add("open");
      if (icon) icon.style.transform = "rotate(180deg)";
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
        2100: { slidesPerView: 4.5, spaceBetween: 20 },
      },
    });

    // Слайдер врачей
    new Swiper(".doctors-swiper", {
      effect: "coverflow",
      slidesPerView: 1.5,
      spaceBetween: 20,
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
      navigation: {
        nextEl: "#doctors-next",
        prevEl: "#doctors-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2.5, spaceBetween: 20 },
        1024: { slidesPerView: 3.5, spaceBetween: 20 },
        2100: { slidesPerView: 4.5, spaceBetween: 20 },
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

// ==========================================
// Модальное окно
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("appointment-modal");
  const openBtns = document.querySelectorAll(".js-open-modal");
  const closeBtn = document.querySelector(".modal-close");
  const closeSuccessBtn = document.getElementById("modal-close-success");
  const formState = document.getElementById("modal-form-state");
  const successState = document.getElementById("modal-success-state");
  const form = document.getElementById("appointment-form");
  const phoneInput = document.getElementById("modal-phone");

  // --- 1. Маска телефона ---
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

    // Сдвигаем val для следующей итерации
    // (упрощенная надежная маска)
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
    // Если номер неполный, очищаем поле, чтобы валидация сработала
    if (e.target.value.length < 18) {
      e.target.value = "";
    }
  });

  phoneInput.addEventListener("focus", function (e) {
    if (e.target.value === "") {
      e.target.value = "+7 (";
    }
  });

  // --- 2. Управление модальным окном ---
  function openModal() {
    modal.classList.remove("is-hidden");
    document.body.style.overflow = "hidden"; // Блокируем скролл страницы
    // Сбрасываем состояние при открытии
    formState.classList.remove("is-hidden");
    successState.classList.add("is-hidden");
    form.reset();
    clearErrors();
  }

  function closeModal() {
    modal.classList.add("is-hidden");
    document.body.style.overflow = ""; // Возвращаем скролл
  }

  openBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    }),
  );

  closeBtn.addEventListener("click", closeModal);
  closeSuccessBtn.addEventListener("click", closeModal);

  // Закрытие по клику вне окна
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Закрытие по Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("is-hidden")) {
      closeModal();
    }
  });

  // --- 3. Валидация и отправка (заглушка) ---
  function clearErrors() {
    document
      .querySelectorAll(".is-invalid")
      .forEach((el) => el.classList.remove("is-invalid"));
  }

  function showError(input) {
    input.classList.add("is-invalid");
    // Для чекбокса ошибка вешается на группу
    if (input.type === "checkbox") {
      input.closest(".form-group").classList.add("is-invalid");
    }
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

    // Полная маска "+7 (XXX) XXX-XX-XX" имеет длину 18 символов
    if (phone.value.length !== 18) {
      showError(phone);
      isValid = false;
    }

    if (!agreement.checked) {
      showError(agreement);
      isValid = false;
    }

    if (isValid) {
      // === ЗДЕСЬ БУДЕТ ЗАПРОС К БЭКЕНДУ ===
      // const formData = new FormData(form);
      // fetch('/api/appointment', { method: 'POST', body: formData })...

      // Пока просто показываем успех
      formState.classList.add("is-hidden");
      successState.classList.remove("is-hidden");
    }
  });
});