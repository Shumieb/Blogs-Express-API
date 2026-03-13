import { getDBConnection } from "../db/sqliteDB.js";

export const getAuthors = async (req, res) => {
  // connect to the database
  const db = await getDBConnection();

  try {
    let query = "SELECT * FROM users WHERE type = ? ";
    let params = ["author"];

    // make database query
    const authors = await db.all(query, params);

    // return data
    return res.status(200).json(authors);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch author", details: err.message });
  } finally {
    await db.close();
    console.log("connection closed");
  }
};

export const getAuthorById = async (req, res) => {
  // connect to the database
  const db = await getDBConnection();

  try {
    let query = "SELECT * FROM users WHERE type = ? ";
    let params = ["author"];

    // get user Id param
    const { userId } = req.params;

    // change query if user Id param exits
    if (userId) {
      query += " AND userId = ?";
      params.push(userId);
    }

    // make database query
    const author = await db.get(query, params);

    // return if author with authorId not found
    if (userId && !author) {
      return res
        .status(400)
        .json({ message: `Author with id ${userId} not found.` });
    }

    // return data
    return res.status(200).json(author);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch an author", details: err.message });
  } finally {
    await db.close();
    console.log("connection closed");
  }
};
