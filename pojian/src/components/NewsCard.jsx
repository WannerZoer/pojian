import React from 'react';
import { useTranslation } from 'react-i18next';
import UnreadBadge from './UnreadBadge';
import { Icon } from '@iconify/react';

export default function NewsCard({ news }) {
  const { t } = useTranslation();

  return (
    <div className="relative flex space-x-2 p-1.5 bg-white dark:bg-dark-tertiary rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover">
      {!news.isRead && <UnreadBadge />}
      <div className="flex-grow min-w-0">
        <div className="flex items-center space-x-1 mb-0.5">
          <img src="/caixin-logo.png" alt="财新" className="w-4 h-4 rounded flex-shrink-0" />
          <span className="text-blue-600 dark:text-blue-400 text-xs font-medium truncate max-w-[120px]">{news.source}</span>
          <span className="text-gray-400 dark:text-gray-500 text-xs flex-shrink-0">•</span>
          <span className="text-gray-400 dark:text-gray-500 text-xs truncate max-w-[100px]">{news.author}</span>
          {news.views && (
            <>
              <span className="text-gray-400 dark:text-gray-500 text-xs flex-shrink-0">•</span>
              <span className="text-gray-400 dark:text-gray-500 text-xs flex-shrink-0">
                {t('list.views', { count: news.views })}
              </span>
            </>
          )}
        </div>
        <h2 className="text-sm font-medium mb-0.5 overflow-hidden text-ellipsis line-clamp-2 dark:text-white">
          {news.title}
        </h2>
        {news.quote && (
          <p className="text-xs text-gray-600 dark:text-gray-400 italic overflow-hidden text-ellipsis line-clamp-2">
            {news.quote}
          </p>
        )}
      </div>
      {news.image && (
        <div className="flex-shrink-0">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-16 h-12 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}