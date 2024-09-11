const forgotPasswordForm = document.querySelector('#forgot-password-form');

forgotPasswordForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.querySelector('input[type="email"]').value;

  // Check if the email is valid (you can add your own email validation logic here)
  if (email) {
    // Get the stored username and password associated with the email
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Check if the email is found in local storage
    if (storedUsername && storedPassword) {
      // Prompt the user to enter a new password
      const newPassword = prompt('Enter a new password:');

      // Update the stored password
      localStorage.setItem('password', newPassword);

      alert('Password reset successfully!');
      window.location.href = 'login.html';
    } else {
      alert('Email not found. Please try again.');
    }
  } else {
    alert('Please enter a valid email address.');
  }
});