import { removeProduct } from './api.js';
import { formatRupiah } from './format.mjs';
import { showDialog, closeDialog, showError, showNotice, refreshProducts } from './dialogs.js';

const dialog = document.getElementById('delete-dialog');
const form = document.getElementById('delete-form');
const errorEl = document.getElementById('delete-error');
const submitButton = form.querySelector('button[type="submit"]');
let selectedId = null;
document.addEventListener('product:delete', ({ detail }) => {
  selectedId = detail.id;
  document.getElementById('delete-id').textContent = `ID: ${detail.id}`;
  document.getElementById('delete-name').textContent = detail.name;
  document.getElementById('delete-price').textContent = formatRupiah(detail.price);
  showError(errorEl, '');
  showDialog(dialog, submitButton);
});
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  showError(errorEl, '');
  submitButton.disabled = true;
  try {
    await removeProduct(selectedId);
    closeDialog(dialog);
    showNotice('Produk berhasil dihapus.');
    refreshProducts();
  } catch (error) {
    showError(errorEl, error.message);
  } finally {
    submitButton.disabled = false;
  }
});
