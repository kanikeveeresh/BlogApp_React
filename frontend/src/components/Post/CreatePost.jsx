import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import slugify from 'slugify';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import './CreatePost.css';
import Navbar from '../Navbar/Navbar';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [message, setMessage] = useState('');
  const email = localStorage.getItem("email");

  useEffect(() => {
    const generatedSlug = slugify(title, { lower: true, strict: true });
    setSlug(generatedSlug);
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage('Title and Content are required');
      return;
    }

    try {
      const response = await axios.post('https://blogapp-backend-wa0s.onrender.com/api/posts/create', {
        title,
        content,
        slug,
        email: email
      });

      setMessage('Post created successfully!');
      setTitle('');
      setContent('');
      setSlug('');
    } catch (error) {
      setMessage('Error creating post');
      console.error(error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="create-post-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            className="quill-editor"
          />
        </div>

        <br></br>

        <div className="form-group">
          <label>Slug (auto-generated)</label>
          <input
            type="text"
            value={slug}
            readOnly
            className="readonly"
          />
        </div>
        {message && <p className="message">{message}</p>}
        <button type="submit" className="submit-btn">Create Post</button>
      </form>
    </div>
    </>
  );
}

export default CreatePost;