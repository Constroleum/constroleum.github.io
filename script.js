document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('hero-video');

    // Si deseas controlar el video de alguna manera (pausar, reproducir, etc.),
    // puedes añadir eventos como estos:

    // Por ejemplo, poner en pausa cuando el usuario hace clic en el video
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
});
