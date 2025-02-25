// admin.js: Enhanced admin panel functionality

document.addEventListener("DOMContentLoaded", () => {
  const adminLoginBtn = document.getElementById("admin-login-btn");
  const adminPasswordInput = document.getElementById("admin-password");
  const adminPanel = document.getElementById("admin-panel");

  const createUserBtn = document.getElementById("create-user-btn");
  const updateUserBtn = document.getElementById("update-user-btn");
  const deleteUserBtn = document.getElementById("delete-user-btn");
  const userList = document.getElementById("user-list");
  const selectUser = document.getElementById("select-user");

  // Handle admin login
  adminLoginBtn.addEventListener("click", () => {
    const enteredPassword = adminPasswordInput.value.trim();
    if (enteredPassword === "Sendvic96!") {
      adminPanel.classList.remove("hidden");
    } else {
      alert("Incorrect password!");
    }
  });

  // Load and display users
  function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    userList.innerHTML = "";
    selectUser.innerHTML = "<option value=''>Select a user</option>";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.username} - Credits: ${user.credits}`;
      userList.appendChild(li);

      const option = document.createElement("option");
      option.value = user.username;
      option.textContent = user.username;
      selectUser.appendChild(option);
    });
  }

  // Add a new user
  createUserBtn.addEventListener("click", () => {
    const newUsername = document.getElementById("new-username").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();
    const newCredits = parseInt(document.getElementById("new-credits").value, 10);

    if (!newUsername || !newPassword || isNaN(newCredits)) {
      alert("Please fill all fields correctly.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.username === newUsername);
    if (existingUser) {
      alert("User already exists.");
      return;
    }

    users.push({ username: newUsername, password: newPassword, credits: newCredits });
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
    alert(`User "${newUsername}" created successfully!`);
  });

  // Update user details
  updateUserBtn.addEventListener("click", () => {
    const selectedUsername = selectUser.value;
    const newUsername = document.getElementById("edit-username").value.trim();
    const newPassword = document.getElementById("edit-password").value.trim();
    const newCredits = parseInt(document.getElementById("edit-credits").value, 10);

    if (!selectedUsername) {
      alert("Please select a user.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userIndex = users.findIndex((u) => u.username === selectedUsername);
    if (userIndex === -1) return;

    if (newUsername) users[userIndex].username = newUsername;
    if (newPassword) users[userIndex].password = newPassword;
    if (!isNaN(newCredits)) users[userIndex].credits = newCredits;

    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
    alert("User updated successfully!");
  });

  // Delete user
  deleteUserBtn.addEventListener("click", () => {
    const selectedUsername = selectUser.value;
    if (!selectedUsername) {
      alert("Please select a user.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.filter((u) => u.username !== selectedUsername);
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
    alert("User deleted successfully!");
  });

  // Initialize users on load
  loadUsers();
});