document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animation for the button
        menuBtn.style.transform = navLinks.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(2, 6, 23, 0.9)';
            header.style.padding = '0.75rem 0';
        } else {
            header.style.background = 'transparent';
            header.style.padding = '1rem 0';
        }
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in class to elements we want to animate
    const animatables = document.querySelectorAll('.project-card, .section-title, .hero-text, .hero-visual, .skill-group');
    animatables.forEach((el, index) => {
        el.classList.add('reveal-init');
        // Stagger logic could go here
        revealObserver.observe(el);
    });

    // Add styles for reveal animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        .reveal-init {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0, 0.2, 1);
        }
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.disabled = true;
            btn.textContent = 'Enviando...';
            
            // Simulate API call
            setTimeout(() => {
                btn.textContent = '¡Mensaje Enviado!';
                btn.style.background = '#27c93f';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.disabled = false;
                    btn.textContent = originalText;
                    btn.style.background = 'var(--accent-gradient)';
                }, 3000);
            }, 1500);
        });
    }

    // Parallax effect for hero visual
    const heroVisual = document.querySelector('.visual-card');
    if (heroVisual) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            heroVisual.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }
});
