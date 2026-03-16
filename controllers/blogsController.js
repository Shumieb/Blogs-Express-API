import { getDBConnection } from "../db/sqliteDB.js";

// get all blogs controller
export const getAllBlogs = async (req, res) => {
  // connect to the database
  const db = await getDBConnection();

  try {
    let query = `SELECT 
                    blogs.*,
                    categories.name AS categoryName,
                    users.userName AS userName                  
                FROM blogs
                JOIN categories 
                ON blogs.categoryId = categories.categoryId
                JOIN users 
                ON blogs.userId = users.userId`;
    let params = [];

    const { searchTerm, featured, categoryId, authorId } = req.query;

    // change query if featured exists
    if (featured) {
      query += " WHERE blogs.featured = ?";
      params.push(featured);
    }

    // change query if only categoryId exists
    if (categoryId && !authorId && !searchTerm) {
      query += " WHERE blogs.categoryId = ?";
      params.push(categoryId);
    }

    // change query if only authorId exists
    if (authorId && !categoryId && !searchTerm) {
      query += " WHERE blogs.userId = ?";
      params.push(authorId);
    }

    // change query if only search tearm exists
    if (searchTerm && !authorId && !categoryId) {
      query +=
        " WHERE blogs.title LIKE ? OR blogs.description LIKE ? OR blogs.content LIKE ?";
      const searchPattern = `%${searchTerm}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    // change query if only categoryId and authorId exists
    if (categoryId && authorId && !searchTerm) {
      query += " WHERE blogs.categoryId = ? AND blogs.userId = ?";
      params.push(categoryId, authorId);
    }

    // change query if only categoryId and search exists
    if (categoryId && !authorId && searchTerm) {
      query +=
        " WHERE blogs.categoryId = ? AND blogs.title LIKE ? OR blogs.description LIKE ? OR blogs.content LIKE ?";
      const searchPattern = `%${searchTerm}%`;
      params.push(categoryId, searchPattern, searchPattern, searchPattern);
    }

    // change query if only authorId and search exists
    if (!categoryId && authorId && searchTerm) {
      query +=
        " WHERE blogs.userId = ? AND (blogs.title LIKE ? OR blogs.description LIKE ? OR blogs.content LIKE ?)";
      const searchPattern = `%${searchTerm}%`;
      params.push(authorId, searchPattern, searchPattern, searchPattern);
    }

    // change query if categoryId, authorId and search exists
    if (categoryId && authorId && searchTerm) {
      query +=
        " WHERE blogs.userId = ? AND blogs.categoryId = ? AND (blogs.title LIKE ? OR blogs.description LIKE ? OR blogs.content LIKE ?)";
      const searchPattern = `%${searchTerm}%`;
      params.push(
        authorId,
        categoryId,
        searchPattern,
        searchPattern,
        searchPattern,
      );
    }

    // make database query
    const blogs = await db.all(query, params);

    // return data
    return res.status(200).json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch blogs", details: err.message });
  } finally {
    await db.close();
    console.log("connection closed");
  }
};

// get blog by ID controller
export const getBlogById = async (req, res) => {
  // connect to the database
  const db = await getDBConnection();

  try {
    let query = `SELECT 
                    blogs.*,
                    categories.name AS categoryName,
                    users.userName AS userName                  
                FROM blogs
                JOIN categories 
                ON blogs.categoryId = categories.categoryId
                JOIN users 
                ON blogs.userId = users.userId`;
    let params = [];

    // get blog Id param
    const { blogId } = req.params;

    // change query if blog Id param exits
    if (blogId) {
      query += " WHERE blogs.blogId = ?";
      params.push(blogId);
    }

    // make database query
    const blog = await db.get(query, params);

    // return if blog with blogId not found
    if (blogId && !blog) {
      return res
        .status(400)
        .json({ message: `Blog with id ${blogId} not found.` });
    }

    // return data
    return res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch blog by authorId",
      details: err.message,
    });
  } finally {
    await db.close();
    console.log("connection closed");
  }
};

// get blogs by category ID controller
export const getBlogsByCategory = async (req, res) => {
  // connect to the database
  const db = await getDBConnection();

  try {
    let query = `SELECT 
                    blogs.*,
                    categories.name AS categoryName,
                    users.userName AS userName                  
                FROM blogs
                JOIN categories 
                ON blogs.categoryId = categories.categoryId
                JOIN users 
                ON blogs.userId = users.userId`;
    let params = [];

    // get category Id param
    const { categoryId } = req.params;

    // change query if category Id param exits
    if (categoryId) {
      query += " WHERE blogs.categoryId = ?";
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
  } finally {
    await db.close();
    console.log("connection closed");
  }
};

// get blogs by author ID controller
export const getBlogsByAuthor = async (req, res) => {
  // connect to the database
  const db = await getDBConnection();

  try {
    let query = `SELECT 
                    blogs.*,
                    categories.name AS categoryName,
                    users.userName AS userName                  
                FROM blogs
                JOIN categories 
                ON blogs.categoryId = categories.categoryId
                JOIN users 
                ON blogs.userId = users.userId`;
    let params = [];

    // get category Id param
    const { authorId } = req.params;

    // change query if author Id param exits
    if (authorId) {
      query += " WHERE blogs.userId = ? ";
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
  } finally {
    await db.close();
    console.log("connection closed");
  }
};

// add new blog
export const addNewBlog = async (req, res) => {
  // connect to the database
  const db = await getDBConnection();

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

    if (req.body.content && req.body.content.length > 10) {
      newBlog["content"] = req.body.content;
    } else {
      return res.status(400).json({ message: "content is required" });
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

    newBlog["image"] = req.body.image ? req.body.image : "default_image";
    newBlog["featured"] =
      req.body.featured != undefined ? req.body.featured : 0;
    newBlog["likes"] = req.body.likes ? req.body.likes : 0;

    let query = `INSERT INTO blogs (title, description, content, image, featured, likes, userId, categoryId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    let params = [
      newBlog.title,
      newBlog.description,
      newBlog.content,
      newBlog.image,
      newBlog.featured,
      newBlog.likes,
      newBlog.userId,
      newBlog.categoryId,
    ];

    // add data to database
    let createdBlog = await db.run(query, params);

    // add id to object
    newBlog["blogId"] = createdBlog.lastID;

    // return created blog
    res.status(200).json({
      message: `${newBlog.blogId}`,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to add new blog",
      details: err.message,
    });
  } finally {
    await db.close();
    console.log("connection closed");
  }
};

// update a blog likes
export const updateBlogLikes = async (req, res) => {
  // connect to the database
  const db = await getDBConnection();

  try {
    const { blogId } = req.params;
    let blog = {};

    // find blog
    if (blogId) {
      let getQuery = `SELECT * FROM blogs 
                        WHERE blogId = ?`;
      blog = await db.get(getQuery, [blogId]);
    }

    // update blog
    if (blog.blogId) {
      //increment likes
      blog.likes = blog.likes + 1;

      let updateQuery = `UPDATE blogs SET likes=? WHERE blogId = ?`;
      let updateParams = [blog.likes, blogId];

      // update database
      await db.run(updateQuery, updateParams);

      res
        .status(200)
        .json({ message: `Likes for Blog with id ${blogId} updated` }, blogId);
    } else {
      res.status(400).json({ message: `Blog with id ${blogId} not found.` });
    }
  } catch (err) {
    res.status(500).json({
      error: "Failed to add update blog",
      details: err.message,
    });
  } finally {
    await db.close();
    console.log("connection closed");
  }
};

// update a blog
export const updateBlog = async (req, res) => {
  // connect to the database
  const db = await getDBConnection();

  try {
    const { authorId, blogId } = req.params;
    let blog = {};

    // find blog
    if (blogId && authorId) {
      let getQuery = `SELECT * FROM blogs 
                        WHERE blogId = ? AND userId = ?`;
      blog = await db.get(getQuery, [blogId, authorId]);
    }

    // update blog
    if (blog.blogId) {
      blog = {
        title: req.body.title ? req.body.title : blog.title,
        description: req.body.description
          ? req.body.description
          : blog.description,
        content: req.body.content ? req.body.content : blog.content,
        image: req.body.image ? req.body.image : blog.image,
        featured:
          req.body.featured != undefined ? req.body.featured : blog.featured,
        likes: req.body.likes ? req.body.likes : blog.likes,
        categoryId: req.body.categoryId ? req.body.categoryId : blog.categoryId,
      };

      let updateQuery = `UPDATE blogs 
                          SET title= ?, description = ?, content = ?, image = ?, featured = ?, likes=?, categoryId = ? 
                            WHERE blogId = ? AND userId = ?`;
      let updateParams = [
        blog.title,
        blog.description,
        blog.content,
        blog.image,
        blog.featured,
        blog.likes,
        blog.categoryId,
        blogId,
        authorId,
      ];

      // update database
      await db.run(updateQuery, updateParams);

      res.status(200).json({ message: `Blog with id ${blogId} updated` });
    } else {
      res.status(400).json({ message: `Blog with id ${blogId} not found.` });
    }
  } catch (err) {
    res.status(500).json({
      error: "Failed to add update blog",
      details: err.message,
    });
  } finally {
    await db.close();
    console.log("connection closed");
  }
};

// delete a blog
export const deleteBlog = async (req, res) => {
  // connect to the database
  const db = await getDBConnection();
  try {
    const { authorId, blogId } = req.params;

    let query = `DELETE FROM blogs 
                  WHERE blogId = ? AND userId = ? `;
    let params = [blogId, authorId];

    // update database
    await db.run(query, params);

    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete blog from db",
      details: err.message,
    });
  } finally {
    await db.close();
    console.log("connection closed");
  }
};
