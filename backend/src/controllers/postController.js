const Post = require('../models/Post');
const slugify = require('slugify');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createPost = async (req, res) => {
  const { title, content, email } = req.body;
  const slug = slugify(title, { lower: true, strict: true });

  try {
    const exists = await Post.findOne({ slug });
    if (exists) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    const post = await Post.create({ title, content, slug, email });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserPosts = async (req, res) => {
  const { email } = req.body;
  try {
    const posts = await Post.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getPost = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await Post.findOne({ slug });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: 'Post not found' });
  }
};

exports.updatePost = async (req, res) => {
  const { slug } = req.params;
  const { title, content, slug: newSlug } = req.body;
  
  try {
    const post = await Post.findOne({ slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title;
    post.content = content;
    post.slug = newSlug;

    const updated = await post.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  const { slug } = req.params;
  try {
    await Post.findOneAndDelete({ slug });
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};