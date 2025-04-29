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
        }, 800);
    }
});

// El resto de tu código existente...
// Script para ScrollReveal
document.addEventListener('DOMContentLoaded', function() {
    // Función simple para animar elementos con data-scroll-reveal
    function initScrollReveal() {
        const elements = document.querySelectorAll('[data-scroll-reveal]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        elements.forEach(element => {
            // Aplicar estilos iniciales
            element.style.opacity = '0';
            element.style.transition = 'all 0.6s ease-in-out';
            
            // Determinar el tipo de animación basado en el atributo
            const attr = element.getAttribute('data-scroll-reveal');
            if (attr.includes('left')) {
                element.style.transform = 'translateX(-30px)';
            } else if (attr.includes('right')) {
                element.style.transform = 'translateX(30px)';
            } else if (attr.includes('bottom')) {
                element.style.transform = 'translateY(30px)';
            } else if (attr.includes('top')) {
                element.style.transform = 'translateY(-30px)';
            }
            
            observer.observe(element);
        });
        
        // CSS para elementos revelados
        const style = document.createElement('style');
        style.textContent = `
            [data-scroll-reveal].revealed {
                opacity: 1 !important;
                transform: translate(0, 0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Modificar el código del filtro de categorías para el nuevo formato
    const categoriaBotones = document.querySelectorAll('.categoria-btn');
    
    categoriaBotones.forEach(boton => {
        boton.addEventListener('click', () => {
            // Remover la clase active de todos los botones
            categoriaBotones.forEach(btn => btn.classList.remove('active'));
            // Agregar la clase active al botón seleccionado
            boton.classList.add('active');

            const categoria = boton.getAttribute('data-categoria');
            const productos = document.querySelectorAll('.producto');

            productos.forEach(producto => {
                if (categoria === 'todos') {
                    producto.classList.remove('hidden');
                } else {
                    if (producto.classList.contains(categoria)) {
                        producto.classList.remove('hidden');
                    } else {
                        producto.classList.add('hidden');
                    }
                }
            });
        });
    });
    
    // Iniciar animaciones cuando el DOM está listo
    initScrollReveal();
});
