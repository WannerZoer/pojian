import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { Dialog } from '@headlessui/react';

const themes = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'system', label: 'System' }
];

const languages = [
  { id: 'en', label: 'English' },
  { id: 'zh', label: '中文' },
  { id: 'ja', label: '日本語' }
];

export default function Settings() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
  const [notifications, setNotifications] = useState(() => localStorage.getItem('notifications') !== 'muted');
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  useEffect(() => {
    const applyTheme = (themeSetting) => {
      if (themeSetting === 'system') {
        const now = new Date();
        const hour = now.getHours();
        const isDark = hour >= 19 || hour < 7;
        document.documentElement.classList.toggle('dark', isDark);
      } else {
        document.documentElement.classList.toggle('dark', themeSetting === 'dark');
      }
    };

    localStorage.setItem('theme', theme);
    applyTheme(theme);

    if (theme === 'system') {
      const checkTime = () => {
        applyTheme('system');
      };
      const interval = setInterval(checkTime, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [theme]);

  const handleLanguageChange = (langId) => {
    i18n.changeLanguage(langId);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleNotificationsChange = (enabled) => {
    setNotifications(enabled);
    localStorage.setItem('notifications', enabled ? 'enabled' : 'muted');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold dark:text-white">{t('profile.settings')}</h1>
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <Icon icon="material-symbols:close" className="w-6 h-6 dark:text-white" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="border-b dark:border-gray-700 last:border-b-0 pb-6 last:pb-0">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">{t('profile.preferences')}</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex items-center space-x-3">
                    <Icon icon="material-symbols:language" className="text-xl dark:text-white" />
                    <span className="dark:text-white">{t('profile.language')}</span>
                  </div>
                  <select
                    value={i18n.language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="px-3 py-1 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {languages.map(lang => (
                      <option key={lang.id} value={lang.id}>{lang.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex items-center space-x-3">
                    <Icon icon="material-symbols:palette-outline" className="text-xl dark:text-white" />
                    <span className="dark:text-white">{t('profile.theme')}</span>
                  </div>
                  <select
                    value={theme}
                    onChange={(e) => handleThemeChange(e.target.value)}
                    className="px-3 py-1 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {themes.map(themeOption => (
                      <option key={themeOption.id} value={themeOption.id}>
                        {t(`profile.theme_${themeOption.id}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex items-center space-x-3">
                    <Icon icon="material-symbols:notifications" className="text-xl dark:text-white" />
                    <span className="dark:text-white">{t('profile.notifications')}</span>
                  </div>
                  <button
                    onClick={() => handleNotificationsChange(!notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      notifications ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-b dark:border-gray-700 last:border-b-0 pb-6 last:pb-0">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">{t('profile.privacy')}</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center space-x-3">
                    <Icon icon="material-symbols:security" className="text-xl dark:text-white" />
                    <span className="dark:text-white">{t('profile.security')}</span>
                  </div>
                  <Icon icon="material-symbols:chevron-right" className="text-xl dark:text-white" />
                </button>
              </div>
            </div>

            <div className="border-b dark:border-gray-700 last:border-b-0 pb-6 last:pb-0">
              <h2 className="text-lg font-semibold mb-4 text-red-600">{t('profile.deleteAccount')}</h2>
              <div className="space-y-2">
                <button
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600"
                >
                  <div className="flex items-center space-x-3">
                    <Icon icon="material-symbols:warning" className="text-xl" />
                    <span>{t('profile.deleteAccount')}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl rounded-lg bg-white dark:bg-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg font-medium dark:text-white">
                {t('profile.privacyPolicy')}
              </Dialog.Title>
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Icon icon="material-symbols:close" className="w-5 h-5 dark:text-white" />
              </button>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <h3>Privacy Policy</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <h4>Data Collection</h4>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <h4>Data Usage</h4>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}