import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useNotifications() {
  const [isEnabled, setIsEnabled] = useLocalStorage('notifications', true);
  const [permission, setPermission] = useState(Notification.permission);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, []);

  const toggleNotifications = useCallback(async (enabled) => {
    if (enabled && permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) {
        return false;
      }
    }
    setIsEnabled(enabled);
    return true;
  }, [permission, requestPermission, setIsEnabled]);

  return {
    isEnabled,
    permission,
    toggleNotifications,
    requestPermission
  };
}