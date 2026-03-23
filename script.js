
document.addEventListener('DOMContentLoaded', () => {
    // 1. Pre-loader Logic
    const loader = document.getElementById('loader-wrapper');
    window.addEventListener('load', () => {
        loader.classList.add('fade-out');
    });

    // 2. Scroll Reveal Observer
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1 // Triggers when 10% of element is visible
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ELEMENTS
    const stickyHeader = document.getElementById('sticky-header');
    const zoomContainer = document.getElementById('carousel-zoom');
    const mainImg = document.getElementById('main-img');
    const thumbnails = document.querySelectorAll('.thumb');

    // 2. CONFIGURATION
    const images = [
        'BG.png', 
        'BG.png',
        'BG.png',
        'BG.png',
        
    ]; 
    let currentIndex = 0;

    // --- STICKY HEADER LOGIC ---
 document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ELEMENTS
    const stickyHeader = document.getElementById('sticky-header');
    const zoomContainer = document.getElementById('carousel-zoom');
    const mainImg = document.getElementById('main-img');
    const thumbnails = document.querySelectorAll('.thumb');

    // 2. CONFIGURATION
    const images = [
        'BG.png', 
        'BG.png',
        'BG.png',
        'BG.png',
        
    ]; 
    let currentIndex = 0;

    // --- STICKY HEADER LOGIC ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            stickyHeader.classList.add('show');
        } else {
            stickyHeader.classList.remove('show');
        }
    });

    // --- INFINITE CAROUSEL LOGIC ---
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
        // Change image
        mainImg.src = images[currentIndex];
        
        // Reset zoom state immediately on image change to prevent "jumping"
        mainImg.style.transform = "scale(1)";
        
        // Sync Thumbnails
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    // --- ZOOM EFFECT LOGIC ---
    // We attach this to the CONTAINER so it works even after the image src changes
    zoomContainer.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = zoomContainer.getBoundingClientRect();
        
        // Calculate mouse position relative to container in %
        // Using pageX/pageY to account for any scrolling
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        // Apply transformation
        mainImg.style.transformOrigin = `${x}% ${y}%`;
        mainImg.style.transform = "scale(2)"; // Change to 2.5 for more zoom
    });

    zoomContainer.addEventListener('mouseleave', () => {
        mainImg.style.transform = "scale(1)";
        mainImg.style.transformOrigin = "center center";
    });
});

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const parent = header.parentElement;
        const isActive = parent.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle the clicked item
        if (!isActive) {
            parent.classList.add('active');
        }
    });
});

const track = document.getElementById('appsTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let index = 0;
const cardWidth = 300 + 24; // Card width + Gap

nextBtn.addEventListener('click', () => {
    index++;
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    // Assuming you have 4 original cards
    if (index >= 4) {
        setTimeout(() => {
            track.style.transition = "none";
            index = 0;
            track.style.transform = "translateX(0)";
        }, 600);
    }
});

prevBtn.addEventListener('click', () => {
    if (index <= 0) {
        track.style.transition = "none";
        index = 4; // Jump to clone
        track.style.transform = `translateX(-${index * cardWidth}px)`;
        
        setTimeout(() => {
            track.style.transition = "transform 0.6s ease";
            index--;
            track.style.transform = `translateX(-${index * cardWidth}px)`;
        }, 10);
    } else {
        index--;
        track.style.transform = `translateX(-${index * cardWidth}px)`;
    }
});

const processData = [
    {
        title: "High-Grade Raw Material Selection",
        desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness.",
        img: "raw-material.jpg"
    },
    {
        title: "Advanced Extrusion Process",
        desc: "Precision controlled extrusion heads melt and shape the HDPE resin into high-strength piping.",
        img: "extrusion.jpg"
    }
    // Add more objects here for each tab...
];

function showProcess(index) {
    // 1. Update active button
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    btns[index].classList.add('active');

    // 2. Update Content
    const title = document.getElementById('process-title');
    const desc = document.getElementById('process-desc');
    const img = document.getElementById('process-img');

    // Smooth transition effect
    title.style.opacity = 0;
    desc.style.opacity = 0;
    
    setTimeout(() => {
        title.innerText = processData[index].title;
        desc.innerText = processData[index].desc;
        // img.src = processData[index].img;
        
        title.style.opacity = 1;
        desc.style.opacity = 1;
    }, 200);
}

const testTrack = document.getElementById('testimonialTrack');
const nextTest = document.getElementById('nextTest');
const prevTest = document.getElementById('prevTest');

let testIndex = 0;
const testCardWidth = 393 + 30; // Width + Gap

nextTest.addEventListener('click', () => {
    testIndex++;
    testTrack.style.transition = "transform 0.6s ease";
    testTrack.style.transform = `translateX(-${testIndex * testCardWidth}px)`;

    // If we've reached the end of the original cards (e.g., 4 cards)
    if (testIndex >= 4) {
        setTimeout(() => {
            testTrack.style.transition = "none";
            testIndex = 0;
            testTrack.style.transform = "translateX(0)";
        }, 600);
    }
});

prevTest.addEventListener('click', () => {
    if (testIndex <= 0) {
        testTrack.style.transition = "none";
        testIndex = 4;
        testTrack.style.transform = `translateX(-${testIndex * testCardWidth}px)`;
        
        setTimeout(() => {
            testTrack.style.transition = "transform 0.6s ease";
            testIndex--;
            testTrack.style.transform = `translateX(-${testIndex * testCardWidth}px)`;
        }, 10);
    } else {
        testIndex--;
        testTrack.style.transform = `translateX(-${testIndex * testCardWidth}px)`;
    }
});



    // --- INFINITE CAROUSEL LOGIC ---
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
        // Change image
        mainImg.src = images[currentIndex];
        
        // Reset zoom state immediately on image change to prevent "jumping"
        mainImg.style.transform = "scale(1)";
        
        // Sync Thumbnails
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    // --- ZOOM EFFECT LOGIC ---
    // We attach this to the CONTAINER so it works even after the image src changes
    zoomContainer.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = zoomContainer.getBoundingClientRect();
        
        // Calculate mouse position relative to container in %
        // Using pageX/pageY to account for any scrolling
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        // Apply transformation
        mainImg.style.transformOrigin = `${x}% ${y}%`;
        mainImg.style.transform = "scale(2)"; // Change to 2.5 for more zoom
    });

    zoomContainer.addEventListener('mouseleave', () => {
        mainImg.style.transform = "scale(1)";
        mainImg.style.transformOrigin = "center center";
    });
});

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const parent = header.parentElement;
        const isActive = parent.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle the clicked item
        if (!isActive) {
            parent.classList.add('active');
        }
    });
});

const track = document.getElementById('appsTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let index = 0;
const cardWidth = 300 + 24; // Card width + Gap

nextBtn.addEventListener('click', () => {
    index++;
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    // Assuming you have 4 original cards
    if (index >= 4) {
        setTimeout(() => {
            track.style.transition = "none";
            index = 0;
            track.style.transform = "translateX(0)";
        }, 600);
    }
});

prevBtn.addEventListener('click', () => {
    if (index <= 0) {
        track.style.transition = "none";
        index = 4; // Jump to clone
        track.style.transform = `translateX(-${index * cardWidth}px)`;
        
        setTimeout(() => {
            track.style.transition = "transform 0.6s ease";
            index--;
            track.style.transform = `translateX(-${index * cardWidth}px)`;
        }, 10);
    } else {
        index--;
        track.style.transform = `translateX(-${index * cardWidth}px)`;
    }
});

const processData = [
    {
        title: "High-Grade Raw Material Selection",
        desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness.",
        img: "raw-material.jpg"
    },
    {
        title: "Advanced Extrusion Process",
        desc: "Precision controlled extrusion heads melt and shape the HDPE resin into high-strength piping.",
        img: "extrusion.jpg"
    }
    // Add more objects here for each tab...
];

function showProcess(index) {
    // 1. Update active button
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    btns[index].classList.add('active');

    // 2. Update Content
    const title = document.getElementById('process-title');
    const desc = document.getElementById('process-desc');
    const img = document.getElementById('process-img');

    // Smooth transition effect
    title.style.opacity = 0;
    desc.style.opacity = 0;
    
    setTimeout(() => {
        title.innerText = processData[index].title;
        desc.innerText = processData[index].desc;
        // img.src = processData[index].img;
        
        title.style.opacity = 1;
        desc.style.opacity = 1;
    }, 200);
}

const testTrack = document.getElementById('testimonialTrack');
const nextTest = document.getElementById('nextTest');
const prevTest = document.getElementById('prevTest');

let testIndex = 0;
const testCardWidth = 393 + 30; // Width + Gap

nextTest.addEventListener('click', () => {
    testIndex++;
    testTrack.style.transition = "transform 0.6s ease";
    testTrack.style.transform = `translateX(-${testIndex * testCardWidth}px)`;

    // If we've reached the end of the original cards (e.g., 4 cards)
    if (testIndex >= 4) {
        setTimeout(() => {
            testTrack.style.transition = "none";
            testIndex = 0;
            testTrack.style.transform = "translateX(0)";
        }, 600);
    }
});

prevTest.addEventListener('click', () => {
    if (testIndex <= 0) {
        testTrack.style.transition = "none";
        testIndex = 4;
        testTrack.style.transform = `translateX(-${testIndex * testCardWidth}px)`;
        
        setTimeout(() => {
            testTrack.style.transition = "transform 0.6s ease";
            testIndex--;
            testTrack.style.transform = `translateX(-${testIndex * testCardWidth}px)`;
        }, 10);
    } else {
        testIndex--;
        testTrack.style.transform = `translateX(-${testIndex * testCardWidth}px)`;
    }
});

const backToTopBtn = document.getElementById("backToTop");

const modal = document.getElementById('downloadModal');
const openModalBtn = document.querySelector('.download-btn'); // Targets your existing button
const closeModalBtn = document.getElementById('closeModal');

// Open Modal
openModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Stop background scrolling
});

// Close Modal (Clicking X)
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close Modal (Clicking outside the card)
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// --- Modal Controller ---

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Attach Listeners to your buttons
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. For "Request a Quote" buttons
    document.querySelectorAll('.btn-primary, .quote-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('quoteModal');
        });
    });

    // 2. For "Download Datasheet" button
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('downloadModal');
        });
    }

    // Close on background click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeAllModals();
        }
    });
});


window.addEventListener("scroll", () => {
    // Show button after scrolling down 600px
    if (window.pageYOffset > 600) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

// Smooth Scroll to Top Function
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

