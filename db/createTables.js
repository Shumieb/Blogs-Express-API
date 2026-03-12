import { getDBConnection } from "./sqliteDB.js";

async function createTable() {
  const db = await getDBConnection();

  db.get("PRAGMA foreign_keys = ON");

  await db.exec(
    `
    CREATE TABLE IF NOT EXISTS categories (
                categoryId INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT NOT NULL, 
                description TEXT NOT NULL,
                image TEXT NOT NULL
            )
    `,
  );

  await db.exec(
    `
    CREATE TABLE IF NOT EXISTS users (
                userId INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT NOT NULL, 
                userName TEXT NOT NULL,
                image TEXT NOT NULL,
                type TEXT NOT NULL
            )
    `,
  );

  await db.exec(
    `
            CREATE TABLE IF NOT EXISTS blogs (
                blogId INTEGER PRIMARY KEY AUTOINCREMENT, 
                title TEXT NOT NULL, 
                description TEXT NOT NULL,
                blogText TEXT NOT NULL,
                image TEXT NOT NULL,
                featured BOOLEAN NOT NULL CHECK (featured IN (0, 1)),
                userId INTEGER NOT NULL,
                categoryId INTEGER NOT NULL,
                FOREIGN KEY(userId) REFERENCES users(userId),                
                FOREIGN KEY(categoryId) REFERENCES categories(categoryId)                
            )
      `,
  );

  await db.close();

  console.log("Tables created");
}

createTable();
