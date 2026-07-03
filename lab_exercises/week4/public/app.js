// Shared Local Auth Logic for LootYard (Express + SQLite backend)
const API_URL = 'http://localhost:5000/api';

// Initialize global state if not already defined
if (typeof window.currentUser === 'undefined') {
    window.currentUser = null;
}
if (typeof window.authMode === 'undefined') {
    window.authMode = 'login';
}

function checkLocalAuth() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
        window.currentUser = JSON.parse(userStr);
        
        // UI updates for home.html / portfolio.html user areas
        const guestBtns = document.getElementById('guestButtons');
        const userArea = document.getElementById('userArea');
        if (guestBtns) guestBtns.classList.add('hidden');
        if (userArea) userArea.classList.remove('hidden');
        
        updateAvatarUI(window.currentUser);
        
        // home.html specific updates
        if (typeof updateDownloadBtn === 'function') {
            updateDownloadBtn(true);
        }
        if (typeof updateCommentUI === 'function') {
            updateCommentUI(true);
        }
        
        closeAuth();
    } else {
        window.currentUser = null;
        
        const guestBtns = document.getElementById('guestButtons');
        const userArea = document.getElementById('userArea');
        if (guestBtns) guestBtns.classList.remove('hidden');
        if (userArea) userArea.classList.add('hidden');
        
        // home.html specific updates
        if (typeof updateDownloadBtn === 'function') {
            updateDownloadBtn(false);
        }
        if (typeof updateCommentUI === 'function') {
            updateCommentUI(false);
        }
    }
}

function updateAvatarUI(user) {
    const name = user.displayName || user.username || user.email.split('@')[0];
    const avatar = user.photoURL || `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(name)}&backgroundColor=ffd2aa,fff0df,ffe4c4&shapeColor=ff9f4a,c0714a`;
    
    const avatarImg = document.getElementById('avatarImg');
    const dropdownAvatar = document.getElementById('dropdownAvatar');
    const dropdownName = document.getElementById('dropdownName');
    const dropdownEmail = document.getElementById('dropdownEmail');
    const commentAvatar = document.getElementById('commentAvatar');
    
    if (avatarImg) avatarImg.src = avatar;
    if (dropdownAvatar) dropdownAvatar.src = avatar;
    if (dropdownName) dropdownName.textContent = name;
    if (dropdownEmail) dropdownEmail.textContent = user.email;
    if (commentAvatar) commentAvatar.src = avatar;
}

async function handleEmailAuth() {
    const emailInput = document.getElementById('authEmail');
    const passwordInput = document.getElementById('authPassword');
    const nameInput = document.getElementById('authName');

    if (!emailInput || !passwordInput) return;

    const emailOrUser = emailInput.value.trim();
    const password = passwordInput.value;
    const name = nameInput ? nameInput.value.trim() : '';

    hideAuthError();

    // Client-side Edge Case Validation
    if (window.authMode === 'login') {
        if (!emailOrUser && !password) {
            showAuthError('Please enter your username/email and password.');
            return;
        }
        if (!emailOrUser) {
            showAuthError('Username or email is required.');
            return;
        }
        if (!password) {
            showAuthError('Password is required.');
            return;
        }
    } else { // signup
        if (!emailOrUser && !password && !name) {
            showAuthError('Please fill in all signup fields.');
            return;
        }
        if (!emailOrUser) {
            showAuthError('Email address is required.');
            return;
        }
        if (!emailOrUser.includes('@')) {
            showAuthError('Please enter a valid email address.');
            return;
        }
        if (!name) {
            showAuthError('Username is required.');
            return;
        }
        if (name.length < 3) {
            showAuthError('Username must be at least 3 characters long.');
            return;
        }
        if (!password) {
            showAuthError('Password is required.');
            return;
        }
        if (password.length < 6) {
            showAuthError('Password must be at least 6 characters long.');
            return;
        }
    }

    try {
        let response;
        if (window.authMode === 'login') {
            response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: emailOrUser, password: password })
            });
        } else {
            response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailOrUser, password: password, username: name, displayName: name })
            });
        }

        const data = await response.json();

        if (!response.ok) {
            showAuthError(data.error || 'Authentication failed.');
            return;
        }

        // Login / Signup Success
        localStorage.setItem('currentUser', JSON.stringify(data));
        checkLocalAuth();
        
        if (typeof toast === 'function') {
            toast(window.authMode === 'login' ? 'Logged in successfully!' : 'Signed up successfully!');
        }
    } catch (err) {
        showAuthError('Unable to connect to the authentication server. Please ensure the backend is running.');
    }
}

function toggleAuthMode() {
    window.authMode = window.authMode === 'login' ? 'signup' : 'login';
    const s = window.authMode === 'signup';
    
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    const submitBtn = document.getElementById('authSubmitBtn');
    const toggleText = document.getElementById('authToggleText');
    const nameRow = document.getElementById('authNameRow');
    
    if (title) title.textContent = s ? 'Create account' : 'Welcome back';
    if (subtitle) subtitle.textContent = s ? 'Join the LootYard community' : 'Log in to download and review assets';
    if (submitBtn) submitBtn.textContent = s ? 'Sign up' : 'Log in';
    if (toggleText) {
        toggleText.innerHTML = s 
            ? 'Already have an account? <button onclick="toggleAuthMode()" class="font-bold text-[var(--mango)] hover:underline">Log in</button>' 
            : 'Don\'t have an account? <button onclick="toggleAuthMode()" class="font-bold text-[var(--mango)] hover:underline">Sign up</button>';
    }
    if (nameRow) nameRow.classList.toggle('hidden', !s);
    hideAuthError();
}

function signOut() {
    localStorage.removeItem('currentUser');
    if (typeof window.location !== 'undefined') {
        window.location.reload();
    }
}

function openAuth(m = 'login') {
    const modal = document.getElementById('authModal');
    if (modal) {
        window.authMode = 'login';
        if (m === 'signup') toggleAuthMode();
        modal.classList.add('open');
    } else {
        window.location.href = `home.html?auth=${m}`;
    }
}

function closeAuth() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('open');
}

function showAuthError(m) {
    const e = document.getElementById('authError');
    if (e) {
        e.textContent = m;
        e.classList.remove('hidden');
    }
}

function hideAuthError() {
    const e = document.getElementById('authError');
    if (e) e.classList.add('hidden');
}

function showPortfolio() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
        const user = JSON.parse(userStr);
        window.location.href = 'portfolio.html?creator=' + user.username;
    } else {
        openAuth('login');
    }
}
