import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

const sources = Array.from({ length: 50 }, (_, index) => ({
  id: `source-${index + 1}`,
  name: `Source ${index + 1}`,
  icon: [
    'logos:react',
    'logos:vue',
    'logos:angular-icon',
    'logos:nodejs-icon',
    'logos:python',
    'logos:java',
    'logos:javascript',
    'logos:typescript-icon',
    'logos:go',
    'logos:rust'
  ][index % 10],
  categories: [
    ['Technology', 'Programming'],
    ['Business', 'Finance'],
    ['Science', 'Research'],
    ['Arts', 'Culture'],
    ['Health', 'Wellness']
  ][index % 5],
}));

export default function DiscoverPage({ onBack }) {
  const { t } = useTranslation();

  return (
    <div className="h-screen bg-white dark:bg-gray-800 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="flex items-center h-[42px] px-4">
          <button
            onClick={onBack}
            className="p-1 -ml-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Icon icon="material-symbols:arrow-back" className="text-xl dark:text-white" />
          </button>
          <h1 className="text-lg font-semibold ml-2 dark:text-white">{t('discover.title')}</h1>
        </div>
        
        <div className="px-4 pb-4">
          <div className="flex space-x-4 overflow-x-auto">
            <button className="px-3 py-1 text-sm rounded-full bg-[#1B2B4C] text-white whitespace-nowrap">
              {t('discover.search')}
            </button>
            <button className="px-3 py-1 text-sm rounded-full border border-[#1B2B4C] text-[#1B2B4C] dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 whitespace-nowrap">
              {t('discover.rss')}
            </button>
            <button className="px-3 py-1 text-sm rounded-full border border-[#1B2B4C] text-[#1B2B4C] dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 whitespace-nowrap">
              {t('discover.rssHub')}
            </button>
            <button className="px-3 py-1 text-sm rounded-full border border-[#1B2B4C] text-[#1B2B4C] dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 whitespace-nowrap">
              {t('discover.collection')}
            </button>
            <button className="px-3 py-1 text-sm rounded-full border border-[#1B2B4C] text-[#1B2B4C] dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 whitespace-nowrap">
              {t('discover.rss3')}
            </button>
            <button className="px-3 py-1 text-sm rounded-full border border-[#1B2B4C] text-[#1B2B4C] dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 whitespace-nowrap">
              {t('discover.user')}
            </button>
            <button className="px-3 py-1 text-sm rounded-full border border-[#1B2B4C] text-[#1B2B4C] dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 whitespace-nowrap">
              {t('discover.transfer')}
            </button>
            <button className="px-3 py-1 text-sm rounded-full border border-[#1B2B4C] text-[#1B2B4C] dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 whitespace-nowrap">
              {t('discover.import')}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <input
            type="text"
            placeholder={t('discover.searchPlaceholder')}
            className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2B4C] dark:focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">{t('discover.trending')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sources.map((source) => (
              <div
                key={source.id}
                className="p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Icon icon={source.icon} className="text-2xl dark:text-white" />
                  <div>
                    <h3 className="font-medium dark:text-white">{source.name}</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {source.categories.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}