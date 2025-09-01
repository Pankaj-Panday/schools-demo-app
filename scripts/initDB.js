import { getConnection } from "../lib/db.js";

async function init() {
  const conn = await getConnection();

  await conn.query(`
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address TEXT,
      city VARCHAR(100),
      state VARCHAR(100),
      contact BIGINT,
      image TEXT,
      email VARCHAR(255) UNIQUE
    )
  `);

  await conn.end();
  console.log("'schools' table created");
}

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
