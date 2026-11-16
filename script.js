/**
 * PORTFOLIO WEBSITE - JAVASCRIPT
 * ========================================
 * Contains all interactive functionality:
 * - Navbar scroll effect
 * - Typing animation
 * - Scroll reveal animations
 * - Skill progress bars
 * - Project filtering
 * - Form validation
 * - Back to top
 * - Modal functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavbar();
    initTypingAnimation();
    initScrollReveal();
    initSkillProgress();
    initProjectFiltering();
    initFormValidation();
    initBackToTop();
    initCounters();
    initModal();
});

/**
 * ========================================
 * NAVBAR SCROLL EFFECT
 * ========================================
 * Changes navbar background on scroll
 * Highlights active link based on scroll position
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll event - change navbar background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
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

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

    /**
     * ========================================
     * TYPING ANIMATION
     * ========================================
     * Creates a typewriter effect for hero text
     */
    function initTypingAnimation() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const phrases = ['Jalaluddin Kamil', 'Creative Developer', 'UI/UX Designer', 'English Instractor'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before next word
            }

            setTimeout(type, typingSpeed);
        }

        // Start typing after initial delay
        setTimeout(type, 1000);
    }

/**
 * ========================================
 * SCROLL REVEAL ANIMATIONS
 * ========================================
 * Uses Intersection Observer for scroll-triggered animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * ========================================
 * SKILL PROGRESS ANIMATION
 * ========================================
 * Animates progress bars when skill cards come into view
 */
function initSkillProgress() {
    const skillCards = document.querySelectorAll('.skill-card');
    const progressBars = document.querySelectorAll('.progress-bar');

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    setTimeout(() => {
                        progressBar.style.width = progress + '%';
                        progressBar.classList.add('animated');
                    }, 300);
                }
                progressObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    skillCards.forEach(card => progressObserver.observe(card));
}

/**
 * ========================================
 * PROJECT FILTERING
 * ========================================
 * Filters projects by category with smooth animations
 */
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filter projects
            projectItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                    item.style.animationDelay = (index * 0.1) + 's';
                } else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            });
        });
    });
}

/**
 * ========================================
 * FORM VALIDATION
 * ========================================
 * Validates contact form with floating labels
 */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Reset errors
        clearErrors();

        // Validate fields
        let isValid = true;

        // Name validation
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError('name', 'Please enter your name');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }

        // Email validation
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError('email', 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        }

        // Subject validation
        const subject = document.getElementById('subject');
        if (!subject.value.trim()) {
            showError('subject', 'Please enter a subject');
            isValid = false;
        }

        // Message validation
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError('message', 'Please enter your message');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            submitBtn.classList.add('loading');
            
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                submitBtn.querySelector('.btn-text').textContent = 'Message Sent!';
                
                // Reset form after success
                setTimeout(() => {
                    form.reset();
                    submitBtn.classList.remove('success');
                    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
                }, 3000);
            }, 2000);
        }
    });

    // Real-time validation on input
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearFieldError(this.id);
        });
    });
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const input = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = message;
    }
    if (input) {
        input.style.borderColor = '#ef4444';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    const inputs = document.querySelectorAll('.form-control');
    
    errorElements.forEach(el => el.textContent = '');
    inputs.forEach(el => el.style.borderColor = '');
}

function clearFieldError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const input = document.getElementById(fieldId);
    
    if (errorElement) errorElement.textContent = '';
    if (input) input.style.borderColor = '';
}

/**
 * ========================================
 * BACK TO TOP BUTTON
 * ========================================
 * Shows/hides back-to-top button based on scroll
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * ========================================
 * COUNTER ANIMATION
 * ========================================
 * Animates numbers in hero stats section
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => counterObserver.observe(counter));
}

/**
 * ========================================
 * PROJECT MODAL
 * ========================================
 * Loads project details dynamically in modal
 */
function initModal() {
    const modalBtns = document.querySelectorAll('[data-bs-toggle="modal"]');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');

    // Project data
    const projectsData = {
        ecommerce: {
            title: 'E-Commerce Platform',
            category: 'Web Application',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
            description: 'A full-stack e-commerce platform featuring user authentication, shopping cart, payment integration, order management, and an admin dashboard for inventory management.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
            liveLink: '#',
            codeLink: '#'
        },
        finance: {
            title: 'Finance Dashboard',
            category: 'UI/UX Design',
            image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop',
            description: 'A modern finance dashboard design featuring real-time data visualization, expense tracking, budget management, and intuitive user experience.',
            tech: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
            liveLink: '#',
            codeLink: '#'
        },
        fitness: {
            title: 'Fitness App',
            category: 'Mobile Application',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
            description: 'A cross-platform fitness tracking application with workout plans, progress tracking, social features, and integration with wearable devices.',
            tech: ['React Native', 'Firebase', 'Health API', 'Redux'],
            liveLink: '#',
            codeLink: '#'
        },
        analytics: {
            title: 'Analytics Platform',
            category: 'Web Application',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
            description: 'A powerful analytics dashboard for visualizing complex data sets with interactive charts, real-time updates, and customizable reports.',
            tech: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
            liveLink: '#',
            codeLink: '#'
        },
        brand: {
            title: 'Brand Identity',
            category: 'Design',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=500&fit=crop',
            description: 'Complete brand identity redesign including logo, color palette, typography, brand guidelines, and marketing materials.',
            tech: ['Branding', 'Logo Design', 'Brand Strategy', 'Adobe Creative Suite'],
            liveLink: '#',
            codeLink: '#'
        },
        food: {
            title: 'Food Delivery App',
            category: 'Mobile Application',
            image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=500&fit=crop',
            description: 'A comprehensive food delivery application with restaurant browsing, menu management, real-time order tracking, and delivery driver integration.',
            tech: ['Flutter', 'Node.js', 'MongoDB', 'Google Maps API'],
            liveLink: '#',
            codeLink: '#'
        }
    };

    modalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectKey = this.getAttribute('data-project');
            const project = projectsData[projectKey];

            if (project) {
                modalBody.innerHTML = `
                    <img src="${project.image}" alt="${project.title}" class="modal-project-image">
                    <span class="modal-project-category">${project.category}</span>
                    <h2 class="modal-project-title">${project.title}</h2>
                    <p class="modal-project-description">${project.description}</p>
                    <div class="modal-project-tech">
                        ${project.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                    <div class="modal-project-links">
                        <a href="${project.liveLink}" class="btn-modal-link primary" target="_blank">
                            <i class="bi bi-globe"></i> Live Demo
                        </a>
                        <a href="${project.codeLink}" class="btn-modal-link secondary" target="_blank">
                            <i class="bi bi-github"></i> View Code
                        </a>
                    </div>
                `;
            }
        });
    });
}

/**
 * ========================================
 * ADDITIONAL HELPER FUNCTIONS
 * ========================================
 */

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for resize events
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
    };
}
