/* ============================================
   MQDev - Custom Cursor & Micro-Interações
   ============================================ */

// Custom Cursor - DESABILITADO (mantém cursor padrão do sistema)
document.addEventListener('DOMContentLoaded', function() {
    /* CURSOR CUSTOMIZADO DESABILITADO
    // Criar cursor customizado
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Seguir o mouse com suavização
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const diffX = mouseX - cursorX;
        const diffY = mouseY - cursorY;
        
        cursorX += diffX * 0.25;
        cursorY += diffY * 0.25;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Efeitos de hover
    const hoverElements = document.querySelectorAll('a, button, .btn, .service-card, .portfolio-card, .solution-item, .process-step');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // Efeito de click
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
    */
    // Animação de scroll reveal para novos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos da seção "Como Trabalhamos"
    document.querySelectorAll('.process-step, .tool-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Parallax suave em elementos
    let scrollPos = 0;
    
    window.addEventListener('scroll', () => {
        scrollPos = window.pageYOffset;
        
        // Parallax no hero
        const heroVisual = document.querySelector('.hero__visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrollPos * 0.3}px)`;
        }
    });

    // Efeito de digitação no código
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.transition = 'opacity 0.3s ease';
            line.style.opacity = '1';
        }, index * 100);
    });

    // Smooth scroll com easing personalizado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const targetPosition = target.offsetTop - 80;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;
                    
                    function animation(currentTime) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = ease(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    }
                    
                    function ease(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t + b;
                        t--;
                        return -c / 2 * (t * (t - 2) - 1) + b;
                    }
                    
                    requestAnimationFrame(animation);
                }
            }
        });
    });
});
