const registerForm = document.querySelector('#register-form');

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#email').value;

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('email', email);

    window.location.href = 'login.html';
});