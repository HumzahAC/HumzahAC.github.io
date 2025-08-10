// Portfolio App - Main JavaScript
class SickPortfolio {
    constructor() {
        this.cursor = null;
        this.cursorTrail = null;
        this.particles = [];
        this.isTouch = false;
        this.currentSection = 'home';
        this.skills = [];
        this.projects = [];
        this.dataVisualisations = [];
        
        this.init();
    }

    init() {
        this.detectTouch();
        this.setupData();
        this.setupCursor();
        this.setupParticles();
        this.setupScrollEffects();
        this.setupTypingEffect();
        this.setupCounters();
        this.setupNavigation();
        this.setupHeroButtons();
        this.setupProjects();
        this.setupDataVisualisations();  // render Data Visualisations separately
        this.setupSkills();
        this.setupContactForm();
        this.setupIntersectionObserver();
        this.startAnimationLoop();
    }

    detectTouch() {
        this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (this.isTouch) {
            document.body.classList.add('touch-device');
            document.body.style.cursor = 'auto';
        }
    }

    setupData() {
        // Main projects
        this.projects = [
            {
                id: 1,
                title: "Processing Animation",
                category: "graphics",
                description: "Created interactive animations using Processing framework, focusing on visual effects and user interaction to demonstrate creative coding principles.",
                technologies: ["Processing", "Java"],
                demo: "https://humzahac.github.io/forest-animation-project/",
                github: "https://github.com/HumzahAC/forst-animation-project",
                stats: {
                    "Frames": "2000+",
                    "Animations": "5",
                    "Awards": "Visually Stunning"
                },
                icon: "🎨"
            },
            {
                id: 2,
                title: "Showcats NFT Generator",
                category: "blockchain",
                description: "Developed an NFT generator web app that creates unique cat-themed collectibles using React and blockchain integration for minting on Ethereum.",
                technologies: ["Python", "Jupyter Notebook"],
                demo: "https://humzahac.github.io/nft-generator-showcats/",
                github: "https://github.com/HumzahAC/nft-generator-showcats",
                stats: {
                    "NFTs Generated": "1000+",
                    "Variations": "1,000,000+",
                    "Host": "Opensea"
                },
                icon: "🐱"
            },
            {
                id: 3,
                title: "Carway Website",
                category: "web",
                description: "Designed and developed the Carway company website with responsive layout, custom features, and SEO optimization using modern frontend technologies.",
                technologies: ["PHP", "HTML", "CSS", "JAvaScript"],
                demo: "https://humzahac.github.io/carway-website/",
                github: "https://github.com/HumzahAC/carway-website",
                stats: {
                    "Pages": "10+",
                    "Grade": "First",
                    "Performance Score": "95%"
                },
                icon: "🚗"
            },
            {
                id: 4,
                title: "Bidlow Website",
                category: "web",
                description: "Built the Bidlow auction platform website with end-to-end frontend and backend integration to support live bidding and user account management.",
                technologies: ["React", "Node.js", "MongoDB", "Express"],
                demo: "https://humzahac.github.io/bidlow-website/",
                github: "https://github.com/HumzahAC/bidlow-website",
                stats: {
                    "Active Auctions": "50+",
                    "Listing": "50+",
                    "Features": "API integrations"
                },
                icon: "🔨"
            }
        ];

        // Data Visualisations section projects
        this.dataVisualisations = [
            {
                id: 1,
                title: "Python Game Development",
                category: "game",
                description: "Developed an interactive Python game incorporating GUI elements and logic design, showcasing programming skills and user experience focus.",
                technologies: ["Python", "Tkinter", "Pygame"],
                demo: "https://humzahac.github.io/python-game/",
                github: "https://github.com/HumzahAC/python-game",
                stats: {
                    "Levels": "5",
                    "Dificulty": "Challenging",
                    "Features": "Score tracking, animations"
                },
                icon: "🎮"
            },
            {
                id: 2,
                title: "Power BI Dashboard for Site Selection",
                category: "data",
                description: "Created a Power BI dashboard to analyze and visualize demographic and geographic data to identify viable locations for new business development.",
                technologies: ["Power BI", "Excel", "SQL"],
                demo: "https://humzahac.github.io/powerbi-showcase/",
                github: "https://github.com/yourusername/powerbi-showcase",
                stats: {
                    "Data Sources": "5",
                    "Visuals": "10+",
                    "Users": "20+"
                },
                icon: "📊"
            }
        ];

        // Your customized skills
        this.skills = [
            { name: "Python", level: 90, category: "backend", icon: "fab fa-python", color: "#3776ab" },
            { name: "JavaScript", level: 85, category: "frontend", icon: "fab fa-js-square", color: "#f7df1e" },
            { name: "React", level: 80, category: "frontend", icon: "fab fa-react", color: "#61dafb" },
            { name: "SQL", level: 75, category: "backend", icon: "fas fa-database", color: "#e38c00" },
            { name: "PHP", level: 80, category: "product", icon: "fas fa-user-tie", color: "#3136b7" },
            { name: "Agile/Scrum", level: 78, category: "product", icon: "fas fa-gavel", color: "#ff7e5f" },
            { name: "Power BI", level: 70, category: "automation", icon: "fas fa-terminal", color: "#232326" }
        ];
    }

    setupCursor() {
        if (this.isTouch) return;

        this.cursor = document.getElementById('cursor');
        this.cursorTrail = document.getElementById('cursorTrail');

        if (!this.cursor) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let trailX = 0;
        let trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const speed = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
            if (speed > 5) {
                this.createCursorTrailParticle(mouseX, mouseY);
            }
        });

        document.addEventListener('mousedown', () => this.cursor.classList.add('cursor--click'));
        document.addEventListener('mouseup', () => this.cursor.classList.remove('cursor--click'));

        this.setupCursorHoverEffects();

        const updateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            trailX += (mouseX - trailX) * 0.05;
            trailY += (mouseY - trailY) * 0.05;

            const cursorRect = this.cursor.getBoundingClientRect();
            const cursorWidth = cursorRect.width;
            const cursorHeight = cursorRect.height;
            this.cursor.style.transform = `translate3d(${cursorX - cursorWidth / 2}px, ${cursorY - cursorHeight / 2}px, 0)`;

            if (this.cursorTrail) {
                const trailRect = this.cursorTrail.getBoundingClientRect();
                const trailWidth = trailRect.width;
                const trailHeight = trailRect.height;
                this.cursorTrail.style.transform = `translate3d(${trailX - trailWidth / 2}px, ${trailY - trailHeight / 2}px, 0)`;
                this.cursorTrail.style.opacity = Math.min(1, Math.abs(cursorX - trailX) / 50);
            }

            requestAnimationFrame(updateCursor);
        };
        updateCursor();
    }

    setupCursorHoverEffects() {
        if (this.isTouch) return;

        setTimeout(() => {
            const hoverElements = {
                '[data-cursor="click"]': () => {
                    this.cursor.classList.add('cursor--large');
                    this.cursor.querySelector('.cursor-text').textContent = 'CLICK';
                },
                '[data-cursor="view"]': () => {
                    this.cursor.classList.add('cursor--large');
                    this.cursor.querySelector('.cursor-text').textContent = 'VIEW';
                },
                '[data-cursor="arrow"]': () => {
                    this.cursor.classList.add('cursor--large');
                    this.cursor.querySelector('.cursor-text').textContent = '→';
                },
                '[data-cursor="text"]': () => {
                    this.cursor.classList.add('cursor--text');
                },
                '[data-cursor="hover"]': () => {
                    this.cursor.classList.add('cursor--hover');
                }
            };

            Object.keys(hoverElements).forEach(selector => {
                document.querySelectorAll(selector).forEach(element => {
                    element.addEventListener('mouseenter', () => {
                        hoverElements[selector]();
                        this.addMagneticEffect(element);
                    });

                    element.addEventListener('mouseleave', () => {
                        this.cursor.className = 'cursor';
                        this.cursor.querySelector('.cursor-text').textContent = '';
                        this.removeMagneticEffect(element);
                    });
                });
            });
        }, 500);
    }

    addMagneticEffect(element) {
        if (this.isTouch) return;

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const handleMouseMove = (e) => {
            const deltaX = (e.clientX - centerX) * 0.3;
            const deltaY = (e.clientY - centerY) * 0.3;
            element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.05)`;
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.magneticCleanup = () => {
            element.removeEventListener('mousemove', handleMouseMove);
            delete element.magneticCleanup;
        };
    }

    removeMagneticEffect(element) {
        if (element.magneticCleanup) {
            element.magneticCleanup();
        }
        element.style.transform = '';
    }

    createCursorTrailParticle(x, y) {
        if (this.isTouch) return;

        const particle = document.createElement('div');
        particle.className = 'cursor-trail-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--neon-cyan);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            left: ${x}px;
            top: ${y}px;
            opacity: 1;
            transform: scale(1);
            transition: all 0.5s ease-out;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0)';
        }, 50);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 550);
    }

    setupParticles() {
        const particleContainer = document.getElementById('particles');
        if (!particleContainer) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const delay = Math.random() * 3;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.animationDelay = delay + 's';

            particleContainer.appendChild(particle);
        }

        if (!this.isTouch) {
            document.addEventListener('mousemove', (e) => {
                if (Math.random() < 0.1) {
                    this.createMouseParticle(e.clientX, e.clientY);
                }
            });
        }
    }

    createMouseParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: var(--neon-cyan);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9996;
            left: ${x}px;
            top: ${y}px;
            opacity: 1;
            animation: mouseParticle 1s ease-out forwards;
        `;

        if (!document.getElementById('mouseParticleStyle')) {
            const style = document.createElement('style');
            style.id = 'mouseParticleStyle';
            style.textContent = `
                @keyframes mouseParticle {
                    0% { transform: scale(1) translateY(0); opacity: 1; }
                    100% { transform: scale(0) translateY(-30px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }

    setupScrollEffects() {
        const floatingElements = document.querySelectorAll('.floating-element');

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            floatingElements.forEach(element => {
                const speed = parseFloat(element.dataset.speed) || 0.5;
                const y = scrollY * speed;
                element.style.transform = `translateY(${y}px)`;
            });

            this.updateNavigation();
        });
    }

    setupTypingEffect() {
        const typingElement = document.getElementById('typingText');
        if (!typingElement) return;

        const texts = ['Humzah Chowdry', 'Graduate Software Engineer', 'Product Owner', 'Problem Solver'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const type = () => {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(type, 500);
                    return;
                }

                setTimeout(type, deleteSpeed);
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentText.length) {
                    if (textIndex === 0) {
                        // Keep name permanently after first cycle
                        return;
                    }
                    isDeleting = true;
                    setTimeout(type, pauseTime);
                    return;
                }

                setTimeout(type, typeSpeed);
            }
        };

        setTimeout(type, 1000);
    }

    setupCounters() {
        const counters = document.querySelectorAll('[data-target]');

        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.animated) {
                    animateCounter(entry.target);
                    entry.target.animated = true;
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    setupNavigation() {
        const nav = document.getElementById('nav');
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('nav--scrolled');
            } else {
                nav.classList.remove('nav--scrolled');
            }
        });

        if (navToggle) {
            navToggle.addEventListener('click', () => {
                nav.classList.toggle('nav--open');
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                navLinks.forEach(l => l.classList.remove('nav-link--active'));
                link.classList.add('nav-link--active');

                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', (e) => {
                e.preventDefault();
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }

    setupHeroButtons() {
        const heroButtons = document.querySelectorAll('.hero-btn');

        heroButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                let targetSection;
                if (index === 0) {
                    targetSection = document.getElementById('projects');
                } else if (index === 1) {
                    targetSection = document.getElementById('contact');
                }

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    updateNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let currentSection = '';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-link--active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('nav-link--active');
            }
        });
    }

    setupProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = this.projects.map(project => `
            <div class="project-card fade-in" data-category="${project.category}">
                <div class="project-image" data-cursor="view">${project.icon}</div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}</div>
                    <div class="project-stats">${Object.entries(project.stats).map(([key, value]) => `
                        <div class="project-stat">
                            <span class="project-stat-label">${key}:</span>
                            <span class="project-stat-value">${value}</span>
                        </div>
                    `).join('')}</div>
                    <div class="project-links">
                        ${project.demo ? `<a href="${project.demo}" class="project-link project-link--primary" target="_blank" data-cursor="click" rel="noopener noreferrer">Live Demo</a>` : ''}
                        ${project.github ? `<a href="${project.github}" class="project-link project-link--secondary" target="_blank" data-cursor="click" rel="noopener noreferrer">GitHub</a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        setTimeout(() => this.setupCursorHoverEffects(), 100);
    }

    // Render Data Visualisations in dedicated section
    setupDataVisualisations() {
        const dataVisGrid = document.getElementById('dataVisualisationsGrid');
        if (!dataVisGrid) return;

        dataVisGrid.innerHTML = this.dataVisualisations.map(project => `
            <div class="project-card fade-in" data-category="${project.category}">
                <div class="project-image" data-cursor="view">${project.icon}</div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}</div>
                    <div class="project-stats">${Object.entries(project.stats).map(([key, value]) => `
                        <div class="project-stat">
                            <span class="project-stat-label">${key}:</span>
                            <span class="project-stat-value">${value}</span>
                        </div>
                    `).join('')}</div>
                    <div class="project-links">
                        ${project.demo ? `<a href="${project.demo}" class="project-link project-link--primary" target="_blank" data-cursor="click" rel="noopener noreferrer">Live Demo</a>` : ''}
                        ${project.github ? `<a href="${project.github}" class="project-link project-link--secondary" target="_blank" data-cursor="click" rel="noopener noreferrer">GitHub</a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        setTimeout(() => this.setupCursorHoverEffects(), 100);
    }

    setupSkills() {
        const skillsGrid = document.getElementById('skillsGrid');
        const skillCategories = document.querySelectorAll('.skill-category');

        if (!skillsGrid) return;

        let currentCategory = 'all';

        const renderSkills = (category = 'all') => {
            const filteredSkills = category === 'all' 
                ? this.skills 
                : this.skills.filter(skill => skill.category === category);

            skillsGrid.innerHTML = filteredSkills.map(skill => `
                <div class="skill-item fade-in" data-category="${skill.category}">
                    <div class="skill-icon">
                        <i class="${skill.icon}" style="color: ${skill.color}"></i>
                    </div>
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-level">
                        <div class="skill-progress" style="width: 0%"></div>
                    </div>
                    <div class="skill-percentage">${skill.level}%</div>
                </div>
            `).join('');

            setTimeout(() => {
                const skillBars = skillsGrid.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    const skill = filteredSkills[index];
                    setTimeout(() => {
                        bar.style.width = `${skill.level}%`;
                    }, index * 100);
                });
            }, 100);
        };

        skillCategories.forEach(category => {
            category.addEventListener('click', () => {
                const categoryName = category.getAttribute('data-category');

                skillCategories.forEach(cat => cat.classList.remove('active'));
                category.classList.add('active');

                renderSkills(categoryName);
                currentCategory = categoryName;
            });
        });

        renderSkills();
        document.querySelector('[data-category="all"]').classList.add('active');
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 2000);
        });

        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.borderColor = 'var(--neon-cyan)';
                input.style.boxShadow = '0 0 0 3px rgba(0, 255, 255, 0.1)';
            });

            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    input.style.borderColor = 'var(--neon-pink)';
                    input.style.boxShadow = '0 0 0 3px rgba(255, 0, 128, 0.1)';
                } else {
                    input.style.borderColor = 'var(--neon-green)';
                    input.style.boxShadow = '0 0 0 3px rgba(0, 255, 128, 0.1)';
                }
            });
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section, .project-card, .skill-item, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    startAnimationLoop() {
        const animate = () => {
            if (!this.isTouch && window.mouseX !== undefined) {
                const floatingElements = document.querySelectorAll('.floating-element');
                floatingElements.forEach((element) => {
                    const speed = parseFloat(element.dataset.speed) || 0.5;
                    const x = (window.mouseX - window.innerWidth / 2) * speed * 0.1;
                    const y = (window.mouseY - window.innerHeight / 2) * speed * 0.1;

                    element.style.transform = `translate(${x}px, ${y}px)`;
                });
            }

            requestAnimationFrame(animate);
        };

        if (!this.isTouch) {
            document.addEventListener('mousemove', (e) => {
                window.mouseX = e.clientX;
                window.mouseY = e.clientY;
            });
        }

        animate();
    }
}

// Initialize portfolio after DOM Content is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SickPortfolio();
});

// Performance optimization: throttle window resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.left = Math.random() * window.innerWidth + 'px';
        });
    }, 100);
});

// Preload font
document.addEventListener('DOMContentLoaded', () => {
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://r2cdn.perplexity.ai/fonts/FKGroteskNeue.woff2';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
});

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

// Console art customized
console.log(`
╔═══════════════════════════════════════╗
║        🔥 SICK PORTFOLIO 🔥           ║
║                                       ║
║  Built by Humzah Chowdry              ║
║  Graduate Software Engineer & Product Owner ║
║                                       ║
║  ✨ Features:                         ║
║  • Custom Cursor Effects              ║
║  • Particle Systems                   ║
║  • Magnetic Interactions              ║
║  • Glassmorphism UI                   ║
║  • Smooth Animations                  ║
║                                       ║
║  This portfolio is INSANE! 🚀         ║
╚═══════════════════════════════════════╝
`);
