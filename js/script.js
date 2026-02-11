// 'use strict';

/**
 * April Mayo Jewelry - Functional Scripts
 * Handles smooth scrolling, form validation, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initHeaderScrollEffect();
    initContactForm();
    initRevealAnimations();
});

/**
 * Implements smooth scrolling for all internal anchor links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Adds a scroll class to header for styling changes on scroll
 */
function initHeaderScrollEffect() {
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            // Inline style fallback if CSS class isn't fully defined via transition
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            header.classList.remove('scrolled');
            header.style.boxShadow = 'none';
        }
    });
}

/**
 * Handles Contact Form Validation and Mock Submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitBtn = this.querySelector('.btn-submit');

            // Basic Validation
            if (!name || !email) {
                alert('Please provide at least your name and email address.');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Mock Submission UI state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending Inquiry...';
            submitBtn.disabled = true;

            // Simulate Network Request
            setTimeout(() => {
                alert(`Thank you, ${name}. Your inquiry has been received. April Mayo will contact you shortly.`);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1800);
        });
    }
}

/**
 * Helper to validate email format
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Reveal elements as they enter the viewport
 */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.project-card, .skill-item');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        // Initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
}