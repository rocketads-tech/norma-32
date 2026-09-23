import { initHeader } from "./components/header.js";
import { initMegamenu } from "./components/megamenu.js";
import { initMobileMenu } from "./components/mobile-menu.js";
import { initAccordion } from "./components/accordion.js";
import { initSmoothScroll } from "./components/smooth-scroll.js";

// Инициализация всех модулей после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMegamenu();
  initMobileMenu();
  initAccordion();
  initSmoothScroll();
});
