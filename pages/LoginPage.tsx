import React, { useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login();
    // After login, redirect to home
    navigate('/');
  };

  // 🔁 Redirect if already logged in — inside useEffect
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="login-page">
      <h2>Please login to continue</h2>
      <button className="btn btn-primary" onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
