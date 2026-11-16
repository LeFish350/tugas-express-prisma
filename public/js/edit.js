import { updateProduct } from './api.js';
import { validateProductInput } from './format.mjs';
import { showDialog, closeDialog, showError, showNotice, refreshProducts } from './dialogs.js';

const dialog = document.getElementById('edit-dialog');
const form = document.getElementById('edit-form');
const nameField = document.getElementById('edit-name');
const priceField = document.getElementById('edit-price');
const errorEl = document.getElementById('edit-error');
const submitButton = form.querySelector('button[type="submit"]');
let selectedId = null;
document.addEventListener('product:edit', ({ detail }) => {
  selectedId = detail.id;
  nameField.value = detail.name;
  priceField.value = detail.price;
  document.getElementById('edit-id').textContent = `ID: ${selectedId}`;
  showError(errorEl, '');
  showDialog(dialog, nameField);
});
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const result = validateProductInput(nameField.value, priceField.value);
  if (result.error) return showError(errorEl, result.error);
  showError(errorEl, '');
  submitButton.disabled = true;
  try {
    await updateProduct(selectedId, result.data);
    closeDialog(dialog);
    showNotice('Perubahan produk berhasil disimpan.');
    refreshProducts();
  } catch (error) {
    showError(errorEl, error.message);
  } finally {
    submitButton.disabled = false;
  }
});
