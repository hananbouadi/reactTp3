import React, { useState, useEffect } from 'react';
import './App.css';

function Post({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  };

  return (
    <li key={post.id}>
      <strong>userId:</strong> {post.userid} <br />
      <strong>id</strong> {post.id} <br />
      <strong>Title:</strong> {post.title} <br />
      <strong>Body:</strong> {post.body} <br />

      <button onClick={() => {
        setShowComments(!showComments);
        if (showComments) {
          setComments([]);
        } else {
          fetchComments();
        }
      }}>
        {showComments ? 'Hide Comments' : 'View Comments'}
      </button>

      {showComments && (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <strong>Name:</strong> {comment.name} <br />
              <strong>Email:</strong> {comment.email} <br />
              <strong>Comment:</strong> {comment.body}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      <ul>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default App;
