// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'var(--primary-color)';
        navbar.style.boxShadow = 'none';
    }
});

// Navbar color and text change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero-section');
    if (!navbar || !hero) return;
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom - 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class to nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Initialize tooltips if Bootstrap is available
if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Add animation class to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-padding');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
        
        if (isVisible) {
            element.classList.add('animate__animated', 'animate__fadeIn');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Image Comparison Slider
const initImageComparison = () => {
    const wrapper = document.querySelector('.comparison-wrapper');
    const handle = document.querySelector('.comparison-handle');
    const thermalImage = document.querySelector('.thermal-image');
    let isDragging = false;
    let startX;
    let handleLeft;

    const updateSlider = (clientX) => {
        const rect = wrapper.getBoundingClientRect();
        let position = (clientX - rect.left) / rect.width * 100;
        
        // Constrain position between 0 and 100
        position = Math.max(0, Math.min(100, position));
        
        // Update handle position
        handle.style.left = `${position}%`;
        
        // Update thermal image clip path
        thermalImage.style.clipPath = `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`;
    };

    const onMouseDown = (e) => {
        isDragging = true;
        startX = e.clientX;
        handleLeft = handle.offsetLeft;
        wrapper.style.cursor = 'grabbing';
        handle.style.cursor = 'grabbing';
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        updateSlider(e.clientX);
    };

    const onMouseUp = () => {
        isDragging = false;
        wrapper.style.cursor = '';
        handle.style.cursor = '';
    };

    const onTouchStart = (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        handleLeft = handle.offsetLeft;
    };

    const onTouchMove = (e) => {
        if (!isDragging) return;
        updateSlider(e.touches[0].clientX);
    };

    const onTouchEnd = () => {
        isDragging = false;
    };

    // Mouse events
    handle.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Touch events
    handle.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);

    // Click on wrapper to move handle
    wrapper.addEventListener('click', (e) => {
        if (e.target === wrapper || e.target === thermalImage) {
            updateSlider(e.clientX);
        }
    });

    // Initialize position
    updateSlider(wrapper.getBoundingClientRect().left + wrapper.offsetWidth / 2);
};

// Initialize image comparison when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initImageComparison();
}); 