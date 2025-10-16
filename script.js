document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });
        document.addEventListener('mouseup', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
    window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('loaded');
    }
});

    // Mobile menu toggle
    const menuButton = document.getElementById('menu-button');
    const closeButton = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    if (menuButton && closeButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.remove('translate-x-full');
        });

        closeButton.addEventListener('click', function() {
            mobileMenu.classList.add('translate-x-full');
        });

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('translate-x-full');
            });
        });
    }

    // Smooth scrolling for anchor links (adjusted for multi-page site)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && window.location.pathname.endsWith('index.html') || window.location.pathname === '/') { // Only smooth scroll on index.html
                e.preventDefault();
                const targetId = href;
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for fixed header
                        behavior: 'smooth'
                    });
                }
            }
            // For other pages, let the browser handle the link naturally
        });
    });

    // Timeline dots hover effect (if any, as it was in the original CSS but not HTML)
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            this.classList.add('scale-125');
        });
        dot.addEventListener('mouseleave', function() {
            this.classList.remove('scale-125');
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // ... (all your existing code for cursor, menu, etc.)

    // --- NEW: BTS Gallery Scroll Logic ---
    const btsContainer = document.getElementById('bts-scroll-container');
    const prevBtn = document.getElementById('bts-prev-btn');
    const nextBtn = document.getElementById('bts-next-btn');

    // Check if these elements exist on the current page before adding listeners
    if (btsContainer && prevBtn && nextBtn) {
        
        const scrollAmount = 424; // Width of one item (400) + gap (24)

        const updateArrowState = () => {
            // Check if we can scroll left
            if (btsContainer.scrollLeft > 0) {
                prevBtn.disabled = false;
                prevBtn.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                prevBtn.disabled = true;
                prevBtn.classList.add('opacity-0', 'pointer-events-none');
            }

            // Check if we can scroll right
            // A small buffer (1) is added to account for potential decimal values
            if (btsContainer.scrollLeft + btsContainer.clientWidth < btsContainer.scrollWidth - 1) {
                nextBtn.disabled = false;
                nextBtn.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                nextBtn.disabled = true;
                nextBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        };

        // Event listener for the "next" button
        nextBtn.addEventListener('click', () => {
            btsContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Event listener for the "previous" button
        prevBtn.addEventListener('click', () => {
            btsContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update the arrow visibility whenever the container is scrolled
        btsContainer.addEventListener('scroll', updateArrowState);

        // Also check on window resize in case the view changes
        window.addEventListener('resize', updateArrowState);

        // Initial check when the page loads
        updateArrowState();
    }
    // --- END: BTS Gallery Scroll Logic ---

});