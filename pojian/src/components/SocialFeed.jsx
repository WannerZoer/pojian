import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SocialFeed() {
  const { t } = useTranslation();

  return (
    <div className="h-screen overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">{t('list.social')}</h1>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-center">{t('list.noContent')}</p>
      </div>
    </div>
  );
}