document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('[id]');
    const navLinks = document.querySelectorAll('.sidebar-content a');
    
    console.log('Found elements with IDs:', sections.length);
    console.log('Found nav links:', navLinks.length);
    
    sections.forEach(section => {
        console.log('Found ID:', section.getAttribute('id'));
    });
    
    function highlightActiveSection() {
        const scrollPos = window.pageYOffset || window.scrollY;
        const windowHeight = window.innerHeight;
        
        let currentSection = '';
        let closestDistance = Infinity;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            
            const distanceFromTop = Math.abs(scrollPos - sectionTop + 150);            
            if (distanceFromTop < closestDistance && scrollPos >= sectionTop - 300) {
                closestDistance = distanceFromTop;
                currentSection = sectionId;
            }
        });
        
        console.log('Active Section:', currentSection);
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
                console.log('✓ Activated link:', href);
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

