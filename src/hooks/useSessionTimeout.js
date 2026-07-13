import { useEffect, useState, useCallback, useRef } from 'react';
import { getSessionManager } from '../utils/sessionManager';
import { SESSION_CONFIG } from '../constants/sessionTimeout';

export function useSessionTimeout(onTimeout, onWarning) {
  const [timeRemaining, setTimeRemaining] = useState(SESSION_CONFIG.INACTIVITY_TIMEOUT);
  const [showWarning, setShowWarning] = useState(false);
  const sessionManager = useRef(null);
  const countdownInterval = useRef(null);

  useEffect(() => {
    sessionManager.current = getSessionManager();
    sessionManager.current.initialize();

    // Handle session events
    const unsubscribe = sessionManager.current.onSessionEvent((event) => {
      if (event.type === 'warning') {
        setShowWarning(true);
        onWarning?.();
      } else if (event.type === 'timeout') {
        setShowWarning(false);
        onTimeout?.();
      } else if (event.type === 'activity') {
        setTimeRemaining(SESSION_CONFIG.INACTIVITY_TIMEOUT);
        setShowWarning(false);
      } else if (event.type === 'warning_acknowledged') {
        setShowWarning(false);
        setTimeRemaining(SESSION_CONFIG.INACTIVITY_TIMEOUT);
      }
    });

    // Start countdown timer for display
    countdownInterval.current = setInterval(() => {
      const remaining = sessionManager.current?.getTimeUntilTimeout() ?? 0;
      setTimeRemaining(Math.max(0, remaining));
    }, SESSION_CONFIG.CHECK_INTERVAL);

    return () => {
      unsubscribe?.();
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
      }
    };
  }, [onTimeout, onWarning]);

  const handleStayLoggedIn = useCallback(() => {
    if (sessionManager.current) {
      sessionManager.current.acknowledgeWarning();
    }
  }, []);

  const getFormattedTime = useCallback((milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    showWarning,
    timeRemaining,
    formattedTime: getFormattedTime(timeRemaining),
    handleStayLoggedIn,
    manager: sessionManager.current,
  };
}

export default useSessionTimeout;
