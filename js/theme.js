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
    
    // Inicializar tema según localStorage o hora del día
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            // Si hay tema guardado, usar ese
            applyTheme(savedTheme === 'dark');
        } else {
            // Si no hay tema guardado, usar hora del día (6 AM - 11 AM claro)
            const hour = new Date().getHours();
            const isDay = hour >= 6 && hour < 11;
            applyTheme(!isDay);
        }
    }
    
    // Inicializar tema inmediatamente
    initializeTheme();
    
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
