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
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024325/Post_Rat_Boy_zswm2w.jpg',
            title: 'Post Rat Boy',
            description: 'Personagem principal de uma série experimental sobre a vida urbana.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024326/Mode_sheet_Com_roupa_sem.cores_kd85hw.jpg',
            description: 'Design de moda com variações de trajes e expressões.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769033059/sem_titulo-1_nnrpgd.jpg',
            title: 'Sem Título 1',
            description: 'Exploração de forma e cor sem contexto definido.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024327/Teste_de_cores_q5u8mf.png',
            title: 'Teste de Cores',
            description: 'Estudo cromático para futuras composições digitais.'
        }
    ],
    fanarts: [
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024328/Fubuki_xhcaje.jpg',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024330/Gigi_Murin_2_ceb5vy.jpg',
            title: 'Gigi Murin',
            description: 'Interpretação colorida de uma personagem de anime popular.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769033183/saba_pela_boat_mjxifh.jpg',
            title: 'Sabá pela Boat',
            description: 'Pintura digital baseada num ambiente noturno relaxante.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024330/Teto_vocaloid_hlztsm.jpg',
            title: 'Sabá pela Boat',
            description: 'Pintura digital baseada num ambiente noturno relaxante.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024330/gura_v2_rsiyrt.jpg',
            title: 'Sabá pela Boat',
            description: 'Pintura digital baseada num ambiente noturno relaxante.'
        }
    ],
    animations: [
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/video/upload/f_auto,q_auto/v1769024318/Volei_Anima%C3%A7%C3%A3o_sfeamf.mp4',
            title: 'Sabá pela Boat',
            description: 'Pintura digital baseada num ambiente noturno relaxante.'
        }
    ],
    projects: [
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024323/cartaz_v5_ixburf.jpg',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024320/Artfight_karpos_ch9cyu.jpg',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769033337/cenario_1_v4_umyd3t.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024324/cenario_2__v2_nzqqsv.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024320/Color_script_entrada_com_karpos_c0jmc3.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024319/Cadeira_zm2grw.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024319/13_jg0qc8.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024319/24_rn0wjy.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/image/upload/f_auto,q_auto/v1769024320/27_phrba4.png',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/video/upload/f_auto,q_auto/v1769024331/Cena_1_spjfqj.mp4',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/video/upload/f_auto,q_auto/v1769024324/cena_2_u4brvw.mp4',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        },
        { 
            src: 'https://res.cloudinary.com/dhvqxlksv/video/upload/f_auto,q_auto/v1769024320/Cena05_v1_akc6bp.mp4',
            title: 'Fubuki',
            description: 'Fanart inspirada no universo de One Punch Man.'
        }
    ]
};

const artExpanded = document.querySelector('.art-expanded');
const artImg = artExpanded.querySelector('img');
const artTitle = artExpanded.querySelector('.art-title');
const artDescription = artExpanded.querySelector('.art-description');


function getVideoThumbnail(videoSrc) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.src = videoSrc;
        video.crossOrigin = 'anonymous'; // útil se estiver em HTTP
        video.muted = true;
        video.playsInline = true;
        video.currentTime = 0;

        video.addEventListener('loadeddata', () => {
            video.currentTime = 0; // garante que o primeiro frame está pronto
        });

        video.addEventListener('seeked', () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
        });

        video.addEventListener('error', () => reject('Erro ao carregar vídeo: ' + videoSrc));
    });
}

function clearHiddenGallery() {
    // remove only the art items inside the track
    hiddenTrack.querySelectorAll('.art-item').forEach(el => el.remove());
}

async function showGallery(category) {
    hideExpandedArt();
    const items = categoryMap[category] || [];
    clearHiddenGallery();

    history.pushState({ gallery: true }, '', '#gallery');
    isGalleryOpen = true;

    for (const item of items) {
        const artItem = document.createElement('div');
        artItem.classList.add('art-item');

        const isVideo = item.src.toLowerCase().endsWith('.mp4');
        if (isVideo) artItem.classList.add('video');

        const thumb = document.createElement('img');
        thumb.alt = item.title || '';

        if (isVideo) {
            try {
                thumb.src = await getVideoThumbnail(item.src);
            } catch (err) {
                console.error(err);
                thumb.src = 'assets/video-placeholder.png';
            }
        } else {
            thumb.src = encodeURI(item.src);
        }

        thumb.addEventListener('load', () => {
            const targetHeight = Math.min(400, Math.round(window.innerHeight * 0.6));
            const naturalW = thumb.naturalWidth;
            const naturalH = thumb.naturalHeight;

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

        artItem.appendChild(thumb);
        hiddenTrack.appendChild(artItem);

        artItem.addEventListener('click', () => showExpandedArt(item));
    }

    hiddenGallery.classList.add('active');
    hiddenGallery.setAttribute('aria-hidden', 'false');
    categoryBoxes.forEach(b => b.style.display = 'none');
}

function hideExpandedArt() {
    artExpanded.classList.remove('active');
    artExpanded.setAttribute('aria-hidden', 'true');
}

function showExpandedArt(item) {
    if (!artExpanded) return;

    const artExpandedLeft = artExpanded.querySelector('.art-expanded-left');
    artExpandedLeft.innerHTML = '';

    const isVideo = item.src.toLowerCase().endsWith('.mp4');

    if (isVideo) {
        const video = document.createElement('video');
        video.src = item.src;
        video.controls = true;
        // Permitir fullscreen, bloquear download e PiP
        video.setAttribute('controlsList', 'nodownload noremoteplayback');
        video.disablePictureInPicture = true;
        video.draggable = false;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '80vh';
        video.style.borderRadius = '12px';
        video.setAttribute('playsinline', '');
        
        // Bloquear clique direito
        video.addEventListener('contextmenu', (e) => e.preventDefault());
        video.addEventListener('dragstart', (e) => e.preventDefault());

        artExpandedLeft.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title || '';
        img.draggable = false;
        img.addEventListener('contextmenu', (e) => e.preventDefault());
        img.style.maxWidth = '100%';
        img.style.maxHeight = '80vh';
        img.style.borderRadius = '12px';
        artExpandedLeft.appendChild(img);
    }

    artTitle.textContent = item.title || '';
    artDescription.textContent = item.description || '';

    artExpanded.classList.add('active');
    artExpanded.setAttribute('aria-hidden', 'false');

    gsap.fromTo(artExpanded, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    artExpanded.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Bloqueio global clique-direito na galeria
hiddenGallery.addEventListener('contextmenu', e => e.preventDefault());

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
