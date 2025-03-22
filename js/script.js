const loginLink = document.getElementById('login-link');

if (localStorage.getItem('loggedIn') === 'true') {
    loginLink.textContent = 'Log uit';
    loginLink.href = '../html/shop.html';
    loginLink.addEventListener('click', () => {
        localStorage.setItem('loggedIn', 'false');
    });
} else {
    loginLink.textContent = 'Log in';
}