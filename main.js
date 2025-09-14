// AOS Init
AOS.init({ duration: 1000, once: true });

// Dark/Light Mode Toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Modal (Popup)
const cards = document.querySelectorAll('.card');
const popupOverlay = document.getElementById('popup-overlay');
const popupTitle = document.getElementById('popup-title');
const popupVideo = document.getElementById('popup-video');
const popupDescription = document.getElementById('popup-description');
const popupClose = document.getElementById('popup-close');

cards.forEach(card => {
    card.addEventListener('click', () => {
        popupTitle.textContent = card.dataset.title;
        popupDescription.textContent = card.dataset.description;
        popupVideo.src = card.dataset.video;
        popupOverlay.classList.add('active');
    });
});

popupClose.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
    popupVideo.pause();
});

popupOverlay.addEventListener('click', e => {
    if(e.target === popupOverlay){
        popupOverlay.classList.remove('active');
        popupVideo.pause();
    }
});
