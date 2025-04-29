// Ocultar el preloader cuando la página esté completamente cargada
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 500); // Reducido a 500ms para una transición más rápida
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Handle all navigation links, not just catalog buttons
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target section ID
            const targetId = this.getAttribute('href');
            
            // Only handle anchor links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                // Find target element
                const targetElement = document.getElementById(targetId.substring(1));
                
                if (targetElement) {
                    // First close the mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse.show');
                    if (navbarCollapse && window.innerWidth < 992) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        } else {
                            // Fallback if Bootstrap instance isn't available
                            navbarCollapse.classList.remove('show');
                        }
                    }
                    
                    // Give time for menu to close before scrolling
                    setTimeout(() => {
                        // Calculate position
                        const navbar = document.querySelector('.navbar');
                        const navHeight = navbar ? navbar.offsetHeight : 70;
                        const yOffset = -navHeight - 20;
                        
                        const y = targetElement.getBoundingClientRect().top + 
                                 window.pageYOffset + yOffset;
                        
                        // Scroll to element
                        window.scrollTo({
                            top: y,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        });
    });
    
    // ----- FILTRADO DE CATEGORÍAS DE PRODUCTOS -----
    const categoriaBotones = document.querySelectorAll('.categoria-btn');
    const productos = document.querySelectorAll('.producto');
    
    categoriaBotones.forEach(boton => {
        boton.addEventListener('click', function() {
            // Actualizar clases de botones
            categoriaBotones.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Obtener categoría seleccionada
            const categoria = this.getAttribute('data-categoria');
            
            // Filtrar productos
            let visibleCount = 0;
            productos.forEach((producto, index) => {
                if (categoria === 'todos') {
                    producto.classList.remove('hidden');
                    // Añadir retraso secuencial para una animación más atractiva
                    setTimeout(() => {
                        producto.style.opacity = '1';
                    }, index * 50);
                    visibleCount++;
                } else if (producto.classList.contains(categoria)) {
                    producto.classList.remove('hidden');
                    setTimeout(() => {
                        producto.style.opacity = '1';
                    }, index * 50);
                    visibleCount++;
                } else {
                    producto.style.opacity = '0';
                    setTimeout(() => {
                        producto.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
    
    // ----- MANEJO DE LINKS DE CATEGORÍAS EN EL MENÚ DESPLEGABLE -----
    const categoriaLinks = document.querySelectorAll('.categoria-link');
    categoriaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const categoria = this.getAttribute('data-categoria');
            const categoriaBtn = document.querySelector(`.categoria-btn[data-categoria="${categoria}"]`);
            if (categoriaBtn) {
                setTimeout(() => {
                    categoriaBtn.click();
                }, 100);
            }
        });
    });
    
    // ----- ANIMACIÓN DE PRODUCTOS AL HACER SCROLL -----
    const animateOnScrollElements = document.querySelectorAll('.producto');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    animationObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateOnScrollElements.forEach(element => {
            element.classList.add('animate-on-scroll');
            animationObserver.observe(element);
        });
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        animateOnScrollElements.forEach(element => {
            element.classList.add('visible');
        });
    }
    
    // Estilos para animación de scroll
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .producto {
            transition: opacity 0.3s ease;
        }
        .producto.hidden {
            display: none;
        }
    `;
    document.head.appendChild(style);
    
    // Optimización para altura en dispositivos iOS
    const appHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', appHeight);
    appHeight();
});

