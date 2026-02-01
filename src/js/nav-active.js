function normalizePath(pathname) {
  if (pathname === "/" || pathname === "") return "/index.html";
  return pathname;
}

function markActiveNav() {
  const nav = document.querySelector(".nav__list");
  if (!nav) return false;

  const current = normalizePath(window.location.pathname);

  nav.querySelectorAll("a.nav__link").forEach((link) => {
    const linkPath = normalizePath(new URL(link.getAttribute("href"), window.location.origin).pathname);

    const isActive =
      linkPath === current ||
      (current === "/index.html" && (linkPath === "/" || linkPath === "/index.html"));

    link.classList.toggle("is-active", isActive);

    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  if (markActiveNav()) return;

  const obs = new MutationObserver(() => {
    if (markActiveNav()) obs.disconnect();
  });

  obs.observe(document.body, { childList: true, subtree: true });
});
