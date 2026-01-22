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
    
    // মোবাইল মেনু আইটেম ক্লিক করলে মেনু বন্ধ করুন
    const mobileItems = mobileMenu.querySelectorAll('.mobile-item');
    mobileItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// নেভিগেশন স্ক্রলে স্টিকি ইফেক্ট
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
    }
});

// অ্যাকটিভ নেভ লিঙ্ক আপডেট
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item, .mobile-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.includes(currentPage)) {
            item.classList.add('active');
        } else if (currentPage === 'index.html' && href === 'index.html') {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// পেজ লোড হওয়ার পরে অ্যাকটিভ নেভ সেট করুন
document.addEventListener('DOMContentLoaded', setActiveNav);

// নোটিফিকেশন সিস্টেম
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // নোটিফিকেশন স্টাইলস
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // বন্ধ বাটন ইভেন্ট
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // অটো রিমুভ
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    document.body.appendChild(notification);
}

// অ্যানিমেশন ক্লাস
const slideInKeyframes = `
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = slideInKeyframes;
document.head.appendChild(styleSheet);

// সাইট কনফিগারেশন
window.siteConfig = {
    name: 'EE Hub',
    version: '1.0.0',
    apiBaseUrl: 'https://api.eehub.com',
    features: {
        rcc: true,
        codeEditor: true,
        iotDashboard: true,
        componentsDatabase: true
    }
};

// লোডিং স্পিনার
function showLoading() {
    const spinner = document.createElement('div');
    spinner.id = 'loading-spinner';
    spinner.innerHTML = `
        <div class="spinner-content">
            <div class="spinner"></div>
            <p>লোড হচ্ছে...</p>
        </div>
    `;
    
    spinner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    document.body.appendChild(spinner);
}

function hideLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// টুলটিপ ফাংশন
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        
        element.addEventListener('mouseenter', (e) => {
            document.body.appendChild(tooltip);
            const rect = element.getBoundingClientRect();
            tooltip.style.cssText = `
                position: fixed;
                background-color: #1e293b;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 1000;
                white-space: nowrap;
                top: ${rect.top - 40}px;
                left: ${rect.left + rect.width/2}px;
                transform: translateX(-50%);
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        });
    });
}

// ডার্ক/লাইট মোড টগল (ভবিষ্যতের জন্য)
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
}

// পেজ লোড হওয়ার পরে সব ফাংশন ইনিশিয়ালাইজ করুন
document.addEventListener('DOMContentLoaded', () => {
    initializeTooltips();
    initializeThemeToggle();
    
    // ডেমো নোটিফিকেশন (ডেভেলপমেন্টের জন্য)
    if (window.location.href.includes('localhost')) {
        setTimeout(() => {
            showNotification('ডেভেলপমেন্ট মোড সক্রিয়', 'info');
        }, 1000);
    }
});

// গ্লোবাল ইউটিলিটি ফাংশন
window.EEHub = {
    showNotification,
    showLoading,
    hideLoading,
    config: window.siteConfig
};