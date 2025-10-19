window.addEventListener('load', () => {
    // === Hero Title Animation ===
    const title = document.querySelector(".hero-title");
    
    if (title) {
        // Split the text into letters
        title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    
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

    // === Category Boxes Animation ===
    const boxes = document.querySelectorAll('.category-box');
    if (boxes.length > 0) {
        gsap.from(boxes, {
            duration: 0.8,
            opacity: 0,
            y: 40,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.6 // começa depois do título
        });
    }
});

let isGalleryOpen = false;

// gallery logic
const categoryBoxes = document.querySelectorAll('.category-box');
const hiddenGallery = document.querySelector('.hidden-gallery');
const hiddenTrack = document.querySelector('.hidden-gallery-track');
const backBtn = document.querySelector('.back-btn');

const categoryMap = {
    characters: [
        { 
            src: 'assets/Portifolio/Character desein/Post Rat Boy.jpg',
            title: 'Post Rat Boy',
            description: 'Personagem principal de uma série experimental sobre a vida urbana.'
        },
        { 
            src: 'assets/Portifolio/Character desein/Mode sheet Com roupa,sem.cores.jpg',
            title: 'Mode Sheet',
            description: 'Design de moda com variações de trajes e expressões.'
        },
        { 
            src: 'assets/Portifolio/Character desein/Sem Título-1.jpg',
            title: 'Sem Título 1',
            description: 'Exploração de forma e cor sem contexto definido.'
        },
        { 
            src: 'assets/Portifolio/Character desein/Teste de cores.png',
            title: 'Teste de Cores',
            description: 'Estudo cromático para futuras composições digitais.'
        }
    ],
    fanarts: [
        { 
            src: 'assets/Portifolio/Fanarts/Fubuki.jpg',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'assets/Portifolio/Fanarts/Gigi Murin 2.jpg',
            title: 'Gigi Murin',
            description: 'Interpretação colorida de uma personagem de anime popular.'
        },
        { 
            src: 'assets/Portifolio/Fanarts/Sabá pela boat.jpg',
            title: 'Sabá pela Boat',
            description: 'Pintura digital baseada num ambiente noturno relaxante.'
        },
        { 
            src: 'assets/Portifolio/Fanarts/Teto vocaloid.jpg',
            title: 'Sabá pela Boat',
            description: 'Pintura digital baseada num ambiente noturno relaxante.'
        },
        { 
            src: 'assets/Portifolio/Fanarts/gura v2.jpg',
            title: 'Sabá pela Boat',
            description: 'Pintura digital baseada num ambiente noturno relaxante.'
        }
    ],
    animation: [
        { 
            src: 'assets/Portifolio/Animations/Volei Animação.mp4',
            title: 'Sabá pela Boat',
            description: 'Pintura digital baseada num ambiente noturno relaxante.'
        }
    ],
    projects: [
        { 
            src: 'assets/Portifolio/Bad Bet/cartaz_v5.jpg',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'assets/Portifolio/Bad Bet/Artfight karpos.jpg',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'assets/Portifolio/Bad Bet/cenário 1_v4.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'assets/Portifolio/Bad Bet/cenario 2 _v2.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'assets/Portifolio/Bad Bet/Color script entrada com karpos.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'assets/Portifolio/Bad Bet/Cadeira.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'assets/Portifolio/Bad Bet/13.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'assets/Portifolio/Bad Bet/24.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'assets/Portifolio/Bad Bet/27.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'assets/Portifolio/Bad Bet/Cena 1.mp4',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'assets/Portifolio/Bad Bet/Cena 2.mp4',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'assets/Portifolio/Bad Bet/Cena05_v1.mp4',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        }
    ]
};

const artExpanded = document.querySelector('.art-expanded');
const artImg = artExpanded.querySelector('img');
const artTitle = artExpanded.querySelector('.art-title');
const artDescription = artExpanded.querySelector('.art-description');


function clearHiddenGallery() {
    // remove only the art items inside the track
    hiddenTrack.querySelectorAll('.art-item').forEach(el => el.remove());
}

function showGallery(category) {
    hideExpandedArt(); // já tinhas isto
    const images = categoryMap[category] || [];
    clearHiddenGallery();

    // Atualiza o histórico: adiciona um novo estado
    history.pushState({ gallery: true }, '', '#gallery');

    isGalleryOpen = true;

    images.forEach(art => {
        const artItem = document.createElement('div');
        artItem.classList.add('art-item');

        const img = document.createElement('img');
        img.src = encodeURI(art.src);
        img.alt = art.title || '';

        img.addEventListener('load', () => {
            const targetHeight = Math.min(400, Math.round(window.innerHeight * 0.6));
            const naturalW = img.naturalWidth;
            const naturalH = img.naturalHeight;

            if (naturalW && naturalH) {
                const computedWidth = Math.round((naturalW / naturalH) * targetHeight);
                artItem.style.height = `${targetHeight}px`;
                artItem.style.width = `${computedWidth}px`;
            } else {
                artItem.style.height = `${targetHeight}px`;
                artItem.style.width = `${targetHeight}px`;
            }

            gsap.to(artItem, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" });
        });

        artItem.appendChild(img);
        hiddenTrack.appendChild(artItem);
        artItem.addEventListener('click', () => showExpandedArt(art));
    });

    hiddenGallery.classList.add('active');
    hiddenGallery.setAttribute('aria-hidden', 'false');
    categoryBoxes.forEach(b => b.style.display = 'none');

    gsap.fromTo('.art-item', { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" });
}

function hideExpandedArt() {
    artExpanded.classList.remove('active');
    artExpanded.setAttribute('aria-hidden', 'true');
}

function showExpandedArt(art) {
    if (!artExpanded) return;

    artImg.src = art.src;
    artTitle.textContent = art.title || '';
    artDescription.textContent = art.description || '';

    artExpanded.classList.add('active');
    artExpanded.setAttribute('aria-hidden', 'false');

    // animação suave de fade-in
    gsap.fromTo(artExpanded, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });

    // scroll suave até ao painel
    artExpanded.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

function goBackToCategories() {
    hiddenGallery.classList.remove('active');
    hiddenGallery.setAttribute('aria-hidden', 'true');
    clearHiddenGallery();
    hideExpandedArt();

    categoryBoxes.forEach((b, i) => {
        b.style.display = 'block';
        b.style.transform = '';
    });

    gsap.fromTo(categoryBoxes, { opacity: 0 }, { opacity: 1, duration: 0.45, stagger: 0.08 });

    isGalleryOpen = false;
}

// Back button
backBtn.addEventListener('click', () => {
    history.back(); // simula o clique no botão "back" do rato
});

// botão Back do rato / browser
window.addEventListener('popstate', (event) => {
    if (isGalleryOpen) {
        goBackToCategories();
    }
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
