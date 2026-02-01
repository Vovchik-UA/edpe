function initRegisterModal() {
  const dialog = document.getElementById("register-modal");
  if (!dialog) return;

  const form = dialog.querySelector(".reg-form");
  const toast = document.getElementById("reg-toast");
  const toastCloseBtn = toast?.querySelector("[data-toast-close]");

  let lastFocused = null;
  let toastTimer = null;

  const lockScroll = () => {
    document.documentElement.classList.add("is-modal-open");
    document.body.classList.add("is-locked");
  };

  const unlockScroll = () => {
    document.documentElement.classList.remove("is-modal-open");
    document.body.classList.remove("is-locked");
  };

  const openModal = (triggerEl) => {
    lastFocused = triggerEl || document.activeElement;
    if (triggerEl?.getAttribute?.("href") === "#register" && location.hash !== "#register") {
      history.replaceState(null, "", "#register");
    }

    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }

    lockScroll();

    const closeBtn = dialog.querySelector("[data-close-register], .reg-modal__close");
    closeBtn?.focus?.();
  };

  const closeModal = () => {
    if (typeof dialog.close === "function") {
      if (dialog.open) dialog.close();
    } else {
      dialog.removeAttribute("open");
    }

    unlockScroll();

    if (location.hash === "#register") {
      history.replaceState(null, "", location.pathname + location.search);
    }

    if (lastFocused?.focus) lastFocused.focus();
  };

  const showToast = () => {
    if (!toast) return;

    if (toastTimer) {
      clearTimeout(toastTimer);
      toastTimer = null;
    }

    toast.classList.add("is-show");

    toastTimer = setTimeout(() => {
      toast.classList.remove("is-show");
      toastTimer = null;
    }, 4000);
  };

  const hideToast = () => {
    if (!toast) return;

    toast.classList.remove("is-show");
    if (toastTimer) {
      clearTimeout(toastTimer);
      toastTimer = null;
    }
  };

  // ===== OPEN =====
  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-open-register]");
    if (!opener) return;

    e.preventDefault();
    openModal(opener);
  });

  // ===== CLOSE by buttons =====
  document.addEventListener("click", (e) => {
    const closer = e.target.closest("[data-close-register]");
    if (!closer) return;

    e.preventDefault();
    closeModal();
  });

  // ===== CLOSE by click on backdrop =====
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeModal();
  });

  // ===== ESC (native dialog cancel) =====
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeModal();
  });

  dialog.addEventListener("close", () => {
    unlockScroll();
  });

  // ===== Toast close =====
  toastCloseBtn?.addEventListener("click", hideToast);

  // ===== Submit handler =====
  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    closeModal();
    form.reset();
    showToast();
  });

  if (location.hash === "#register") {
    openModal(null);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRegisterModal);
} else {
  initRegisterModal();
}
