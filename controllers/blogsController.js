import { getDBConnection } from "../db/sqliteDB.js";

export const getBlogs = async (req, res) => {
  try {
    // connect to the database
    const db = await getDBConnection();

    let query = "SELECT * FROM blogs";
    let params = [];

    const { categoryId, search, authorId, featured } = req.query;

    // change query if category query exists
    if (categoryId) {
      query += " WHERE categoryId = ?";
      params.push(categoryId);
    }

    // change query if author query exists
    if (authorId) {
      query += " WHERE userId = ?";
      params.push(authorId);
    }

    // change query if search tearm exists
    if (search) {
      query += " WHERE title LIKE ? OR description LIKE ? OR blogText LIKE ?";
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    // change query if featured exists
    if (featured) {
      query += " WHERE featured = ?";
      params.push(featured);
    }

    // get blog Id param
    const { blogId } = req.params;

    // change query if blog Id param exits
    if (blogId) {
      query += " WHERE blogId = ?";
      params.push(blogId);
    }

    // make database query
    const blogs = await db.all(query, params);

    // return if blog with blogId not found
    if (blogId && blogs.length < 1) {
      return res
        .status(400)
        .json({ message: `Blog with id ${blogId} not found.` });
    }

    // return data
    return res.status(200).json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch blogs", details: err.message });
  }
};
