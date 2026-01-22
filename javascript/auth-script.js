// অথেন্টিকেশন সিস্টেম

// ডেমো ইউজার ডেটা (প্রোডাকশনে এটি ব্যাকএন্ডে থাকবে)
const demoUsers = [
    {
        id: 1,
        email: "student@eehub.com",
        password: "Password123!",
        firstName: "ইলেকট্রিক্যাল",
        lastName: "স্টুডেন্ট",
        phone: "+8801712345678",
        institution: "বুয়েট",
        department: "EEE",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        verified: true,
        role: "student"
    }
];

// লগইন স্ট্যাটাস
let isLoggedIn = false;
let currentUser = null;

// ইনিশিয়ালাইজেশন
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
    checkLoginStatus();
    
    // পেজের উপর ভিত্তি করে ফাংশন কল করুন
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('login.html')) {
        initializeLoginPage();
    } else if (currentPage.includes('signup.html')) {
        initializeSignupPage();
    }
});

// অথেন্টিকেশন সিস্টেম ইনিশিয়ালাইজ
function initializeAuth() {
    // লোকাল স্টোরেজ থেকে লগইন স্ট্যাটাস চেক করুন
    const savedUser = localStorage.getItem('eehub_user');
    const savedToken = localStorage.getItem('eehub_token');
    
    if (savedUser && savedToken) {
        try {
            currentUser = JSON.parse(savedUser);
            isLoggedIn = true;
            updateUIForLogin();
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('eehub_user');
            localStorage.removeItem('eehub_token');
        }
    }
}

function checkLoginStatus() {
    // গ্লোবাল ভ্যারিয়েবল আপডেট করুন
    window.isLoggedIn = isLoggedIn;
    window.currentUser = currentUser;
    
    // নেভিগেশন আপডেট করুন
    updateNavigation();
}

function updateNavigation() {
    const navAuth = document.querySelector('.nav-auth');
    if (!navAuth) return;
    
    if (isLoggedIn && currentUser) {
        navAuth.innerHTML = `
            <div class="user-menu">
                <button class="user-btn" id="userMenuBtn">
                    <i class="fas fa-user-circle"></i>
                    <span>${currentUser.firstName}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="user-dropdown" id="userDropdown">
                    <a href="../profile/index.html" class="dropdown-item">
                        <i class="fas fa-user"></i> প্রোফাইল
                    </a>
                    <a href="../iot-dashboard/index.html" class="dropdown-item">
                        <i class="fas fa-project-diagram"></i> আমার প্রোজেক্ট
                    </a>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item logout-btn" id="logoutBtn">
                        <i class="fas fa-sign-out-alt"></i> লগ আউট
                    </button>
                </div>
            </div>
        `;
        
        initializeUserMenu();
    }
}

function initializeUserMenu() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        
        // ড্রপডাউন বাইরের ক্লিকে বন্ধ করুন
        document.addEventListener('click', function(e) {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
        
        // লগ আউট বাটন
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
    }
}

// লগইন পেজ ইনিশিয়ালাইজ
function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const togglePasswordBtn = document.getElementById('togglePassword');
    
    if (!loginForm) return;
    
    // পাসওয়ার্ড টগল
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const passwordInput = document.getElementById('loginPassword');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    // ফর্ম সাবমিশন
    loginForm.addEventListener('submit', handleLogin);
    
    // ইমেইল ভ্যালিডেশন
    const emailInput = document.getElementById('loginEmail');
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
    }
    
    // পাসওয়ার্ড ভ্যালিডেশন
    const passwordInput = document.getElementById('loginPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', validatePassword);
    }
}

// সাইনআপ পেজ ইনিশিয়ালাইজ
function initializeSignupPage() {
    const signupForm = document.getElementById('signupForm');
    const toggleSignupPasswordBtn = document.getElementById('toggleSignupPassword');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    
    if (!signupForm) return;
    
    // পাসওয়ার্ড টগল
    if (toggleSignupPasswordBtn) {
        toggleSignupPasswordBtn.addEventListener('click', function() {
            const passwordInput = document.getElementById('signupPassword');
            const icon = this.querySelector('i');
            togglePasswordVisibility(passwordInput, icon);
        });
    }
    
    if (toggleConfirmPasswordBtn) {
        toggleConfirmPasswordBtn.addEventListener('click', function() {
            const passwordInput = document.getElementById('confirmPassword');
            const icon = this.querySelector('i');
            togglePasswordVisibility(passwordInput, icon);
        });
    }
    
    // পাসওয়ার্ড শক্তি চেক
    const passwordInput = document.getElementById('signupPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }
    
    // পাসওয়ার্ড নিশ্চিতকরণ
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    }
    
    // ফর্ম সাবমিশন
    signupForm.addEventListener('submit', handleSignup);
    
    // রিয়েল-টাইম ভ্যালিডেশন
    setupRealTimeValidation();
}

// ফাংশনসমূহ
function togglePasswordVisibility(passwordInput, icon) {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function validateEmail() {
    const emailInput = document.getElementById('loginEmail');
    const emailError = document.getElementById('emailError');
    
    if (!emailInput || !emailError) return true;
    
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        emailError.textContent = 'ইমেইল প্রয়োজন';
        emailInput.classList.add('error');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        emailError.textContent = 'সঠিক ইমেইল ঠিকানা দিন';
        emailInput.classList.add('error');
        return false;
    }
    
    emailError.textContent = '';
    emailInput.classList.remove('error');
    return true;
}

function validatePassword() {
    const passwordInput = document.getElementById('loginPassword');
    const passwordError = document.getElementById('passwordError');
    
    if (!passwordInput || !passwordError) return true;
    
    const password = passwordInput.value;
    
    if (!password) {
        passwordError.textContent = 'পাসওয়ার্ড প্রয়োজন';
        passwordInput.classList.add('error');
        return false;
    }
    
    if (password.length < 6) {
        passwordError.textContent = 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে';
        passwordInput.classList.add('error');
        return false;
    }
    
    passwordError.textContent = '';
    passwordInput.classList.remove('error');
    return true;
}

function checkPasswordStrength() {
    const passwordInput = document.getElementById('signupPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    
    if (!passwordInput || !passwordStrength) return;
    
    const password = passwordInput.value;
    let strength = 0;
    let strengthText = '';
    
    // শক্তি পরীক্ষা
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // ক্লাস এবং টেক্সট সেট করুন
    passwordStrength.className = 'password-strength';
    
    if (password.length === 0) {
        passwordStrength.classList.remove('password-weak', 'password-medium', 'password-good', 'password-strong');
        strengthText = 'পাসওয়ার্ড শক্তি';
    } else if (strength <= 2) {
        passwordStrength.classList.add('password-weak');
        strengthText = 'দুর্বল';
    } else if (strength === 3) {
        passwordStrength.classList.add('password-medium');
        strengthText = 'মধ্যম';
    } else if (strength === 4) {
        passwordStrength.classList.add('password-good');
        strengthText = 'ভাল';
    } else {
        passwordStrength.classList.add('password-strong');
        strengthText = 'শক্তিশালী';
    }
    
    // টেক্সট আপডেট করুন
    const strengthTextElement = passwordStrength.querySelector('.strength-text');
    if (strengthTextElement) {
        strengthTextElement.textContent = strengthText;
    }
    
    return strength;
}

function validateConfirmPassword() {
    const passwordInput = document.getElementById('signupPassword');
    const confirmInput = document.getElementById('confirmPassword');
    const confirmError = document.getElementById('confirmPasswordError');
    
    if (!passwordInput || !confirmInput || !confirmError) return true;
    
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;
    
    if (!confirmPassword) {
        confirmError.textContent = 'পাসওয়ার্ড নিশ্চিত করুন';
        confirmInput.classList.add('error');
        return false;
    }
    
    if (password !== confirmPassword) {
        confirmError.textContent = 'পাসওয়ার্ড মিলছে না';
        confirmInput.classList.add('error');
        return false;
    }
    
    confirmError.textContent = '';
    confirmInput.classList.remove('error');
    return true;
}

function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('#signupForm input[required]');
    
    inputs.forEach(input => {
        const errorId = input.id + 'Error';
        const errorElement = document.getElementById(errorId);
        
        if (!errorElement) return;
        
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('error');
                errorElement.textContent = '';
            }
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    const errorId = input.id + 'Error';
    const errorElement = document.getElementById(errorId);
    
    if (!errorElement) return true;
    
    let isValid = true;
    let errorMessage = '';
    
    switch (input.id) {
        case 'firstName':
        case 'lastName':
            if (!value) {
                errorMessage = 'এই ক্ষেত্রটি প্রয়োজন';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'অন্তত ২ অক্ষর প্রয়োজন';
                isValid = false;
            }
            break;
            
        case 'signupEmail':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMessage = 'ইমেইল প্রয়োজন';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                errorMessage = 'সঠিক ইমেইল ঠিকানা দিন';
                isValid = false;
            } else if (checkEmailExists(value)) {
                errorMessage = 'এই ইমেইল ইতিমধ্যে ব্যবহৃত হয়েছে';
                isValid = false;
            }
            break;
            
        case 'signupPassword':
            if (!value) {
                errorMessage = 'পাসওয়ার্ড প্রয়োজন';
                isValid = false;
            } else if (value.length < 6) {
                errorMessage = 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        input.classList.add('error');
        errorElement.textContent = errorMessage;
    } else {
        input.classList.remove('error');
        errorElement.textContent = '';
    }
    
    return isValid;
}

function checkEmailExists(email) {
    // ডেমো চেক - প্রোডাকশনে API কল করতে হবে
    const existingUsers = JSON.parse(localStorage.getItem('eehub_users')) || [];
    return existingUsers.some(user => user.email === email);
}

// লগইন হ্যান্ডলার
async function handleLogin(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const rememberMe = document.getElementById('rememberMe');
    const loginBtn = document.querySelector('#loginForm .btn-auth');
    
    if (!emailInput || !passwordInput || !loginBtn) return;
    
    // ভ্যালিডেশন
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (!isEmailValid || !isPasswordValid) {
        showNotification('সঠিক তথ্য দিন', 'error');
        return;
    }
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // লোডিং স্টেট
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    
    try {
        // ডেমো ডিলে (প্রোডাকশনে API কল)
        await simulateApiCall(1500);
        
        // ডেমো অথেন্টিকেশন (প্রোডাকশনে JWT ইত্যাদি ব্যবহার করুন)
        const user = authenticateUser(email, password);
        
        if (user) {
            // সফল লগইন
            currentUser = user;
            isLoggedIn = true;
            
            // লোকাল স্টোরেজে সংরক্ষণ
            const token = generateToken(user);
            localStorage.setItem('eehub_user', JSON.stringify(user));
            localStorage.setItem('eehub_token', token);
            
            if (rememberMe?.checked) {
                localStorage.setItem('eehub_remember', 'true');
            }
            
            // সফলতা নোটিফিকেশন
            showNotification('সফলভাবে লগইন করা হয়েছে!', 'success');
            
            // রিডাইরেক্ট
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        } else {
            throw new Error('ইমেইল বা পাসওয়ার্ড ভুল');
        }
    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
    }
}

// সাইনআপ হ্যান্ডলার
async function handleSignup(e) {
    e.preventDefault();
    
    const signupForm = document.getElementById('signupForm');
    const termsCheckbox = document.getElementById('terms');
    const signupBtn = document.querySelector('#signupForm .btn-auth');
    
    if (!signupForm || !termsCheckbox || !signupBtn) return;
    
    // সকল ইনপুট ভ্যালিডেশন
    const inputs = signupForm.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    // বিশেষ ভ্যালিডেশন
    const isPasswordStrong = checkPasswordStrength() >= 3;
    const isConfirmValid = validateConfirmPassword();
    
    if (!isPasswordStrong) {
        showNotification('দয়া করে একটি শক্তিশালী পাসওয়ার্ড ব্যবহার করুন', 'warning');
        isValid = false;
    }
    
    if (!isConfirmValid) {
        isValid = false;
    }
    
    if (!termsCheckbox.checked) {
        showNotification('টার্মস অ্যান্ড কন্ডিশনস একসেপ্ট করুন', 'warning');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // লোডিং স্টেট
    signupBtn.classList.add('loading');
    signupBtn.disabled = true;
    
    try {
        // ডেমো ডিলে (প্রোডাকশনে API কল)
        await simulateApiCall(2000);
        
        // নতুন ইউজার ডেটা সংগ্রহ
        const userData = {
            id: Date.now(),
            email: document.getElementById('signupEmail').value.trim(),
            password: document.getElementById('signupPassword').value,
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            institution: document.getElementById('institution').value.trim(),
            department: document.getElementById('department').value.trim(),
            createdAt: new Date().toISOString(),
            verified: false,
            role: 'student',
            newsletter: document.getElementById('newsletter')?.checked || false
        };
        
        // ডেমো স্টোরেজে সংরক্ষণ (প্রোডাকশনে API কল)
        saveUserToStorage(userData);
        
        // সফলতা নোটিফিকেশন
        showNotification('সফলভাবে একাউন্ট তৈরি করা হয়েছে!', 'success');
        
        // অটো লগইন এবং রিডাইরেক্ট
        setTimeout(() => {
            // অটো লগইন
            const token = generateToken(userData);
            localStorage.setItem('eehub_user', JSON.stringify(userData));
            localStorage.setItem('eehub_token', token);
            
            currentUser = userData;
            isLoggedIn = true;
            checkLoginStatus();
            
            window.location.href = '../index.html';
        }, 1500);
        
    } catch (error) {
        showNotification('সাইন আপ ব্যর্থ হয়েছে: ' + error.message, 'error');
    } finally {
        signupBtn.classList.remove('loading');
        signupBtn.disabled = false;
    }
}

// লগ আউট হ্যান্ডলার
function handleLogout() {
    // কনফার্মেশন
    if (confirm('আপনি কি নিশ্চিতভাবে লগ আউট করতে চান?')) {
        // ক্লিয়ার স্টোরেজ
        localStorage.removeItem('eehub_user');
        localStorage.removeItem('eehub_token');
        
        // স্টেট রিসেট
        currentUser = null;
        isLoggedIn = false;
        checkLoginStatus();
        
        // নোটিফিকেশন
        showNotification('সফলভাবে লগ আউট করা হয়েছে', 'success');
        
        // রিডাইরেক্ট
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);
    }
}

// হেল্পার ফাংশন
function authenticateUser(email, password) {
    // ডেমো অথেন্টিকেশন
    const demoUser = demoUsers.find(user => 
        user.email === email && user.password === password
    );
    
    if (demoUser) {
        return {
            ...demoUser,
            lastLogin: new Date().toISOString()
        };
    }
    
    // লোকাল স্টোরেজ থেকে চেক করুন
    const storedUsers = JSON.parse(localStorage.getItem('eehub_users')) || [];
    const user = storedUsers.find(user => user.email === email && user.password === password);
    
    if (user) {
        return {
            ...user,
            lastLogin: new Date().toISOString()
        };
    }
    
    return null;
}

function saveUserToStorage(userData) {
    const storedUsers = JSON.parse(localStorage.getItem('eehub_users')) || [];
    
    // ইমেইল চেক
    if (storedUsers.some(user => user.email === userData.email)) {
        throw new Error('এই ইমেইল ইতিমধ্যে ব্যবহৃত হয়েছে');
    }
    
    // পাসওয়ার্ড হ্যাশ করুন (প্রোডাকশনে bcrypt ব্যবহার করুন)
    const hashedUser = {
        ...userData,
        password: btoa(userData.password) // ডেমো - প্রোডাকশনে হ্যাশ ব্যবহার করুন
    };
    
    storedUsers.push(hashedUser);
    localStorage.setItem('eehub_users', JSON.stringify(storedUsers));
    
    return hashedUser;
}

function generateToken(user) {
    // ডেমো টোকেন - প্রোডাকশনে JWT ব্যবহার করুন
    return btoa(JSON.stringify({
        userId: user.id,
        email: user.email,
        exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 দিন
    }));
}

function verifyToken(token) {
    try {
        const decoded = JSON.parse(atob(token));
        return decoded.exp > Date.now();
    } catch {
        return false;
    }
}

async function simulateApiCall(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

// নোটিফিকেশন সিস্টেম
function showNotification(message, type = 'info') {
    const toast = document.getElementById('notificationToast');
    
    if (!toast) {
        // টোস্ট এলিমেন্ট তৈরি করুন
        const newToast = document.createElement('div');
        newToast.id = 'notificationToast';
        newToast.className = 'notification-toast';
        document.body.appendChild(newToast);
        return showNotification(message, type);
    }
    
    // টোস্ট কন্টেন্ট সেট করুন
    toast.textContent = message;
    toast.className = `notification-toast ${type} show`;
    
    // অটো হাইড
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.textContent = '';
            toast.className = 'notification-toast';
        }, 300);
    }, 3000);
}

// গ্লোবাল এক্সপোজ
window.AuthSystem = {
    login: handleLogin,
    logout: handleLogout,
    signup: handleSignup,
    isLoggedIn: () => isLoggedIn,
    currentUser: () => currentUser,
    checkLoginStatus,
    showNotification
};

// ইউজার মেনু স্টাইলস
const userMenuStyles = `
.user-menu {
    position: relative;
}

.user-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    color: #1e293b;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.user-btn:hover {
    background: #e2e8f0;
    border-color: #cbd5e1;
}

.user-btn i:first-child {
    font-size: 1.5rem;
    color: #667eea;
}

.user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 10px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
}

.user-dropdown.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px 20px;
    color: #475569;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
}

.dropdown-item:hover {
    background: #f8fafc;
    color: #667eea;
}

.dropdown-divider {
    height: 1px;
    background: #e2e8f0;
    margin: 5px 0;
}

.logout-btn {
    color: #ef4444;
}

.logout-btn:hover {
    background: #fef2f2;
    color: #dc2626;
}
`;

// CSS ইনজেক্ট করুন
const userMenuStyleSheet = document.createElement('style');
userMenuStyleSheet.textContent = userMenuStyles;
document.head.appendChild(userMenuStyleSheet);