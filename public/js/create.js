import { createProduct } from './api.js';
import { validateProductInput } from './format.mjs';
import { showDialog, closeDialog, showError, showNotice, refreshProducts } from './dialogs.js';

const dialog = document.getElementById('create-dialog');
const form = document.getElementById('create-form');
const nameField = document.getElementById('create-name');
const priceField = document.getElementById('create-price');
const errorEl = document.getElementById('create-error');
const submitButton = form.querySelector('button[type="submit"]');
document.getElementById('add-product-btn').addEventListener('click', () => {
  form.reset();
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
    await createProduct(result.data);
    closeDialog(dialog);
    showNotice('Produk berhasil ditambahkan.');
    refreshProducts();
  } catch (error) {
    showError(errorEl, error.message);
  } finally {
    submitButton.disabled = false;
  }
});
