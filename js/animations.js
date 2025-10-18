window.addEventListener('load', () => {
    // Select the hero title
    const title = document.querySelector(".hero-title");
    
    if (title) {
        // Split the text into individual letters
        title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    
        // Animate each letter
        gsap.from(".letter", {
            duration: 1,
            y: 80,
            opacity: 0,
            stagger: 0.05,
            ease: "back.out(1.7)"
        });

        gsap.to(".hero-title", { 
            duration: 1.5, 
            opacity: 1, 
            ease: "power3.out" 
        });
    }
});

// gallery logic
const categoryBoxes = document.querySelectorAll('.category-box');
const hiddenGallery = document.querySelector('.hidden-gallery');
const hiddenTrack = document.querySelector('.hidden-gallery-track');
const backBtn = document.querySelector('.back-btn');

const categoryMap = {
    characters: [
        'assets/Portifolio/Character desein/Post Rat Boy.jpg',
        'assets/Portifolio/Character desein/Mode sheet Com roupa,sem.cores.jpg',
        'assets/Portifolio/Character desein/Sem Título-1.jpg',
        'assets/Portifolio/Character desein/Teste de cores.png'
    ],
    fanarts: [
        'assets/Portifolio/Fanarts/Fubuki.jpg',
        'assets/Portifolio/Fanarts/Gigi Murin 2.jpg',
        'assets/Portifolio/Fanarts/Sabá pela boat.jpg',
        'assets/Portifolio/Fanarts/Teto vocaloid.jpg',
        'assets/Portifolio/Fanarts/gura v2.jpg'
    ],
    animations: [
        'assets/Portifolio/Volei Animação.mp4'
    ],
    projects: [
        'assets/Portifolio/Bad Bet/cartaz_v5.jpg',
        'assets/Portifolio/Bad Bet/Artfight karpos.jpg',
        'assets/Portifolio/Bad Bet/cenário 1_v4.png',
        'assets/Portifolio/Bad Bet/cenario 2 _v2.png',
        'assets/Portifolio/Bad Bet/Color script entrada com karpos.png',
        'assets/Portifolio/Bad Bet/Cadeira.png',
        'assets/Portifolio/Bad Bet/13.png',
        'assets/Portifolio/Bad Bet/24.png',
        'assets/Portifolio/Bad Bet/27.png',
        'assets/Portifolio/Bad Bet/Cena 1.mp4',
        'assets/Portifolio/Bad Bet/Cena 2.mp4',
        'assets/Portifolio/Bad Bet/Cena05_v1.mp4'
    ]
};

function clearHiddenGallery() {
    // remove only the art items inside the track
    hiddenTrack.querySelectorAll('.art-item').forEach(el => el.remove());
}

function showGallery(category) {
    const images = categoryMap[category] || [];
    clearHiddenGallery();

    images.forEach(src => {
        const artItem = document.createElement('div');
        artItem.classList.add('art-item');

        const img = document.createElement('img');
        img.src = encodeURI(src);
        img.alt = '';

        // Espera que a imagem carregue para definir proporções
        img.addEventListener('load', () => {
            const naturalW = img.naturalWidth;
            const naturalH = img.naturalHeight;

            // Altura alvo (podes ajustar, 300px é bom para desktop)
            const targetHeight = Math.min(400, Math.round(window.innerHeight * 0.6));

            if (naturalW && naturalH) {
                const computedWidth = Math.round((naturalW / naturalH) * targetHeight);
                artItem.style.height = `${targetHeight}px`;
                artItem.style.width = `${computedWidth}px`;
            } else {
                // fallback se não conseguir ler dimensões
                artItem.style.height = `${targetHeight}px`;
                artItem.style.width = `${targetHeight}px`;
            }

            // Mostrar imagem com animação
            artItem.style.opacity = 0;
            artItem.style.transform = 'scale(0.95)';
            gsap.to(artItem, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" });
        });

        artItem.appendChild(img);
        hiddenTrack.appendChild(artItem);
    });

    // Mostrar galeria
    hiddenGallery.classList.add('active');
    hiddenGallery.setAttribute('aria-hidden', 'false');

    // Esconder categorias
    categoryBoxes.forEach(b => b.style.display = 'none');

    // Animação inicial da galeria
    const items = Array.from(hiddenTrack.querySelectorAll('.art-item'));
    gsap.fromTo(items, { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" });
}


categoryBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const category = box.dataset.category;
        // zoom clicked box first to give feedback
        gsap.to(box, {
            scale: 1.1,
            duration: 0.35,
            ease: "power2.out",
            onComplete: () => {
                // reset scale quickly
                gsap.set(box, { scale: 1 });
                showGallery(category);
            }
        });
    });
});

// Back button
backBtn.addEventListener('click', () => {
    // hide hidden gallery
    hiddenGallery.classList.remove('active');
    hiddenGallery.setAttribute('aria-hidden', 'true');

    // clear track
    clearHiddenGallery();

    // show category boxes again
    categoryBoxes.forEach((b, i) => {
        b.style.display = 'block';
        b.style.transform = '';
    });

    // animate opacity only on category boxes
    gsap.fromTo(categoryBoxes, { opacity: 0 }, { opacity: 1, duration: 0.45, stagger: 0.08 });
});


/* ---- Drag to scroll for .hidden-gallery-track (nice UX) ---- */
(function enableDragScroll() {
    const slider = document.querySelector('.hidden-gallery-track');
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active-drag');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active-drag'); });
    slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active-drag'); });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });

    // touch support
    let touchStartX = 0, touchScrollLeft = 0;
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX - slider.offsetLeft;
        touchScrollLeft = slider.scrollLeft;
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - touchStartX) * 1.5;
        slider.scrollLeft = touchScrollLeft - walk;
    }, { passive: true });
})();
