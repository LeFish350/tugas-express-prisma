import { getProducts } from './api.js';
import { formatRupiah } from './format.mjs';

const grid = document.getElementById('product-grid');
const search = document.getElementById('search');
const counter = document.getElementById('product-count');
const footerCounter = document.getElementById('footer-count');
const empty = document.getElementById('empty-state');
const emptyTitle = document.getElementById('empty-title');
const emptyDescription = document.getElementById('empty-description');
const retryBtn = document.getElementById('retry-btn');
let products = [];
let failed = false;

function element(tag, className, content) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content !== undefined) el.textContent = content;
  return el;
}
function createCard(product) {
  const card = element('article', 'product-card');
  const id = element('p', 'product-id', `ID: ${product.id}`);
  const name = element('h2', 'product-name', product.name);
  const price = element('strong', 'price', formatRupiah(product.price));
  const actions = element('div', 'card-actions');
  const editBtn = element('button', 'btn btn-outline', 'Edit');
  editBtn.type = 'button';
  editBtn.setAttribute('aria-label', `Edit ${product.name}`);
  editBtn.addEventListener('click', () => document.dispatchEvent(new CustomEvent('product:edit', { detail: product })));
  const deleteBtn = element('button', 'btn btn-outline btn-delete-outline', 'Hapus');
  deleteBtn.type = 'button';
  deleteBtn.setAttribute('aria-label', `Hapus ${product.name}`);
  deleteBtn.addEventListener('click', () => document.dispatchEvent(new CustomEvent('product:delete', { detail: product })));
  actions.append(editBtn, deleteBtn);
  card.append(id, name, price, actions);
  return card;
}
function render() {
  const keyword = search.value.trim().toLocaleLowerCase('id-ID');
  const shown = products.filter((product) => product.name.toLocaleLowerCase('id-ID').includes(keyword));
  grid.replaceChildren(...shown.map(createCard));
  counter.textContent = `${products.length} produk`;
  footerCounter.textContent = `Menampilkan ${shown.length} dari ${products.length} produk`;
  empty.hidden = failed || shown.length > 0;
  if (!failed && shown.length === 0) {
    emptyTitle.textContent = keyword ? 'Produk tidak ditemukan' : 'Belum ada produk';
    emptyDescription.textContent = keyword ? 'Coba kata kunci lain.' : 'Klik Tambah Produk untuk membuat produk pertama.';
    retryBtn.hidden = true;
  }
}
export async function loadProducts() {
  failed = false;
  grid.setAttribute('aria-busy', 'true');
  try {
    const result = await getProducts();
    if (!Array.isArray(result)) throw new Error('Format data produk dari server tidak sesuai.');
    products = result;
    render();
  } catch (error) {
    failed = true;
    products = [];
    grid.replaceChildren();
    counter.textContent = 'Gagal memuat';
    footerCounter.textContent = 'Periksa koneksi ke server';
    empty.hidden = false;
    emptyTitle.textContent = 'Gagal memuat produk';
    emptyDescription.textContent = error.message;
    retryBtn.hidden = false;
  } finally {
    grid.setAttribute('aria-busy', 'false');
  }
}
search.addEventListener('input', render);
retryBtn.addEventListener('click', loadProducts);
document.addEventListener('products:refresh', loadProducts);
loadProducts();
