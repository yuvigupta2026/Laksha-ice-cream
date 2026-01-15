// ✅ Updated to your live Render URL
const API = "https://laksha-ice-cream-1.onrender.com/api";

async function signup() {
  try {
    const res = await fetch(API + "/signup", { // Maps to /api/signup
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    });

    const data = await res.json();
    
    if (res.ok) {
      alert("Success: " + data.message);
    } else {
      alert("Error: " + (data.error || data.message));
    }
  } catch (err) {
    console.error("Signup failed:", err);
    alert("Could not connect to the server.");
  }
}

async function login() {
  try {
    const res = await fetch(API + "/login", { // Maps to /api/login
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login successful!");
      // If you want to save the user's name:
      console.log("Welcome,", data.user.name);
    } else {
      alert("Login failed: " + (data.message || "Invalid credentials"));
    }

    const deleteBtn = document.getElementById('deleteBtn');

deleteBtn.addEventListener('click', async () => {
    const email = prompt("Please enter your email to confirm deletion:");
    if (!email) return;

    const response = await fetch(`https://laksha-ice-cream-1.onrender.com/api/delete-user/${email}`, {
        method: 'DELETE'
    });

    const data = await response.json();
    alert(data.message);
    
    // Refresh the page or redirect
    window.location.reload();
});
    
  } catch (err) {
    console.error("Login failed:", err);
    alert("Could not connect to the server.");
  }
}
