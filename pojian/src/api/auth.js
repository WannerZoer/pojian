import api from './index';

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const register = (email, password, code) => {
  return api.post('/auth/register', { email, password, code });
};

export const sendVerificationCode = (email) => {
  return api.post('/auth/send-code', { email });
};

export const resetPassword = (email, code, newPassword) => {
  return api.post('/auth/reset-password', { email, code, newPassword });
};

export const updateProfile = (data) => {
  return api.put('/auth/profile', data);
};

export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  return api.post('/auth/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};