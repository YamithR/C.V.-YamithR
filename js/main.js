document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('project-search');
    const clearSearch = document.getElementById('clear-search');
    const projectSlides = document.querySelectorAll('.project-slide');

    // Habilidades técnicas
    const skills = [
        'Python', 'C++', 'Ladder (PLC)', 'Arduino',
        'SolidWorks', 'AutoCAD', 'Impresión 3D',
        'Klipper / OrcaSlicer', 'Raspberry Pi', 'ESP32',
        'MATLAB/Simulink', 'Linux', 'HTML/CSS', 'Tinkercad', 'Git/GitHub',
        'Microsoft Office', 'Inkscape', 'Fritzing', 'OrcaSlicer', 'Onshape', 'Proteus'
    ];

    const container = document.querySelector('.skills-container');
    skills.forEach(skill => {
        const badge = document.createElement('span');
        badge.className = 'skill-badge';
        badge.textContent = skill;
        container.appendChild(badge);
    });

    // SLIDER DE PROYECTOS
    class ProjectSlider {
        constructor() {
            this.currentSlide = 0;
            this.wrapper = document.querySelector('.slider-wrapper');
            this.prevBtn = document.querySelector('.prev-btn');
            this.nextBtn = document.querySelector('.next-btn');
            this.indicators = document.querySelectorAll('.indicator');
            this.allSlides = document.querySelectorAll('.project-slide');
            
            this.init();
        }
        
        init() {
            this.updateVisibleSlides();
            
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
            
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });
            
            // Auto-play
            this.autoPlayDelay = 5000;
            this.startAutoPlay = () => {
                this.stopAutoPlay();
                this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
            };
            this.stopAutoPlay = () => {
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                    this.autoPlayInterval = null;
                }
            };

            // Iniciar autoplay
            this.startAutoPlay();

            // Pausar al hover y reanudar al salir
            if (this.wrapper) {
                this.wrapper.addEventListener('mouseenter', () => this.stopAutoPlay());
                this.wrapper.addEventListener('mouseleave', () => this.startAutoPlay());
            }

            // Pausar al interactuar con botones/indicadores y reanudar después
            const interactiveElems = [this.prevBtn, this.nextBtn, ...Array.from(this.indicators)];
            interactiveElems.forEach(el => {
                if (!el) return;
                el.addEventListener('click', () => {
                    this.stopAutoPlay();
                    setTimeout(() => this.startAutoPlay(), 1000);
                });
            });

            // Pausar cuando la pestaña no está visible
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) this.stopAutoPlay();
                else this.startAutoPlay();
            });
        }
        
        updateVisibleSlides() {
            this.visibleSlides = Array.from(this.allSlides).filter(slide => !slide.classList.contains('hidden'));
            this.totalSlides = this.visibleSlides.length;
            
            // Update indicators
            this.indicators.forEach((indicator, index) => {
                if (index < this.totalSlides) {
                    indicator.style.display = 'block';
                } else {
                    indicator.style.display = 'none';
                }
            });
            
            // Adjust current slide if needed
            if (this.currentSlide >= this.totalSlides && this.totalSlides > 0) {
                this.currentSlide = 0;
            }
            
            this.updateSlider();
        }
        
        goToSlide(slideIndex) {
            if (slideIndex < this.totalSlides) {
                this.currentSlide = slideIndex;
                this.updateSlider();
            }
        }
        
        nextSlide() {
            if (this.totalSlides > 0) {
                this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                this.updateSlider();
            }
        }
        
        prevSlide() {
            if (this.totalSlides > 0) {
                this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.updateSlider();
            }
        }
        
        updateSlider() {
            if (this.totalSlides === 0) return;
            
            // Calculate position based on visible slides
            let position = 0;
            for (let i = 0; i < this.currentSlide && i < this.visibleSlides.length; i++) {
                position += 100;
            }
            
            this.wrapper.style.transform = `translateX(-${position}%)`;
            
            // Actualizar indicadores
            this.indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentSlide);
            });
        }
    }
    
    // Inicializar slider
    const slider = new ProjectSlider();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Animación de volteo de imagen de perfil
    const profileContainer = document.querySelector('.profile-image-container');
    if (profileContainer) {
        // Giro automático después de 1.5 segundos
        setTimeout(() => {
            profileContainer.classList.add('flipped');
        }, 1500);

        // Mantener la funcionalidad de giro al hacer clic
        profileContainer.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    }
    // Búsqueda de proyectos
    function filterProjects() {
        const query = searchInput.value.toLowerCase().trim();
        projectSlides.forEach(slide => {
            const title = slide.querySelector('.project-content h5').textContent.toLowerCase();
            const description = slide.querySelector('.project-description').textContent.toLowerCase();
            const tags = slide.getAttribute('data-tags') ? slide.getAttribute('data-tags').toLowerCase() : '';
            
            if (query === '' || title.includes(query) || description.includes(query) || tags.includes(query)) {
                slide.classList.remove('hidden');
            } else {
                slide.classList.add('hidden');
            }
        });
        
        // Update slider after filtering
        slider.updateVisibleSlides();
    }

    searchInput.addEventListener('input', filterProjects);

    // Limpiar búsqueda
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        projectSlides.forEach(slide => slide.classList.remove('hidden'));
        slider.updateVisibleSlides();
        searchInput.focus();
    });





});
        