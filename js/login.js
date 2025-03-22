const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Set default values for username and password in localStorage
if (!localStorage.getItem('username')) {
  localStorage.setItem('username', 'admin');
}
if (!localStorage.getItem('password')) {
  localStorage.setItem('password', 'password');
}

loginBtn.addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  if (username === storedUsername && password === storedPassword) {
    localStorage.setItem('loggedIn', 'true');
    console.log('Ingelogd!');
    window.location.href = '../html/shop.html';
  } else {
    console.log('Ongeldige gebruikersnaam of wachtwoord');
  }
});

if (localStorage.getItem('loggedIn') === 'true') {
  console.log('Gebruiker is ingelogd');
  window.location.href = '../html/shop.html';
} else {
  console.log('Gebruiker is niet ingelogd');
}