const media = [
    'assets/foto1.jpg', 'assets/foto2.jpg', 'assets/foto3.jpg', 'assets/foto4.jpg', 'assets/foto5.jpg',
    'assets/foto6.jpg', 'assets/foto7.jpg', 'assets/foto8.jpg', 'assets/foto9.jpg', 'assets/foto10.jpg',
    'assets/video1.MOV', 'assets/video2.MOV', 'assets/video3.MOV', 'assets/video4.mp4'
];

const mediaType = [
    'image', 'image', 'image', 'image', 'image', 'image', 'image', 'image', 'image', 'image',
    'video', 'video', 'video', 'video'
];

let currentIndex = 0;

const surpriseButton = document.getElementById('surpriseButton');
const carouselContainer = document.getElementById('carousel-container');
const mediaDisplay = document.getElementById('media-display');
const backgroundMusic = document.getElementById('backgroundMusic');

function showMedia(index) {
    mediaDisplay.innerHTML = ''; // Limpa o conteúdo anterior

    if (mediaType[index] === 'image') {
        const imgElement = document.createElement('img');
        imgElement.src = media[index];
        imgElement.alt = `Imagem ${index + 1}`;
        mediaDisplay.appendChild(imgElement);
    } else if (mediaType[index] === 'video') {
        const videoElement = document.createElement('video');
        videoElement.src = media[index];
        videoElement.controls = true;
        mediaDisplay.appendChild(videoElement);
    }
}

// Função para soltar confetes
function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Modificação no evento de clique no botão de surpresa
surpriseButton.addEventListener('click', () => {
    carouselContainer.style.display = 'block';  // Exibe o carrossel
    showMedia(currentIndex);  // Mostra a primeira mídia
    launchConfetti();  // Solta confetes

    // Toca a música automaticamente
    const audio = new Audio('assets/cheiro_de_shampoo.m4a');
    audio.play();
});

// Navegação no carrossel
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        showMedia(currentIndex);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentIndex < media.length - 1) {
        currentIndex++;
        showMedia(currentIndex);
    }
});

let startX = 0;
let endX = 0;

// Detectar início do toque
carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

// Detectar movimento do toque
carouselContainer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});

// Detectar final do toque
carouselContainer.addEventListener('touchend', () => {
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {  // Verificar se o swipe é longo o suficiente
        if (diffX > 0) {
            // Swipe para a esquerda (próxima mídia)
            nextMedia();
        } else {
            // Swipe para a direita (mídia anterior)
            prevMedia();
        }
    }
});

// Função para mostrar a próxima mídia
function nextMedia() {
    currentIndex = (currentIndex + 1) % media.length;
    showMedia(currentIndex);
}

// Função para mostrar a mídia anterior
function prevMedia() {
    currentIndex = (currentIndex - 1 + media.length) % media.length;
    showMedia(currentIndex);
}
