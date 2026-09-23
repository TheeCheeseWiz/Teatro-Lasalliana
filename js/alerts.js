// Alert replacement helper
// This file helps replace default alert() and confirm() calls with custom styled modals

import { showAlert, showConfirm } from './utils.js';

// Override global alert and confirm
window.alert = function(message) {
  return showAlert(String(message), detectAlertType(message));
};

window.confirm = function(message) {
  return showConfirm(String(message), detectConfirmType(message));
};

// Detect alert type from message content
function detectAlertType(message) {
  const msg = String(message).toLowerCase();
  
  if (msg.includes('✅') || msg.includes('success') || msg.includes('created') || msg.includes('updated') || msg.includes('exported')) {
    return 'success';
  } else if (msg.includes('⚠️') || msg.includes('warning') || msg.includes('please') || msg.includes('select') || msg.includes('add')) {
    return 'warning';
  } else if (msg.includes('❌') || msg.includes('error') || msg.includes('failed') || msg.includes('denied') || msg.includes('invalid')) {
    return 'error';
  } else if (msg.includes('ℹ️') || msg.includes('info') || msg.includes('note')) {
    return 'info';
  }
  
  // Default
  return 'info';
}

// Detect confirm type from message content
function detectConfirmType(message) {
  const msg = String(message).toLowerCase();
  
  if (msg.includes('delete') || msg.includes('remove') || msg.includes('archive')) {
    return 'error';
  } else if (msg.includes('warning') || msg.includes('sure')) {
    return 'warning';
  }
  
  return 'warning';
}

export { showAlert, showConfirm };

