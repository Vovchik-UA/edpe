// src/js/gallery-lightbox.js

export function initGalleryLightbox() {
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;

  const dialog = lightbox.querySelector(".lightbox__dialog");
  const img = lightbox.querySelector(".lightbox__img");
  const closeBtn = lightbox.querySelector(".lightbox__close");

  if (!dialog || !img || !closeBtn) return;

  let lastActiveEl = null;

  function lockScroll() {
    // Lock scroll (both html + body to avoid browser differences)
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // If you ever used class-based lock anywhere, also set it
    document.documentElement.classList.add("is-locked");
    document.body.classList.add("is-locked");
  }

  function unlockScrollHard() {
    // HARD reset: remove any possible locks
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    document.documentElement.classList.remove("is-locked");
    document.body.classList.remove("is-locked");
  }

  function openLightbox(src, alt = "") {
    lastActiveEl = document.activeElement;

    img.src = src;
    img.alt = alt || "Preview";

    lockScroll();

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");

    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");

    // Clear image
    img.src = "";
    img.alt = "";

    // IMPORTANT: return scroll
    unlockScrollHard();

    if (lastActiveEl && typeof lastActiveEl.focus === "function") {
      lastActiveEl.focus();
    }
  }

  // OPEN (delegation)
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-lightbox]");
    if (!trigger) return;

    e.preventDefault();

    const src = trigger.getAttribute("data-lightbox");
    const thumb = trigger.querySelector("img");
    const alt = thumb ? thumb.getAttribute("alt") : "";

    if (src) openLightbox(src, alt);
  });

  // CLOSE (X)
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeLightbox();
  });

  // CLOSE (click outside image)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Prevent closing when clicking inside dialog
  dialog.addEventListener("click", (e) => e.stopPropagation());

  // CLOSE (ESC)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}
