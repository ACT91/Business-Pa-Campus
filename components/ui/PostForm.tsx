import React from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PostForm: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handlePost = () => {
    if (!user) {
      alert('Please sign in first.');
      navigate('/login'); // redirect to login form
      return;
    }
    // Proceed with creating post
    console.log('Post created by:', user.displayName);
  };

  return (
    <div>
      {!user ? (
        <button
          className="btn btn-primary"
          onClick={() => navigate('/login')}
        >
          Login with Google
        </button>
      ) : (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button className="btn btn-error" onClick={logout}>
            Logout
          </button>
          <button className="btn btn-success" onClick={handlePost}>
            Create Post
          </button>
        </div>
      )}
    </div>
  );
};

export default PostForm;
