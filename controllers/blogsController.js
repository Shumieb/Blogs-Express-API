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
    res.status(500).json({
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
    res.status(500).json({
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
    res.status(500).json({
      error: "Failed to fetch blogs by authorId",
      details: err.message,
    });
  }
};

// add new blog
export const addNewBlog = async (req, res) => {
  try {
    let newBlog = {};

    if (req.body.title && req.body.title.length > 3) {
      newBlog["title"] = req.body.title;
    } else {
      return res.status(400).json({ message: "Title is required" });
    }

    if (req.body.description && req.body.description.length > 10) {
      newBlog["description"] = req.body.description;
    } else {
      return res.status(400).json({ message: "Description is required" });
    }

    if (req.body.blogText && req.body.blogText.length > 10) {
      newBlog["blogText"] = req.body.blogText;
    } else {
      return res.status(400).json({ message: "BlogText is required" });
    }

    if (req.body.userId) {
      newBlog["userId"] = req.body.userId;
    } else {
      return res.status(400).json({ message: "User Id is required" });
    }

    if (req.body.categoryId) {
      newBlog["categoryId"] = req.body.categoryId;
    } else {
      return res.status(400).json({ message: "Category Id is required" });
    }

    if (req.body.image) {
      newBlog["image"] = req.body.image;
    } else {
      newBlog["image"] = "default_image";
    }

    if (req.body.featured) {
      newBlog["featured"] = req.body.featured;
    } else {
      newBlog["featured"] = 0;
    }

    // connect to the database
    const db = await getDBConnection();

    let query = `INSERT INTO blogs (title, description, blogText, image, featured, userId, categoryId)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    let params = [
      newBlog.title,
      newBlog.description,
      newBlog.blogText,
      newBlog.image,
      newBlog.featured,
      newBlog.userId,
      newBlog.categoryId,
    ];

    // add data to database
    let createdBlog = await db.run(query, params);

    // add id to object
    newBlog["blogId"] = createdBlog.lastID;

    // return created blog
    res.status(204).json(newBlog);
  } catch (err) {
    res.status(500).json({
      error: "Failed to add new blog",
      details: err.message,
    });
  }
};
