// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Scroll suave al hacer clic en los enlaces del menú
    const links = document.querySelectorAll('header nav ul li a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Ajustar para evitar la superposición del encabezado
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efectos adicionales (si se requieren en el futuro)
    console.log('Portafolio cargado correctamente.');
});
