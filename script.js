/* ============================================
   CODOMAX PORTFOLIO — script.js
   Author: Vaishnavi | Codomax Project 2024
   ============================================ */

/* ---------- DOM ELEMENTS ---------- */
const navbar      = document.getElementById('navbar');
const themeBtn    = document.getElementById('themeBtn');
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const backToTop   = document.getElementById('backToTop');
const skillTabs   = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('.skill-panel');
const navLinkItems = document.querySelectorAll('.nav-link');


/* ---------- THEME TOGGLE ---------- */
const savedTheme = localStorage.getItem('codomax-theme') || 'dark';
if (savedTheme === 'light') applyLight();

function applyLight() {
    document.body.classList.add('light-mode');
    themeBtn.textContent = '☀️';
}
function applyDark() {
    document.body.classList.remove('light-mode');
    themeBtn.textContent = '🌙';
}

themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-mode');
    if (isLight) {
        applyDark();
        localStorage.setItem('codomax-theme', 'dark');
    } else {
        applyLight();
        localStorage.setItem('codomax-theme', 'light');
    }
});


/* ---------- NAVBAR SCROLL ---------- */
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    // Active nav link highlighting
    highlightActiveSection();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ---------- HAMBURGER MENU ---------- */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});


/* ---------- ACTIVE NAV HIGHLIGHT ---------- */
function highlightActiveSection() {
    // Multi-page mode: highlight based on current filename
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const isMultiPage = !window.location.hash && document.querySelectorAll('section[id]').length <= 1;

    if (isMultiPage || currentFile !== 'index.html') {
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentFile || (currentFile === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
        return;
    }

    // Single-page scroll mode (index.html with multiple sections)
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) {
            current = sec.getAttribute('id');
        }
    });
    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}


/* ---------- TYPEWRITER EFFECT ---------- */
const phrases = [
    'Web Developer',
    'Problem Solver',
    'CS Student',
    'UI/UX Enthusiast',
    'Codomax Intern',
    'Open Source Fan'
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typewriterEl = document.getElementById('typewriter');

function typeWrite() {
    if (!typewriterEl) return;
    const current = phrases[phraseIndex];

    if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === current.length) {
        speed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
    }

    setTimeout(typeWrite, speed);
}
typeWrite();


/* ---------- FLOATING PARTICLES ---------- */
(function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = 30;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            bottom: 0;
            width: ${size}px;
            height: ${size}px;
            opacity: ${Math.random() * 0.5 + 0.1};
            animation-duration: ${Math.random() * 15 + 10}s;
            animation-delay: ${Math.random() * 15}s;
            background: ${Math.random() > 0.5 ? '#00d9ff' : '#7b2ff7'};
        `;
        container.appendChild(p);
    }
})();


/* ---------- SKILL TABS ---------- */
skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        skillTabs.forEach(t => t.classList.remove('active'));
        skillPanels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const panel = document.getElementById(`panel-${target}`);
        if (panel) {
            panel.classList.add('active');
            animateBarsIn(panel);
        }
    });
});


/* ---------- SKILL BAR ANIMATION ---------- */
function animateBarsIn(container) {
    const bars = container.querySelectorAll('.skill-fill');
    bars.forEach((bar, i) => {
        const target = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = target + '%';
        }, i * 80);
    });
}

// Observe active panel on load
function initSkillBars() {
    const activePanel = document.querySelector('.skill-panel.active');
    if (activePanel) animateBarsIn(activePanel);
}

// Intersection Observer for skill bars
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            initSkillBars();
            observer.disconnect();
        }
    }, { threshold: 0.25 });
    observer.observe(skillsSection);
}


/* ---------- SCROLL REVEAL ---------- */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


/* ---------- ADD REVEAL CLASSES VIA JS ---------- */
(function addRevealClasses() {
    // Hero content
    const heroContent = document.querySelector('.hero-content');
    const heroImage   = document.querySelector('.hero-image-wrap');
    if (heroContent) heroContent.classList.add('reveal-left');
    if (heroImage)   heroImage.classList.add('reveal-right');

    // About
    const aboutLeft  = document.querySelector('.about-left');
    const aboutRight = document.querySelector('.about-right');
    if (aboutLeft)  aboutLeft.classList.add('reveal-left');
    if (aboutRight) aboutRight.classList.add('reveal-right');

    // Skill items
    document.querySelectorAll('.skill-item').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 50}ms`;
    });

    // Contact
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form-wrap');
    if (contactInfo) contactInfo.classList.add('reveal-left');
    if (contactForm) contactForm.classList.add('reveal-right');

    // Tech strip items
    document.querySelectorAll('.tech-item').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 50}ms`;
    });

    // Info cards
    document.querySelectorAll('.info-card, .contact-card').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 80}ms`;
    });
})();


/* ---------- CONTACT FORM SUBMIT ---------- */
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fname   = document.getElementById('fname')?.value.trim();
        const email   = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        const submitBtn  = document.getElementById('form-submit-btn');
        const submitText = document.getElementById('submit-text');

        if (!fname || !email || !message) {
            showFormError('Please fill in all required fields.');
            return;
        }
        if (!isValidEmail(email)) {
            showFormError('Please enter a valid email address.');
            return;
        }

        // Simulate sending
        submitBtn.disabled = true;
        submitText.textContent = 'Sending...';

        setTimeout(() => {
            contactForm.reset();
            formSuccess.classList.add('show');
            submitBtn.disabled = false;
            submitText.textContent = 'Send Message';

            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
        }, 1500);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormError(msg) {
    const existing = document.querySelector('.form-error');
    if (existing) existing.remove();
    const err = document.createElement('p');
    err.className = 'form-error';
    err.style.cssText = `
        color: #ff6b6b;
        font-size: 0.85rem;
        font-weight: 600;
        padding: 10px 14px;
        background: rgba(255,107,107,0.1);
        border: 1px solid rgba(255,107,107,0.3);
        border-radius: 8px;
        animation: panel-appear 0.3s ease;
    `;
    err.textContent = '⚠️ ' + msg;
    contactForm.appendChild(err);
    setTimeout(() => err.remove(), 3500);
}


/* ---------- SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


/* ---------- CONSOLE EASTER EGG ---------- */
console.log(`
%c  ⬡ CODOMAX PORTFOLIO  
%c  Built by Vaishnavi | 2024  
%c  Tech: HTML5 + CSS3 + Vanilla JS  
`, 
'color:#00d9ff; font-size:16px; font-weight:900; background:#060d18; padding:4px 8px; border-radius:4px;',
'color:#7b2ff7; font-size:12px; background:#060d18; padding:2px 8px;',
'color:#8ba3be; font-size:11px; background:#060d18; padding:2px 8px; border-radius:0 0 4px 4px;'
);