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

    // Animate gallery items
    gsap.to(".art-item", {
        duration: 1,
        scale: 1,
        opacity: 1,
        stagger: 0.2,
        delay: 0.5,
        ease: "power3.out"
    });
});