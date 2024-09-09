const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

loginBtn.addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username === 'admin' && password === 'password') {
    localStorage.setItem('loggedIn', 'true');
    console.log('Ingelogd!');
  } else {
    console.log('Ongeldige gebruikersnaam of wachtwoord');
  }
});

if (localStorage.getItem('loggedIn') === 'true') {
  console.log('Gebruiker is ingelogd');
  window.location.href = '/index.html';
} else {
  console.log('Gebruiker is niet ingelogd');
}