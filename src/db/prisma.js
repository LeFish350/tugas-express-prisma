require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

// Satu instance PrismaClient dipakai bersama oleh seluruh endpoint.
module.exports = new PrismaClient();
