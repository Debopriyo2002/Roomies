const form = document.querySelector('#signin-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const usernameError = document.querySelector('#username-error');
const passwordError = document.querySelector('#password-error');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // Check if username is empty
  if (usernameInput.value.trim() === '') {
    usernameError.textContent = 'Username is required';
  } else {
    usernameError.textContent = '';
  }
  
  // Check if password is empty
  if (passwordInput.value.trim() === '') {
    passwordError.textContent = 'Password is required';
  } else {
    passwordError.textContent = '';
  }
  
  // If both username and password are valid, submit the form
  if (usernameError.textContent === '' && passwordError.textContent === '') {
    form.submit();
  }
});
