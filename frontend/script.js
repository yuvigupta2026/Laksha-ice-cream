// ✅ Updated to your live Render URL
const API = "https://laksha-ice-cream-1.onrender.com/api";

// --- 1. SIGNUP LOGIC ---
async function signup() {
  try {
    const res = await fetch(API + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
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

// --- 2. LOGIN LOGIC ---
async function login() {
  try {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login successful!");
      console.log("Welcome,", data.user.name);
    } else {
      alert("Login failed: " + (data.message || "Invalid credentials"));
    }
  } catch (err) {
    console.error("Login failed:", err);
    alert("Could not connect to the server.");
  }
}

// --- 3. DELETE ACCOUNT LOGIC ---
const deleteBtn = document.getElementById('deleteBtn');
if (deleteBtn) {
  deleteBtn.addEventListener('click', async () => {
    const email = prompt("Please enter your email to confirm deletion:");
    if (!email) return;

    const response = await fetch(`${API}/delete-user/${email}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    alert(data.message);
    window.location.reload();
  });
}

// --- 4. LOCATION TOOL LOGIC ---
function getLocation() {
  const status = document.getElementById('location-text');

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating...";
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        status.textContent = `📍 Location Set: ${lat.toFixed(2)}, ${lon.toFixed(2)}`;
        
        // Saves location for checkout pages
        localStorage.setItem('userLat', lat);
        localStorage.setItem('userLon', lon);
      },
      () => {
        status.textContent = "Unable to retrieve your location";
      }
    );
  }
}
