// Controller tidak bergantung langsung pada file database; Prisma di-inject dari route.
// Ini memudahkan pengujian tiap skenario tanpa koneksi database sungguhan.
function parseId(raw) {
  if (typeof raw !== 'string' || !/^[1-9]\d*$/.test(raw)) return null;
  const id = Number(raw);
  return Number.isSafeInteger(id) && id <= 2147483647 ? id : null;
}

function parseProductBody(body) {
  const { name, price } = body && typeof body === 'object' && !Array.isArray(body)
    ? body
    : {};
  if (
    typeof name !== 'string' ||
    name.trim().length === 0 ||
    typeof price !== 'number' ||
    !Number.isInteger(price) ||
    price < 0 ||
    price > 2147483647
  ) {
    return null;
  }
  return { name: name.trim(), price };
}

function createProductController(prisma) {
  return {
    async getAllProducts(req, res, next) {
      try {
        const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
        return res.status(200).json(products);
      } catch (err) { return next(err); }
    },

    async getProductById(req, res, next) {
      const id = parseId(req.params.id);
      if (id === null) return res.status(400).json({ message: 'ID produk tidak valid' });
      try {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });
        return res.status(200).json(product);
      } catch (err) { return next(err); }
    },

    async createProduct(req, res, next) {
      const data = parseProductBody(req.body);
      if (!data) return res.status(400).json({ message: 'name wajib teks dan price wajib bilangan bulat >= 0' });
      try {
        const product = await prisma.product.create({ data });
        return res.status(201).json(product);
      } catch (err) { return next(err); }
    },

    async updateProduct(req, res, next) {
      const id = parseId(req.params.id);
      if (id === null) return res.status(400).json({ message: 'ID produk tidak valid' });
      const data = parseProductBody(req.body); // PUT mengganti name & price sekaligus.
      if (!data) return res.status(400).json({ message: 'name wajib teks dan price wajib bilangan bulat >= 0' });
      try {
        const product = await prisma.product.update({ where: { id }, data });
        return res.status(200).json(product);
      } catch (err) {
        if (err.code === 'P2025') return res.status(404).json({ message: 'Produk tidak ditemukan' });
        return next(err);
      }
    },

  };
}

module.exports = { createProductController, parseId, parseProductBody };
