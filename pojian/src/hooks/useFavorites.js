import { useState, useCallback } from 'react';

const FAVORITES_KEY = 'favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : {
      article: [],
      social: [],
      image: [],
      video: [],
      audio: [],
      message: []
    };
  });

  const saveFavorites = useCallback((newFavorites) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  }, []);

  const addFavorite = useCallback((type, item) => {
    const newFavorites = {
      ...favorites,
      [type]: [...favorites[type], { ...item, addedAt: new Date().toISOString() }]
    };
    saveFavorites(newFavorites);
  }, [favorites, saveFavorites]);

  const removeFavorite = useCallback((type, itemId) => {
    const newFavorites = {
      ...favorites,
      [type]: favorites[type].filter(item => item.id !== itemId)
    };
    saveFavorites(newFavorites);
  }, [favorites, saveFavorites]);

  const isFavorited = useCallback((type, itemId) => {
    return favorites[type]?.some(item => item.id === itemId) || false;
  }, [favorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorited
  };
};