import api from './index';

export const getFeedList = (params) => {
  return api.get('/feeds', { params });
};

export const addFeed = (url) => {
  return api.post('/feeds', { url });
};

export const deleteFeed = (id) => {
  return api.delete(`/feeds/${id}`);
};

export const updateFeed = (id, data) => {
  return api.put(`/feeds/${id}`, data);
};

export const getFeedItems = (feedId, params) => {
  return api.get(`/feeds/${feedId}/items`, { params });
};

export const markItemAsRead = (itemId) => {
  return api.put(`/items/${itemId}/read`);
};

export const markAllAsRead = (feedId) => {
  return api.put(`/feeds/${feedId}/read`);
};

export const toggleFavorite = (itemId) => {
  return api.put(`/items/${itemId}/favorite`);
};

export const getFavorites = (params) => {
  return api.get('/favorites', { params });
};