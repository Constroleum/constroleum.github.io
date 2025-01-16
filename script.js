document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');

    const images = [
        heroSection.getAttribute('data-background'),
        heroSection.getAttribute('data-background-alt'),
        heroSection.getAttribute('data-background-alt-2')
    ];

    let currentImageIndex = 0;

    // Cambiar el fondo de la sección hero con efecto fade
    function changeBackground() {
        heroSection.classList.remove('fade-in');
        setTimeout(() => {
            heroSection.style.backgroundImage = `url(${images[currentImageIndex]})`;
            heroSection.classList.add('fade-in');
        }, 200); // Tiempo para permitir el fade-out
    }

    // Cambiar la imagen cada 5 segundos
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        changeBackground();
    }, 5000);

    // Inicializar el fondo con la primera imagen
    changeBackground();
});
