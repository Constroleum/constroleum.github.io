document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('hero-video');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Control del video
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    // Control del menú hamburguesa
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
    });


  // Seleccionar todos los ítems de la galería
  const items = document.querySelectorAll(".gallery .item");

  items.forEach((item) => {
    // Obtener la URL de fondo
    const bgImage = item.style.backgroundImage;

    // Extraer el nombre del archivo
    const fileName = bgImage.match(/\/([^\/]+)\.jpeg/)[1]; // Captura el nombre del archivo sin la extensión

    // Asignar el nombre del archivo al título
    item.querySelector(".title").textContent = fileName.replace(/_/g, " "); // Reemplazar guiones bajos con espacios
  });
})
