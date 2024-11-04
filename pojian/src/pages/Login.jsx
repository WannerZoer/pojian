import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import LanguageSelector from '../components/LanguageSelector';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (login(email, password)) {
      toast.success(t('auth.loginSuccess'));
      navigate('/news', { replace: true });
    } else {
      toast.error(t('auth.loginFailed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <LanguageSelector />
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {t('auth.login')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('auth.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 dark:placeholder-gray-400
                focus:outline-none focus:border-primary-light dark:focus:border-primary-dark focus:ring-1 focus:ring-primary-light dark:focus:ring-primary-dark
                dark:text-white"
              required
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('auth.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 dark:placeholder-gray-400
                focus:outline-none focus:border-primary-light dark:focus:border-primary-dark focus:ring-1 focus:ring-primary-light dark:focus:ring-primary-dark
                dark:text-white"
              required
              placeholder="******"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-light hover:bg-primary-light/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-primary-dark dark:focus:ring-offset-gray-800"
          >
            {t('auth.login')}
          </button>
        </form>
        <div className="mt-4 flex justify-between text-sm">
          <Link
            to="/register"
            className="font-medium text-primary-light hover:text-primary-light/90 dark:text-primary-dark dark:hover:text-primary-dark/90"
          >
            {t('auth.registerNewAccount')}
          </Link>
          <Link
            to="/forgot-password"
            className="font-medium text-primary-light hover:text-primary-light/90 dark:text-primary-dark dark:hover:text-primary-dark/90"
          >
            {t('auth.forgotPasswordLink')}
          </Link>
        </div>
      </div>
    </div>
  );
}