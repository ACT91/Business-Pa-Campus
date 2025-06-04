import React, { useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header'; // adjust path as needed
import { FaGoogle, FaApple, FaFacebookF } from 'react-icons/fa';
import MobileHeader from '../components/layout/MobileHeader';


const LoginPage: React.FC = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(); // assumed to handle Google login
    navigate('/');
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <>
      <Header/>
       <MobileHeader />




      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-2 text-center">Sign in or create an account</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            You can sign in using your account to access our services.
          </p>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="input input-bordered w-full"
            />
          </div>

          <button
            className="btn btn-primary w-full mb-4"
            onClick={handleLogin}
          >
            Continue with email
          </button>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 border-t border-gray-300" />
            <span className="text-sm text-gray-500">or use one of these options</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button 
              onClick={handleLogin} 
              className="btn btn-outline btn-circle"
              aria-label="Sign in with Google"
              title="Sign in with Google"
            >
              <FaGoogle />
            </button>
            <button 
              type='button' 
              title='Sign in with Apple' 
              className="btn btn-outline btn-circle"
              aria-label="Sign in with Apple"
            >
              <FaApple />
            </button>
            <button 
              type='button' 
              title='Sign in with Facebook' 
              className="btn btn-outline btn-circle"
              aria-label="Sign in with Facebook"
            >
              <FaFacebookF />
            </button>
          </div>

          <p className="text-xs text-center text-gray-500">
            By signing in or creating an account, you agree with our{' '}
            <a href="#" className="text-blue-600 underline">Terms & Conditions</a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 underline">Privacy Statement</a>.
          </p>

          <p className="text-center text-xs text-gray-400 mt-6">
            © {new Date().getFullYear()} – MalondaPaCampus™
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
