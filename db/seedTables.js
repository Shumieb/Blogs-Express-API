import { getDBConnection } from "./sqliteDB.js";

// function to seed users table
async function seedUsersTable() {
  const db = await getDBConnection();

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const { location, details } of abductionsData) {
      await db.run(
        `INSERT INTO abductions (location, details)
        VALUES (?, ?)`,
        [location, details],
      );
    }

    await db.exec("COMMIT");
    console.log("All records inserted");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.log("Error inserting data", err.message);
  } finally {
    await db.close();
    console.log("connection closed");
  }
}

// function to seed categories table
async function seedCategoriesTable() {
  const db = await getDBConnection();

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const { location, details } of abductionsData) {
      await db.run(
        `INSERT INTO abductions (location, details)
        VALUES (?, ?)`,
        [location, details],
      );
    }

    await db.exec("COMMIT");
    console.log("All records inserted");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.log("Error inserting data", err.message);
  } finally {
    await db.close();
    console.log("connection closed");
  }
}

// function to seed blogs table
async function seedBlogsTable() {
  const db = await getDBConnection();

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const { location, details } of abductionsData) {
      await db.run(
        `INSERT INTO abductions (location, details)
        VALUES (?, ?)`,
        [location, details],
      );
    }

    await db.exec("COMMIT");
    console.log("All records inserted");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.log("Error inserting data", err.message);
  } finally {
    await db.close();
    console.log("connection closed");
  }
}

seedUsersTable();
//seedCategoriesTable();
//seedBlogsTable();
