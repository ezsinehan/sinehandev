import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  //globalThis is a built in js object used to provide consistent manner to access global variables
  // as unknown is asking typescript to erase existing type information about globalThis so we can init it to our custom object
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// In next.js, hot-reload can create multiple prisma instances. This singleton pattern prevents that issue in development
// Why prisma -> It simplifies database interactions, migrations, and ORM modeling, improving development speeds
// DB/API Integration -> Ingrated a SQLite db using Prisma, created structured API routes, and fetched data with NextJS, balancing performance(SSG) and data freshness(SSR)
