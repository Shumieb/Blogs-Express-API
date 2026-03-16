### Express API the allows users to:

View blogs

- Users can retrieve all blogs
  "/api/blogs"
- Users can retrieve blogs by category
  "/api/blogs/category/categoryId"
- Users can retrieve blogs by search term
  "/api/blogs?search=search term"
- Users can retrieve blogs by author
  "/api/blogs?authorId=authorId"
- Users can retrieve featured blogs only
  "/api/blogs?featured=1"
- Users can retrieve blog by blogId
  "/api/blogs//blog/:blogId"

Add a new blog

- Authors can add new blogs
  "/api/blogs"

Update blogs

- Authors can update their own blogs
  "/api/:authorId/:blogId"

- Users can update likes
  "api/blogs/likes/:blogId"

Delete blogs

- Authors can delete their own blogs
  "/api/:authorId/:blogId"

View Categories

- Users can retrieve all categories
  "/api/categories"
- Users can retrieve a category by Id
  "/api/categories/categoryId"

View Authors

- Users can retrieve all Authors
  "/api/users/authors"
- Users can retrieve a Author by Id
  "api/users/authors/authorId"

### SQLite used as a database

TODO:
[] Add mailing list - used to store emails of people signed up to the newsletter
