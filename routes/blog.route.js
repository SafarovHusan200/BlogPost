const { Router } = require("express");
const {
  getAllBlogs,
  creteBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  userBlog,
} = require("../controllers/blog.controller");
const upload = require("../utils/fileUpload");

const router = Router();

router.get("/all-blog", getAllBlogs);
router.post("/create-blog", upload.single("image"), creteBlog);
router.get("/get-blog/:id", getBlogById);
router.put("/update-blog/:id", upload.single("image"), updateBlog);
router.delete("/delete-blog/:id", deleteBlog);
router.get("/user-blog/:id", userBlog);

module.exports = router;
