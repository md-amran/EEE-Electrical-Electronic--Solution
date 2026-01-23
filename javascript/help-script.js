// help-script.js
// হেল্প সেকশনের জন্য JavaScript ফাইল

document.addEventListener('DOMContentLoaded', function() {
    // DOM এলিমেন্ট সিলেক্ট করুন
    const searchInput = document.getElementById('helpSearch');
    const searchResults = document.getElementById('searchResults');
    const allFaqItems = document.querySelectorAll('.faq-item');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const feedbackForm = document.getElementById('feedbackForm');
    const contactForm = document.getElementById('contactForm');
    const printButton = document.getElementById('printHelp');
    const backToTop = document.getElementById('backToTop');
    
    // ১. সার্চ ফাংশনালিটি
    if (searchInput && searchResults) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(performSearch, 300);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            
            if (query.length === 0) {
                searchResults.style.display = 'none';
                showAllFaqItems();
                return;
            }
            
            const results = [];
            
            // FAQ আইটেম সার্চ
            allFaqItems.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                const category = item.dataset.category || '';
                
                let relevance = 0;
                
                if (question.includes(query)) relevance += 3;
                if (answer.includes(query)) relevance += 2;
                if (category.includes(query)) relevance += 1;
                
                if (relevance > 0) {
                    results.push({
                        element: item,
                        relevance: relevance,
                        question: question
                    });
                }
                
                // হাইলাইট টেক্সট
                highlightText(item, query);
            });
            
            // রিলেভেন্স অনুযায়ী সাজানো
            results.sort((a, b) => b.relevance - a.relevance);
            
            // ফলাফল দেখানো
            if (results.length > 0) {
                showSearchResults(results, query);
                hideNonMatchingItems(results);
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>"${query}" এর জন্য কোন ফলাফল পাওয়া যায়নি</p>
                        <button class="btn btn-secondary" id="resetSearch">সকল FAQ দেখুন</button>
                    </div>
                `;
                searchResults.style.display = 'block';
                
                document.getElementById('resetSearch')?.addEventListener('click', () => {
                    searchInput.value = '';
                    searchResults.style.display = 'none';
                    showAllFaqItems();
                    removeHighlights();
                });
            }
        }
        
        function showSearchResults(results, query) {
            searchResults.innerHTML = `
                <div class="search-results-header">
                    <h4>"${query}" এর জন্য ${results.length}টি ফলাফল পাওয়া গেছে</h4>
                    <button class="btn btn-sm btn-outline" id="closeResults">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="results-list">
                    ${results.map((result, index) => `
                        <div class="result-item" data-index="${index}">
                            <h5>${escapeHtml(result.element.querySelector('.faq-question').textContent)}</h5>
                            <p>${escapeHtml(result.element.querySelector('.faq-answer').textContent.substring(0, 100))}...</p>
                            <small>প্রাসঙ্গিকতা: ${'★'.repeat(result.relevance)}</small>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // রেজাল্ট আইটেম ক্লিক হ্যান্ডলার
            searchResults.querySelectorAll('.result-item').forEach(item => {
                item.addEventListener('click', function() {
                    const index = this.dataset.index;
                    const targetItem = results[index].element;
                    
                    // আইটেম খুলুন
                    if (!targetItem.classList.contains('active')) {
                        targetItem.querySelector('.faq-question').click();
                    }
                    
                    // স্ক্রল টু এলিমেন্ট
                    targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // হাইলাইট ইফেক্ট
                    targetItem.classList.add('highlight');
                    setTimeout(() => {
                        targetItem.classList.remove('highlight');
                    }, 2000);
                    
                    searchResults.style.display = 'none';
                });
            });
            
            document.getElementById('closeResults')?.addEventListener('click', () => {
                searchResults.style.display = 'none';
            });
        }
        
        function highlightText(element, query) {
            const textNodes = getTextNodes(element);
            
            textNodes.forEach(node => {
                const parent = node.parentNode;
                if (parent.classList && parent.classList.contains('highlighted')) {
                    return;
                }
                
                const text = node.textContent;
                const regex = new RegExp(`(${query})`, 'gi');
                const newText = text.replace(regex, '<span class="highlighted">$1</span>');
                
                if (newText !== text) {
                    const newSpan = document.createElement('span');
                    newSpan.innerHTML = newText;
                    parent.replaceChild(newSpan, node);
                }
            });
        }
        
        function removeHighlights() {
            document.querySelectorAll('.highlighted').forEach(el => {
                const parent = el.parentNode;
                parent.replaceWith(parent.textContent);
            });
        }
        
        function getTextNodes(node) {
            const textNodes = [];
            
            function traverse(node) {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                    textNodes.push(node);
                } else {
                    for (const child of node.childNodes) {
                        traverse(child);
                    }
                }
            }
            
            traverse(node);
            return textNodes;
        }
        
        function hideNonMatchingItems(matchingItems) {
            allFaqItems.forEach(item => {
                item.style.display = 'none';
            });
            
            matchingItems.forEach(result => {
                result.element.style.display = 'block';
            });
        }
        
        function showAllFaqItems() {
            allFaqItems.forEach(item => {
                item.style.display = 'block';
                item.style.opacity = '1';
            });
        }
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }
    
    // ২. FAQ টগল ফাংশনালিটি
    allFaqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // সব আইটেম বন্ধ করুন
                allFaqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-icon').textContent = '+';
                });
                
                // যদি একটিভ না থাকে, তাহলে খুলুন
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    if (icon) icon.textContent = '−';
                }
            });
        }
    });
    
    // ৩. ডার্ক/লাইট মোড টগল
    if (darkModeToggle) {
        // চেক লোকাল স্টোরেজ
        const savedTheme = localStorage.getItem('helpTheme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> লাইট মোড';
        }
        
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> লাইট মোড';
                localStorage.setItem('helpTheme', 'dark');
            } else {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> ডার্ক মোড';
                localStorage.setItem('helpTheme', 'light');
            }
        });
    }
    
    // ৪. ফিডব্যাক ফর্ম হ্যান্ডলিং
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const feedback = {
                rating: formData.get('rating'),
                comment: formData.get('comment'),
                timestamp: new Date().toISOString()
            };
            
            // লোকাল স্টোরেজে সেভ করুন (প্রোডাকশনে সার্ভারে পাঠাবেন)
            saveFeedback(feedback);
            
            // কনফার্মেশন মেসেজ
            showNotification('ফিডব্যাক পাঠানো হয়েছে! ধন্যবাদ', 'success');
            
            // ফর্ম রিসেট
            this.reset();
            document.querySelectorAll('.star-rating .star').forEach(star => {
                star.classList.remove('active');
            });
        });
        
        // স্টার রেটিং
        const starRating = document.querySelector('.star-rating');
        if (starRating) {
            const stars = starRating.querySelectorAll('.star');
            let currentRating = 0;
            
            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    currentRating = index + 1;
                    updateStars(currentRating);
                    document.querySelector('input[name="rating"]').value = currentRating;
                });
                
                star.addEventListener('mouseover', () => {
                    updateStars(index + 1);
                });
            });
            
            starRating.addEventListener('mouseleave', () => {
                updateStars(currentRating);
            });
            
            function updateStars(rating) {
                stars.forEach((star, index) => {
                    if (index < rating) {
                        star.classList.add('active');
                    } else {
                        star.classList.remove('active');
                    }
                });
            }
        }
    }
    
    // ৫. কন্টাক্ট ফর্ম হ্যান্ডলিং
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const contactData = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
            };
            
            // ভ্যালিডেশন
            if (!validateEmail(contactData.email)) {
                showNotification('দয়া করে একটি বৈধ ইমেইল ঠিকানা লিখুন', 'error');
                return;
            }
            
            if (contactData.message.length < 10) {
                showNotification('বার্তাটি খুব সংক্ষিপ্ত। দয়া করে বিস্তারিত লিখুন', 'error');
                return;
            }
            
            // লোকাল স্টোরেজে সেভ করুন
            saveContactMessage(contactData);
            
            // কনফার্মেশন মেসেজ
            showNotification('বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব', 'success');
            
            // ফর্ম রিসেট
            this.reset();
        });
    }
    
    // ৬. প্রিন্ট বাটন
    if (printButton) {
        printButton.addEventListener('click', () => {
            const printContent = document.querySelector('.help-content').innerHTML;
            const originalContent = document.body.innerHTML;
            
            document.body.innerHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>ইইই সলিউশন - হেল্প</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { color: #333; border-bottom: 2px solid #007bff; }
                        .faq-item { margin-bottom: 15px; border: 1px solid #ddd; padding: 10px; }
                        .faq-question { font-weight: bold; color: #007bff; }
                        .no-print { display: none; }
                        @media print {
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    <h1>ইইই ইলেকট্রিক্যাল ইলেকট্রনিক সলিউশন - হেল্প</h1>
                    <p>প্রিন্টের তারিখ: ${new Date().toLocaleDateString('bn-BD')}</p>
                    ${printContent}
                </body>
                </html>
            `;
            
            window.print();
            document.body.innerHTML = originalContent;
            location.reload();
        });
    }
    
    // ৭. ব্যাক টু টপ বাটন
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ৮. হেল্পফুল ফাংশন
    function saveFeedback(feedback) {
        let allFeedback = JSON.parse(localStorage.getItem('helpFeedback')) || [];
        allFeedback.push(feedback);
        localStorage.setItem('helpFeedback', JSON.stringify(allFeedback));
    }
    
    function saveContactMessage(contactData) {
        let allMessages = JSON.parse(localStorage.getItem('helpContacts')) || [];
        allMessages.push(contactData);
        localStorage.setItem('helpContacts', JSON.stringify(allMessages));
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // নোটিফিকেশন এলিমেন্ট তৈরি করুন
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // বডিতে অ্যাপেন্ড করুন
        document.body.appendChild(notification);
        
        // অটো রিমুভ
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
        
        // ক্লোজ বাটন
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
    
    // ৯. ক্যাটেগরি ফিল্টার (যদি থাকে)
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            
            allFaqItems.forEach(item => {
                if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
    
    // ১০. ইনিশিয়াল অ্যানিমেশন
    setTimeout(() => {
        document.querySelectorAll('.faq-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 50);
        });
    }, 100);
});

// গ্লোবাল হেল্প ফাংশন (যদি অন্য ফাইল থেকে এক্সেস দরকার)
window.HelpModule = {
    searchHelp: function(query) {
        const searchInput = document.getElementById('helpSearch');
        if (searchInput) {
            searchInput.value = query;
            searchInput.dispatchEvent(new Event('input'));
        }
    },
    
    openFaq: function(index) {
        const faqItems = document.querySelectorAll('.faq-item');
        if (faqItems[index]) {
            faqItems[index].querySelector('.faq-question').click();
            faqItems[index].scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    submitFeedback: function(rating, comment) {
        // সরাসরি ফিডব্যাক সাবমিটের জন্য
        const feedback = { rating, comment, timestamp: new Date().toISOString() };
        let allFeedback = JSON.parse(localStorage.getItem('helpFeedback')) || [];
        allFeedback.push(feedback);
        localStorage.setItem('helpFeedback', JSON.stringify(allFeedback));
        return true;
    }
};