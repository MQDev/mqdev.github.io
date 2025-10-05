/**
 * MQDev Corporate - JavaScript
 * Funcionalidades interativas e navegação
 */

// Navegação Mobile
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Abrir menu mobile
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
}

// Fechar menu mobile
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Header fixo com scroll
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação ao scroll (Intersection Observer)
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

// Elementos para animar
const animateElements = document.querySelectorAll('.service-card, .solution-item, .portfolio-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Formulário de contato - validação e feedback
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Permitir envio para Formspree
        const submitButton = this.querySelector('button[type="submit"]');
        
        if (submitButton) {
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Restaurar botão após envio
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        }
    });
}

// Detecção de clique no WhatsApp (Analytics)
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'event_category': 'contact',
                'event_label': 'WhatsApp Button'
            });
        }
    });
});

// Detecção de clique em emails (Analytics)
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'email_click', {
                'event_category': 'contact',
                'event_label': 'Email Button'
            });
        }
    });
});

// Detecção de cliques em projetos do portfolio (Analytics)
document.querySelectorAll('.portfolio-card__link').forEach(link => {
    link.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'portfolio_click', {
                'event_category': 'portfolio',
                'event_label': link.href
            });
        }
    });
});

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const hasPercent = element.parentElement.querySelector('.stat-card__suffix');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Ativar contadores quando visíveis
const statsCards = document.querySelectorAll('.stat-card__number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            
            if (target) {
                entry.target.textContent = '0';
                animateCounter(entry.target, target);
            }
        }
    });
}, { threshold: 0.5 });

statsCards.forEach(stat => statsObserver.observe(stat));

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fechar todos os outros FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle no item clicado
        item.classList.toggle('active');
        
        // Analytics
        if (typeof gtag !== 'undefined' && !isActive) {
            gtag('event', 'faq_click', {
                'event_category': 'engagement',
                'event_label': question.textContent.trim()
            });
        }
    });
});

// Animação de entrada para novos elementos
const fadeInElements = document.querySelectorAll('.testimonial-card, .faq-item');
fadeInElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(el);
});

// Prevenir comportamento padrão em links de âncora vazios
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
});

// Log de carregamento
console.log('%cMQDev', 'font-size: 48px; font-weight: bold; background: linear-gradient(135deg, #2563eb, #1e40af); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cSoluções em Tecnologia', 'font-size: 16px; color: #6b7280;');
console.log('Site desenvolvido com tecnologias modernas e otimizado para SEO.');
