import React, { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import Sidebar from '../components/Sidebar';
import NewsCard from '../components/NewsCard';
import NewsDetail from '../components/NewsDetail';
import VideoDetail from '../components/VideoDetail';
import AudioDetail from '../components/AudioDetail';
import ImageDetail from '../components/ImageDetail';
import SocialDetail from '../components/SocialDetail';
import MessageDetail from '../components/MessageDetail';
import DiscoverPage from '../components/DiscoverPage';
import { mockData } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const ResizeHandle = () => {
  const { isDark } = useTheme();
  return (
    <PanelResizeHandle className="w-1 hover:w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-600 transition-all">
      <div className="w-full h-full" />
    </PanelResizeHandle>
  );
};

export default function NewsListPage() {
  const [activeTab, setActiveTab] = useState('article');
  const [selectedContainer, setSelectedContainer] = useState('caixin');
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortBy, setSortBy] = useState('latest');
  const [showDiscover, setShowDiscover] = useState(false);
  const [, forceUpdate] = useState();
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const handleIconClick = (tab) => {
    setActiveTab(tab);
    setSelectedContainer(Object.keys(mockData[tab].items)[0]);
    setSelectedItem(null);
  };

  const handleContainerClick = (containerId) => {
    setSelectedContainer(containerId);
    setSelectedItem(null);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (!item.isRead) {
      item.isRead = true;
      // Force re-render to update unread badges
      forceUpdate(prev => !prev);
    }
  };

  const handleMarkAllRead = () => {
    if (mockData[activeTab]?.items[selectedContainer]) {
      mockData[activeTab].items[selectedContainer].forEach(item => {
        item.isRead = true;
      });
      // Force re-render to update unread badges
      forceUpdate(prev => !prev);
    }
  };

  const handleBackFromDiscover = () => {
    setShowDiscover(false);
  };

  const getUnreadCounts = () => {
    const counts = {};
    Object.entries(mockData).forEach(([key, value]) => {
      counts[key] = Object.values(value.items).reduce((total, items) => {
        return total + items.filter(item => !item.isRead).length;
      }, 0);
    });
    return counts;
  };

  const DetailComponent = {
    article: NewsDetail,
    video: VideoDetail,
    audio: AudioDetail,
    image: ImageDetail,
    social: SocialDetail,
    message: MessageDetail
  }[activeTab] || NewsDetail;

  const sortedContent = mockData[activeTab]?.items[selectedContainer] || [];
  if (sortBy === 'latest') {
    sortedContent.sort((a, b) => new Date(b.time) - new Date(a.time));
  } else {
    sortedContent.sort((a, b) => (b.views || 0) - (a.views || 0));
  }

  return (
    <div className="h-screen overflow-hidden">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20} minSize={15} maxSize={30}>
          <Sidebar
            activeTab={activeTab}
            selectedContainer={selectedContainer}
            onTabChange={handleIconClick}
            onContainerChange={handleContainerClick}
            unreadCounts={getUnreadCounts()}
            onDiscoverClick={() => setShowDiscover(true)}
            showDiscover={showDiscover}
          />
        </Panel>
        
        <ResizeHandle />
        
        {showDiscover ? (
          <Panel defaultSize={80}>
            <DiscoverPage onBack={handleBackFromDiscover} />
          </Panel>
        ) : (
          <>
            <Panel defaultSize={30} minSize={20} maxSize={40}>
              <div className="h-screen overflow-y-auto bg-white dark:bg-gray-800">
                <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b dark:border-gray-700 h-[42px] flex items-center px-2">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <h1 className="text-base font-semibold truncate max-w-[200px] dark:text-white">
                        {selectedContainer === 'collect' 
                          ? t(`list.favorited${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`)
                          : mockData[activeTab]?.sources?.[selectedContainer]}
                      </h1>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {t('list.itemCount', { count: sortedContent.length })}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-2 py-1 text-xs border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="latest">{t('list.latest')}</option>
                        <option value="popular">{t('list.popular')}</option>
                      </select>
                      <button 
                        onClick={() => setSelectedItem(null)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                        title={t('list.refresh')}
                      >
                        <Icon icon="material-symbols:refresh" className="w-4 h-4 dark:text-white" />
                      </button>
                      <button
                        onClick={handleMarkAllRead}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                        title={t('list.markAllRead')}
                      >
                        <Icon icon="material-symbols:mark-email-read" className="w-4 h-4 dark:text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 p-2">
                  {sortedContent.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="cursor-pointer"
                    >
                      <NewsCard news={item} />
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
            
            <ResizeHandle />
            
            <Panel defaultSize={50} minSize={30}>
              <DetailComponent item={selectedItem} />
            </Panel>
          </>
        )}
      </PanelGroup>
    </div>
  );
}