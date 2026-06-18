// Tiny client logger.
//
// - debug() is silent in production builds so we don't leak noise/data to the
//   browser console for real users.
// - warn()/error() always emit, so production issues (failed API calls, etc.)
//   are still visible in the console and to error-tracking browser extensions.

const isProd = import.meta.env.PROD;

const stamp = (level) => `[${level}]`;

const logger = {
  debug: (...args) => {
    if (!isProd) console.log(stamp("DEBUG"), ...args);
  },
  info: (...args) => {
    if (!isProd) console.info(stamp("INFO"), ...args);
  },
  warn: (...args) => console.warn(stamp("WARN"), ...args),
  error: (...args) => console.error(stamp("ERROR"), ...args),
};

export default logger;
