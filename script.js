/**
 * Little Joys Gummies Landing Page
 * JavaScript with Premium Visual Enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initPageLoader();
    initScrollProgress();
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initFadeAnimations();
    initFAQ();
    initIngredientsTabs();
    initReviewsCarousel();
    initParallax();
    init3DTilt();
    initCountUp();
    initFloatingParticles();
    initConfetti();
    initMagneticButtons();
    initSearch();
    initLabModal();
    initDosageCalculator();
});

/**
 * Page Loader - Hides after content loads
 */
function initPageLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    // Hide loader after content is ready (use window.onload for assets)
    const hideLoader = () => {
        loader.classList.add('loaded');
    };

    // Use window.onload to ensure images/assets are ready, with a minimum delay
    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 500);
    } else {
        window.addEventListener('load', () => {
            setTimeout(hideLoader, 500);
        });
    }

    // Fallback: force hide after max 3 seconds in case load event doesn't fire
    setTimeout(hideLoader, 3000);

    // Remove from DOM after transition
    loader.addEventListener('transitionend', () => {
        if (loader.classList.contains('loaded')) {
            loader.style.display = 'none';
        }
    });
}

/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

/**
 * Sticky Header with scroll detection
 */
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

    if (!menuBtn || !mobileNav) return;

    menuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Fade-in animations on scroll using Intersection Observer
 */
function initFadeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const parent = entry.target.closest('.benefits-grid, .ingredients-grid, .steps-container');
                const delay = parent ? Array.from(parent.children).indexOf(entry.target) * 100 : 0;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
}

/**
 * FAQ Accordion functionality
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Ingredients Tab switching
 */
function initIngredientsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('tab-active'));
            btn.classList.add('tab-active');

            tabContents.forEach(content => {
                content.classList.remove('tab-content-active');
                if (content.id === tabId) {
                    content.classList.add('tab-content-active');

                    const fadeItems = content.querySelectorAll('.fade-in');
                    fadeItems.forEach((item, index) => {
                        item.classList.remove('visible');
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        });
    });
}

/**
 * Reviews Carousel
 */
function initReviewsCarousel() {
    const track = document.getElementById('reviews-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.review-card');
    const cardWidth = 350 + 24;
    const visibleCards = Math.floor(track.parentElement.offsetWidth / cardWidth) || 1;
    const maxIndex = Math.max(0, cards.length - visibleCards);
    let currentIndex = 0;

    function updateCarousel() {
        const offset = currentIndex * cardWidth;
        track.style.transform = `translateX(-${offset}px)`;
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (diff > 50 && currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        } else if (diff < -50 && currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }, { passive: true });

    updateCarousel();
    window.addEventListener('resize', updateCarousel);
}

/**
 * Parallax effect for blob shapes
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-shape');
    if (parallaxElements.length === 0) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                parallaxElements.forEach((el, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const yPos = scrollY * speed;
                    el.style.transform = `translateY(${yPos}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * 3D Tilt effect on cards
 */
function init3DTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}

/**
 * Count-up animation for numbers
 */
function initCountUp() {
    const countElements = document.querySelectorAll('.count-up');

    // Immediately show target values to avoid showing 0
    countElements.forEach(el => {
        const target = parseInt(el.dataset.target);
        if (target) {
            el.textContent = target.toLocaleString();
        }
    });

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function for smooth animation
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(start + (target - start) * easeOutQuart);

                    // Format number with commas
                    el.textContent = current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        el.textContent = target.toLocaleString();
                        el.classList.add('counting');
                        setTimeout(() => el.classList.remove('counting'), 300);
                    }
                }

                requestAnimationFrame(updateCount);
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    countElements.forEach(el => observer.observe(el));
}

/**
 * Floating particles in background
 */
function initFloatingParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particles = ['🍓', '🍊', '🍋', '💊', '🌿', '✨', '💪', '🛡️'];
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 2000);
    }

    function createParticle() {
        const particle = document.createElement('span');
        particle.className = 'particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.fontSize = `${1 + Math.random() * 1}rem`;

        container.appendChild(particle);

        // Remove and recreate after animation
        particle.addEventListener('animationend', () => {
            particle.remove();
            createParticle();
        });
    }
}

/**
 * Confetti effect on CTA click
 */
function initConfetti() {
    const container = document.getElementById('confetti-container');
    const ctaButtons = document.querySelectorAll('.btn-primary');

    if (!container) return;

    const colors = ['#FF6B8A', '#FF9F43', '#FFD93D', '#4CAF50', '#9B59B6'];

    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            createConfetti(x, y);
        });
    });

    function createConfetti(x, y) {
        const confettiCount = 30;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.background = color;
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;

            const angle = (Math.random() * 360) * (Math.PI / 180);
            const velocity = 5 + Math.random() * 10;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            confetti.style.setProperty('--vx', `${vx * 50}px`);
            confetti.style.setProperty('--vy', `${vy * 50}px`);
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.width = `${5 + Math.random() * 10}px`;
            confetti.style.height = `${5 + Math.random() * 10}px`;

            container.appendChild(confetti);

            // Trigger animation
            requestAnimationFrame(() => {
                confetti.classList.add('active');
                confetti.style.transform = `translate(${vx * 50}px, ${vy * 50}px) rotate(${Math.random() * 720}deg)`;
            });

            // Remove after animation
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }
}

/**
 * Magnetic button effect
 */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.btn-primary');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Pill/Variant selector
 */
document.querySelectorAll('.variant-pills').forEach(group => {
    const pills = group.querySelectorAll('.pill');

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => {
                p.classList.remove('pill-active');
                p.classList.add('pill-muted');
            });
            pill.classList.remove('pill-muted');
            pill.classList.add('pill-active');
        });
    });
});

/**
 * Search Overlay Logic
 */
function initSearch() {
    const trigger = document.getElementById('search-trigger');
    const overlay = document.getElementById('search-overlay');
    const closeBtn = document.getElementById('close-search');

    if (!trigger || !overlay || !closeBtn) return;

    trigger.addEventListener('click', () => {
        overlay.classList.add('active');
        const input = overlay.querySelector('.search-input');
        if (input) setTimeout(() => input.focus(), 100);
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
}

/**
 * Lab Report Modal Logic
 */
function initLabModal() {
    const modal = document.getElementById('lab-modal');
    const closeBtn = document.getElementById('close-lab-modal');

    if (!modal || !closeBtn) return;

    // Get all lab certificate triggers
    const labTriggers = document.querySelectorAll('.trust-cert-link');

    labTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Dosage Calculator Logic
 */
function initDosageCalculator() {
    const slider = document.getElementById('age-slider');
    const ageDisplay = document.getElementById('age-display');
    const dosageResult = document.getElementById('dosage-result');

    if (!slider || !ageDisplay || !dosageResult) return;

    function updateDosage() {
        const age = parseInt(slider.value);
        ageDisplay.textContent = `${age} years`;

        let dosage = "1 Gummy / Day";
        if (age >= 10) {
            dosage = "1-2 Gummies / Day";
        }

        dosageResult.textContent = dosage;

        // Visual flair - highlight update
        dosageResult.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.1)' },
            { transform: 'scale(1)' }
        ], {
            duration: 200
        });
    }

    slider.addEventListener('input', updateDosage);
}

/**
 * Dynamic Pricing Logic for Variants
 */
// Modify existing pill selector to update price
document.querySelectorAll('.variant-pills').forEach(group => {
    const pills = group.querySelectorAll('.pill');

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Existing logic
            pills.forEach(p => {
                p.classList.remove('pill-active');
                p.classList.add('pill-muted');
            });
            pill.classList.remove('pill-muted');
            pill.classList.add('pill-active');

            // New logic: Check if this is the pack size group
            const text = pill.textContent;
            const priceDisplay = document.querySelector('.final-cta-price .price');
            const detailDisplay = document.querySelector('.final-cta-price .price-details');
            const headerBtn = document.querySelector('.header-cta');

            if (text.includes('30 N')) {
                if (priceDisplay) priceDisplay.textContent = '₹499';
                if (detailDisplay) detailDisplay.textContent = '30 Gummies · 30 Days Pack';
                if (headerBtn) headerBtn.textContent = 'Buy Now';
            } else if (text.includes('60 N')) {
                if (priceDisplay) priceDisplay.textContent = '₹899';
                if (detailDisplay) detailDisplay.textContent = '60 Gummies · 60 Days Pack (Save ₹100)';
                if (headerBtn) headerBtn.textContent = 'Buy Now - ₹899';
            }
        });
    });
});
