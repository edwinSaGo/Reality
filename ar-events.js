// ==========================================
// AR EVENTS COLOMBIA - JAVASCRIPT PRINCIPAL
// Archivo: ar-events.js
// ==========================================

class AREventsApp {
    constructor() {
        this.currentPage = 'inicio';
        this.isMobile = window.innerWidth <= 768;
        this.mobileMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.createLightLines();
        this.startBackgroundAnimation();
        
        // Inicializar después del DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.finalizeInit();
            });
        } else {
            this.finalizeInit();
        }
    }
    
    finalizeInit() {
        this.updateActiveStates();
        this.animatePageEntry();
        
        // Detectar cambios de orientación/tamaño
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    // ==========================================
    // NAVEGACIÓN Y CAMBIO DE PÁGINAS
    // ==========================================
    
    setupEventListeners() {
        // Navegación desktop
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-item')) {
                this.changePage(e.target.dataset.page, e.target.dataset.color);
            }
        });
        
        // Navegación móvil
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('mobile-nav-item')) {
                this.changePage(e.target.dataset.page, e.target.dataset.color);
                this.closeMobileMenu();
            }
        });
        
        // Toggle menú móvil
        const mobileToggle = document.getElementById('mobileMenuToggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Cerrar menú móvil con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Scroll suave para indicador
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('scroll-indicator')) {
                this.scrollToGallery();
            }
        });
    }
    
    changePage(pageId, accentColor) {
        if (pageId === this.currentPage) return;
        
        // Animación de salida
        const currentPageEl = document.getElementById(this.currentPage);
        if (currentPageEl) {
            this.animatePageExit(currentPageEl);
        }
        
        // Cambiar página después de la animación
        setTimeout(() => {
            // Ocultar página actual
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Mostrar nueva página
            const newPageEl = document.getElementById(pageId);
            if (newPageEl) {
                newPageEl.classList.add('active');
                this.animatePageEntry(newPageEl);
            }
            
            // Actualizar estados activos
            this.currentPage = pageId;
            this.updateActiveStates();
            
            // Cambiar color de acento del fondo
            if (accentColor) {
                this.changeBackgroundAccent(accentColor);
            }
            
            // Scroll al top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        }, 300);
    }
    
    updateActiveStates() {
        // Desktop navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === this.currentPage) {
                item.classList.add('active');
            }
        });
        
        // Mobile navigation
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === this.currentPage) {
                item.classList.add('active');
            }
        });
    }
    
    // ==========================================
    // MENÚ MÓVIL
    // ==========================================
    
    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.hamburger');
        
        if (this.mobileMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }
    
    openMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.hamburger');
        
        mobileMenu.classList.add('active');
        hamburger.style.transform = 'rotate(45deg)';
        
        // Animar items del menú
        const menuItems = document.querySelectorAll('.mobile-nav-item');
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100 + 200);
        });
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }
    
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.hamburger');
        
        mobileMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0deg)';
        this.mobileMenuOpen = false;
        
        // Resetear items del menú
        const menuItems = document.querySelectorAll('.mobile-nav-item');
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
        });
        
        // Permitir scroll del body
        document.body.style.overflow = 'auto';
    }
    
    // ==========================================
    // ANIMACIONES DE PÁGINAS
    // ==========================================
    
    animatePageEntry(pageEl = null) {
        const page = pageEl || document.querySelector('.page.active');
        if (!page) return;
        
        // Aplicar animación de entrada usando Anime.js si está disponible
        if (typeof anime !== 'undefined') {
            anime({
                targets: page,
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 600,
                easing: 'easeOutQuart'
            });
            
            // Animar elementos internos
            const elements = page.querySelectorAll('.hero-title, .hero-subtitle, .logo, .gallery-title, .page-title');
            anime({
                targets: elements,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                delay: anime.stagger(100),
                easing: 'easeOutQuart'
            });
        } else {
            // Fallback sin Anime.js
            page.style.opacity = '0';
            page.style.transform = 'translateY(50px)';
            page.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                page.style.opacity = '1';
                page.style.transform = 'translateY(0)';
            }, 50);
        }
    }
    
    animatePageExit(pageEl) {
        if (typeof anime !== 'undefined') {
            anime({
                targets: pageEl,
                opacity: [1, 0],
                translateY: [0, -30],
                duration: 300,
                easing: 'easeInQuart'
            });
        } else {
            pageEl.style.transition = 'all 0.3s ease';
            pageEl.style.opacity = '0';
            pageEl.style.transform = 'translateY(-30px)';
        }
    }
    
    // ==========================================
    // EFECTOS VISUALES Y ANIMACIONES
    // ==========================================
    
    createLightLines() {
        const lightLinesContainer = document.getElementById('lightLines');
        if (!lightLinesContainer || this.isMobile) return;
        
        // Crear líneas de luz animadas
        for (let i = 0; i < 15; i++) {
            const line = document.createElement('div');
            line.className = 'light-line';
            
            // Posición aleatoria
            line.style.left = Math.random() * 100 + '%';
            line.style.animationDelay = Math.random() * 5 + 's';
            line.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            lightLinesContainer.appendChild(line);
            
            // Animar línea
            this.animateLightLine(line);
        }
    }
    
    animateLightLine(line) {
        if (typeof anime !== 'undefined') {
            const animateLine = () => {
                anime({
                    targets: line,
                    translateY: ['-100vh', '100vh'],
                    opacity: [0, 1, 0],
                    duration: anime.random(3000, 6000),
                    easing: 'linear',
                    complete: () => {
                        // Reposicionar y reanimar
                        line.style.left = Math.random() * 100 + '%';
                        setTimeout(animateLine, Math.random() * 2000);
                    }
                });
            };
            
            setTimeout(animateLine, Math.random() * 2000);
        } else {
            // Fallback CSS animation
            line.style.animation = `lightLineMove ${3 + Math.random() * 3}s linear infinite`;
        }
    }
    
    startBackgroundAnimation() {
        // El fondo ya tiene animación CSS, pero podemos agregar interactividad
        const bg = document.querySelector('.dynamic-background');
        if (!bg) return;
        
        // Cambio de gradiente basado en mouse (solo desktop)
        if (!this.isMobile) {
            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                
                bg.style.backgroundPosition = `${x}% ${y}%`;
            });
        }
    }
    
    changeBackgroundAccent(color) {
        const bg = document.querySelector('.dynamic-background');
        if (!bg) return;
        
        // Cambiar el color de acento del gradiente
        bg.style.background = `linear-gradient(45deg, var(--primary-blue), ${color})`;
        bg.style.backgroundSize = '400% 400%';
    }
    
    // ==========================================
    // UTILIDADES Y HELPERS
    // ==========================================
    
    scrollToGallery() {
        const gallery = document.querySelector('.ar-gallery');
        if (gallery) {
            gallery.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        // Si cambió de desktop a móvil o viceversa
        if (wasMobile !== this.isMobile) {
            if (this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
            
            // Recrear efectos si es necesario
            if (!this.isMobile) {
                this.createLightLines();
            }
        }
    }
    
    initAnimations() {
        // Agregar clases de animación a elementos que lo necesiten
        const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .gallery-title');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
        });
    }
    
    // ==========================================
    // INTERACCIONES ESPECIALES
    // ==========================================
    
    setupSpecialInteractions() {
        // Efecto hover en tarjetas de imagen
        const imageCards = document.querySelectorAll('.image-card');
        imageCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: card,
                        scale: 1.05,
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: card,
                        scale: 1,
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            });
        });
        
        // Efecto en logo
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', () => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: logo,
                        rotateY: '+=360',
                        duration: 1000,
                        easing: 'easeInOutQuad'
                    });
                }
            });
        }
    }
    
    // ==========================================
    // OPTIMIZACIONES DE RENDIMIENTO
    // ==========================================
    
    optimizeForMobile() {
        if (this.isMobile) {
            // Desactivar animaciones pesadas en móvil
            const lightLines = document.getElementById('lightLines');
            if (lightLines) {
                lightLines.style.display = 'none';
            }
            
            // Reducir calidad de efectos
            document.body.classList.add('mobile-optimized');
        }
    }
}

// ==========================================
// INICIALIZACIÓN GLOBAL
// ==========================================

// Inicializar la aplicación cuando el DOM esté listo
let arEventsApp;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        arEventsApp = new AREventsApp();
        arEventsApp.setupSpecialInteractions();
        arEventsApp.optimizeForMobile();
    });
} else {
    arEventsApp = new AREventsApp();
    arEventsApp.setupSpecialInteractions();
    arEventsApp.optimizeForMobile();
}

// ==========================================
// FUNCIONES GLOBALES AUXILIARES
// ==========================================

// Función para detectar dispositivos táctiles
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

// Función para lazy loading de imágenes (cuando agregues imágenes reales)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Función para optimizar rendimiento
function optimizePerformance() {
    // Prefetch de recursos críticos
    const prefetchLinks = ['/favicon.ico'];
    prefetchLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
    });
}

// ==========================================
// CSS DINÁMICO ADICIONAL (Si es necesario)
// ==========================================

// Agregar estilos CSS dinámicos si es necesario
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animación CSS para líneas de luz (fallback) */
        @keyframes lightLineMove {
            0% { 
                transform: translateY(-100vh); 
                opacity: 0; 
            }
            50% { 
                opacity: 1; 
            }
            100% { 
                transform: translateY(100vh); 
                opacity: 0; 
            }
        }
        
        /* Optimizaciones móviles */
        .mobile-optimized * {
            animation-duration: 0.5s !important;
            transition-duration: 0.3s !important;
        }
        
        /* Estados de carga */
        .loading {
            opacity: 0.7;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// Inicializar estilos dinámicos
addDynamicStyles();

// ==========================================
// EXPORTAR PARA USO EXTERNO (SI ES NECESARIO)
// ==========================================

// Si necesitas acceder a la app desde consola o scripts externos
window.AREventsApp = AREventsApp;

// Inicializar optimizaciones
setTimeout(() => {
    lazyLoadImages();
    optimizePerformance();
}, 1000);