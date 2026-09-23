// Application Constants

// Seat Configuration
export const SEAT_ROWS = 5;
export const SEAT_COLS = 10;
export const SEAT_ROW_LETTERS = ['A', 'B', 'C', 'D', 'E'];

// Reservation Settings
export const RESERVATION_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
export const RESERVATION_WARNING_MS = 2 * 60 * 1000; // 2 minutes before expiry

// Payment Settings
export const PAYMENT_WORKER_URL = "https://plain-bush-7252.lonesatcer11.workers.dev";

// EmailJS Configuration
export const EMAILJS_PUBLIC_KEY = "74N3HSYscBOAe4c-m";
export const EMAILJS_SERVICE_ID = "teatro_ticketing";
export const EMAILJS_TEMPLATE_ID = "Auto-Reply";

// UI Messages
export const MESSAGES = {
  LOADING: "Loading...",
  NO_EVENTS: "No events available.",
  ERROR_GENERIC: "Something went wrong. Please try again.",
  ERROR_NETWORK: "Network error. Please check your connection.",
  ERROR_PERMISSION: "You don't have permission to perform this action.",
  SUCCESS_RESERVATION: "🎉 Seats reserved successfully!",
  SUCCESS_PAYMENT: "🎉 Payment successful! Your seats are confirmed.",
  SUCCESS_EVENT_CREATED: "✅ Event created successfully!",
  SUCCESS_EVENT_UPDATED: "✅ Event updated successfully!",
  SUCCESS_EVENT_ARCHIVED: "✅ Event archived successfully!",
};

// Firestore Collection Names
export const COLLECTIONS = {
  EVENTS: "events",
  USERS: "users",
  SHOWS: "shows",
  TRANSACTIONS: "transactions",
  ORDERS: "orders",
  HISTORY: "history",
};

// User Roles
export const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

// Pagination
export const TRANSACTIONS_PER_PAGE = 10;
export const EVENTS_PER_PAGE = 6;
export const SHOWS_PER_PAGE = 5;
