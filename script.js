// মোবাইল মেনু টগল
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        // আইকন পরিবর্তন
        const icon = mobileToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // মোবাইল মেনু বন্ধ করার জন্য
    const closeMobileMenu = () => {
        mobileMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    };
    
    // মোবাইল মেনু আইটেম ক্লিক করলে মেনু বন্ধ করুন
    const mobileItems = mobileMenu.querySelectorAll('.mobile-item, .mobile-auth a');
    mobileItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });
    
    // বাইরে ক্লিক করলে মেনু বন্ধ করুন
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// নেভিগেশন স্ক্রলে স্টিকি ইফেক্ট
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// অ্যাকটিভ নেভ লিঙ্ক আপডেট
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item, .mobile-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        // Remove active class from all items
        item.classList.remove('active');
        
        // Add active class to current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (href && href.includes(currentPage.replace('.html', '')))) {
            item.classList.add('active');
        }
    });
    
    // Home page special case
    if (currentPage === 'index.html' || currentPage === '') {
        const homeLinks = document.querySelectorAll('[href="index.html"]');
        homeLinks.forEach(link => link.classList.add('active'));
    }
}

// নোটিফিকেশন সিস্টেম
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icons[type] || 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // বন্ধ বাটন ইভেন্ট
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // অটো রিমুভ (5 সেকেন্ড পর)
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Notification limit (max 3 at a time)
    const notifications = document.querySelectorAll('.notification');
    if (notifications.length > 3) {
        notifications[0].style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notifications[0].remove(), 300);
    }
}

// লোডিং স্পিনার
function showLoading(message = 'লোড হচ্ছে...') {
    const spinner = document.createElement('div');
    spinner.id = 'loading-spinner';
    spinner.innerHTML = `
        <div class="spinner-content">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(spinner);
}

function hideLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.opacity = '0';
        setTimeout(() => spinner.remove(), 300);
    }
}

// টুলটিপ ফাংশন
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            
            element.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', () => {
            if (element.tooltip && element.tooltip.parentNode) {
                element.tooltip.remove();
            }
        });
    });
}

// রিপল এফেক্ট
function initializeRippleEffect() {
    const rippleButtons = document.querySelectorAll('.ripple');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Theme Toggle (Dark/Light Mode)
function initializeThemeToggle() {
    // Check for saved theme or prefer-color-scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
    }
    
    // Create theme toggle button if not exists
    if (!document.getElementById('themeToggle')) {
        const themeToggle = document.createElement('button');
        themeToggle.id = 'themeToggle';
        themeToggle.className = 'btn btn-outline btn-sm';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.marginLeft = '0.5rem';
        
        document.querySelector('.nav-auth')?.appendChild(themeToggle);
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            themeToggle.innerHTML = isDark ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
            
            showNotification(
                isDark ? 'ডার্ক মোড চালু করা হয়েছে' : 'লাইট মোড চালু করা হয়েছে',
                'info'
            );
        });
    }
}

// Form Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// API Handler
async function apiCall(endpoint, method = 'GET', data = null) {
    showLoading('ডাটা লোড হচ্ছে...');
    
    try {
        const response = await fetch(`${window.siteConfig.apiBaseUrl}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null
        });
        
        hideLoading();
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        hideLoading();
        showNotification(`Error: ${error.message}`, 'error');
        console.error('API Call failed:', error);
        throw error;
    }
}

// Site Configuration
window.siteConfig = {
    name: 'EE Engineering Hub',
    version: '2.0.0',
    apiBaseUrl: 'https://api.eehub.com/v1',
    features: {
        rcc: true,
        codeEditor: true,
        iotDashboard: true,
        componentsDatabase: true,
        darkMode: true,
        offlineSupport: true
    },
    developer: {
        name: 'Electrical Engineering Students',
        contact: 'support@eehub.com'
    }
};

// Global EEHub Object
window.EEHub = {
    showNotification,
    showLoading,
    hideLoading,
    apiCall,
    validateEmail,
    validatePassword,
    config: window.siteConfig,
    utils: {
        formatDate: (date) => new Date(date).toLocaleDateString('bn-BD'),
        truncateText: (text, length = 100) => 
            text.length > length ? text.substring(0, length) + '...' : text
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set active navigation
    setActiveNav();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize ripple effects
    initializeRippleEffect();
    
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Add fade-in animation to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Demo notification for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(() => {
            showNotification('ডেভেলপমেন্ট মোডে আপনাকে স্বাগতম!', 'info');
        }, 1000);
    }
    
    console.log(`🎯 ${window.siteConfig.name} v${window.siteConfig.version} loaded successfully!`);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    showNotification('একটি ত্রুটি ঘটেছে। পুনরায় চেষ্টা করুন।', 'error');
});

// Online/Offline detection
window.addEventListener('online', () => {
    showNotification('ইন্টারনেট সংযোগ পুনরুদ্ধার হয়েছে', 'success');
});

window.addEventListener('offline', () => {
    showNotification('ইন্টারনেট সংযোগ বিচ্ছিন্ন হয়েছে', 'warning');
});