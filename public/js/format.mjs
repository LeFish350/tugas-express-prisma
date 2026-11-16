const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0,
});
export function formatRupiah(price) {
  return rupiahFormatter.format(Number(price) || 0).replace(/\u00a0/g, '');
}
export function validateProductInput(name, priceText) {
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const raw = String(priceText ?? '').trim();
  const price = Number(raw);
  if (!cleanName) return { error: 'Nama produk wajib diisi.' };
  if (!/^(0|[1-9]\d*)$/.test(raw) || !Number.isSafeInteger(price) || price > 2147483647) {
    return { error: 'Harga harus bilangan bulat dari 0 sampai 2147483647.' };
  }
  return { data: { name: cleanName, price } };
}
