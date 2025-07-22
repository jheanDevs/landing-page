// URL do site do devocional
const DEVOCIONAL_URL = 'https://meudevocional.netlify.app/';

// Intersection Observer para animações de fade-in
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

// Observar todos os elementos com classe fade-in
document.addEventListener('DOMContentLoaded', () => {
    // Forçar atualização do cache para CSS
    const forceCacheRefresh = () => {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        const now = new Date().getTime();
        links.forEach(link => {
            if (link.href.includes('styles.css')) {
                // Se já tiver um parâmetro de versão, mantenha-o, caso contrário adicione timestamp
                if (!link.href.includes('?v=')) {
                    link.href = `${link.href}?t=${now}`;
                }
            }
        });
    };
    
    // Executar uma vez na carga inicial
    forceCacheRefresh();
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});

// Smooth scroll para links internos (se houver)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Configurar CTAs para redirecionar para o site do devocional
document.querySelectorAll('.cta-primary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Adicionar funcionalidade de clique para redirecionar
    button.addEventListener('click', function() {
        // Feedback visual
        this.style.transform = 'scale(0.95)';
        
        // Adicionar loading state
        const originalText = this.textContent;
        this.textContent = 'Redirecionando...';
        this.disabled = true;
        
        setTimeout(() => {
            // Redirecionar para o site do devocional
            window.open(DEVOCIONAL_URL, '_blank');
            
            // Restaurar botão após um breve delay
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                this.style.transform = 'scale(1)';
            }, 1000);
        }, 500);
    });
});

// Parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Adicionar classe para elementos visíveis no viewport
const checkVisibility = () => {
    const elements = document.querySelectorAll('.benefit-item, .problem-item, .solution-card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

// Verificar visibilidade no scroll
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Adicionar efeito de glow nos elementos de destaque
document.querySelectorAll('.highlight').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 10px rgba(200, 156, 63, 0.5)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
    });
});

// Performance: Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce ao scroll
const debouncedScroll = debounce(() => {
    checkVisibility();
}, 10);

window.addEventListener('scroll', debouncedScroll);