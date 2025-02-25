// profile.js: Manage user profile and display/edit info

window.addEventListener('load', () => {
  const profileUsername = document.getElementById('profile-username');
  const profileCredits = document.getElementById('profile-credits');

  let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
      alert('No user is currently logged in!');
      return;
  }

  // Display user info
  function loadUserProfile() {
      profileUsername.textContent = currentUser.username;
      profileCredits.textContent = currentUser.credits;
  }

  // Initialize
  loadUserProfile();
});
