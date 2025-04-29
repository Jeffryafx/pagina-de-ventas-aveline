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

// Funcionalidad del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    // Capturar elementos del menú
    const menuTrigger = document.querySelector('.menu-trigger');
    const nav = document.querySelector('.header-area .nav');
    const submenuItems = document.querySelectorAll('.header-area .nav li.submenu');
    
    // Activar el menú hamburguesa cuando se hace clic
    if (menuTrigger) {
        menuTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            if (nav) {
                nav.classList.toggle('active');
            }
        });
    }
    
    // Manejar submenús en dispositivos móviles
    submenuItems.forEach(item => {
        const link = item.querySelector('a');
        
        if (link) {
            link.addEventListener('click', function(e) {
                // Solo prevenir navegación en móviles
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });
    
    // Cerrar el menú cuando se hace clic fuera
    document.addEventListener('click', function(e) {
        if (nav && menuTrigger && 
            !nav.contains(e.target) && 
            !menuTrigger.contains(e.target) && 
            nav.classList.contains('active')) {
            
            nav.classList.remove('active');
            menuTrigger.classList.remove('active');
            
            submenuItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // Cerrar el menú al hacer clic en enlaces
    const navLinks = document.querySelectorAll('.header-area .nav li:not(.submenu) > a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992 && nav && menuTrigger) {
                nav.classList.remove('active');
                menuTrigger.classList.remove('active');
            }
        });
    });
    
    // Manejar enlaces de categorías en el submenú
    const categoriaLinks = document.querySelectorAll('.categoria-link');
    categoriaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const categoria = this.getAttribute('data-categoria');
            
            // Encontrar y hacer clic en el botón correspondiente
            const categoriaBtn = document.querySelector(`.categoria-btn[data-categoria="${categoria}"]`);
            if (categoriaBtn) {
                categoriaBtn.click();
            }
            
            // Cerrar el menú móvil
            if (window.innerWidth < 992 && nav && menuTrigger) {
                nav.classList.remove('active');
                menuTrigger.classList.remove('active');
                
                // Cerrar también el submenú
                submenuItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
            
            // Desplazarse hasta la sección de productos
            const productosSection = document.getElementById('productos');
            if (productosSection) {
                const navHeight = document.querySelector('.header-area').offsetHeight;
                const yOffset = -navHeight - 10;
                const y = productosSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Actualizar menú al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            if (nav) nav.classList.remove('active');
            if (menuTrigger) menuTrigger.classList.remove('active');
            
            submenuItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#') && href !== 'javascript:;') {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.header-area').offsetHeight;
                    const yOffset = -navHeight - 10;
                    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Funcionalidad para filtrar productos por categoría
document.addEventListener('DOMContentLoaded', function() {
    const categoriaBotones = document.querySelectorAll('.categoria-btn');
    const productos = document.querySelectorAll('.producto');
    
    // Asignar evento clic a los botones de categoría
    categoriaBotones.forEach(boton => {
        boton.addEventListener('click', function() {
            // Eliminar la clase active de todos los botones
            categoriaBotones.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Añadir la clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener la categoría seleccionada
            const categoria = this.getAttribute('data-categoria');
            
            // Filtrar los productos según la categoría
            productos.forEach(producto => {
                if (categoria === 'todos') {
                    producto.classList.remove('hidden');
                    // Añadir animación al mostrar
                    setTimeout(() => {
                        producto.style.opacity = '1';
                    }, 10);
                } else {
                    if (producto.classList.contains(categoria)) {
                        producto.classList.remove('hidden');
                        // Añadir animación al mostrar
                        setTimeout(() => {
                            producto.style.opacity = '1';
                        }, 10);
                    } else {
                        // Ocultar con animación
                        producto.style.opacity = '0';
                        setTimeout(() => {
                            producto.classList.add('hidden');
                        }, 300);
                    }
                }
            });
        });
    });
    
    // También necesitamos añadir CSS para la transición
    const style = document.createElement('style');
    style.textContent = `
        .producto {
            transition: opacity 0.3s ease;
        }
        .producto.hidden {
            display: none;
        }
    `;
    document.head.appendChild(style);
});

// Mejoras adicionales para responsividad
document.addEventListener('DOMContentLoaded', function() {
    // Fix para el 100vh en iOS
    const appHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', appHeight);
    appHeight();
    
    // Prevenir que el body se desplace cuando el menú está abierto
    const menuTrigger = document.querySelector('.menu-trigger');
    if (menuTrigger) {
        menuTrigger.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Cerrar menú al cambiar orientación
    window.addEventListener('orientationchange', function() {
        const nav = document.querySelector('.header-area .nav');
        const menuTrigger = document.querySelector('.menu-trigger');
        
        if (nav && menuTrigger) {
            nav.classList.remove('active');
            menuTrigger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Activar animación de scroll para productos
    const productos = document.querySelectorAll('.producto');
    if ('IntersectionObserver' in window) {
        const productObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    productObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        productos.forEach(producto => {
            productObserver.observe(producto);
            producto.classList.add('animate-on-scroll');
        });
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        productos.forEach(producto => {
            producto.classList.add('visible');
        });
    }
    
    // Agregar estilos inline para la animación de scroll
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
    `;
    document.head.appendChild(style);
});

// Corregir función para el botón "VER CATÁLOGO"
document.addEventListener('DOMContentLoaded', function() {
    // Usar un selector más específico y buscar también los botones fijos
    const catalogButtons = document.querySelectorAll('a[href="#productos"]');
    
    catalogButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón catálogo clickeado'); // Para debug
            
            const productosSection = document.getElementById('productos');
            
            if (productosSection) {
                // Calcular posición con mayor precisión
                const navbar = document.querySelector('.navbar') || document.querySelector('.header-area');
                const navHeight = navbar ? navbar.offsetHeight : 70; // Valor por defecto si no encuentra la navbar
                
                console.log('Altura de navbar:', navHeight); // Para debug
                
                // Agregar un poco más de espacio para mejor visualización
                const yOffset = -navHeight - 20;
                const y = productosSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                // Usar requestAnimationFrame para un scroll más suave
                requestAnimationFrame(() => {
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                });
            }
        });
    });
});
