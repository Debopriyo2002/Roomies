const form = document.getElementById('signup-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log("test")
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Validate name, email, password, and confirm password
    if (name === '') {
        alert('Please enter your name');
        return;
    }
    if (email === '') {
        alert('Please enter your email');
        return;
    }
    if (password === '') {
        alert('Please enter your password');
        return;
    }
    if (confirmPassword === '') {
        alert('Please confirm your password');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Submit the form if all validation passes
    form.submit();

    // Show success message
    alert('Sign up successful!');
});
