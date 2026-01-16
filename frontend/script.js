// ✅ Your live Render URL
const API = "https://laksha-ice-cream-1.onrender.com/api";

// --- 1. SIGNUP LOGIC WITH SPINNER ---
async function signup() {
  const btn = document.getElementById('signupBtn');
  const spinner = document.getElementById('spinner');
  
  // Show loading state
  if (btn) btn.disabled = true;
  if (spinner) spinner.classList.add('loading');

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
    alert(res.ok ? "Success: " + data.message : "Error: " + (data.error || data.message));
  } catch (err) {
    alert("Could not connect to server.");
  } finally {
    // Hide loading state
    if (btn) btn.disabled = false;
    if (spinner) spinner.classList.remove('loading');
  }
}

// --- 2. LOGIN LOGIC WITH SPINNER ---
async function login() {
  const btn = document.getElementById('loginBtn');
  const spinner = document.getElementById('spinner');
  
  // Show loading state
  if (btn) btn.disabled = true;
  if (spinner) spinner.classList.add('loading');

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
      alert("Login successful! Welcome " + data.user.name);
      document.getElementById('main-content').style.display = 'block';
      document.getElementById('auth-links').style.display = 'none';
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      alert("Login failed: " + (data.message || "Invalid credentials"));
    }
  } catch (err) {
    alert("Could not connect to server.");
  } finally {
    // Hide loading state
    if (btn) btn.disabled = false;
    if (spinner) spinner.classList.remove('loading');
  }
}

// Keep user logged in on refresh
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const mainContent = document.getElementById('main-content');
        const authLinks = document.getElementById('auth-links');
        if (mainContent) mainContent.style.display = 'block';
        if (authLinks) authLinks.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName'); // NEW: Clear name
    window.location.reload();
}

// --- 3. DELETE ACCOUNT LOGIC ---
const deleteBtn = document.getElementById('deleteBtn');
if (deleteBtn) {
  deleteBtn.addEventListener('click', async () => {
    const email = prompt("Please enter your email to confirm deletion:");
    if (!email) return;
    const response = await fetch(`${API}/delete-user/${email}`, { method: 'DELETE' });
    const data = await response.json();
    alert(data.message);
    localStorage.removeItem('isLoggedIn'); // Clear login state after deletion
    window.location.reload();
  });
}

// --- 4. MANUAL LOCATION LOGIC ---
function saveManualLocation() {
    const addressInput = document.getElementById('manual-location');
    const status = document.getElementById('location-text');

    if (addressInput.value.trim() === "") {
        alert("Please type an address first!");
        return;
    }

    status.textContent = `📍 Location Set: ${addressInput.value}`;
    localStorage.setItem('userAddress', addressInput.value);
    alert("Address saved for delivery!");
}

// --- 5. AUTOMATIC GPS LOGIC ---
function getLocation() {
  const status = document.getElementById('location-text');

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  status.textContent = "Locating... Please allow access.";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      status.textContent = `📍 Location Set: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
      localStorage.setItem('userLat', lat);
      localStorage.setItem('userLon', lon);
      alert("GPS Location captured successfully!");
    },
    (error) => {
      alert("GPS Error: " + error.message + ". Please try typing your address instead.");
      status.textContent = "📍 Delivery Location: Not Set";
    },
    { enableHighAccuracy: true, timeout: 5000 }
  );
}
