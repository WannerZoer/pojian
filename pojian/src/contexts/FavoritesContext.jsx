import React, { createContext, useContext } from 'react';
import { useFavorites } from '../hooks/useFavorites';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const favoritesManager = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesManager}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};