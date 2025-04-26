document.addEventListener('DOMContentLoaded', () => {
    // Menú hamburguesa (código existente)
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const hamburgerMenu = document.getElementById('hamburger-menu');

    hamburgerBtn.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('open');
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (event) => {
        if (!hamburgerBtn.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            hamburgerMenu.classList.remove('open');
        }
    });

    // Funcionalidad de los botones de compra con redirección a WhatsApp
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', function() {
            const nombreProducto = this.getAttribute('data-producto');
            const precio = this.closest('.producto-info').querySelector('.precio').textContent;
            
            // Reemplaza este número con tu número de WhatsApp real (formato internacional sin el +)
            const numeroWhatsApp = '3006493668';
            
            // Crea el mensaje predefinido para WhatsApp
            const mensaje = `Hola, me interesa comprar el producto: ${nombreProducto} por ${precio}`;
            
            // Crea la URL de WhatsApp y redirige
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
            window.open(urlWhatsApp, '_blank');
        });
    });

    // Funcionalidad para los enlaces de contacto y hacer pedido
    const enlacesContacto = document.querySelectorAll('a[href="#contacto"]');
    
    enlacesContacto.forEach(enlace => {
        enlace.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
            
            const numeroWhatsApp = '3006493668';
            const mensaje = "Hola, estoy interesado/a en sus productos y me gustaría hacer un pedido.";
            
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
            window.open(urlWhatsApp, '_blank');
        });
    });

    // Animaciones de entrada
    function animateOnLoad() {
        // Animación del header
        document.querySelector('header').classList.add('animate');
        
        // Animación del hero
        const heroContent = document.querySelector('.hero-content');
        heroContent.querySelectorAll('h2, p, .btn').forEach((element, index) => {
            element.classList.add('fade-in-up');
            element.classList.add('animate', `delay-${index + 1}`);
        });
        
        // Animación de la imagen del hero
        const heroImage = document.querySelector('.hero-image');
        heroImage.classList.add('fade-in-up', 'animate', 'delay-3');
        
        // Iniciar la observación para los productos
        observeElements();
    }

    // Función para observar elementos y animarlos cuando son visibles
    function observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('productos-grid')) {
                        // Animar los productos secuencialmente
                        const productos = entry.target.querySelectorAll('.producto');
                        productos.forEach((producto, index) => {
                            setTimeout(() => {
                                producto.classList.add('animate');
                            }, index * 100); // 100ms de retraso entre cada producto
                        });
                    } else {
                        entry.target.classList.add('animate');
                    }
                    // Dejar de observar una vez que está animado
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger cuando al menos el 10% del elemento es visible
        });
        
        // Observar título de sección y grid de productos
        observer.observe(document.querySelector('.products h2'));
        observer.observe(document.querySelector('.productos-grid'));
    }

    // Ejecutar animaciones después de que la página ha cargado
    window.addEventListener('load', animateOnLoad);
});