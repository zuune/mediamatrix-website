async function loadSection(sectionName, containerId) {
    try {
        const timestamp = new Date().getTime();
        const response = await fetch(`sections/${sectionName}.html?v=${timestamp}`);
        if (!response.ok) throw new Error(`Failed to load ${sectionName}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        console.log(`✓ Loaded section: ${sectionName}`);
    } catch (error) {
        console.error(`✗ Error loading section ${sectionName}:`, error);
    }
}

// Load all sections when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('Loading sections...');
        await Promise.all([
            loadSection('hero', 'hero-section'),
            loadSection('optimize', 'optimize-section'),
            loadSection('about', 'about-section'),
            loadSection('clients', 'clients-section'),
            loadSection('results', 'results-section'),
            loadSection('certificate', 'certificate-section'),
            loadSection('contact', 'contact-section')
        ]);
        console.log('All sections loaded successfully');
        
        setTimeout(() => {
            initCertificateAnimations();
            initSmoothScroll();
            initScrollAnimations();
            initMagneticHover();
            initParallaxEffects();
        }, 100);
    } catch (error) {
        console.error('Error loading sections:', error);
    }
});

function initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (!href || href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(href);
            }
        });
    });
}

function updateActiveNavLink(activeHref) {
    const navLinks = document.querySelectorAll('.smooth-scroll');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === activeHref) {
            link.classList.remove('text-gray-500');
            link.classList.add('text-gray-900', 'font-medium');
        } else {
            link.classList.remove('text-gray-900', 'font-medium');
            link.classList.add('text-gray-500');
        }
    });
}

window.addEventListener('scroll', () => {
    const sections = ['hero', 'optimize', 'about', 'clients', 'results', 'certificate', 'contact'];
    let currentSection = '';
    
    sections.forEach(section => {
        const element = document.getElementById(`${section}-section`);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = `#${section}-section`;
            }
        }
    });
    
    if (currentSection) {
        updateActiveNavLink(currentSection);
    }
});

function copyEmail() {
    const email = 'transerydesign@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const toast = document.createElement('div');
        toast.textContent = 'Email copied to clipboard';
        toast.style.cssText = 'position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: #000; color: #fff; padding: 12px 24px; border-radius: 50px; font-size: 14px; z-index: 1000; animation: fadeInUp 0.3s ease-out;';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function initCertificateAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const certificateHeader = document.querySelector('.certificate-header');
    const certificateCards = document.querySelectorAll('.certificate-card');
    const certificateLines = document.querySelector('.certificate-lines');
    const certificateCta = document.querySelector('.certificate-cta');

    if (certificateHeader) observer.observe(certificateHeader);
    if (certificateLines) observer.observe(certificateLines);
    if (certificateCta) observer.observe(certificateCta);

    certificateCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Only add animation class, don't hide elements
                entry.target.classList.add('animate-slide-in-up');
                // Ensure element is visible
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all stagger animation elements
    const staggerElements = document.querySelectorAll('.stagger-animation > *');
    staggerElements.forEach((element, index) => {
        // Ensure elements are visible by default
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    // Observe other elements that need scroll animations
    const animatedElements = document.querySelectorAll('.hover-lift, .hover-scale, .hover-rotate');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function initMagneticHover() {
    const magneticElements = document.querySelectorAll('.magnetic-hover');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;
            
            if (distance < maxDistance) {
                const moveX = (x / maxDistance) * 10;
                const moveY = (y / maxDistance) * 10;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });
}

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.animate-float, .animate-float-delayed, .animate-float-slow');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index % 3) * 0.1 + 0.1;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Enhanced hover effects
function initEnhancedHoverEffects() {
    const hoverElements = document.querySelectorAll('.hover-lift, .hover-scale, .hover-rotate');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)';
        });
    });
}

// Initialize enhanced hover effects
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initEnhancedHoverEffects, 200);
});

// Enhanced Interactive Features
function initCounterAnimations() {
    const counters = document.querySelectorAll('.gradient-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (element.textContent.includes('+') || element.textContent.includes('%')) {
                    element.classList.add('counter-animation');
                }
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function initInteractiveCards() {
    const cards = document.querySelectorAll('.hover-lift, .hover-scale');
    
    cards.forEach(card => {
        card.classList.add('interactive-card');
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initParticleBackground() {
    const sections = document.querySelectorAll('.floating-elements');
    
    sections.forEach(section => {
        section.classList.add('particle-bg');
    });
}

function initTextReveal() {
    const textElements = document.querySelectorAll('h1, h2, h3');
    
    textElements.forEach(element => {
        element.classList.add('text-reveal');
    });
}

function initBounceInAnimations() {
    const elements = document.querySelectorAll('.stagger-animation > *');
    
    elements.forEach((element, index) => {
        // Ensure elements are visible
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('bounce-in');
    });
}

function initWiggleEffect() {
    const buttons = document.querySelectorAll('a[href="#contact-section"]');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('wiggle');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('wiggle');
        });
    });
}

function initGlowEffects() {
    const glowElements = document.querySelectorAll('.neon-glow-hover');
    
    glowElements.forEach(element => {
        element.classList.add('glow-effect');
    });
}

// Enhanced scroll animations
function initAdvancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-in-up');
                
                // Add special effects for specific elements
                if (entry.target.classList.contains('gradient-text')) {
                    entry.target.style.animation = 'gradient-shift 3s ease infinite';
                }
            }
        });
    }, observerOptions);

    // Observe all elements that need scroll animations
    const animatedElements = document.querySelectorAll('.stagger-animation > *, .hover-lift, .hover-scale, .gradient-text');
    animatedElements.forEach(element => observer.observe(element));
}

// Function to ensure all content is visible
function ensureContentVisible() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        // Ensure no elements are hidden by animations
        if (element.style.opacity === '0' || element.style.display === 'none') {
            element.style.opacity = '1';
            element.style.display = '';
        }
    });
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        try {
            // First ensure all content is visible
            ensureContentVisible();
            
            initCounterAnimations();
            initInteractiveCards();
            initParticleBackground();
            initTextReveal();
            initBounceInAnimations();
            initWiggleEffect();
            initGlowEffects();
            initAdvancedScrollAnimations();
            console.log('Enhanced features initialized');
        } catch (error) {
            console.error('Error initializing enhanced features:', error);
        }
    }, 500);
    
    // Additional check to ensure content stays visible
    setTimeout(ensureContentVisible, 1000);
    setTimeout(ensureContentVisible, 2000);
});
