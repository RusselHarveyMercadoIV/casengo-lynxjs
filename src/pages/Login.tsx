import { useNavigate } from 'react-router';
import { useState, useCallback, useMemo } from 'react';
import { loginWithGoogle, login } from '../lib/appwrite.js';
import Button from '../components/Button/Button.jsx';
import Separator from '../components/Separator.jsx';
import icons from '../constants/icons.js';

export default function Login() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Memoize common styles
  const styles = useMemo(
    () => ({
      button: 'min-w-[350px] min-h-[60px]',
      input:
        'min-w-[350px] h-[50px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500',
      error: 'text-red-500 text-sm mt-2',
      backButton: 'absolute top-4 left-4 text-[#323842] text-lg',
    }),
    [],
  );

  const handleBack = useCallback(() => {
    navigation('/');
  }, [navigation]);

  const handleGoogleLogin = useCallback(async () => {
    // await loginWithGoogle();
  }, []);

  const handleInputChange = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (error) setError('');
    },
    [error],
  );

  const handleEmailLogin = useCallback(async () => {
    const { email, password } = formData;

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      //   const response = await login(email, password);

      //   if (response && response.$id) {
      //     navigation('/');
      //   } else {
      //     throw new Error('Invalid response from server');
      //   }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  return (
    <view className="container mt-[25px] flex-col justify-start items-center h-full">
      <Button
        variant="plain"
        icon={<image src={icons.leftArrow} className="w-6 h-6" />}
        onTap={handleBack}
        className="absolute top-6 left-6 border-none"
      />
      <view className="justify-between items-center h-full py-14">
        <view className="flex-col relative flex gap-10 justify-center items-center">
          <text className="text-2xl text-[#323842]">Welcome back!</text>
          <Button
            text={'Continue with Google'}
            variant="white"
            className={styles.button}
            onTap={handleGoogleLogin}
          />
        </view>
        <Separator className="mt-16 mb-12" />
        <view className="flex-col relative flex gap-6 justify-center items-center">
          <text className="text-2xl text-[#323842]">Login with Email</text>
          {error && <text className={styles.error}>{error}</text>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={styles.input}
          />
          <Button
            text={isLoading ? 'Logging in...' : 'Login'}
            variant="orange"
            className={styles.button}
            onTap={handleEmailLogin}
            disabled={isLoading}
          />
        </view>
      </view>
    </view>
  );
}
