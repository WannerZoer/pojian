import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const sources = [
  {
    id: 'ainvest',
    name: 'AInvest',
    icon: '📈',
    category: 'Latest News'
  },
  {
    id: 'ap',
    name: 'AP News',
    icon: '📰',
    category: 'News'
  },
  {
    id: 'apple',
    name: 'Apple',
    icon: '🍎',
    category: 'App Update'
  },
  {
    id: 'behance',
    name: 'Behance',
    icon: '🎨',
    category: 'User Works'
  },
  {
    id: 'binance',
    name: 'Binance',
    icon: '💰',
    category: 'Announcement'
  },
  {
    id: 'bitget',
    name: 'Bitget',
    icon: '📊',
    category: 'Announcement'
  },
  {
    id: 'bloomberg',
    name: 'Bloomberg',
    icon: '📱',
    category: 'Authors'
  },
  {
    id: 'bluesky',
    name: 'Bluesky',
    icon: '🦋',
    category: 'Post'
  },
  {
    id: 'dlsite',
    name: 'DLsite',
    icon: '🎮',
    category: 'Discounted Works'
  }
];

export default function Discovery({ onBack }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const filteredSources = sources.filter(source => 
    source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    source.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen overflow-y-auto bg-white">
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center h-[42px] px-4">
          <button
            onClick={onBack}
            className="p-1 -ml-1 hover:bg-gray-100 rounded-full"
            title={t('common.back')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold ml-2">{t('common.discover')}</h1>
        </div>

        <div className="px-4 py-3 border-t">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('common.search')}
                  className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">{t('common.trending')}</h2>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-4">
            {filteredSources.map(source => (
              <div
                key={source.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{source.icon}</span>
                  <div>
                    <h3 className="font-medium">{source.name}</h3>
                    <p className="text-sm text-gray-500">{source.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSources.map(source => (
              <div
                key={source.id}
                className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-2xl">{source.icon}</span>
                <div>
                  <h3 className="font-medium">{source.name}</h3>
                  <p className="text-sm text-gray-500">{source.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}