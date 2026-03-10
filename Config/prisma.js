import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;

// A pool is a connection manager for your database.
// Instead of opening a new database connection every time your
// backend needs to talk to the DB, a pool keeps a set of open connections
// that are ready to use.
