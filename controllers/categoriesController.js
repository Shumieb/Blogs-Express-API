import { getDBConnection } from "../db/sqliteDB.js";

export const getCategories = async (req, res) => {
  // connect to the database
  const db = await getDBConnection();

  try {
    let query = "SELECT * FROM categories";
    let params = [];

    // make database query
    const categories = await db.all(query, params);

    // return data
    return res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch categories", details: err.message });
  } finally {
    await db.close();
    console.log("connection closed");
  }
};

// get category by id
export const getCategoryById = async (req, res) => {
  // connect to the database
  const db = await getDBConnection();

  try {
    let query = "SELECT * FROM categories";
    let params = [];

    // get category Id param
    const { categoryId } = req.params;

    // change query if category Id param exits
    if (categoryId) {
      query += " WHERE categoryId = ?";
      params.push(categoryId);
    }

    // make database query
    const category = await db.get(query, params);

    // return if category with categoryId not found
    if (categoryId && !category) {
      return res
        .status(400)
        .json({ message: `Category with id ${categoryId} not found.` });
    }

    // return data
    return res.status(200).json(category);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch a category", details: err.message });
  } finally {
    await db.close();
    console.log("connection closed");
  }
};
