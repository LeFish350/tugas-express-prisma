const test = require('node:test');
const assert = require('node:assert/strict');
const { createProductController, parseId, parseProductBody } = require('../src/controllers/productController');

function createFakePrisma() {
  const records = new Map([
    [1, { id: 1, name: 'Buku', price: 15000 }],
    [2, { id: 2, name: 'Pulpen', price: 5000 }],
  ]);
  let nextId = 3;
  const notFound = () => Object.assign(new Error('Record not found'), { code: 'P2025' });
  return {
    product: {
      async findMany() { return [...records.values()].sort((a, b) => a.id - b.id); },
      async findUnique({ where }) { return records.get(where.id) ?? null; },
      async create({ data }) {
        const p = { id: nextId++, ...data };
        records.set(p.id, p);
        return p;
      },
      async update({ where, data }) {
        if (!records.has(where.id)) throw notFound();
        const p = { id: where.id, ...data };
        records.set(p.id, p);
        return p;
      },
      async delete({ where }) {
        const p = records.get(where.id);
        if (!p) throw notFound();
        records.delete(where.id);
        return p;
      },
    },
  };
}
function createResponse() {
  return {
    code: null,
    body: null,
    status(code) { this.code = code; return this; },
    json(body) { this.body = body; return this; },
  };
}
async function request(method, controller, { id, body } = {}) {
  const res = createResponse();
  const next = (error) => { throw error; };
  await controller[method]({ params: id === undefined ? {} : { id: String(id) }, body }, res, next);
  return res;
}

test('parseId menolak ID tidak valid', () => {
  assert.equal(parseId('1'), 1);
  for (const id of ['0', '-1', 'abc', '1.2', '2147483648', '']) assert.equal(parseId(id), null);
});
test('parseProductBody memvalidasi name dan price', () => {
  assert.deepEqual(parseProductBody({ name: ' Buku ', price: 15000 }), { name: 'Buku', price: 15000 });
  for (const body of [null, {}, { name: '', price: 2 }, { name: 'A', price: -1 }, { name: 'A', price: '3000' }, { name: 'A', price: 1.5 }]) assert.equal(parseProductBody(body), null);
});
test('GET semua data = 200 dan dua produk awal', async () => {
  const c = createProductController(createFakePrisma());
  const r = await request('getAllProducts', c);
  assert.equal(r.code, 200);
  assert.deepEqual(r.body, [{ id: 1, name: 'Buku', price: 15000 }, { id: 2, name: 'Pulpen', price: 5000 }]);
});
test('GET ID 1 = 200', async () => {
  const c = createProductController(createFakePrisma());
  const r = await request('getProductById', c, { id: 1 });
  assert.equal(r.code, 200);
  assert.equal(r.body.name, 'Buku');
});
test('GET ID 999 = 404', async () => {
  const c = createProductController(createFakePrisma());
  assert.equal((await request('getProductById', c, { id: 999 })).code, 404);
});
test('GET ID invalid = 400', async () => {
  const c = createProductController(createFakePrisma());
  assert.equal((await request('getProductById', c, { id: 'abc' })).code, 400);
});
test('POST data valid = 201 dan id auto', async () => {
  const c = createProductController(createFakePrisma());
  const r = await request('createProduct', c, { body: { name: 'Penghapus', price: 3000 } });
  assert.equal(r.code, 201);
  assert.deepEqual(r.body, { id: 3, name: 'Penghapus', price: 3000 });
});
test('POST data invalid = 400', async () => {
  const c = createProductController(createFakePrisma());
  assert.equal((await request('createProduct', c, { body: { name: '', price: -1 } })).code, 400);
});
test('PUT ID 1 = 200 dan nilai tersimpan', async () => {
  const db = createFakePrisma();
  const c = createProductController(db);
  const r = await request('updateProduct', c, { id: 1, body: { name: 'Buku Tulis', price: 18000 } });
  assert.equal(r.code, 200);
  assert.deepEqual(await db.product.findUnique({ where: { id: 1 } }), { id: 1, name: 'Buku Tulis', price: 18000 });
});
test('PUT ID yang tidak ada = 404', async () => {
  const c = createProductController(createFakePrisma());
  assert.equal((await request('updateProduct', c, { id: 999, body: { name: 'Tes', price: 2 } })).code, 404);
});
test('PUT body tidak valid = 400', async () => {
  const c = createProductController(createFakePrisma());
  assert.equal((await request('updateProduct', c, { id: 1, body: { price: 20 } })).code, 400);
});
test('DELETE ID 2 = 200 dan record benar-benar hilang', async () => {
  const db = createFakePrisma();
  const c = createProductController(db);
  const r = await request('deleteProduct', c, { id: 2 });
  assert.equal(r.code, 200);
  assert.equal(r.body.message, 'Produk berhasil dihapus');
  assert.equal(await db.product.findUnique({ where: { id: 2 } }), null);
});
test('DELETE ID 999 = 404', async () => {
  const c = createProductController(createFakePrisma());
  assert.equal((await request('deleteProduct', c, { id: 999 })).code, 404);
});
test('POST diikuti GET menampilkan data baru', async () => {
  const c = createProductController(createFakePrisma());
  await request('createProduct', c, { body: { name: 'Penghapus', price: 3000 } });
  const r = await request('getAllProducts', c);
  assert.equal(r.body.length, 3);
  assert.equal(r.body[2].name, 'Penghapus');
});
