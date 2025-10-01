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
    }, 100);
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

// Certificate Modal Functions
const certificateData = {
    1: {
        title: 'ISO 9001:2015',
        badge: 'Certified',
        badgeColor: 'bg-blue-500',
        description: 'Quality management system certification for consistent service excellence. This certification demonstrates our commitment to maintaining the highest standards in quality management, ensuring that every project we deliver meets rigorous international standards.',
        image: 'images/certificate-1.jpg',
        organization: 'International Organization for Standardization',
        credentialId: 'ISO-9001-2024-001'
    },
    2: {
        title: 'Google Partner',
        badge: 'Partner',
        badgeColor: 'bg-red-500',
        description: 'Official Google Partner certification with expertise in digital solutions. As a certified Google Partner, we have demonstrated proficiency in Google Ads, Analytics, and other Google marketing platforms, helping businesses achieve their digital marketing goals.',
        image: 'images/certificate-2.jpg',
        organization: 'Google LLC',
        credentialId: 'GP-2024-002'
    },
    3: {
        title: 'AWS Certified',
        badge: 'Cloud',
        badgeColor: 'bg-orange-500',
        description: 'Amazon Web Services certified for scalable cloud infrastructure solutions. This certification validates our technical expertise in designing, deploying, and operating applications and infrastructure on AWS, ensuring optimal performance and security.',
        image: 'images/certificate-3.jpg',
        organization: 'Amazon Web Services',
        credentialId: 'AWS-2024-003'
    },
    4: {
        title: 'Design Excellence Award',
        badge: 'Award',
        badgeColor: 'bg-purple-500',
        description: 'International design awards for outstanding creative achievements. This prestigious award recognizes our innovative approach to design, creativity, and the exceptional quality of our visual communication work.',
        image: 'images/certificate-4.jpg',
        organization: 'International Design Association',
        credentialId: 'IDA-2024-004'
    }
};

function openCertificateModal(certId) {
    const modal = document.getElementById('certificateModal');
    const data = certificateData[certId];
    
    if (!data || !modal) return;
    
    // Update modal content
    document.getElementById('modalCertTitle').textContent = data.title;
    document.getElementById('modalCertDescription').textContent = data.description;
    document.getElementById('modalCertOrg').textContent = data.organization;
    document.getElementById('modalCertId').textContent = data.credentialId;
    document.getElementById('modalCertImage').src = data.image;
    
    // Update badge
    const badge = document.getElementById('modalCertBadge');
    badge.textContent = data.badge;
    badge.className = `inline-block ${data.badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium mb-3`;
    
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (!modal) return;
    
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertificateModal();
    }
});

// Close modal on background click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('certificateModal');
    if (modal && e.target === modal) {
        closeCertificateModal();
    }
});

