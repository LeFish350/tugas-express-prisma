const prisma = require('../src/db/prisma');

async function main() {
  const awal = [
    { id: 1, name: 'Buku', price: 15000 },
    { id: 2, name: 'Pulpen', price: 5000 },
  ];

  for (const item of awal) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {}, // Jangan menimpa data yang sudah diubah mahasiswa.
      create: item,
    });
  }
  console.log('Seed selesai: Buku dan Pulpen tersedia (jika belum ada).');
}

main()
  .catch((err) => {
    console.error('Seed gagal:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
