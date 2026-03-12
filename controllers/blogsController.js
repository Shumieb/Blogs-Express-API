import { getDBConnection } from "../db/sqliteDB.js";

// get all blogs controller
export const getAllBlogs = async (req, res) => {
  try {
    // connect to the database
    const db = await getDBConnection();

    let query = "SELECT * FROM blogs";
    let params = [];

    const { search, featured } = req.query;

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

    // make database query
    const blogs = await db.all(query, params);

    // return data
    return res.status(200).json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch blogs", details: err.message });
  }
};

// get blog by ID controller
export const getBlogById = async (req, res) => {
  try {
    // connect to the database
    const db = await getDBConnection();

    let query = "SELECT * FROM blogs";
    let params = [];

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
      .json({
        error: "Failed to fetch blog by authorId",
        details: err.message,
      });
  }
};

// get blogs by category ID controller
export const getBlogsByCategory = async (req, res) => {
  try {
    // connect to the database
    const db = await getDBConnection();

    let query = "SELECT * FROM blogs";
    let params = [];

    // get category Id param
    const { categoryId } = req.params;

    // change query if category Id param exits
    if (categoryId) {
      query += " WHERE categoryId = ?";
      params.push(categoryId);
    }

    // make database query
    const blogs = await db.all(query, params);

    // return data
    return res.status(200).json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Failed to fetch blogs by categoryId",
        details: err.message,
      });
  }
};

// get blogs by author ID controller
export const getBlogsByAuthor = async (req, res) => {
  try {
    // connect to the database
    const db = await getDBConnection();

    let query = "SELECT * FROM blogs";
    let params = [];

    // get category Id param
    const { authorId } = req.params;

    // change query if author Id param exits
    if (authorId) {
      query += " WHERE authorId = ?";
      params.push(authorId);
    }

    // make database query
    const blogs = await db.all(query, params);

    // return data
    return res.status(200).json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Failed to fetch blogs by authorId",
        details: err.message,
      });
  }
};
