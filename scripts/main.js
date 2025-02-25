// main.js: Shared scripts for general site functionality

document.addEventListener('DOMContentLoaded', () => {
  initializeUsers();
});

function initializeUsers() {
  const storedUsers = localStorage.getItem('users');
  if (!storedUsers) {
      fetch('data/users.json')
          .then(response => response.json())
          .then(data => {
              localStorage.setItem('users', JSON.stringify(data));
          })
          .catch(error => console.error('Error loading users.json:', error));
  }
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser')) || null;
}

function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}
