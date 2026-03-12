import { getDBConnection } from "../db/sqliteDB.js";

export const getCategories = async (req, res) => {
  try {
    // connect to the database
    const db = await getDBConnection();

    let query = "SELECT * FROM categories";
    let params = [];

    // get category Id param
    const { categoryId } = req.params;

    // change query if blog Id param exits
    if (categoryId) {
      query += " WHERE categoryId = ?";
      params.push(categoryId);
    }

    // make database query
    const categories = await db.all(query, params);

    // return if category with categoryId not found
    if (categoryId && categories.length < 1) {
      return res
        .status(400)
        .json({ message: `Category with id ${categoryId} not found.` });
    }

    // return data
    return res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch categories", details: err.message });
  }
};
