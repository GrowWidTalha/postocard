"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
let prisma;
if (process.env.NODE_ENV === "production") {
    //   const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    //   const adapter = new PrismaNeon(pool)
    prisma = new client_1.PrismaClient();
}
else {
    if (!global.cachedPrisma) {
        // const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        // const adapter = new PrismaNeon(pool)
        global.cachedPrisma = new client_1.PrismaClient();
    }
    prisma = global.cachedPrisma;
}
exports.db = prisma;
