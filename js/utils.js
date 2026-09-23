// Shared Utility Functions

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
export function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Escapes string for use in HTML attributes
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
export function escapeAttr(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/**
 * Formats time string to locale time
 * @param {string} timeStr - Time in HH:MM format
 * @returns {string} Formatted time string
 */
export function formatTime(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":");
  const date = new Date();
  date.setHours(Number(h), Number(m), 0, 0);
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

/**
 * Formats date string to locale date
 * @param {string} dateStr - Date in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/**
 * Generates a unique event ID using timestamp and random string
 * @param {string} title - Event title (used as prefix)
 * @returns {string} Unique event ID
 */
export function generateEventId(title) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 7);
  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").substring(0, 30);
  return `${cleanTitle}-${timestamp}-${random}`;
}

/**
 * Shows a user-friendly error message based on error type
 * @param {Error} error - Error object
 * @param {string} context - Context of the error (e.g., "reservation", "payment")
 */
export async function showErrorMessage(error, context = "operation") {
  console.error(`Error in ${context}:`, error);
  
  const message = error.message || "";
  
  if (message.includes("expired")) {
    await showAlert("Your reservation expired. Please select seats again.", "warning");
  } else if (message.includes("reserved by someone else") || message.includes("reserved by another user")) {
    await showAlert("Someone just booked this seat. Please choose another.", "error");
  } else if (message.includes("not found")) {
    await showAlert("Item not found. It may have been removed.", "error");
  } else if (message.includes("permission") || message.includes("denied")) {
    await showAlert("You don't have permission to perform this action.", "error");
  } else if (message.includes("network") || message.includes("offline")) {
    await showAlert("Network error. Please check your connection and try again.", "error");
  } else {
    await showAlert(`${context.charAt(0).toUpperCase() + context.slice(1)} failed. ${message || "Please try again."}`, "error");
  }
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {object} {valid: boolean, message: string}
 */
export function validatePassword(password) {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" };
  }
  return { valid: true, message: "" };
}

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Shows a loading indicator
 * @param {HTMLElement} element - Element to show loading in
 * @param {string} message - Loading message
 */
export function showLoading(element, message = "Loading...") {
  if (element) {
    element.innerHTML = `<div style="text-align:center;padding:20px;color:rgba(0,0,0,0.6);">${escapeHtml(message)}</div>`;
  }
}

/**
 * Sanitizes user input to prevent XSS
 * @param {string} input - User input
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
  return escapeHtml(String(input).trim());
}

/**
 * Custom alert modal system
 * Replaces default browser alerts with styled modals
 */
let alertModalElement = null;
let alertResolve = null;

function createAlertModal() {
  if (alertModalElement) return alertModalElement;
  
  const modal = document.createElement('div');
  modal.id = 'customAlertModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    animation: fadeIn 0.2s ease;
  `;
  
  const dialog = document.createElement('div');
  dialog.style.cssText = `
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    min-width: 320px;
    max-width: 500px;
    margin: 20px;
    animation: slideIn 0.3s ease;
    overflow: hidden;
  `;
  
  const header = document.createElement('div');
  header.id = 'alertHeader';
  header.style.cssText = `
    padding: 20px 24px;
    background: linear-gradient(135deg, #f3df1f 0%, #f5e74d 100%);
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 12px;
  `;
  
  const icon = document.createElement('span');
  icon.id = 'alertIcon';
  icon.style.cssText = `
    font-size: 28px;
    line-height: 1;
  `;
  
  const title = document.createElement('div');
  title.id = 'alertTitle';
  title.style.cssText = `
    font-family: Georgia, serif;
    font-size: 20px;
    font-weight: bold;
    color: #1e1e1e;
  `;
  
  header.appendChild(icon);
  header.appendChild(title);
  
  const body = document.createElement('div');
  body.id = 'alertBody';
  body.style.cssText = `
    padding: 24px;
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 15px;
    line-height: 1.6;
    color: #333;
    max-height: 400px;
    overflow-y: auto;
  `;
  
  const footer = document.createElement('div');
  footer.id = 'alertFooter';
  footer.style.cssText = `
    padding: 16px 24px;
    background: #f8f8f8;
    border-top: 1px solid #e0e0e0;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  `;
  
  const okButton = document.createElement('button');
  okButton.id = 'alertOkBtn';
  okButton.textContent = 'OK';
  okButton.style.cssText = `
    background: #1e1e1e;
    color: white;
    border: none;
    padding: 12px 32px;
    border-radius: 8px;
    font-family: Georgia, serif;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 100px;
  `;
  okButton.onmouseover = () => {
    okButton.style.background = '#333';
    okButton.style.transform = 'translateY(-1px)';
  };
  okButton.onmouseout = () => {
    okButton.style.background = '#1e1e1e';
    okButton.style.transform = 'translateY(0)';
  };
  
  footer.appendChild(okButton);
  
  dialog.appendChild(header);
  dialog.appendChild(body);
  dialog.appendChild(footer);
  modal.appendChild(dialog);
  
  // Add animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideIn {
      from { 
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to { 
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(modal);
  alertModalElement = modal;
  
  // Close on OK button
  okButton.onclick = () => closeAlert();
  
  // Close on backdrop click
  modal.onclick = (e) => {
    if (e.target === modal) closeAlert();
  };
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeAlert();
    }
  });
  
  return modal;
}

function closeAlert() {
  if (alertModalElement) {
    alertModalElement.style.display = 'none';
    if (alertResolve) {
      alertResolve();
      alertResolve = null;
    }
  }
}

/**
 * Shows a custom styled alert
 * @param {string} message - Alert message
 * @param {string} type - Alert type: 'info', 'success', 'warning', 'error'
 * @returns {Promise} Resolves when alert is closed
 */
export function showAlert(message, type = 'info') {
  return new Promise((resolve) => {
    const modal = createAlertModal();
    const icon = document.getElementById('alertIcon');
    const title = document.getElementById('alertTitle');
    const body = document.getElementById('alertBody');
    const header = document.getElementById('alertHeader');
    
    // Set icon and title based on type
    const config = {
      info: {
        icon: 'ℹ️',
        title: 'Information',
        gradient: 'linear-gradient(135deg, #4A90E2 0%, #5BA3F5 100%)',
        color: 'white'
      },
      success: {
        icon: '✅',
        title: 'Success',
        gradient: 'linear-gradient(135deg, #0b5d1e 0%, #0e7527 100%)',
        color: 'white'
      },
      warning: {
        icon: '⚠️',
        title: 'Warning',
        gradient: 'linear-gradient(135deg, #f3df1f 0%, #f5e74d 100%)',
        color: '#1e1e1e'
      },
      error: {
        icon: '❌',
        title: 'Error',
        gradient: 'linear-gradient(135deg, #c3080b 0%, #e00a0e 100%)',
        color: 'white'
      }
    };
    
    const cfg = config[type] || config.info;
    icon.textContent = cfg.icon;
    title.textContent = cfg.title;
    title.style.color = cfg.color;
    header.style.background = cfg.gradient;
    
    // Set message
    body.innerHTML = escapeHtml(message).replace(/\n/g, '<br>');
    
    // Show modal
    modal.style.display = 'flex';
    alertResolve = resolve;
    
    // Focus OK button
    setTimeout(() => {
      document.getElementById('alertOkBtn')?.focus();
    }, 100);
  });
}

/**
 * Shows a custom confirm dialog
 * @param {string} message - Confirmation message
 * @param {string} type - Alert type: 'info', 'warning', 'error'
 * @returns {Promise<boolean>} Resolves to true if confirmed, false if cancelled
 */
export function showConfirm(message, type = 'warning') {
  return new Promise((resolve) => {
    const modal = createAlertModal();
    const icon = document.getElementById('alertIcon');
    const title = document.getElementById('alertTitle');
    const body = document.getElementById('alertBody');
    const header = document.getElementById('alertHeader');
    const footer = document.getElementById('alertFooter');
    
    // Set icon and title
    const config = {
      info: { icon: 'ℹ️', title: 'Confirm', gradient: 'linear-gradient(135deg, #4A90E2 0%, #5BA3F5 100%)', color: 'white' },
      warning: { icon: '⚠️', title: 'Confirm Action', gradient: 'linear-gradient(135deg, #f3df1f 0%, #f5e74d 100%)', color: '#1e1e1e' },
      error: { icon: '⚠️', title: 'Confirm Deletion', gradient: 'linear-gradient(135deg, #c3080b 0%, #e00a0e 100%)', color: 'white' }
    };
    
    const cfg = config[type] || config.warning;
    icon.textContent = cfg.icon;
    title.textContent = cfg.title;
    title.style.color = cfg.color;
    header.style.background = cfg.gradient;
    body.innerHTML = escapeHtml(message).replace(/\n/g, '<br>');
    
    // Update footer with Cancel + Confirm buttons
    footer.innerHTML = '';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
      background: #e0e0e0;
      color: #333;
      border: none;
      padding: 12px 32px;
      border-radius: 8px;
      font-family: Georgia, serif;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 100px;
    `;
    cancelBtn.onmouseover = () => {
      cancelBtn.style.background = '#d0d0d0';
      cancelBtn.style.transform = 'translateY(-1px)';
    };
    cancelBtn.onmouseout = () => {
      cancelBtn.style.background = '#e0e0e0';
      cancelBtn.style.transform = 'translateY(0)';
    };
    cancelBtn.onclick = () => {
      modal.style.display = 'none';
      resolve(false);
    };
    
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirm';
    confirmBtn.style.cssText = `
      background: #1e1e1e;
      color: white;
      border: none;
      padding: 12px 32px;
      border-radius: 8px;
      font-family: Georgia, serif;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 100px;
    `;
    confirmBtn.onmouseover = () => {
      confirmBtn.style.background = '#333';
      confirmBtn.style.transform = 'translateY(-1px)';
    };
    confirmBtn.onmouseout = () => {
      confirmBtn.style.background = '#1e1e1e';
      confirmBtn.style.transform = 'translateY(0)';
    };
    confirmBtn.onclick = () => {
      modal.style.display = 'none';
      resolve(true);
    };
    
    footer.appendChild(cancelBtn);
    footer.appendChild(confirmBtn);
    
    modal.style.display = 'flex';
    
    // Close on Escape (cancel)
    const escHandler = (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        resolve(false);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
    
    setTimeout(() => confirmBtn.focus(), 100);
  });
}

/**
 * Creates pagination controls
 * @param {number} currentPage - Current page number (1-indexed)
 * @param {number} totalPages - Total number of pages
 * @param {Function} onPageChange - Callback when page changes
 * @returns {HTMLElement} Pagination controls element
 */
export function createPagination(currentPage, totalPages, onPageChange) {
  const container = document.createElement('div');
  container.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;margin-top:20px;font-family:"Segoe UI",Arial,sans-serif;';
  
  if (totalPages <= 1) return container;

  // Previous button
  const prevBtn = document.createElement('button');
  prevBtn.textContent = '← Previous';
  prevBtn.disabled = currentPage === 1;
  prevBtn.style.cssText = `padding:8px 16px;border:1px solid #ddd;background:${currentPage === 1 ? '#f5f5f5' : '#fff'};border-radius:6px;cursor:${currentPage === 1 ? 'not-allowed' : 'pointer'};font-weight:600;font-size:13px;`;
  prevBtn.onclick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  container.appendChild(prevBtn);

  // Page numbers
  const pageNumbers = document.createElement('div');
  pageNumbers.style.cssText = 'display:flex;gap:4px;';
  
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  getPageNumbers().forEach(pageNum => {
    if (pageNum === '...') {
      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      ellipsis.style.cssText = 'padding:8px 12px;color:#999;';
      pageNumbers.appendChild(ellipsis);
    } else {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = pageNum;
      pageBtn.style.cssText = `padding:8px 12px;border:1px solid ${pageNum === currentPage ? '#111' : '#ddd'};background:${pageNum === currentPage ? '#111' : '#fff'};color:${pageNum === currentPage ? '#fff' : '#111'};border-radius:6px;cursor:pointer;font-weight:${pageNum === currentPage ? '700' : '600'};min-width:40px;font-size:13px;`;
      pageBtn.onclick = () => onPageChange(pageNum);
      pageNumbers.appendChild(pageBtn);
    }
  });
  
  container.appendChild(pageNumbers);

  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next →';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.style.cssText = `padding:8px 16px;border:1px solid #ddd;background:${currentPage === totalPages ? '#f5f5f5' : '#fff'};border-radius:6px;cursor:${currentPage === totalPages ? 'not-allowed' : 'pointer'};font-weight:600;font-size:13px;`;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  container.appendChild(nextBtn);

  return container;
}

/**
 * Paginates an array of items
 * @param {Array} items - Array of items to paginate
 * @param {number} page - Current page (1-indexed)
 * @param {number} perPage - Items per page
 * @returns {Object} {items: Array, totalPages: number, currentPage: number}
 */
export function paginateArray(items, page, perPage) {
  const totalPages = Math.ceil(items.length / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  return {
    items: items.slice(startIndex, endIndex),
    totalPages,
    currentPage,
    totalItems: items.length
  };
}
