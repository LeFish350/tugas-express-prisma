// API lama dari tugas Express + Prisma dipakai ulang, tidak membuat database baru.
async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(path, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
  } catch {
    throw new Error('Tidak bisa terhubung ke server. Pastikan npm start masih aktif.');
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || `Permintaan gagal (HTTP ${response.status}).`);
  }
  return data;
}
export const getProducts = () => request('/products');
export const createProduct = (data) => request('/products', { method: 'POST', body: JSON.stringify(data) });
export const updateProduct = (id, data) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const removeProduct = (id) => request(`/products/${id}`, { method: 'DELETE' });
