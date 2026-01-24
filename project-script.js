document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar-content a');

    // Derive section order from sidebar links so both Tabbit and Graft work.
    // Range-based highlighting: Solution stays active for the full block (including #solution, features, iframe).
    const sectionIds = Array.from(navLinks)
        .map(a => a.getAttribute('href'))
        .filter(href => href && href.startsWith('#'))
        .map(href => href.slice(1));

    function highlightActiveSection() {
        const scrollPos = window.pageYOffset || window.scrollY;
        let currentSection = sectionIds[0];

        for (let i = 0; i < sectionIds.length; i++) {
            const el = document.getElementById(sectionIds[i]);
            if (!el) continue;
            const sectionTop = el.offsetTop;
            const nextId = sectionIds[i + 1];
            const sectionBottom = nextId
                ? (document.getElementById(nextId)?.offsetTop ?? Infinity)
                : Infinity;

            if (scrollPos >= sectionTop - 100 && scrollPos < sectionBottom) {
                currentSection = sectionIds[i];
                break;
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection();

    //Carousels
    const carouselContainers = document.querySelectorAll('.slideshow-container');
    carouselContainers.forEach(container => {
        new Carousel(container);
    });
});

// Multi-Carousel Support
class Carousel {
    constructor(container) {
        this.container = container;
        this.slideIndex = 1;
        this.slides = container.getElementsByClassName("mySlides");
        this.dots = container.parentElement.getElementsByClassName("dot");
        this.prevBtn = container.querySelector('.prev');
        this.nextBtn = container.querySelector('.next');
        
        // Bind event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.plusSlides(-1));
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.plusSlides(1));
        }
        
        // Bind dot clicks
        Array.from(this.dots).forEach((dot, index) => {
            dot.addEventListener('click', () => this.currentSlide(index + 1));
        });
        
        // Show first slide
        this.showSlides(this.slideIndex);
    }
    
    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }
    
    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }
    
    showSlides(n) {
        let i;
        
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        
        for (i = 0; i < this.slides.length; i++) {
            this.slides[i].style.display = "none";
        }
        
        for (i = 0; i < this.dots.length; i++) {
            this.dots[i].className = this.dots[i].className.replace(" active", "");
        }
        
        if (this.slides[this.slideIndex - 1]) {
            this.slides[this.slideIndex - 1].style.display = "block";
        }
        if (this.dots[this.slideIndex - 1]) {
            this.dots[this.slideIndex - 1].className += " active";
        }
    }
}

