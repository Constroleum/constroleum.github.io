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
  
    galleryItems.forEach(item => {
      const overlay = item.querySelector('.overlay');
      const button = item.querySelector('.btn-offer');
  
      if (overlay) {
        // Evento para abrir el modal desde el overlay
        overlay.addEventListener('click', (event) => {
          // Verificar si el clic fue en el botón y evitar abrir el modal
          if (event.target.closest('.btn-offer')) {
            return; // Si se hace clic en el botón, no abrir el modal
          }
  
          const imgUrl = item.style.backgroundImage.slice(5, -2); // Extraer la URL de la imagen
          modal.style.display = "flex"; // Mostrar el modal
          modalImg.src = imgUrl; // Establecer la fuente de la imagen
        });
      }
  
      // Evento del botón "Contact for sale"
      if (button) {
        button.addEventListener('click', (event) => {
          event.stopPropagation(); // Detener la propagación del clic al overlay
          console.log('Botón "Contact for sale" clickeado.');
          // Aquí puedes añadir la lógica específica del botón
        });
      }
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
  