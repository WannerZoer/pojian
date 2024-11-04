import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileDropdown({ username, onClose }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleDownloadClient = () => {
    // TODO: Implement client download
    window.open('https://example.com/download-client', '_blank');
    onClose();
  };

  const menuItems = [
    {
      icon: '👤',
      label: t('profile.userProfile'),
      onClick: () => {
        navigate('/profile');
        onClose();
      }
    },
    {
      icon: '⚙️',
      label: t('profile.settings'),
      onClick: () => {
        navigate('/settings');
        onClose();
      }
    },
    {
      icon: '💻',
      label: t('profile.downloadClient'),
      onClick: handleDownloadClient
    },
    {
      icon: '🚪',
      label: t('profile.logout'),
      onClick: handleLogout,
      className: 'text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400'
    }
  ];

  return (
    <div className="absolute top-12 left-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border dark:border-gray-700">
      <div className="px-4 py-2 border-b dark:border-gray-700">
        <div className="font-medium truncate dark:text-white">
          {username || t('profile.defaultUsername')}
        </div>
      </div>
      <div className="py-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 dark:text-gray-200 ${item.className || ''}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}