export function initTechnicalTracksAccordion() {
  const items = Array.from(document.querySelectorAll("details[data-accordion]"));
  if (!items.length) return;

  items.forEach((d) => {
    d.addEventListener("toggle", () => {
      if (!d.open) return;
      items.forEach((other) => {
        if (other !== d) other.open = false;
      });
    });
  });
}
