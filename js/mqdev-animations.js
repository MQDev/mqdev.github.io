/**
 * MQDev - Animações e Micro-interações Avançadas
 * Melhora a experiência do usuário com feedback visual
 */

// Efeito parallax suave no hero
document.addEventListener('DOMContentLoaded', () => {
    const heroVisual = document.querySelector('.hero__visual');
    
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
});

// Animação de digitação no hero
const typewriterText = document.querySelector('.title-highlight');
if (typewriterText) {
    const originalText = typewriterText.textContent;
    typewriterText.textContent = '';
    typewriterText.style.borderRight = '2px solid var(--primary-color)';
    
    let charIndex = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            typewriterText.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            setTimeout(() => {
                typewriterText.style.borderRight = 'none';
            }, 500);
        }
    }
    
    // Iniciar após 500ms
    setTimeout(typeWriter, 500);
}

// Efeito de hover 3D nos cards
const cards = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Animação de progresso ao rolar a página
function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    let progressBar = document.getElementById('progress-bar');
    
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #2563eb, #10b981);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateProgressBar);

// Botão "Voltar ao Topo" animado
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient-primary);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
    z-index: 1000;
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'back_to_top_click', {
            'event_category': 'navigation',
            'event_label': 'Back to Top Button'
        });
    }
});

// Efeito de pulso nos botões CTA
const ctaButtons = document.querySelectorAll('.btn-primary');
ctaButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse-btn 0.6s ease';
    });
    
    btn.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Adicionar CSS da animação de pulso
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse-btn {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .service-card, .portfolio-card, .testimonial-card {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Lazy loading aprimorado para imagens
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Adicionar efeito de fade-in
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

lazyImages.forEach(img => imageObserver.observe(img));

// Cursor personalizado (opcional - apenas desktop)
if (window.innerWidth > 1024) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Expandir cursor em elementos clicáveis
    const clickableElements = document.querySelectorAll('a, button, .service-card, .portfolio-card');
    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(37, 99, 235, 0.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });
    });
}

// Analytics de tempo na página
let startTime = Date.now();

window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'time_on_page', {
            'event_category': 'engagement',
            'value': timeOnPage,
            'event_label': 'Total Seconds'
        });
    }
});

// Detectar scroll até seções importantes
const importantSections = document.querySelectorAll('[id]');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.viewed) {
            entry.target.dataset.viewed = 'true';
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'section_view', {
                    'event_category': 'engagement',
                    'event_label': entry.target.id
                });
            }
        }
    });
}, { threshold: 0.5 });

importantSections.forEach(section => sectionObserver.observe(section));

console.log('%c✨ Animações Avançadas Carregadas', 'color: #10b981; font-weight: bold; font-size: 12px;');
