//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const checkbox = document.getElementById('checkbox');
    const existingButton = document.getElementById('existing');

    const LOCAL_STORAGE_KEY = 'rememberedUser';

    /**
     * Checks localStorage for saved credentials and toggles the existing user button.
     */
    function checkExistingUser() {
        const userData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (userData) {
            existingButton.style.display = 'block'; // Show the button
        } else {
            existingButton.style.display = 'none';  // Hide the button
        }
    }

    // 1. Initial check on page load
    checkExistingUser();

    // 2. Form Submission Behavior
    loginForm.addEventListener('submit', (e) => {
        // Prevent the default form submission (page reload)
        e.preventDefault();

        const currentUsername = usernameInput.value;
        const currentPassword = passwordInput.value;

        // Display the required alert
        alert(`Logged in as ${currentUsername}`);

        // Check if "Remember Me" is checked
        if (checkbox.checked) {
            // Store credentials in localStorage
            const userData = JSON.stringify({
                username: currentUsername,
                password: currentPassword // Not recommended for real apps, but for this assignment
            });
            localStorage.setItem(LOCAL_STORAGE_KEY, userData);
        } else {
            // If unchecked, remove any previously stored credentials
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        }

        // Update the visibility of the "Login as existing user" button
        checkExistingUser();
    });

    // 3. Existing User Login Button Click
    existingButton.addEventListener('click', () => {
        const userDataString = localStorage.getItem(LOCAL_STORAGE_KEY);
        
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            // Display the alert with the saved username
            alert(`Logged in as ${userData.username}`);
        } else {
            // Should not happen if checkExistingUser is working correctly, but good for robustness
            alert("No existing user credentials found.");
            checkExistingUser();
        }
    });

    // Test Case 1: Ensure checkbox is unchecked by default
    checkbox.checked = false;
});