document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Cierra el menú móvil después de hacer clic en un enlace si está activo
                const navLinks = document.getElementById('navLinks');
                // Solo cerrar si estamos en vista móvil (ancho menor o igual a 768px)
                if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Mobile Navigation Toggle (Hamburger Menu)
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Dark Mode Toggle Logic
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const darkModeIcon = darkModeToggle.querySelector('i');

    // Function to apply dark mode and update icon/localStorage
    function applyDarkMode(enable) {
        if (enable) {
            body.classList.add('dark-mode');
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'true');
        } else {
            body.classList.remove('dark-mode');
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'false');
        }
    }

    // Check for saved dark mode preference on page load
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode === 'true') {
        applyDarkMode(true);
    } else if (savedDarkMode === null) {
        // If no preference is saved, check system preference (e.g., Windows Dark Mode)
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyDarkMode(true);
        } else {
            // Default to light mode if no preference and system is light
            applyDarkMode(false);
        }
    } else {
        // Explicitly saved as 'false' (light mode)
        applyDarkMode(false);
    }


    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isCurrentlyDarkMode = body.classList.contains('dark-mode');
            applyDarkMode(!isCurrentlyDarkMode); // Toggle the mode
        });
    }

    // Simple form submission handler (client-side only)
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formMessages.textContent = 'Por favor, completa todos los campos.';
                formMessages.style.color = '#dc3545'; // Rojo para error
                return;
            }

            console.log('Formulario enviado:', { name, email, message });

            formMessages.textContent = '¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.';
            formMessages.style.color = '#28a745'; // Verde para éxito
            contactForm.reset(); // Limpia el formulario

            // Oculta el mensaje después de 5 segundos
            setTimeout(() => {
                formMessages.textContent = '';
                formMessages.style.color = ''; // Resetea el color
            }, 5000);
        });
    }
});

// Scroll Spy - Resaltar enlace activo según sección visible
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

function scrollSpy() {
    let scrollPos = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
        const top = section.offsetTop - 100; // Ajusta 100px para considerar el header fijo
        const bottom = top + section.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
            const id = section.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', scrollSpy);

// Ejecutar al cargar la página para marcar la sección inicial
scrollSpy();




// Enviar Email 

const contactForm = document.getElementById('contact-form');
const formMessages = document.getElementById('form-messages');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formMessages.textContent = 'Por favor, completa todos los campos.';
        formMessages.style.color = '#dc3545';
        return;
    }

    emailjs.send('service_1c6ktpb', 'template_jivjw8d', {
        from_name: name,
        from_email: email,
        message: message
    }).then(() => {
        formMessages.textContent = '¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.';
        formMessages.style.color = '#28a745';
        contactForm.reset();
        setTimeout(() => {
            formMessages.textContent = '';
        }, 5000);
    }).catch((error) => {
        console.error('Error al enviar el mensaje:', error);
        formMessages.textContent = 'Error al enviar el mensaje. Intenta de nuevo más tarde.';
        formMessages.style.color = '#dc3545';
    });
});
