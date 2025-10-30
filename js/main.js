document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');

    // Habilidades técnicas
    const skills = [
        'Python', 'C++', 'Ladder (PLC)', 'Arduino',
        'SolidWorks', 'AutoCAD', 'Impresión 3D',
        'Klipper / OrcaSlicer', 'Raspberry Pi', 'ESP32',
        'MATLAB/Simulink', 'Linux'
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
            this.totalSlides = 4;
            this.wrapper = document.querySelector('.slider-wrapper');
            this.prevBtn = document.querySelector('.prev-btn');
            this.nextBtn = document.querySelector('.next-btn');
            this.indicators = document.querySelectorAll('.indicator');
            
            this.init();
        }
        
        init() {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
            
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });
            
            // Auto-play (opcional)
            // setInterval(() => this.nextSlide(), 5000);
        }
        
        goToSlide(slideIndex) {
            this.currentSlide = slideIndex;
            this.updateSlider();
        }
        
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
            this.updateSlider();
        }
        
        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
            this.updateSlider();
        }
        
        updateSlider() {
            const translateX = -this.currentSlide * 100;
            this.wrapper.style.transform = `translateX(${translateX}%)`;
            
            // Actualizar indicadores
            this.indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentSlide);
            });
        }
    }
    
    // Inicializar slider
    new ProjectSlider();

    // Aplicar tema según hora (6 AM - 6 PM claro)
    function applyThemeByHour() {
        const hour = new Date().getHours();
        const isDay = hour >= 6 && hour < 18;

        if (isDay) {
            body.removeAttribute('data-theme');
            icon.className = 'bi bi-sun-fill';
            text.textContent = 'Modo Claro';
        } else {
            body.setAttribute('data-theme', 'dark');
            icon.className = 'bi bi-moon-fill';
            text.textContent = 'Modo Oscuro';
        }
    }

    applyThemeByHour();

    // Cambio manual de tema
    themeToggle.addEventListener('click', () => {
        if (body.hasAttribute('data-theme')) {
            body.removeAttribute('data-theme');
            icon.className = 'bi bi-sun-fill';
            text.textContent = 'Modo Claro';
        } else {
            body.setAttribute('data-theme', 'dark');
            icon.className = 'bi bi-moon-fill';
            text.textContent = 'Modo Oscuro';
        }
    });

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
});