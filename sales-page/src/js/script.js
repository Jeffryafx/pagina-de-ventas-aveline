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
