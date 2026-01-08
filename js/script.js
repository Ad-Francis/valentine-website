// Valentine Roland Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const quickNav = document.querySelector('.quick-nav');
                const quickNavHeight = quickNav ? quickNav.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight - quickNavHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background change on scroll
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(243, 240, 230, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'rgba(243, 240, 230, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Mobile menu toggle (for future mobile improvements)
    function initMobileMenu() {
        const nav = document.querySelector('.main-navigation');
        const navToggle = document.createElement('button');
        navToggle.classList.add('nav-toggle');
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        navToggle.setAttribute('aria-label', 'Toggle navigation');
        
        // Insert the toggle button
        const headerContent = document.querySelector('.header-content');
        headerContent.appendChild(navToggle);
        
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            this.classList.toggle('nav-open');
            
            // Update icon
            const icon = this.querySelector('i');
            if (this.classList.contains('nav-open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking on a link
        const navLinksInMobile = nav.querySelectorAll('a');
        navLinksInMobile.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('nav-open');
                navToggle.classList.remove('nav-open');
                navToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
    
    // Initialize mobile menu on smaller screens
    if (window.innerWidth <= 768) {
        initMobileMenu();
    }
    
    // Lazy loading for placeholder images (when real images are added)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Call lazy loading function
    lazyLoadImages();
    
    // WhatsApp floating button functionality (based on original site)
    function createWhatsAppButton() {
        const whatsappBtn = document.createElement('div');
        whatsappBtn.innerHTML = `
            <a href="https://wa.me/447823941990?text=Hello! I wanted to ask about" 
               target="_blank" 
               class="whatsapp-float"
               aria-label="Contact on WhatsApp">
                <i class="fab fa-whatsapp"></i>
            </a>
        `;
        
        // Add WhatsApp button styles
        const style = document.createElement('style');
        style.textContent = `
            .whatsapp-float {
                position: fixed;
                width: 60px;
                height: 60px;
                bottom: 40px;
                right: 40px;
                background: linear-gradient(135deg, #D4A017 0%, #B8860B 50%, #9A7209 100%);
                color: white;
                border-radius: 50px;
                text-align: center;
                font-size: 30px;
                box-shadow: 0 4px 12px rgba(184, 134, 11, 0.4);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                text-decoration: none;
            }

            .whatsapp-float:hover {
                background: linear-gradient(135deg, #E4B027 0%, #C8961B 50%, #AA8219 100%);
                color: white;
                transform: scale(1.1);
            }
            
            @media (max-width: 768px) {
                .whatsapp-float {
                    width: 50px;
                    height: 50px;
                    bottom: 20px;
                    right: 20px;
                    font-size: 24px;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(whatsappBtn);
    }
    
    // Create WhatsApp button
    createWhatsAppButton();
    
    // Simple animation on scroll for cards
    function animateOnScroll() {
        const cards = document.querySelectorAll('.music-card');
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        });
    }
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Form validation (for future contact forms)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }
    
    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Initialize any contact forms
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Form is valid, handle submission
                console.log('Form submitted successfully');
                // Here you would typically send the form data to a server
            } else {
                console.log('Form validation failed');
            }
        });
    });
    
});

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Any additional scroll-based functionality can go here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
