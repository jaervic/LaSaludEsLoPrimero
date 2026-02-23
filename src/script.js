document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Animaciones al hacer Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px" // Margen de activación
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Si el elemento contiene contadores, iniciar animación
                if(entry.target.querySelector('.counter')) {
                    startCounters(entry.target);
                }
                
                observer.unobserve(entry.target); // Dejar de observar
            }
        });
    }, observerOptions);

    // Seleccionar elementos a animar
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-right, .slide-left');
    animatedElements.forEach(el => observer.observe(el));

    // 2. Animación de Contadores Numéricos
    let countersStarted = false;
    function startCounters(section) {
        if (countersStarted) return;
        countersStarted = true;

        const counters = section.querySelectorAll('.counter');
        const speed = 100; // Ajusta la velocidad

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Calcular incremento
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20); // Intervalo en ms
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // 3. Función de seguridad para prevenir inyección de código (XSS)
    const sanitizeHTML = (str) => {
        return str.replace(/[^\w. @-]/gi, function (c) {
            return '&#' + c.charCodeAt(0) + ';';
        });
    };

    // 4. Manejo Básico del Formulario e Integración con EmailJS
    const form = document.getElementById('mediaKitForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obteniendo y sanitizando los valores ingresados por el usuario
        const safeNombre = sanitizeHTML(document.getElementById('nombre').value);
        const safeClinica = sanitizeHTML(document.getElementById('clinica').value);
        const safeEmail = sanitizeHTML(document.getElementById('email').value);

        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        // Estado visual de carga
        btn.innerText = "Procesando...";
        btn.style.backgroundColor = "var(--teal)";
        btn.disabled = true;

        // ==========================================
        // === PASO 2: CÓDIGO REAL DE EMAILJS ===
        // Cuando configures tu cuenta en emailjs.com, DESCOMENTA todo 
        // este bloque de abajo y reemplaza tus IDs correspondientes.
        // ==========================================
        
        /*
        emailjs.sendForm('TU_SERVICE_ID', 'TU_TEMPLATE_ID', form)
            .then(() => {
                alert("¡Éxito! En breve recibirás el Media Kit y nos pondremos en contacto.");
                
                btn.innerText = "¡Enviado con éxito!";
                btn.style.backgroundColor = "#25D366";
                form.reset();
                
                // === PASO 3: DESCARGA AUTOMÁTICA DEL PDF ===
                // Descomenta la línea de abajo y pon la URL real de tu Media Kit en PDF
                // window.open('https://tudominio.com/ruta-de-tu-archivo/media-kit-la-salud-es-lo-1ero.pdf', '_blank');
                
                // Restaurar botón después de 4 segundos
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = "var(--orange)";
                    btn.disabled = false;
                }, 4000);

            }, (error) => {
                alert("Ocurrió un error al enviar tus datos. Por favor intenta de nuevo. Error: " + JSON.stringify(error));
                btn.innerText = originalText;
                btn.style.backgroundColor = "var(--orange)";
                btn.disabled = false;
            });
        */

        // ==========================================
        // === SIMULACIÓN ACTUAL DE ENVÍO ===
        // BORRA O COMENTA ESTE BLOQUE 'setTimeout' CUANDO ACTIVES EL CÓDIGO DE EMAILJS ARRIBA
        // ==========================================
        setTimeout(() => {
            alert("¡Modo Prueba! Conecta EmailJS en el archivo script.js para activar el envío de correos real.");
            
            // Restaurar estado visual
            btn.innerText = "¡Prueba finalizada!";
            btn.style.backgroundColor = "#25D366"; // Verde éxito
            form.reset();
            
            // Volver al texto original
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = "var(--orange)";
                btn.disabled = false;
            }, 3000);
        }, 1500);
        // ==========================================
    });
});