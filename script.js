/* ============================================
   CODOMAX PORTFOLIO — script.js
   Author: Vaishnavi | Codomax Project 2024
   ============================================ */

/* ---------- DOM ELEMENTS ---------- */
const navbar      = document.getElementById('navbar');
const themeBtn    = document.getElementById('themeBtn');
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.getElementById('navLinks');
const navOverlay  = document.getElementById('navOverlay');
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
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ---------- HAMBURGER MENU ---------- */
function openMobileNav() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    if (navOverlay) {
        navOverlay.classList.add('show');
    }
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    if (navOverlay) {
        navOverlay.classList.remove('show');
    }
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('open')) {
        closeMobileNav();
    } else {
        openMobileNav();
    }
});

// Close menu on overlay click
if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileNav);
}

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileNav();
    });
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileNav();
    }
});


/* ---------- SCROLL-SPY: Active Nav Highlighting ---------- */
const sections = document.querySelectorAll('section[id]');

const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.15,
    rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80}px 0px -35% 0px`
});

sections.forEach(sec => scrollSpyObserver.observe(sec));


/* ---------- SMOOTH SCROLL WITH OFFSET ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update URL hash without jumping
            history.pushState(null, null, href);
        }
    });
});


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

    // Education
    const eduTimeline = document.querySelector('.education-timeline');
    const eduSidebar  = document.querySelector('.education-sidebar');
    if (eduTimeline) eduTimeline.classList.add('reveal-left');
    if (eduSidebar)  eduSidebar.classList.add('reveal-right');

    document.querySelectorAll('.timeline-item').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 100}ms`;
    });

    // Skill items
    document.querySelectorAll('.skill-item').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 50}ms`;
    });

    // Contact
    const contactInfo = document.querySelector('.contact-info');
    const contactFormWrap = document.querySelector('.contact-form-wrap');
    if (contactInfo) contactInfo.classList.add('reveal-left');
    if (contactFormWrap) contactFormWrap.classList.add('reveal-right');

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

    // Project cards
    document.querySelectorAll('.project-card').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 90}ms`;
    });
})();


/* ---------- PROJECT CATEGORY FILTERING ---------- */
(function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, index * 40);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px) scale(0.96)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
})();


/* ---------- TOAST NOTIFICATION & RESUME DOWNLOAD ---------- */
let toastTimeout;
function showToast(title, message, icon = 'fa-circle-check') {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;

    const titleEl = document.getElementById('toastTitle');
    const msgEl = document.getElementById('toastMessage');
    const iconEl = toast.querySelector('.toast-icon');

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;
    if (iconEl) iconEl.className = `fa-solid ${icon} toast-icon`;

    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}

// Resume download trigger feedback
document.querySelectorAll('a[download], .btn-resume-glow, .btn-nav-resume, #hero-resume-btn, #edu-resume-btn, #navResumeBtn').forEach(btn => {
    btn.addEventListener('click', () => {
        showToast(
            'Resume Download Started',
            "Vaishnavi's official resume (PDF) is downloading now.",
            'fa-file-arrow-down'
        );
    });
});


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


/* ---------- INTERACTIVE RESUME BUILDER & LIVE PREVIEW ---------- */
(function initResumeBuilder() {
    const resumeForm = document.getElementById('resumeForm');
    if (!resumeForm) return;

    // Field mapping: [input_id, target_view_id, prefix/formatter, default_val]
    const bindings = [
        { input: 'resName',            view: 'viewName',            format: v => v ? v.toUpperCase() : 'YOUR NAME' },
        { input: 'resTitle',           view: 'viewTitle',           format: v => v || 'Professional Title' },
        { input: 'resEmail',           view: 'viewEmail',           format: v => `<i class="fa-solid fa-envelope"></i> ${v || 'email@example.com'}` },
        { input: 'resPhone',           view: 'viewPhone',           format: v => `<i class="fa-solid fa-phone"></i> ${v || '+91 00000 00000'}` },
        { input: 'resLocation',        view: 'viewLocation',        format: v => `<i class="fa-solid fa-location-dot"></i> ${v || 'Location'}` },
        { input: 'resGithub',          view: 'viewGithub',          format: v => `<i class="fa-brands fa-github"></i> ${v || 'github.com'}` },
        { input: 'resSummary',         view: 'viewSummary',         format: v => v || 'Add your summary here...' },
        { input: 'resEdu1Degree',      view: 'viewEdu1Degree',      format: v => v || 'Degree Title' },
        { input: 'resEdu1Inst',        view: 'viewEdu1Inst',        format: v => v || 'Institution Name' },
        { input: 'resEdu1Year',        view: 'viewEdu1Year',        format: v => v || 'Year' },
        { input: 'resEdu1Grade',       view: 'viewEdu1Grade',       format: v => v || '' },
        { input: 'resEdu1Courses',     view: 'viewEdu1Courses',     format: v => v ? `<em>Relevant Coursework:</em> ${v}` : '' },
        { input: 'resEdu2Degree',      view: 'viewEdu2Degree',      format: v => v || 'High School Degree' },
        { input: 'resEdu2Inst',        view: 'viewEdu2Inst',        format: v => v || 'School Name' },
        { input: 'resEdu2Year',        view: 'viewEdu2Year',        format: v => v || 'Year' },
        { input: 'resEdu2Grade',       view: 'viewEdu2Grade',       format: v => v || '' },
        { input: 'resSkillLanguages',  view: 'viewSkillLanguages',  format: v => v || 'Languages list' },
        { input: 'resSkillFrameworks', view: 'viewSkillFrameworks', format: v => v || 'Frameworks list' },
        { input: 'resSkillTools',      view: 'viewSkillTools',      format: v => v || 'Tools list' },
        { input: 'resProj1Title',      view: 'viewProj1Title',      format: v => v || 'Project #1 Title' },
        { input: 'resProj1Tech',       view: 'viewProj1Tech',       format: v => v || 'Tech Stack' },
        { input: 'resProj1Desc',       view: 'viewProj1Desc',       format: v => v ? (v.startsWith('•') ? v : `• ${v}`) : '' },
        { input: 'resProj2Title',      view: 'viewProj2Title',      format: v => v || 'Project #2 Title' },
        { input: 'resProj2Tech',       view: 'viewProj2Tech',       format: v => v || 'Tech Stack' },
        { input: 'resProj2Desc',       view: 'viewProj2Desc',       format: v => v ? (v.startsWith('•') ? v : `• ${v}`) : '' },
        { input: 'resProj3Title',      view: 'viewProj3Title',      format: v => v || 'Project #3 Title' },
        { input: 'resProj3Tech',       view: 'viewProj3Tech',       format: v => v || 'Tech Stack' },
        { input: 'resProj3Desc',       view: 'viewProj3Desc',       format: v => v ? (v.startsWith('•') ? v : `• ${v}`) : '' },
        { input: 'resExperience',      view: 'viewExperience',      format: v => v || '' },
        { input: 'resCerts',           view: 'viewCerts',           format: v => v || '' }
    ];

    // Live sync input events
    bindings.forEach(b => {
        const inputEl = document.getElementById(b.input);
        const viewEl = document.getElementById(b.view);
        if (!inputEl || !viewEl) return;

        inputEl.addEventListener('input', () => {
            const val = inputEl.value.trim();
            viewEl.innerHTML = b.format(val);
        });
    });

    // Default Vaishnavi data payload
    const vaishnaviData = {
        resName: 'Vaishnavi',
        resTitle: 'Computer Science Student & Web Developer',
        resEmail: 'vaishnavi@codomax.com',
        resPhone: '+91 98765 43210',
        resLocation: 'Karnataka, India',
        resGithub: 'github.com/vaishnavi',
        resSummary: 'Passionate Computer Science student and web developer skilled in building responsive user interfaces, full-stack applications, and AI integrations. Experienced in modern JavaScript frameworks, Python data pipelines, and clean code architecture. Proudly part of Codomax.',
        resEdu1Degree: 'B.Tech in Computer Science & Engineering',
        resEdu1Inst: 'Codomax Institute of Technology · VTU',
        resEdu1Year: '2022 – 2026',
        resEdu1Grade: 'CGPA: 8.9 / 10',
        resEdu1Courses: 'Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP (Java), Web Engineering',
        resEdu2Degree: 'Higher Secondary Certificate (HSC / 12th) - Science',
        resEdu2Inst: 'Vidya Mandir Pre-University College',
        resEdu2Year: '2020 – 2022',
        resEdu2Grade: 'Score: 94.2% Distinction',
        resSkillLanguages: 'JavaScript (ES6+), Python, HTML5, CSS3, Java, SQL, C++',
        resSkillFrameworks: 'React.js, Node.js, Express, Tailwind CSS, Next.js, FastAPI, OpenCV',
        resSkillTools: 'Git, GitHub, VS Code, Docker, MySQL, MongoDB, PostgreSQL, Figma, Postman',
        resProj1Title: 'GLOW AI — Face Skin Analysis System',
        resProj1Tech: 'Python, OpenCV, TensorFlow, React, FastAPI',
        resProj1Desc: 'Built a real-time computer vision pipeline analyzing facial skin health with 92% accuracy and an interactive React dashboard.',
        resProj2Title: 'ShopVibe — Full Stack E-Commerce Platform',
        resProj2Tech: 'React, Node.js, Express, MongoDB, Tailwind CSS, Stripe',
        resProj2Desc: 'Designed full-fledged shopping store with JWT auth, product filters, persistent shopping cart, and complete payment checkout pipeline.',
        resProj3Title: 'DevConnect — Developer Social & Blog Hub',
        resProj3Tech: 'Next.js, TypeScript, PostgreSQL, Prisma, Socket.io',
        resProj3Desc: 'Engineered a real-time community hub with markdown post publishing, syntax highlighting, threaded WebSocket discussions, and profiles.',
        resExperience: 'Web Developer Intern · Codomax (2023 – Present)\n• Developing responsive user interfaces, accessible web components, and optimized client web applications.\n• Collaborating in agile sprints and conducting peer code reviews.',
        resCerts: '• Meta Frontend Developer Specialization (Coursera)\n• Python for Data Science & AI (IBM Skills Network)\n• Finalist in State Inter-College Hackathon 2023\n• 200+ Solved DSA problems on LeetCode / CodeChef'
    };

    function loadData(data) {
        Object.keys(data).forEach(key => {
            const inputEl = document.getElementById(key);
            if (inputEl) {
                inputEl.value = data[key];
                inputEl.dispatchEvent(new Event('input'));
            }
        });
    }

    // Auto-load Vaishnavi data on initial page load
    loadData(vaishnaviData);

    // Prefill Button
    const btnPrefill = document.getElementById('btnPrefillVaishnavi');
    if (btnPrefill) {
        btnPrefill.addEventListener('click', () => {
            loadData(vaishnaviData);
            showToast('Credentials Loaded', "Loaded Vaishnavi's verified portfolio credentials.", 'fa-wand-magic-sparkles');
        });
    }

    // Reset Button
    const btnClear = document.getElementById('btnClearForm');
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            resumeForm.reset();
            bindings.forEach(b => {
                const viewEl = document.getElementById(b.view);
                if (viewEl) viewEl.innerHTML = b.format('');
            });
            showToast('Form Reset', 'All resume fields have been cleared for a fresh start.', 'fa-rotate-left');
        });
    }

    // Print / PDF Triggers
    ['btnPrintResume', 'btnBottomPrint', 'btnQuickPrint'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                showToast('Preparing Document', 'Opening print / save as PDF dialog...', 'fa-print');
                setTimeout(() => window.print(), 350);
            });
        }
    });

    // Form Bottom Download Button
    const btnBottomDownload = document.getElementById('btnBottomDownload');
    if (btnBottomDownload) {
        btnBottomDownload.addEventListener('click', () => {
            showToast('Preparing PDF', 'Opening print preview to save filled resume as PDF.', 'fa-file-arrow-down');
            setTimeout(() => window.print(), 350);
        });
    }
})();


/* ---------- CONSOLE EASTER EGG ---------- */
console.log(`
%c  ⬡ CODOMAX PORTFOLIO  
%c  Built by Vaishnavi | 2026  
%c  Tech: HTML5 + CSS3 + Vanilla JS  
`, 
'color:#00d9ff; font-size:16px; font-weight:900; background:#060d18; padding:4px 8px; border-radius:4px;',
'color:#7b2ff7; font-size:12px; background:#060d18; padding:2px 8px;',
'color:#8ba3be; font-size:11px; background:#060d18; padding:2px 8px; border-radius:0 0 4px 4px;'
);