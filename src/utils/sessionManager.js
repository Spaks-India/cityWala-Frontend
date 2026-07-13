import { SESSION_CONFIG } from '../constants/sessionTimeout';

class SessionActivityManager {
  constructor() {
    this.lastActivityTime = Date.now();
    this.inactivityTimer = null;
    this.warningTimer = null;
    this.listeners = [];
    this.activityEvents = [
      'mousedown',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
      'touchmove',
      'click',
      'change',
      'submit',
    ];
    this.broadcastChannel = null;
    this.isInitialized = false;
    this.isWarningShown = false;
  }

  initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // Initialize BroadcastChannel for multi-tab support
    try {
      this.broadcastChannel = new BroadcastChannel(SESSION_CONFIG.CHANNEL_NAME);
      this.broadcastChannel.onmessage = (event) => {
        this.handleBroadcastMessage(event.data);
      };
    } catch (err) {
      console.warn('[SessionManager] BroadcastChannel not supported', err);
    }

    // Set up activity listeners
    this.attachActivityListeners();

    // Start inactivity timers
    this.resetInactivityTimer();
  }

  attachActivityListeners() {
    const handleActivity = () => {
      this.recordActivity();
    };

    this.activityEvents.forEach((eventName) => {
      // Use capture phase for better responsiveness
      document.addEventListener(eventName, handleActivity, true);
    });

    // Store for cleanup
    this._boundActivityHandler = handleActivity;
  }

  recordActivity() {
    const now = Date.now();
    const timeSinceLastActivity = now - this.lastActivityTime;

    // Ignore rapid successive events (debounce within 100ms)
    if (timeSinceLastActivity < 100) {
      return;
    }

    this.lastActivityTime = now;
    this.isWarningShown = false;

    // Reset timers
    this.resetInactivityTimer();

    // Notify other tabs
    this.broadcastActivity();

    // Notify listeners
    this.notifyListeners({
      type: 'activity',
      timestamp: now,
    });
  }

  resetInactivityTimer() {
    // Clear existing timers
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.warningTimer) clearTimeout(this.warningTimer);

    // Set warning timer (appears 5 min before timeout)
    this.warningTimer = setTimeout(() => {
      if (!this.isWarningShown) {
        this.isWarningShown = true;
        this.notifyListeners({
          type: 'warning',
          timeRemaining: SESSION_CONFIG.WARNING_BEFORE_TIMEOUT,
        });
      }
    }, SESSION_CONFIG.INACTIVITY_TIMEOUT - SESSION_CONFIG.WARNING_BEFORE_TIMEOUT);

    // Set actual timeout timer
    this.inactivityTimer = setTimeout(() => {
      this.triggerTimeout();
    }, SESSION_CONFIG.INACTIVITY_TIMEOUT);
  }

  triggerTimeout() {
    this.notifyListeners({
      type: 'timeout',
      timestamp: Date.now(),
    });

    // Broadcast timeout to other tabs
    this.broadcastMessage({
      type: 'session_timeout',
      timestamp: Date.now(),
    });
  }

  broadcastActivity() {
    this.broadcastMessage({
      type: 'activity_reset',
      timestamp: Date.now(),
    });
  }

  broadcastMessage(data) {
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(data);
      } catch (err) {
        console.warn('[SessionManager] Failed to broadcast:', err);
      }
    }
  }

  handleBroadcastMessage(data) {
    const { type } = data;

    if (type === 'activity_reset') {
      // Another tab recorded activity, reset our timer
      this.lastActivityTime = data.timestamp;
      this.isWarningShown = false;
      this.resetInactivityTimer();
    } else if (type === 'session_timeout') {
      // Another tab triggered timeout, trigger it here too
      this.triggerTimeout();
    } else if (type === 'warning_acknowledged') {
      // Another tab acknowledged the warning (clicked "Stay Logged In")
      // Reset our warning state
      this.isWarningShown = false;
      this.lastActivityTime = Date.now();
      this.resetInactivityTimer();
    }
  }

  onSessionEvent(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  notifyListeners(event) {
    this.listeners.forEach((callback) => {
      try {
        callback(event);
      } catch (err) {
        console.error('[SessionManager] Listener error:', err);
      }
    });
  }

  acknowledgeWarning() {
    // User clicked "Stay Logged In"
    this.lastActivityTime = Date.now();
    this.isWarningShown = false;
    this.resetInactivityTimer();

    // Broadcast acknowledgement
    this.broadcastMessage({
      type: 'warning_acknowledged',
      timestamp: Date.now(),
    });

    this.notifyListeners({
      type: 'warning_acknowledged',
    });
  }

  destroy() {
    // Clear timers
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.warningTimer) clearTimeout(this.warningTimer);

    // Remove event listeners
    this.activityEvents.forEach((eventName) => {
      if (this._boundActivityHandler) {
        document.removeEventListener(eventName, this._boundActivityHandler, true);
      }
    });

    // Close broadcast channel
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.close();
      } catch (err) {
        console.warn('[SessionManager] Failed to close channel:', err);
      }
    }

    this.listeners = [];
    this.isInitialized = false;
  }

  getTimeUntilTimeout() {
    const elapsed = Date.now() - this.lastActivityTime;
    return Math.max(0, SESSION_CONFIG.INACTIVITY_TIMEOUT - elapsed);
  }

  getTimeUntilWarning() {
    const elapsed = Date.now() - this.lastActivityTime;
    const warningTriggerTime = SESSION_CONFIG.INACTIVITY_TIMEOUT - SESSION_CONFIG.WARNING_BEFORE_TIMEOUT;
    return Math.max(0, warningTriggerTime - elapsed);
  }

  isWarningPending() {
    return this.getTimeUntilWarning() <= 0 && !this.isWarningShown;
  }
}

// Singleton instance
let sessionManager = null;

export function getSessionManager() {
  if (!sessionManager) {
    sessionManager = new SessionActivityManager();
  }
  return sessionManager;
}

export default SessionActivityManager;
