const mongoose = require("mongoose");
const Blog = require("../models/blog.model");
const User = require("../models/user.model");

// Get all blog
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "All blogs lists",
      blogCount: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "Error While Getting Blogs",
      error,
    });
  }
};

exports.creteBlog = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    // validate
    if (!title || !description || !user) {
      return res.status(400).send({
        success: false,
        message: "Please provide All Fields",
      });
    }

    const existingUser = await User.findById(user);
    // validation
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }
    const newBlog = new Blog({
      title,
      description,
      image: "uploads/" + req.file.filename,
      user,
    });
    // const session = await mongoose.startSession();
    // session.startTransaction();
    // await newBlog.save({ session });
    // existingUser.blogs.push(newBlog);
    // await existingUser.save({ session });
    // await session.commitTransaction();
    await newBlog.save();
    const edituser = await User.findByIdAndUpdate(
      user,
      {
        $push: { blogs: newBlog },
      },
      {
        new: true,
        upsert: true,
      }
    );
    return res.status(201).send({
      success: true,
      message: "Blog Created",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error Creting blog",
    });
  }
};

exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).send({
      success: false,
      message: "Blog ont found with this is ",
    });
  }
  return res.status(200).send({
    success: true,
    message: "One blog message",
    blog,
  });
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found with this is ",
      });
    }
    const editedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title || blog.title,
        description: req.body.description || blog.description,
        image: "uploads/" + req.file.filename || blog.image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).send({
      success: true,
      message: "Updated Blog successfully",
      editedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "Error While Getting Blogs",
      error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found with this is ",
      });
    }

    await Blog.findByIdAndRemove(req.params.id);

    res.status(200).send({
      success: true,
      message: "Delete blog successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "Error While Getting Blogs",
      error,
    });
  }
};

exports.userBlog = async (req, res) => {
  const user = await User.findById(req.params.id).populate("blogs");
  if (!user) {
    return res.status(400).send({
      success: true,
      message: "User not found!",
    });
  }
  res.status(200).send({
    success: true,
    message: "User Blog message successfully",
    user,
  });
};
