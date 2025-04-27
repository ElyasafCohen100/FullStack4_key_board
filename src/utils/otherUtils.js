/**
 * ======================================================================================
 * 🔐  Simple Authentication Utility
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Basic username and password authentication system using localStorage
 * 📁  Part of Fullstack Project - Basic React Editor
 * ======================================================================================
 */

// ==================================== auth Function ==================================== //
// Handles user login by verifying username and password
export function auth() {
  // Ask user for credentials
  const username = prompt("Enter username:");
  const password = prompt("Enter password:");

  // Validate inputs
  if (!username || !password) {
    alert("Username and password are required.");
    window.location.reload(); // Reload to retry
    return;
  }

  // Fetch user data from localStorage
  const userData = JSON.parse(localStorage.getItem(username));

  // Validate user existence and password correctness
  if (!userData || userData.password !== password) {
    alert("Invalid username or password.");
    window.location.reload(); // Reload to retry
    return;
  }

  // Save the currently logged-in user to sessionStorage
  sessionStorage.setItem("CurrentUser", username);
  
  // Welcome message
  alert(`Welcome back, ${userData.name}!`);
}
