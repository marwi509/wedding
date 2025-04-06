document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    document.getElementById('submitPassword').addEventListener('click', checkPassword);
    document.getElementById('passwordInput').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            checkPassword();
        }
    });

    // Check for saved authentication on page load
    checkSavedAuth();
});

/**
 * Check if user has previously authenticated and stored in localStorage
 */
function checkSavedAuth() {
    const savedAuth = localStorage.getItem('weddingAuth');
    if (savedAuth === 'true') {
        showInvitation();
    }
}

async function checkPassword() {
    const password = document.getElementById('passwordInput').value;

    try {
        // This is where you'll put your bcrypt hash
        // Example hash for password "wedding2025" - replace with your own!
        const storedHash = '$2y$10$s8sJt9EbUOhVXyxOdIBxX.v/OmIJY4y7FcVdjWUJ8kSZD9Gnz9z9S';

        // Use bcrypt.js to compare the entered password with the stored hash
        const isMatch = await bcrypt.compare(password, storedHash);

        if (isMatch) {
            // Save authentication status in localStorage
            localStorage.setItem('weddingAuth', 'true');
            showInvitation();
        } else {
            alert('Incorrect password. Please try again.');
        }
    } catch (error) {
        console.error('Error verifying password:', error);
        alert('There was an error checking the password. Please try again.');
    }
}

/**
 * Show the invitation and hide the password section
 */
function showInvitation() {
    document.getElementById('passwordSection').style.display = 'none';
    document.querySelector('.invitation').style.display = 'block';
}