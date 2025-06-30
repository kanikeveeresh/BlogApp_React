import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../Navbar/Navbar';
import slugify from 'slugify';
import './ViewEdit.css'

function ViewEdit() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [message, setMessage] = useState('');

  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${slug}`)
      .then((res) => {
        setPost(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
        setNewSlug(res.data.slug);
        if (location.search === '?edit=true' && res.data.email === userEmail) {
          setIsEditMode(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage('Post not found');
      });
  }, [slug, location.search, userEmail]);

  useEffect(() => {
    const generated = slugify(title, { lower: true, strict: true });
    setNewSlug(generated);
  }, [title]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/posts/${slug}`, { title, content, slug: newSlug, });
      setMessage('Post updated successfully');
      setIsEditMode(false);
      navigate(`/api/posts/dashboard`);
    } catch (err) {
      setMessage('Failed to update post');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure to delete this post?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${slug}`);
      navigate('/api/posts/dashboard');
    } catch (err) {
      setMessage('Failed to delete post');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="view-post-container">
        {message && <p className="error">{message}</p>}
        {post && !isEditMode && (
          <>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            {post.email === userEmail && (
              <div style={{ marginTop: '1rem' }}>
                <button onClick={() => navigate(`/api/posts/${slug}?edit=true`)} className="edit-btn">Edit</button>
                <button onClick={handleDelete} className="delete-btn">Delete</button>
              </div>
            )}
          </>
        )}

        {post && isEditMode && (
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Content</label>
              <ReactQuill value={content} onChange={setContent} />
            </div>

            <div className="form-group">
              <label>Slug (auto-generated)</label>
              <input
                type="text"
                value={newSlug}
                readOnly
              />
            </div>
            <button type="submit" className="submit-btn">Update Post</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ViewEdit;
