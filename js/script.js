const loginLink = document.getElementById('login-link');

if (localStorage.getItem('loggedIn') === 'true') {
    loginLink.textContent = 'Log uit';
    localStorage.setItem('loggedIn', 'false');
    loginLink.href = '/index.html';
} else{
    loginLink.textContent = 'Login';
}
