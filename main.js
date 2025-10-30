// main.js - Interactividad del CV
document.addEventListener('DOMContentLoaded', function () {
    // Lista de habilidades técnicas
    const skills = [
        'Python', 'C++', 'Ladder (PLC)', 'Arduino',
        'SolidWorks', 'AutoCAD', 'Impresión 3D',
        'Klipper / OrcaSlicer', 'Raspberry Pi', 'ESP32',
        'MATLAB/Simulink', 'Linux'
    ];

    // Insertar badges dinámicamente
    const container = document.querySelector('.skills-container');
    skills.forEach(skill => {
        const badge = document.createElement('span');
        badge.className = 'skill-badge';
        badge.textContent = skill;
        container.appendChild(badge);
    });

    // Smooth scroll para anclas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Tooltip para badges de certificación
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});