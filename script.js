document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. PRE-LOADER & SCROLL REVEAL --- */
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        window.addEventListener('load', () => {
            loader.classList.add('fade-out');
        });
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* --- 2. STICKY HEADER & BACK TO TOP --- */
    const stickyHeader = document.getElementById('sticky-header');
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Header show/hide logic
        if (stickyHeader) {
            stickyHeader.classList.toggle('show', scrollY > 200);
        }

        // Back to top button logic
        if (backToTopBtn) {
            backToTopBtn.classList.toggle('show', scrollY > 600);
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* --- 3. PRODUCT CAROUSEL & ZOOM --- */
    const zoomContainer = document.getElementById('carousel-zoom');
    const mainImg = document.getElementById('main-img');
    const thumbnails = document.querySelectorAll('.thumb');
    const images = ['BG.png', 'BG.png', 'BG.png', 'BG.png']; // Update these paths
    let currentIndex = 0;

    window.changeSlide = (direction) => {
        currentIndex += direction;
        if (currentIndex >= images.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = images.length - 1;
        updateCarousel();
    };

    window.setSlide = (index) => {
        currentIndex = index;
        updateCarousel();
    };

    function updateCarousel() {
        if (mainImg) {
            mainImg.src = images[currentIndex];
            mainImg.style.transform = "scale(1)";
        }
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    if (zoomContainer && mainImg) {
        zoomContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = zoomContainer.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            mainImg.style.transformOrigin = `${x}% ${y}%`;
            mainImg.style.transform = "scale(2)";
        });

        zoomContainer.addEventListener('mouseleave', () => {
            mainImg.style.transform = "scale(1)";
            mainImg.style.transformOrigin = "center center";
        });
    }

    /* --- 4. ACCORDION (GENUINE GRID FIX) --- */
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                accordionItems.forEach(el => el.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        }
    });

    /* --- 5. APPLICATION TRACK SLIDER --- */
    const track = document.getElementById('appsTrack');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let appIndex = 0;
    const cardWidth = 324; // Width (300) + Gap (24)

    if (track && nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            appIndex++;
            track.style.transition = "transform 0.6s ease";
            track.style.transform = `translateX(-${appIndex * cardWidth}px)`;
            if (appIndex >= 4) {
                setTimeout(() => {
                    track.style.transition = "none";
                    appIndex = 0;
                    track.style.transform = "translateX(0)";
                }, 600);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (appIndex <= 0) {
                track.style.transition = "none";
                appIndex = 4;
                track.style.transform = `translateX(-${appIndex * cardWidth}px)`;
                setTimeout(() => {
                    track.style.transition = "transform 0.6s ease";
                    appIndex--;
                    track.style.transform = `translateX(-${appIndex * cardWidth}px)`;
                }, 10);
            } else {
                appIndex--;
                track.style.transform = `translateX(-${appIndex * cardWidth}px)`;
            }
        });
    }

    /* --- 6. MODAL SYSTEM --- */
    const modals = document.querySelectorAll('.modal-overlay');
    
    window.openModal = (modalId) => {
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            targetModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeAllModals = () => {
        modals.forEach(m => m.style.display = 'none');
        document.body.style.overflow = 'auto';
    };

    // Global Modal Listeners
    document.querySelectorAll('.btn-primary, .quote-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.openModal('quoteModal');
        });
    });

    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.openModal('downloadModal');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) window.closeAllModals();
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', window.closeAllModals);
    });
});

/* --- 7. PROCESS TAB LOGIC (Independent function) --- */
const processData = [
    { title: "High-Grade Raw Material", desc: "Vacuum sizing tanks ensure precise outer diameter.", img: "raw-material.jpg" },
    { title: "Advanced Extrusion", desc: "Precision controlled extrusion heads shape the resin.", img: "extrusion.jpg" }
];

function showProcess(idx) {
    const btns = document.querySelectorAll('.tab-btn');
    const title = document.getElementById('process-title');
    const desc = document.getElementById('process-desc');
    
    btns.forEach(btn => btn.classList.remove('active'));
    if(btns[idx]) btns[idx].classList.add('active');

    if(title && desc && processData[idx]) {
        title.style.opacity = 0;
        desc.style.opacity = 0;
        setTimeout(() => {
            title.innerText = processData[idx].title;
            desc.innerText = processData[idx].desc;
            title.style.opacity = 1;
            desc.style.opacity = 1;
        }, 200);
    }
}

/* --- 8. carousel (Independent function) --- */
document.addEventListener('DOMContentLoaded', () => {
    const testTrack = document.getElementById('testimonialTrack');
    const nextTest = document.getElementById('nextTest');
    const prevTest = document.getElementById('prevTest');

    if (testTrack && nextTest && prevTest) {
        let testIndex = 0;
        const testCards = testTrack.querySelectorAll('.testimonial-card');
        
        // Function to move the track
        const updateTestSlider = () => {
            // Calculate width dynamically (Width + Gap)
            const cardStyle = window.getComputedStyle(testCards[0]);
            const marginRight = parseFloat(cardStyle.marginRight) || 30; 
            const moveWidth = testCards[0].offsetWidth + marginRight;
            
            testTrack.style.transform = `translateX(-${testIndex * moveWidth}px)`;
        };

        nextTest.addEventListener('click', () => {
            // Adjust '6' based on how many cards you want visible at once
            // If showing 3 cards, max index is total cards - 3
            if (testIndex < testCards.length - 1) {
                testIndex++;
            } else {
                testIndex = 0; // Loop back to start
            }
            updateTestSlider();
        });

        prevTest.addEventListener('click', () => {
            if (testIndex > 0) {
                testIndex--;
            } else {
                testIndex = testCards.length - 1; // Loop to end
            }
            updateTestSlider();
        });

        // Optional: Recalculate on window resize for mobile responsiveness
        window.addEventListener('resize', updateTestSlider);
    }
});