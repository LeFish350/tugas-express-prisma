const notice = document.getElementById('notice');
let noticeTimeout;
export function showDialog(dialog, focusElement) {
  dialog.showModal();
  if (focusElement) focusElement.focus();
}
export function closeDialog(dialog) {
  if (dialog.open) dialog.close();
}
export function showError(element, text) {
  element.textContent = text;
  element.hidden = !text;
}
export function showNotice(text, error = false) {
  notice.textContent = text;
  notice.classList.toggle('error', error);
  notice.hidden = false;
  clearTimeout(noticeTimeout);
  noticeTimeout = setTimeout(() => { notice.hidden = true; }, 4500);
}
export function refreshProducts() {
  document.dispatchEvent(new Event('products:refresh'));
}
document.addEventListener('click', (event) => {
  const closeBtn = event.target.closest('[data-close]');
  if (closeBtn) closeDialog(closeBtn.closest('dialog'));
});
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
});
