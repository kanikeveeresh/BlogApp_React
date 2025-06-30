import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) return;
    axios.post(`http://localhost:5000/api/posts/dashboard`, { email })
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, [email]);

  useEffect(() => {
    const updatePostsPerPage = () => {
      const width = window.innerWidth;
      if (width <= 425) setPostsPerPage(3);
      else if (width <= 1023) setPostsPerPage(4);
      else setPostsPerPage(6);
    };

    updatePostsPerPage();
    window.addEventListener('resize', updatePostsPerPage);
    return () => window.removeEventListener('resize', updatePostsPerPage);
  }, []);

  const handleDelete = async (slug) => {
    if (!window.confirm('Are you sure to delete this post?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${slug}`);
      setPosts(posts.filter(post => post.slug !== slug));
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        {posts.length === 0 ? (
          <p className="NoPosts">You haven’t created any posts yet.</p>
        ) : (
          <>
            <h1 className="YourBlogs">Your Blog Posts</h1>
            <div className="grid-container">
              {currentPosts.map((post) => (
                <div className="post-card" key={post._id}>
                  <h2>{post.title}</h2>
                  <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 100) + '...' }}></p>
                  <Link to={`/api/posts/${post.slug}`} className="view-link">View</Link>
                  <button onClick={() => navigate(`/api/posts/${post.slug}?edit=true`)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(post.slug)} className="delete-btn">Delete</button>
                </div>
              ))}
            </div>
            <div className="pagination">
              <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>Prev</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;