// ==================== HAMBURGER MENU TOGGLE ====================

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLL CONFIGURATION ====================

// Enable smooth scroll behavior for all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add appropriate animation classes based on element type
            const element = entry.target;
            
            if (element.classList.contains('service-card')) {
                element.classList.add('fade-in-up', `stagger-${getStaggerIndex(element)}`);
            } else if (element.classList.contains('pricing-card')) {
                element.classList.add('scale-in', `stagger-${getStaggerIndex(element)}`);
            } else if (element.classList.contains('faq-item')) {
                element.classList.add('fade-in-up', `stagger-${getStaggerIndex(element)}`);
            } else if (element.classList.contains('tool-tag')) {
                element.classList.add('fade-in-up', `stagger-${getStaggerIndex(element)}`);
            }
            
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Get stagger index for elements (max 5 for stagger effects)
function getStaggerIndex(element) {
    const parent = element.parentElement;
    if (!parent) return 1;
    
    const children = Array.from(parent.children);
    const index = children.indexOf(element);
    return Math.min(index + 1, 5);
}

// Observe elements for animations
document.addEventListener('DOMContentLoaded', function() {
    // Service cards
    document.querySelectorAll('.service-card').forEach(element => {
        observer.observe(element);
    });

    // Pricing cards
    document.querySelectorAll('.pricing-card').forEach(element => {
        observer.observe(element);
    });

    // FAQ items
    document.querySelectorAll('.faq-item').forEach(element => {
        observer.observe(element);
    });

    // Tool tags
    document.querySelectorAll('.tool-tag').forEach(element => {
        observer.observe(element);
    });

    console.log('✓ VA Profile website loaded with smooth animations!');
});

// ==================== PARALLAX SCROLL EFFECT ====================

window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    // Add subtle shadow effect on scroll
    if (scrollPosition > 10) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }

    // Update active navigation link based on scroll position
    updateActiveNavLink();
});

// ==================== ACTIVE NAVIGATION LINK ====================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href').substring(1); // Remove the #
        if (href === currentSection) {
            link.classList.add('active');
        }
    });
}

// ==================== CONTACT BUTTON FUNCTIONALITY ====================

function contactMe() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('closing');
    
    // Remove modal after animation completes
    setTimeout(() => {
        modal.classList.remove('active', 'closing');
    }, 400);
}

// Close modal when clicking overlay
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const overlay = modal.querySelector('.modal-overlay');
    
    overlay.addEventListener('click', closeContactModal);
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeContactModal();
        }
    });
});

// ==================== SCROLL TO TOP BUTTON ====================

// Create scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTopBtn';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #0056b3;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 99;
        transition: all 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(button);

    // Show button when user scrolls down
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    // Smooth scroll to top when button is clicked
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects
    button.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#004085';
        this.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#0056b3';
        this.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ==================== FORM VALIDATION (IF FORM EXISTS) ====================

const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    });
}

// ==================== ACTIVE NAV LINK INDICATOR ====================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active nav link indicator
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ==================== PERFORMANCE MONITORING ====================

// Log page performance metrics
if (window.performance) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page loaded in: ' + pageLoadTime + 'ms');
    });
}
