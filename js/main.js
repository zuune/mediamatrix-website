// Function to load HTML sections dynamically
async function loadSection(sectionName, containerId) {
    try {
        // Add cache busting parameter
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
    await Promise.all([
        loadSection('hero', 'hero-section'),
        loadSection('optimize', 'optimize-section'),
        loadSection('about', 'about-section'),
        loadSection('clients', 'clients-section'),
        loadSection('results', 'results-section'),
        loadSection('certificate', 'certificate-section'),
        loadSection('contact', 'contact-section')
    ]);
    
    // Initialize certificate animations after sections are loaded
    setTimeout(() => {
        initCertificateAnimations();
        initSmoothScroll();
    }, 100);
});

// Smooth Scroll Function
function initSmoothScroll() {
    // Get all smooth scroll links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (!href || href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calculate offset for fixed header (if any)
                const headerOffset = 80; // Adjust this value based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state in navigation
                updateActiveNavLink(href);
            }
        });
    });
}

// Update active navigation link
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

// Highlight active section on scroll
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

// Copy email function
function copyEmail() {
    const email = 'transerydesign@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        // Elegant toast notification
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

// Certificate Section Animations
function initCertificateAnimations() {
    // Intersection Observer for scroll animations
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

    // Observe certificate section elements
    const certificateHeader = document.querySelector('.certificate-header');
    const certificateCards = document.querySelectorAll('.certificate-card');
    const certificateLines = document.querySelector('.certificate-lines');
    const certificateCta = document.querySelector('.certificate-cta');

    if (certificateHeader) observer.observe(certificateHeader);
    if (certificateLines) observer.observe(certificateLines);
    if (certificateCta) observer.observe(certificateCta);

    // Observe cards with staggered animation
    certificateCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
}
