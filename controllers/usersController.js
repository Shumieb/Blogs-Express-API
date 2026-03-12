import { getDBConnection } from "../db/sqliteDB.js";

export const getAuthors = async (req, res) => {
  try {
    // connect to the database
    const db = await getDBConnection();

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
    const authors = await db.all(query, params);

    // return if category with categoryId not found
    if (userId && authors < 1) {
      return res
        .status(400)
        .json({ message: `Author with id ${userId} not found.` });
    }

    // return data
    return res.status(200).json(authors);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch author", details: err.message });
  }
};
