// Sistema centralizado de control de tema
(function() {
    'use strict';
    
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');
    
    // Función para aplicar tema
    function applyTheme(isDark) {
        if (isDark) {
            body.setAttribute('data-theme', 'dark');
            if (icon) icon.className = 'bi bi-moon-fill';
            if (text) text.textContent = 'Modo Oscuro';
        } else {
            body.removeAttribute('data-theme');
            if (icon) icon.className = 'bi bi-sun-fill';
            if (text) text.textContent = 'Modo Claro';
        }
    }
    
    // Modo del sistema operativo (claro u oscuro)
    const mediaOscuro = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    // Inicializar tema: 1) lo que eligió el visitante (localStorage),
    // 2) si nunca lo eligió, el modo del sistema operativo
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            // Si hay tema guardado, usar ese
            applyTheme(savedTheme === 'dark');
        } else {
            // Sin elección guardada: seguir el modo del sistema
            applyTheme(mediaOscuro ? mediaOscuro.matches : false);
        }
    }

    // Inicializar tema inmediatamente
    initializeTheme();

    // Si el visitante no ha elegido tema, seguir los cambios del sistema en vivo
    if (mediaOscuro) {
        const seguirSistema = (e) => {
            if (!localStorage.getItem('theme')) applyTheme(e.matches);
        };
        if (mediaOscuro.addEventListener) mediaOscuro.addEventListener('change', seguirSistema);
        else if (mediaOscuro.addListener) mediaOscuro.addListener(seguirSistema);
    }
    
    // Toggle manual de tema
    themeToggle.addEventListener('click', () => {
        const isDark = body.hasAttribute('data-theme');
        
        if (isDark) {
            applyTheme(false);
            localStorage.setItem('theme', 'light');
        } else {
            applyTheme(true);
            localStorage.setItem('theme', 'dark');
        }
    });
    
})();
