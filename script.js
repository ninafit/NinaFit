// Menu Toggle para dispositivos móviles
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Cerrar menú al hacer click fuera de él
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Animación al hacer scroll - Elementos aparecen gradualmente
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observar todas las secciones y tarjetas
const sections = document.querySelectorAll('section');
const cards = document.querySelectorAll('.benefit-card, .pricing-card, .testimonial-card');

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Clase para elementos visibles
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Scroll suave al hacer click en enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Cambiar estilo del header al hacer scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Agregar sombra al header cuando se hace scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Validación del formulario de contacto
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const plan = document.getElementById('plan').value;
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validación básica
        if (!nombre) {
            alert('Por favor ingresa tu nombre');
            return;
        }

        if (!email || !validateEmail(email)) {
            alert('Por favor ingresa un email válido');
            return;
        }

        // Crear mensaje para WhatsApp
        const whatsappNumber = '+18495330725'; // Reemplaza con el número real
        let whatsappMessage = `Hola Nina, soy ${nombre}.%0A`;
        whatsappMessage += `Email: ${email}%0A`;
        
        if (telefono) {
            whatsappMessage += `Teléfono: ${telefono}%0A`;
        }
        
        if (plan) {
            const planText = plan === 'basico' ? 'Plan Básico' : 'Plan Premium';
            whatsappMessage += `Me interesa: ${planText}%0A`;
        }
        
        if (mensaje) {
            whatsappMessage += `Mensaje: ${mensaje}`;
        }

        // Redirigir a WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

        // Limpiar formulario
        contactForm.reset();
    });
}

// Función para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Animación de contadores en las tarjetas de precios
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('es-MX');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('es-MX');
        }
    }, 30);
};

// Observar los precios para animarlos cuando sean visibles
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const amount = entry.target;
            const targetValue = parseInt(amount.textContent.replace(/,/g, ''));
            amount.textContent = '0';
            animateCounter(amount, targetValue);
            amount.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

const priceElements = document.querySelectorAll('.amount');
priceElements.forEach(price => {
    priceObserver.observe(price);
});

// Efecto parallax suave en el hero
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    });
}

// Botón para volver arriba (aparece al hacer scroll)
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-top-btn';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #ffb3c6;
        color: #000;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
};

createScrollTopButton();

// Efecto de escritura en el título del hero
const heroTitle = document.querySelector('.hero-text h2');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    // Iniciar efecto después de un pequeño delay
    setTimeout(typeWriter, 500);
}

// Cambiar el texto del CTA basado en la hora del día
const updateCTAText = () => {
    const ctaTitle = document.querySelector('.cta-content h2');
    if (ctaTitle) {
        const hour = new Date().getHours();
        let greeting = '¿Lista Para Transformar Tu Vida?';

        if (hour >= 5 && hour < 12) {
            greeting = '¡Buenos Días! ¿Lista Para Transformar Tu Vida?';
        } else if (hour >= 12 && hour < 19) {
            greeting = '¡Buenas Tardes! ¿Lista Para Transformar Tu Vida?';
        } else if (hour >= 19 || hour < 5) {
            greeting = '¡Buenas Noches! ¿Lista Para Transformar Tu Vida?';
        }

        ctaTitle.textContent = greeting;
    }
};

updateCTAText();

console.log('NinaFit - Website cargado exitosamente ✨');