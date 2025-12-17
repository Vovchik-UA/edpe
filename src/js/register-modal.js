const openBtn = document.querySelector('[data-open-register]');
const dialog = document.querySelector('#register-modal');
const closeBtns = document.querySelectorAll('[data-close-register]');

if (!openBtn || !dialog) {
  console.error('Register modal elements not found');
}

openBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  dialog.showModal();
  document.documentElement.classList.add('is-modal-open');
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    dialog.close();
    document.documentElement.classList.remove('is-modal-open');
  });
});

/* Close on ESC */
dialog.addEventListener('close', () => {
  document.documentElement.classList.remove('is-modal-open');
});
