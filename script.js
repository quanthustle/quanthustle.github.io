// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeProgressAnimation();
    initializeFormHandling();
    initializeParallaxEffect();
    initializeTypingEffect();
    initializeRandomFloatingElements();
});

// Progress bar animation
function initializeProgressAnimation() {
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    
    // Animate progress from 0 to 75%
    let currentProgress = 0;
    const targetProgress = 75;
    const duration = 2000; // 2 seconds
    const startTime = Date.now() + 1000; // Start after 1 second delay
    
    function animateProgress() {
        const elapsed = Date.now() - startTime;
        
        if (elapsed < 0) {
            requestAnimationFrame(animateProgress);
            return;
        }
        
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        currentProgress = Math.floor(targetProgress * easeOutQuart);
        
        progressPercentage.textContent = currentProgress + '%';
        
        if (progress < 1) {
            requestAnimationFrame(animateProgress);
        }
    }
    
    requestAnimationFrame(animateProgress);
}

// Form handling
function initializeFormHandling() {
    const form = document.getElementById('notifyForm');
    const inputGroup = form.querySelector('.input-group');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        
        if (email) {
            // Create success message
            showSuccessMessage('Thank you! We\'ll notify you when we launch.');
            
            // Reset form
            form.reset();
            
            // Add some visual feedback
            const button = form.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Subscribed!';
            button.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }
    });
    
    // Input focus effects
    const input = form.querySelector('input');
    input.addEventListener('focus', function() {
        inputGroup.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        inputGroup.style.transform = '';
    });
}

// Success message display
function showSuccessMessage(message) {
    // Remove existing success message if any
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    // Insert after the form
    const form = document.getElementById('notifyForm');
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    
    // Trigger animation
    setTimeout(() => {
        successDiv.classList.add('show');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 300);
    }, 5000);
}

// Parallax effect for floating elements
function initializeParallaxEffect() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Typing effect for the main title
function initializeTypingEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
        
        // Add cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        cursor.style.animation = 'blink 1s infinite';
        line.appendChild(cursor);
        
        // Type each character
        let charIndex = 0;
        const delay = index * 1000 + 500; // Delay between lines
        
        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    line.insertBefore(document.createTextNode(text[charIndex]), cursor);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        if (cursor.parentNode) {
                            cursor.remove();
                        }
                    }, 1000);
                }
            }, 100);
        }, delay);
    });
    
    // Add blinking cursor animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        .typing-cursor {
            color: var(--color-dark-brown);
            font-weight: 300;
        }
    `;
    document.head.appendChild(style);
}

// Random floating elements generation
function initializeRandomFloatingElements() {
    const container = document.querySelector('.background-animation');
    
    // Create additional random floating elements
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createRandomFloatingElement(container);
        }, i * 2000);
    }
    
    // Continue creating elements periodically
    setInterval(() => {
        createRandomFloatingElement(container);
    }, 8000);
}

function createRandomFloatingElement(container) {
    const element = document.createElement('div');
    element.className = 'floating-element random-element';
    
    // Random properties
    const size = Math.random() * 40 + 20; // 20-60px
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + size;
    const duration = Math.random() * 10 + 8; // 8-18 seconds
    const opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4
    
    element.style.width = size + 'px';
    element.style.height = size + 'px';
    element.style.left = startX + 'px';
    element.style.top = startY + 'px';
    element.style.opacity = opacity;
    element.style.animation = `floatUp ${duration}s linear forwards`;
    
    container.appendChild(element);
    
    // Remove element after animation
    setTimeout(() => {
        if (element.parentNode) {
            element.remove();
        }
    }, duration * 1000);
}

// Add floating up animation
const floatUpStyle = document.createElement('style');
floatUpStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        100% {
            transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
        }
    }
`;
document.head.appendChild(floatUpStyle);

// Smooth scrolling for any anchor links (if added later)
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add intersection observer for scroll animations (if content is added later)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that might be added dynamically
document.addEventListener('DOMNodeInserted', function(e) {
    if (e.target.classList && e.target.classList.contains('animate-on-scroll')) {
        observer.observe(e.target);
    }
});

// Performance optimization: Throttle mouse move events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to mouse move events
const originalMouseMove = document.addEventListener;
document.addEventListener = function(type, listener, options) {
    if (type === 'mousemove') {
        listener = throttle(listener, 16); // ~60fps
    }
    originalMouseMove.call(this, type, listener, options);
};

