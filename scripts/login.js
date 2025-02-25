```javascript
window.addEventListener('load', () => {
  const loginBtn = document.getElementById('login-btn');
  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');
  loginBtn.addEventListener('click', () => {
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value.trim();
    if (!enteredUsername || !enteredPassword) {
      alert('Please enter both username and password.');
      return;
    }
    let users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
      alert('No users found. Please refresh or initialize.');
      return;
    }
    const foundUser = users.find(user => user.username === enteredUsername && user.password === enteredPassword);
    if (!foundUser) {
      alert('Invalid username or password.');
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    if (foundUser.username === 'Nidzation' && foundUser.password === 'Sendvic96!') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'profile.html';
    }
  });
});
```
