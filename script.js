document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('hero-video');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.getElementById('closeBtn');
  
    // Control del video
    if (video) {
      video.addEventListener('click', () => {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
  
    // Control del menú hamburguesa
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open'); // Abrir o cerrar el menú
        hamburger.classList.toggle('active'); // Cambiar el estilo del icono hamburguesa
      });
    }
  
    // Obtener todos los ítems de la galería
    const galleryItems = document.querySelectorAll('.item');
  
    // Añadir un evento de clic a cada ítem
    galleryItems.forEach(item => {
      item.addEventListener('click', (event) => {
        const imgUrl = event.currentTarget.style.backgroundImage.slice(5, -2); // Extraer la URL de la imagen
  
        modal.style.display = "flex"; // Mostrar el modal
        modalImg.src = imgUrl; // Establecer la fuente de la imagen
      });
    });
  
    // Cerrar el modal al hacer clic en el botón de cierre
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = "none"; // Ocultar el modal
      });
    }
  
    // Cerrar el modal al hacer clic fuera de la imagen
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = "none"; // Ocultar el modal
      }
    });
  });
  