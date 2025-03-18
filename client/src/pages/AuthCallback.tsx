import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { account } from '../lib/appwrite.js';

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from the URL
        const params = new URLSearchParams(location.search);
        const sessionId = params.get('session_id');

        if (sessionId) {
          // The user is already logged in, redirect to home
          navigate('/');
        } else {
          // If no session, redirect back to login
          navigate('/login');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, location]);

  return (
    <view className="container flex-col justify-center items-center h-full">
      <text className="text-xl text-[#323842]">Completing login...</text>
    </view>
  );
}
