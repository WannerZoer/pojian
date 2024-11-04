import React from 'react';
import { useTranslation } from 'react-i18next';
import FavoriteButton from './FavoriteButton';

export default function VideoDetail({ video }) {
  const { t } = useTranslation();

  const handleAction = (action) => {
    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        break;
      case 'original':
        window.open(video?.originalUrl, '_blank');
        break;
      case 'share':
        // TODO: Implement share functionality
        break;
      default:
        break;
    }
  };

  if (!video) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">{t('list.noContent')}</p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto bg-white">
      <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{t('list.video')}</h2>
        <div className="flex space-x-2">
          <FavoriteButton
            item={video}
            onFavorite={(item) => console.log('Favorite:', item)}
          />
          <button
            onClick={() => handleAction('copy')}
            className="p-2 hover:bg-gray-100 rounded-full"
            title={t('actions.copyLink')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
          <button
            onClick={() => handleAction('original')}
            className="p-2 hover:bg-gray-100 rounded-full"
            title={t('actions.openOriginal')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
          <button
            onClick={() => handleAction('share')}
            className="p-2 hover:bg-gray-100 rounded-full"
            title={t('actions.share')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">{video?.title}</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{video?.author}</span>
            <span>•</span>
            <span>{video?.time}</span>
            <span>•</span>
            <span>{video?.views} {t('common.views')}</span>
          </div>
        </div>
        
        <div className="aspect-video bg-black rounded-lg mb-4">
          {/* Video player would go here */}
          <div className="w-full h-full flex items-center justify-center text-white">
            {t('common.videoPlayer')}
          </div>
        </div>
        
        <div className="prose max-w-none">
          {video?.description}
        </div>
      </div>
    </div>
  );
}