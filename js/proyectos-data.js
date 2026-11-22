// Configuración centralizada de proyectos
// Para mostrar un proyecto en la página principal (destacados), pon featured: true
// Para ocultarlo completamente de ambas páginas, pon visible: false
// Opcionales por proyecto: imageFit / imageBg (cómo se ajusta la imagen de la tarjeta)
// y cardTheme (colores propios de la tarjeta en la galería). Ver el ejemplo de 'sispi-guajira'.

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
        link: 'proyectos/MOMO-BoatController-RPi4.html',
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
    },
    {
        id: 'protocalib',
        title: 'ProtoCalib',
        description: 'Kit modular de bajo costo para monitoreo, calibración y evaluación de sensores en entornos IoT educativos, con ESP32, MicroPython y una aplicación de escritorio PySide6. Publicado en OnBoard Knowledge Journal.',
        image: 'assets/img/ProtoCalib/Figura2-ModulosSensores.png',
        video: null,
        link: 'proyectos/ProtoCalib.html',
        tags: ['uac', 'investigación', 'iot', 'educación', 'sensores', 'prototipado', 'programación', 'mecatrónica', '3d printing', 'esp32', 'micropython', 'protocalib'],
        badges: [
            { text: 'UAC', class: 'bg-danger' },
            { text: 'Investigación', class: 'bg-warning text-dark' },
            { text: 'IoT', class: 'bg-primary' },
            { text: 'Educación', class: 'bg-success' },
            { text: 'Sensores', class: 'bg-info' },
            { text: 'Prototipado', class: 'bg-success' },
            { text: 'Programación', class: 'bg-secondary' }
        ],
        featured: false,  // ← Cambiar a true para agregar a destacados
        visible: true
    },
    {
        id: 'sispi-guajira',
        title: 'Control de Indicadores SISPI - La Guajira',
        description: 'Aplicación de escritorio en Rust, Tauri y React para el seguimiento de los indicadores del SISPI en La Guajira, con cálculo de cumplimiento, tableros y reportes. En desarrollo: primera versión de prototipo.',
        image: 'assets/img/SISPI/Banner.jpg',
        imageFit: 'contain',   // opcional: imagen completa de lado a lado, centrada verticalmente
        imageBg: '#0f4e45',    // opcional: color de relleno arriba y abajo (verde del banner)
        // opcional: colores propios de la tarjeta en la galería (modo claro, oscuro y etiquetas)
        cardTheme: {
            light: { bg: '#f4f7f2', text: '#14261d', title: '#1f6f4a' },
            dark: { bg: '#14241c', text: '#e3efe7', title: '#3fb27f' },
            badges: { primary: '#1f6f4a', success: '#2e8b5f', info: '#e08a1e', warning: '#f2b01e' }
        },
        video: null,
        link: 'proyectos/Control_Indicadores_SISPI.html',
        tags: ['investigación', 'programación', 'software', 'datos', 'rust', 'typescript', 'sqlite', 'sispi', 'en desarrollo'],
        badges: [
            { text: 'Investigación', class: 'bg-warning text-dark' },
            { text: 'Programación', class: 'bg-primary' },
            { text: 'Software', class: 'bg-success' },
            { text: 'Datos', class: 'bg-info' },
            { text: 'En desarrollo', class: 'bg-secondary' }
        ],
        featured: false,  // ← Cambiar a true para agregar a destacados
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

// ============================================================
// FILTROS DE LA GALERÍA (subconjuntos de etiquetas)
// ============================================================
// Cada grupo aparece como una fila de chips debajo de la barra de búsqueda.
//   - title: nombre del grupo que se muestra (ej. 'Productores').
//   - chips: botones del grupo. label = texto visible, tag = etiqueta que
//            debe tener el proyecto (en 'tags' de proyectosData, sin
//            distinguir mayúsculas).
//
// Reglas de filtrado:
//   - Dentro de un grupo: se combinan con O (Armada O ONIRIS-ID).
//   - Entre grupos: se combinan con Y (Productores Y Tecnologías).
//
// Para AÑADIR un chip:  agrega { label: 'Robótica', tag: 'robótica' } al grupo.
// Para QUITAR un chip:  borra su línea.
// Para AÑADIR un grupo: copia un bloque { title, chips: [...] } y pégalo aquí.
// Para BORRAR un grupo: borra su bloque completo.
// Recuerda que el 'tag' debe existir en los 'tags' de algún proyecto,
// si no, el chip no mostrará resultados.
const filterGroups = [
    {
        title: 'Productores',
        chips: [
            { label: 'Armada', tag: 'armada' },
            { label: 'ONIRIS-ID', tag: 'oniris-id' },
            { label: 'UAC', tag: 'uac' }
        ]
    },
    {
        title: 'Tecnologías',
        chips: [
            { label: 'IoT', tag: 'iot' },
            { label: '3D Printing', tag: '3d printing' }
        ]
    },
    {
        title: 'Area',
        chips: [
            {label: 'Programación', tag: 'programación'},
            { label: 'Datos', tag: 'datos' }
        ]
    }
];

// ============================================================
// COLECCIONES DE LA GALERÍA (carpetas animadas)
// ============================================================
// Cada colección aparece como una carpeta en el slider "Colecciones",
// a la derecha de los filtros. Al pulsar una carpeta, la galería muestra
// solo sus proyectos; al pulsarla otra vez se vuelven a mostrar todos.
//   - id:          identificador único, en minúsculas y con guiones.
//   - title:       nombre que se muestra en la carpeta (ej. 'Armada').
//   - description: frase corta que aparece sobre la galería al abrirla.
//   - icon:        nombre de un ícono de bootstrap-icons 1.11.3, con o sin
//                  el prefijo 'bi-' (ej. 'life-preserver'). Opcional.
//   - projects:    lista de ids de proyectos (los 'id' de proyectosData).
//                  Las imágenes de la carpeta se toman solas del campo
//                  'image' de los primeros tres proyectos de la lista.
//
// Un mismo proyecto puede estar en varias colecciones.
// Los ids que no existan en proyectosData (o con visible: false) se
// ignoran, y una colección sin proyectos visibles no se muestra.
// La colección se combina con la búsqueda y los chips (Y).
//
// Para AÑADIR una colección: copia un bloque { id, title, ... } y pégalo aquí.
// Para QUITAR una colección: borra su bloque completo.
// Para AÑADIR un proyecto a una colección: agrega su id a 'projects'.
// El orden del arreglo es el orden de las carpetas en el slider.
const colecciones = [
    {
        id: 'armada',
        title: 'Armada',
        description: 'Proyectos desarrollados para la Armada: simulación, mecanismos y control de botes.',
        icon: 'life-preserver',
        projects: ['simulador-bote', 'encoders-m250', 'momo-boat']
    },
    {
        id: 'investigacion',
        title: 'Investigación',
        description: 'Proyectos de investigación aplicada en robótica, sensores y simulación.',
        icon: 'lightbulb',
        projects: ['scorbot', 'sensoracore', 'simulador-bote', 'protocalib', 'sispi-guajira']
    },
    {
        id: 'personales',
        title: 'Proyectos personales',
        description: 'Proyectos propios de automatización, software y robótica.',
        icon: 'person-workspace',
        projects: ['sensoracore', 'granja-3d', 'scorbot', 'protocalib', 'sispi-guajira']
    }
];
