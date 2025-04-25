// utils/otherUtils.js

export function auth() {
  const username = prompt("Enter username:");
  const password = prompt("Enter password:");

  if (!username || !password) {
    alert("Username and password are required.");
    window.location.reload(); // simple retry
    return;
  }

  const userData = JSON.parse(localStorage.getItem(username));
  if (!userData || userData.password !== password) {
    alert("Invalid username or password.");
    window.location.reload(); // simple retry
    return;
  }

  // Save current user to localStorage
  localStorage.setItem("CurrentUser", username);
  alert(`Welcome back, ${userData.name}!`);
}
