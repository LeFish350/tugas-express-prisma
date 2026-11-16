const test = require('node:test');
const assert = require('node:assert/strict');

let helpers;
test('Format Rupiah mengikuti locale Indonesia', async () => {
  helpers = await import('../public/js/format.mjs');
  assert.match(helpers.formatRupiah(15000), /^Rp\s?15\.000$/);
  assert.match(helpers.formatRupiah(0), /^Rp\s?0$/);
});
test('Validasi menerima nama dan harga valid', async () => {
  const { validateProductInput } = helpers || await import('../public/js/format.mjs');
  assert.deepEqual(validateProductInput(' Buku Tulis ', '12000'), { data: { name: 'Buku Tulis', price: 12000 } });
  assert.deepEqual(validateProductInput('Penghapus', '0'), { data: { name: 'Penghapus', price: 0 } });
});
test('Validasi menolak nama kosong, negatif, desimal dan input yang kosong', async () => {
  const { validateProductInput } = helpers || await import('../public/js/format.mjs');
  for (const [name, price] of [['', '3000'], ['A', '-1'], ['A', '2.5'], ['A', ''], ['A', '2147483648']]) {
    assert.equal(typeof validateProductInput(name, price).error, 'string');
  }
});
