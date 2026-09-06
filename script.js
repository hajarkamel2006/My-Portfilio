/**
 * Hajar Kamel Mohammed - Portfolio Interactive Features
 * Modern Vanilla JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --------------------------------------------------------------------------
       1. AOS (Animate On Scroll) Initialization
       -------------------------------------------------------------------------- */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 80
        });
    }

    /* --------------------------------------------------------------------------
       2. Dynamic Typing Text Effect
       -------------------------------------------------------------------------- */
    const typedTextElement = document.getElementById('typed-text');
    const roles = [
        'Junior Front-End Developer',
        'Online Web Development Instructor',
        'Python Programming Instructor',
        'Head of Public Relations @ GDSC',
        'IT & AI Student @ EELU'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenRoles = 2000;

    function typeEffect() {
        if (!typedTextElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            currentSpeed = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            currentSpeed = 400;
        }

        setTimeout(typeEffect, currentSpeed);
    }

    typeEffect();

    /* --------------------------------------------------------------------------
       3. Theme Toggle (Dark / Light Mode) with Local Storage
       -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('hajar_portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('hajar_portfolio_theme', newTheme);
        });
    }

    /* --------------------------------------------------------------------------
       4. Sticky Navbar & Active Nav Item Highlight
       -------------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Sticky Navbar background blur
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight Active Nav Link
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Show/Hide Back to Top Button
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    /* --------------------------------------------------------------------------
       5. Mobile Hamburger Drawer Menu
       -------------------------------------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }

    /* --------------------------------------------------------------------------
       6. Project Category Filter
       -------------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* --------------------------------------------------------------------------
       7. Interactive Contact Form Submission
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('user_name').value.trim();
            const email = document.getElementById('user_email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showFeedback('Please fill out all required fields.', 'error');
                return;
            }

            showFeedback(`Thank you, ${name}! Your message has been received.`, 'success');
            contactForm.reset();
        });
    }

    function showFeedback(msg, type) {
        if (!formFeedback) return;
        formFeedback.textContent = msg;
        formFeedback.className = `form-feedback ${type}`;
    }

    /* --------------------------------------------------------------------------
       8. Smooth Scroll for Back to Top Button
       -------------------------------------------------------------------------- */
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* --------------------------------------------------------------------------
       9. Auto-update Current Year in Footer
       -------------------------------------------------------------------------- */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});