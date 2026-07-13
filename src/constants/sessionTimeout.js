// Session timeout configuration (all in milliseconds)
export const SESSION_CONFIG = {
  // Total inactivity timeout: 30 minutes
  INACTIVITY_TIMEOUT: 30 * 60 * 1000, // 30 minutes

  // Warning appears 5 minutes before timeout
  WARNING_BEFORE_TIMEOUT: 5 * 60 * 1000, // 5 minutes

  // Actual timeout trigger happens at:
  // INACTIVITY_TIMEOUT - WARNING_BEFORE_TIMEOUT = 25 minutes of inactivity

  // Check interval for inactive tabs (prevent multiple warnings)
  CHECK_INTERVAL: 1000, // 1 second

  // BroadcastChannel for multi-tab communication
  CHANNEL_NAME: 'session_activity',
};

// Export human-readable values for UI
export const SESSION_DISPLAY = {
  INACTIVITY_MINUTES: 30,
  WARNING_MINUTES: 5,
};
