import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import UnreadBadge from './UnreadBadge';
import ProfileDropdown from './ProfileDropdown';
import { mockData } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar = ({ 
  activeTab, 
  selectedContainer,
  onTabChange, 
  onContainerChange,
  unreadCounts,
  onDiscoverClick,
  showDiscover
}) => {
  const { t } = useTranslation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [sortDirection, setSortDirection] = useState('asc');
  const profileRef = useRef(null);
  const { isDark } = useTheme();
  
  const menuItems = [
    { id: 'article', icon: 'material-symbols:article', label: t('list.article') },
    { id: 'social', icon: 'material-symbols:share', label: t('list.social') },
    { id: 'image', icon: 'material-symbols:image', label: t('list.image') },
    { id: 'video', icon: 'material-symbols:video-library', label: t('list.video') },
    { id: 'audio', icon: 'material-symbols:audio-file', label: t('list.audio') },
    { id: 'message', icon: 'material-symbols:chat', label: t('list.message') }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getContainers = (tabId) => {
    const containers = [];
    // Add favorites container first
    containers.push({
      id: 'collect',
      icon: 'material-symbols:star',
      label: t('common.favorites'),
      color: 'text-orange-500'
    });

    // Add other containers from mockData
    const sources = Object.entries(mockData[tabId]?.sources || {});
    
    // Sort containers based on direction
    sources.sort((a, b) => {
      const labelA = a[1].toLowerCase();
      const labelB = b[1].toLowerCase();
      return sortDirection === 'asc' 
        ? labelA.localeCompare(labelB)
        : labelB.localeCompare(labelA);
    });

    sources.forEach(([id, label]) => {
      containers.push({
        id,
        icon: getContainerIcon(tabId, id),
        label,
        unreadCount: getContainerUnreadCount(tabId, id)
      });
    });

    return containers;
  };

  const getContainerIcon = (tabId, containerId) => {
    const icons = {
      article: 'material-symbols:newspaper',
      social: 'material-symbols:public',
      image: 'material-symbols:image',
      video: 'material-symbols:movie',
      audio: 'material-symbols:music-note',
      message: containerId === 'inbox' ? 'material-symbols:inbox' : 'material-symbols:send'
    };
    return icons[tabId] || 'material-symbols:folder';
  };

  const getContainerUnreadCount = (tabId, containerId) => {
    return mockData[tabId]?.items[containerId]?.filter(item => !item.isRead).length || 0;
  };

  const getInitialAvatar = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const initial = (name || 'U').charAt(0).toUpperCase();
    
    return (
      <div className={`w-8 h-8 rounded-full ${randomColor} flex items-center justify-center text-white font-semibold`}>
        {initial}
      </div>
    );
  };

  const handleSortClick = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header" ref={profileRef}>
        <img
          src="/logo-32.svg"
          alt="破茧"
          className="w-8 h-8"
        />
        <span className="font-semibold text-lg flex-1 dark:text-white">破茧</span>
        <button 
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={onDiscoverClick}
        >
          <Icon icon="material-symbols:add" className="dark:text-white" width="24" />
        </button>
        <div 
          className="cursor-pointer hover:opacity-80"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          {!avatarError ? (
            <img
              src="/avatar.png"
              alt="Profile"
              className="w-8 h-8 rounded-full"
              onError={() => setAvatarError(true)}
            />
          ) : (
            getInitialAvatar("John Doe")
          )}
        </div>
        {showProfileDropdown && (
          <ProfileDropdown
            username="John Doe"
            onClose={() => setShowProfileDropdown(false)}
          />
        )}
      </div>
      
      <div className="sidebar-icon-grid">
        {menuItems.map(item => (
          <div 
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className="sidebar-icon-button"
          >
            <button className={`sidebar-icon ${activeTab === item.id ? 'sidebar-icon-active' : ''}`}>
              <Icon 
                icon={item.icon} 
                className="dark:text-white" 
                width="24" 
              />
              {unreadCounts[item.id] > 0 && (
                <UnreadBadge count={unreadCounts[item.id]} />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium dark:text-gray-300">
          {t(`sidebar.${activeTab}Title`)}
        </span>
        <button
          onClick={handleSortClick}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title={t(sortDirection === 'asc' ? 'sidebar.sortAZ' : 'sidebar.sortZA')}
        >
          <Icon 
            icon={sortDirection === 'asc' ? 'material-symbols:sort-by-alpha' : 'material-symbols:sort-by-alpha'} 
            className={`transform ${sortDirection === 'desc' ? 'rotate-180' : ''} dark:text-white`}
            width="20" 
          />
        </button>
      </div>

      <div className="sidebar-container-list">
        {getContainers(activeTab).map(container => (
          <div
            key={container.id}
            onClick={() => onContainerChange(container.id)}
            className={`sidebar-container-item ${
              selectedContainer === container.id ? 'sidebar-container-item-active' : ''
            }`}
          >
            <Icon 
              icon={container.icon} 
              className={`sidebar-container-item-icon ${container.color || 'dark:text-white'}`}
              width="20" 
            />
            <span className="sidebar-container-item-text">
              {container.label}
            </span>
            {container.unreadCount > 0 && (
              <div className="sidebar-container-item-badge">
                <UnreadBadge count={container.unreadCount} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;