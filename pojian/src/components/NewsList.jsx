import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NewsCard from './NewsCard';

export default function NewsList({ articles, onArticleSelect }) {
  const [sortBy, setSortBy] = useState('latest');
  const { t } = useTranslation();

  const handleRefresh = () => {
    // TODO: Implement refresh functionality
  };

  const sortedNews = [...articles].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.time) - new Date(a.time);
    }
    return b.views - a.views;
  });

  return (
    <div className="h-screen overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">财新网 - 最新文章</h1>
            <span className="text-gray-500 text-sm">{articles.length} 条内容</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border rounded-lg text-sm"
            >
              <option value="latest">{t('list.latest')}</option>
              <option value="popular">{t('list.popular')}</option>
            </select>
            <button 
              onClick={handleRefresh}
              className="p-2 hover:bg-gray-200 rounded-full"
              title={t('list.refresh')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2 p-4">
        {sortedNews.map((news) => (
          <div 
            key={news.id}
            onClick={() => onArticleSelect(news)}
            className="cursor-pointer"
          >
            <NewsCard news={news} />
          </div>
        ))}
      </div>
    </div>
  );
}