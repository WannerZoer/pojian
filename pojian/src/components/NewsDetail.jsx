import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import FavoriteButton from './FavoriteButton';

export default function NewsDetail({ item }) {
  const { t } = useTranslation();

  const handleAction = (action) => {
    switch (action) {
      case 'copy':
        if (item?.originalUrl) {
          navigator.clipboard.writeText(item.originalUrl);
        }
        break;
      case 'original':
        if (item?.originalUrl) {
          window.open(item.originalUrl, '_blank');
        }
        break;
      case 'share':
        // TODO: Implement share functionality
        break;
      default:
        break;
    }
  };

  if (!item) {
    return (
      <div className="h-screen overflow-y-auto bg-white dark:bg-dark-primary">
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-dark-primary/95 backdrop-blur-sm border-b dark:border-dark-border h-[42px] flex items-center px-2">
          <h2 className="text-base font-semibold dark:text-dark-text-primary">{t('detail.noContent')}</h2>
        </div>
        <div className="flex items-center justify-center h-[calc(100vh-42px)] p-4 text-center text-gray-500 dark:text-dark-text-muted">
          {t('detail.selectItem')}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto bg-white dark:bg-dark-primary">
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-dark-primary/95 backdrop-blur-sm border-b dark:border-dark-border h-[42px] flex items-center justify-between px-2">
        <h2 className="text-base font-semibold dark:text-dark-text-primary">{t('detail.articleDetail')}</h2>
        <div className="flex space-x-1">
          <FavoriteButton
            item={item}
            onFavorite={(item) => console.log('Favorite:', item)}
          />
          <button
            onClick={() => handleAction('copy')}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full"
            title={t('detail.copyLink')}
          >
            <Icon icon="material-symbols:content-copy" className="w-4 h-4 dark:text-dark-text-primary" />
          </button>
          <button
            onClick={() => handleAction('original')}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full"
            title={t('detail.openOriginal')}
          >
            <Icon icon="material-symbols:open-in-new" className="w-4 h-4 dark:text-dark-text-primary" />
          </button>
          <button
            onClick={() => handleAction('share')}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full"
            title={t('detail.share')}
          >
            <Icon icon="material-symbols:share" className="w-4 h-4 dark:text-dark-text-primary" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2 dark:text-dark-text-primary">{item.title}</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-dark-text-muted">
            <span>{item.author}</span>
            <span>•</span>
            <span>{item.time}</span>
            {item.views !== undefined && (
              <>
                <span>•</span>
                <span>{t('detail.views', { count: item.views })}</span>
              </>
            )}
          </div>
        </div>
        
        {item.image && (
          <img 
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        
        {item.quote && (
          <blockquote className="border-l-4 border-gray-200 dark:border-dark-border pl-4 my-4 italic text-gray-600 dark:text-dark-text-muted">
            {item.quote}
          </blockquote>
        )}
        
        <div className="prose dark:prose-invert max-w-none">
          {item.content}
        </div>
      </div>
    </div>
  );
}