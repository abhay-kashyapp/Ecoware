// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Toggle hamburger animation
            const hamburger = menuToggle.querySelector('.hamburger');
            if (mainNav.classList.contains('active')) {
                hamburger.style.backgroundColor = 'transparent';
                hamburger.style.setProperty('--after-transform', 'rotate(-45deg)');
                hamburger.style.setProperty('--before-transform', 'rotate(45deg)');
            } else {
                hamburger.style.backgroundColor = 'var(--text-main)';
                hamburger.style.removeProperty('--after-transform');
                hamburger.style.removeProperty('--before-transform');
            }
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Form Validation
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic check
            const companyName = document.getElementById('companyName').value.trim();
            const contactName = document.getElementById('contactName').value.trim();
            const email = document.getElementById('email').value.trim();
            
            if (companyName && contactName && email) {
                // In a real app, this would send an AJAX request to a PHP backend
                alert('Thank you for requesting a quote! We will get back to you shortly.');
                leadForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
});
