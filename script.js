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

  // Obtén los elementos de la galería y el modal
const galleryItems = document.querySelectorAll('.item');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.getElementById('closeBtn');

// Abre la ventana modal con la imagen clickeada
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imageUrl = item.getAttribute('data-image');
    modal.style.display = 'block';
    modalImg.src = imageUrl;
  });
});

// Cierra la ventana modal al hacer clic en el botón de cerrar
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cierra la ventana modal si el usuario hace clic fuera de la imagen
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

})
