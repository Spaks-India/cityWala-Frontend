import { createContext, useContext, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useSessionTimeout } from '../hooks/useSessionTimeout';
import SessionTimeoutModal from '../components/SessionTimeoutModal';
import { useNavigate } from 'react-router-dom';

const SessionTimeoutContext = createContext(null);

export function SessionTimeoutProvider({ children }) {
  const navigate = useNavigate();
  const { logout, user, partner, admin } = useAuth();

  // Only track sessions for authenticated users
  const isAuthenticated = !!(user || partner || admin);

  const handleSessionTimeout = useCallback(async () => {
    try {
      await logout();
    } catch (err) {
      console.error('[SessionTimeoutProvider] Logout error:', err);
    }

    // Show timeout message and redirect
    navigate('/login', {
      replace: true,
      state: {
        message: 'Your session has expired due to 30 minutes of inactivity. Please log in again.',
        expiredByTimeout: true,
      },
    });
  }, [logout, navigate]);

  const handleSessionWarning = useCallback(() => {
    // Warning dialog will be shown by the modal component
    // No action needed here - just log for debugging
    console.debug('[SessionTimeoutProvider] Warning shown');
  }, []);

  const {
    showWarning,
    timeRemaining,
    formattedTime,
    handleStayLoggedIn,
  } = useSessionTimeout(
    isAuthenticated ? handleSessionTimeout : undefined,
    isAuthenticated ? handleSessionWarning : undefined
  );

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      // Cleanup is handled in useSessionTimeout hook
    };
  }, []);

  // Only show modal if user is authenticated
  if (!isAuthenticated) {
    return children;
  }

  return (
    <SessionTimeoutContext.Provider
      value={{
        showWarning,
        timeRemaining,
        formattedTime,
        handleStayLoggedIn,
      }}
    >
      {children}
      <SessionTimeoutModal
        isVisible={showWarning}
        timeRemaining={timeRemaining}
        formattedTime={formattedTime}
        onStayLoggedIn={handleStayLoggedIn}
        onLogout={handleSessionTimeout}
      />
    </SessionTimeoutContext.Provider>
  );
}

export function useSessionTimeoutContext() {
  const ctx = useContext(SessionTimeoutContext);
  if (!ctx) {
    throw new Error(
      'useSessionTimeoutContext must be used inside SessionTimeoutProvider'
    );
  }
  return ctx;
}

export default SessionTimeoutProvider;
