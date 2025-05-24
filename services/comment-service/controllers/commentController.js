const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const { blogId, content } = req.body;

  try {
    const comment = new Comment({
      blogId,
      content,
      author: req.userId
    });
    await comment.save();
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};