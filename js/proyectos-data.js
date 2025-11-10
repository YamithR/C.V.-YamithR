// Configuración centralizada de proyectos
// Para mostrar un proyecto en la página principal (destacados), pon featured: true
// Para ocultarlo completamente de ambas páginas, pon visible: false

const proyectosData = [
    {
        id: 'simulador-bote',
        title: 'Simulador Mecánico Bote Fluvial',
        description: 'Prototipo a escala para ONIRIS-ID. Análisis de materiales, experimentación y validación técnica de simulador fluvial.',
        image: 'assets/img/SimuladorBote/DibujoPlataforma.png',
        video: 'assets/vid/SimuladorBote/Video.mp4',
        link: 'proyectos/Simulador_Mecánico_Bote_fluvial.html',
        tags: ['oniris-id', 'armada', 'prototipado', '3d printing', 'solidworks', 'mecatronica', 'simulador', 'bote', 'fluvial'],
        badges: [
            { text: 'ONIRIS-ID', class: 'bg-warning text-dark' },
            { text: 'Armada', class: 'bg-primary' },
            { text: 'Prototipado', class: 'bg-success' },
            { text: '3D Printing', class: 'bg-info' },
            { text: 'SolidWorks', class: 'bg-danger' },
            { text: 'Mecatronica', class: 'bg-secondary' }
        ],
        featured: true,  // ← Cambiar a false para quitar de destacados
        visible: true
    },
    {
        id: 'encoders-m250',
        title: 'Mecanismos de Encoders de M2.50',
        description: 'Diseño, impresión e implementación de mecanismos de encoders para ejes X Y de Simulador de Ametralladora M2.50.',
        image: 'assets/img/MecanismoEncoders/M2-VistaIsometrica.png',
        video: 'assets/vid/MecanismosEncoders/video.mp4',
        link: 'proyectos/Mecanismos_de_Encoders_de_M2.50.html',
        tags: ['oniris-id', 'armada', '3d printing', 'solidworks', 'mecánica', 'encoders', 'm2.50', 'mecanismos'],
        badges: [
            { text: 'ONIRIS-ID', class: 'bg-warning text-dark' },
            { text: 'Armada', class: 'bg-primary' },
            { text: '3D Printing', class: 'bg-info' },
            { text: 'SolidWorks', class: 'bg-danger' },
            { text: 'Mecánica', class: 'bg-secondary' }
        ],
        featured: true,  // ← Cambiar a false para quitar de destacados
        visible: true
    },
    {
        id: 'granja-3d',
        title: 'Automatización de Granja de impresión 3D',
        description: 'Integración de sensores IoT y programación Python para optimizar la interacción en la granja de impresión 3D.',
        image: 'assets/img/GranjaImpresoras3D/Integración.jpg',
        video: 'assets/vid/GranjaImpresoras3D/Video.mp4',
        link: 'proyectos/Automatizaciónde_Granja_3D.html',
        tags: ['oniris-id', 'orcaslicer', 'automatización', '3d printing', 'klipper', 'mecatronica', 'iot', 'granja', 'impresoras'],
        badges: [
            { text: 'ONIRIS-ID', class: 'bg-warning text-dark' },
            { text: 'OrcaSlicer', class: 'bg-info' },
            { text: 'Automatización', class: 'bg-success' },
            { text: '3D Printing', class: 'bg-info' },
            { text: 'Klipper', class: 'bg-danger' },
            { text: 'Mecatronica', class: 'bg-secondary' },
            { text: 'IoT', class: 'bg-primary' }
        ],
        featured: true,  // ← Cambiar a false para quitar de destacados
        visible: true
    },
    {
        id: 'scorbot',
        title: 'Puesta en Marcha SCORBOT',
        description: 'Implementación de sistemas IoT, restauración de mecánica y desarrollo de controlador de robot SCORBOT para aplicaciones industriales.',
        image: 'assets/img/scor/imagenprincipal.png',
        video: null,
        link: 'proyectos/Puesta_en_Marcha_SCORBOT.html',
        tags: ['uac', 'automatización', 'prototipado', 'programación', 'robótica', 'iot', 'mecatrónica', 'control', 'scorbot'],
        badges: [
            { text: 'UAC', class: 'bg-danger' },
            { text: 'Automatización', class: 'bg-success' },
            { text: 'Prototipado', class: 'bg-success' },
            { text: 'Programación', class: 'bg-primary' },
            { text: 'Robótica', class: 'bg-info' },
            { text: 'IoT', class: 'bg-info' },
            { text: 'Mecatrónica', class: 'bg-secondary' },
            { text: 'Control', class: 'bg-secondary' }
        ],
        featured: true,  // ← Cambiar a false para quitar de destacados
        visible: true
    },
    {
        id: 'sensoracore',
        title: 'SensoraCore',
        description: 'Conjunto de Softwares de sistema de adquisición de datos de sensores orientados a domótica.',
        image: 'assets/img/sensoracore/SensoraCore.png',
        video: null,
        link: 'proyectos/SensoraCore.html',
        tags: ['uac', 'iot', 'programación', 'software', 'sensores', 'mecatrónica', 'domótica', 'sensoracore'],
        badges: [
            { text: 'UAC', class: 'bg-danger' },
            { text: 'IoT', class: 'bg-primary' },
            { text: 'Programación', class: 'bg-success' },
            { text: 'Software', class: 'bg-success' },
            { text: 'Sensores', class: 'bg-info' },
            { text: 'Mecatrónica', class: 'bg-secondary' }
        ],
        featured: true,  // ← Cambiar a false para quitar de destacados
        visible: true
    },
    {
        id: 'momo-boat',
        title: 'MOMO-BoatController-RPi4',
        description: 'Controlador de bote fluvial basado en Raspberry Pi 4 para integración de sistemas de navegación y monitoreo remoto.',
        image: 'assets/img/MOMO-BoatController-RPi4/MOMO-BoatController-RPi4.png',
        video: null,
        link: 'proyectos/proyecto6.html',
        tags: ['oniris-id', 'armada', 'raspberry pi', 'robótica', 'software', 'programación', 'mecatrónica', 'bote', 'controlador'],
        badges: [
            { text: 'ONIRIS-ID', class: 'bg-warning text-dark' },
            { text: 'Armada', class: 'bg-primary' },
            { text: 'Raspberry Pi', class: 'bg-info' },
            { text: 'Robótica', class: 'bg-info' },
            { text: 'Software', class: 'bg-success' },
            { text: 'Programación', class: 'bg-success' },
            { text: 'Mecatrónica', class: 'bg-secondary' }
        ],
        featured: true,  // ← Cambiar a false para quitar de destacados
        visible: true
    }
];

// Función para obtener proyectos destacados
function getProyectosDestacados() {
    return proyectosData.filter(p => p.featured && p.visible);
}

// Función para obtener todos los proyectos visibles
function getAllProyectos() {
    return proyectosData.filter(p => p.visible);
}
