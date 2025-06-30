import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    axios.get('https://blogapp-backend-wa0s.onrender.com/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div>
      <Navbar />
      <div className="home-container">
        {posts.length === 0 ? (
          <p className="NoPosts">No posts available.</p>
        ) : (
          <>
          <h1>All Blog Posts</h1>
          <div className="grid-container">
            {currentPosts.map((post) => (
              <div className="post-card" key={post._id}>
                <h2>{post.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 100) + '...' }}></p>
                <Link to={`/api/posts/${post.slug}`} className="view-link">View</Link>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
