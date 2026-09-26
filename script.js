// Login Form Handler
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Validate input
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }

    // Show loading state
    const loginBtn = loginForm.querySelector('.login-btn');
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'Signing in...';
    loginBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // In a real application, this would send data to a backend server
        const loginData = {
            email: email,
            password: password,
            rememberMe: remember,
            timestamp: new Date().toISOString()
        };

        console.log('Login attempt:', loginData);

        // Store in localStorage if remember me is checked
        if (remember) {
            localStorage.setItem('userEmail', email);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('userEmail');
            localStorage.removeItem('rememberMe');
        }

        // Simulate successful login
        showSuccess('Login successful! Redirecting...');
        
        // Redirect after 1.5 seconds
        setTimeout(() => {
            // This would redirect to the dashboard
            // window.location.href = '/dashboard';
            alert('Welcome! Dashboard would load here.');
            loginForm.reset();
        }, 1500);

        // Reset button
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
    }, 2000);
});

// Social Login Handlers
const socialBtns = document.querySelectorAll('.social-btn');

socialBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const provider = this.classList.contains('google') ? 'Google' : 'GitHub';
        
        this.textContent = `Connecting to ${provider}...`;
        this.disabled = true;

        // Simulate OAuth flow
        setTimeout(() => {
            console.log(`${provider} OAuth flow initiated`);
            showSuccess(`${provider} login initiated!`);
            
            this.textContent = `🔵 ${provider}` || `⚫ ${provider}`;
            this.disabled = false;
        }, 2000);
    });
});

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    const errorDiv = createAlert('error', message);
    document.body.insertBefore(errorDiv, document.body.firstChild);
    
    setTimeout(() => {
        errorDiv.classList.add('remove');
        setTimeout(() => errorDiv.remove(), 300);
    }, 4000);
}

function showSuccess(message) {
    const successDiv = createAlert('success', message);
    document.body.insertBefore(successDiv, document.body.firstChild);
    
    setTimeout(() => {
        successDiv.classList.add('remove');
        setTimeout(() => successDiv.remove(), 300);
    }, 4000);
}

function createAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Add inline styles
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        ${type === 'error' ? 'background: #ff4757; color: white;' : 'background: #2ed573; color: white;'}
    `;
    
    return alert;
}

// Add animation styles for alerts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(300px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .alert.remove {
        animation: slideOut 0.3s ease-out forwards;
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(300px);
        }
    }
`;
document.head.appendChild(style);

// Restore email if "Remember Me" was checked
window.addEventListener('load', function() {
    const savedEmail = localStorage.getItem('userEmail');
    const rememberMe = localStorage.getItem('rememberMe');

    if (savedEmail && rememberMe === 'true') {
        document.getElementById('email').value = savedEmail;
        document.getElementById('remember').checked = true;
        document.getElementById('email').focus();
    }
});

// Password visibility toggle (optional feature)
function addPasswordToggle() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.createElement('button');
    
    toggleBtn.innerHTML = '👁️';
    toggleBtn.style.cssText = `
        position: absolute;
        right: 12px;
        top: 38px;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
    `;

    const formGroup = passwordInput.parentElement;
    formGroup.style.position = 'relative';

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    });

    formGroup.appendChild(toggleBtn);
}

// Initialize password toggle
addPasswordToggle();
