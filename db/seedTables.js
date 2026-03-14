import { blogsData, categoryData, usersData } from "./mockData.js";
import { getDBConnection } from "./sqliteDB.js";

// function to seed users table
async function seedUsersTable() {
  const db = await getDBConnection();

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const { name, userName, biography, image, type } of usersData) {
      await db.run(
        `INSERT INTO users (name, userName, biography, image, type)
        VALUES (?, ?, ?, ?, ?)`,
        [name, userName, biography, image, type],
      );
    }

    await db.exec("COMMIT");
    console.log("All user records inserted");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.log("Error inserting user data", err.message);
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

    for (const { name, description, image } of categoryData) {
      await db.run(
        `INSERT INTO categories (name, description, image)
        VALUES (?, ?, ?)`,
        [name, description, image],
      );
    }

    await db.exec("COMMIT");
    console.log("All category records inserted");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.log("Error inserting category data", err.message);
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

    for (const {
      title,
      description,
      content,
      image,
      featured,
      likes,
      userId,
      categoryId,
    } of blogsData) {
      await db.run(
        `INSERT INTO blogs (title, description, content, image, featured,likes, userId, categoryId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title,
          description,
          content,
          image,
          featured,
          likes,
          userId,
          categoryId,
        ],
      );
    }

    await db.exec("COMMIT");
    console.log("All blog records inserted");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.log("Error inserting blog data", err.message);
  } finally {
    await db.close();
    console.log("connection closed");
  }
}

//seedUsersTable();
//seedCategoriesTable();
//seedBlogsTable();
