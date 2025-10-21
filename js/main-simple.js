async function loadSection(sectionName, containerId) {
    try {
        const timestamp = new Date().getTime();
        const response = await fetch(`sections/${sectionName}.html?v=${timestamp}`);
        if (!response.ok) throw new Error(`Failed to load ${sectionName}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        console.log(`✓ Loaded section: ${sectionName}`);
        
        // Re-initialize language switcher after loading section
        setTimeout(() => {
            initLanguageSwitcher();
        }, 100);
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
            loadSection('pricing', 'pricing-section'),
            loadSection('contact', 'contact-section')
        ]);
        console.log('All sections loaded successfully');
        
        // Simple smooth scroll
        initSmoothScroll();
        
        // Simple certificate animations
        initCertificateAnimations();
        
        // Initialize language switcher
        initLanguageSwitcher();
        
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
            }
        });
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

// Language Switcher Functionality
let currentLang = 'id'; // Default to Indonesian

function switchLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    
    // Update all elements with data-lang attributes
    document.querySelectorAll('[data-lang]').forEach(element => {
        if (element.getAttribute('data-lang') === currentLang) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
    
    // Update language switcher buttons
    document.querySelectorAll('#lang-switcher, #lang-switcher-mobile').forEach(button => {
        button.textContent = currentLang === 'id' ? 'EN' : 'ID';
    });
}

function initLanguageSwitcher() {
    // Set initial language
    document.querySelectorAll('[data-lang]').forEach(element => {
        if (element.getAttribute('data-lang') === currentLang) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
    
    // Add event listeners to language switcher buttons
    document.querySelectorAll('#lang-switcher, #lang-switcher-mobile').forEach(button => {
        button.addEventListener('click', switchLanguage);
    });
}
