const API = "http://localhost:3000";

async function signup() {
  const res = await fetch(API + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  });
  alert((await res.json()).message);
}

async function login() {
  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });
  alert((await res.json()).message);
}
