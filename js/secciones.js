// =====================================================================
// Competencias (dos árboles), Certificaciones (filtros) y Referencias
// =====================================================================

// ---------------------------------------------------------------------
// COMPETENCIAS: para añadir o quitar, edita estas listas.
//   - Técnicas: cada rama tiene un id, título, ícono (bootstrap-icons),
//     las competencias (hojas) y "rel": ids de las ramas BLANDAS con las
//     que se relaciona. Esa relación dibuja los enlaces entre árboles.
//   - Blandas: cada rama tiene un id, título, ícono, un color y ejemplos
//     concretos (hojas) que la respaldan.
// ---------------------------------------------------------------------
const competenciasTecnicas = [
    {
        id: 'programacion', titulo: 'Programación y software', icono: 'code-slash',
        hojas: ['Python', 'MicroPython', 'C / C++', 'Rust', 'JavaScript', 'TypeScript', 'React', 'Tauri', 'Electron', 'PySide6 / Qt', 'SQLite', 'HTML / CSS', 'Git / GitHub', 'Linux'],
        rel: ['problemas', 'agil']
    },
    {
        id: 'embebidos', titulo: 'Electrónica y sistemas embebidos', icono: 'cpu',
        hojas: ['ESP32 / ESP32-S3', 'STM32', 'FreeRTOS', 'Arduino', 'Raspberry Pi', 'KiCad', 'Proteus', 'Fritzing', 'Tinkercad'],
        rel: ['problemas', 'adaptabilidad']
    },
    {
        id: 'mecanica', titulo: 'Diseño mecánico y fabricación', icono: 'gear-wide-connected',
        hojas: ['SolidWorks', 'Onshape', 'AutoCAD', 'Impresión 3D', 'Klipper / OrcaSlicer', 'Inkscape'],
        rel: ['agil', 'liderazgo']
    },
    {
        id: 'control', titulo: 'Automatización y control', icono: 'sliders',
        hojas: ['Ladder (PLC)', 'MATLAB / Simulink'],
        rel: ['problemas', 'liderazgo']
    },
    {
        id: 'investigacion', titulo: 'Investigación y documentación', icono: 'journal-text',
        hojas: ['Publicación científica', 'Calibración de sensores', 'Informes técnicos', 'Microsoft Office'],
        rel: ['comunicacion', 'adaptabilidad']
    }
];

const competenciasBlandas = [
    {
        id: 'problemas', titulo: 'Resolución de problemas complejos', icono: 'puzzle', color: '#16a34a',
        hojas: ['Instrumentación y adquisición de datos del M2.50', 'Calibración con error RMSE inferior al 2 % (ProtoCalib)', 'Lógica de enclavamiento y parada segura del simulador']
    },
    {
        id: 'agil', titulo: 'Gestión ágil de proyectos', icono: 'kanban', color: '#8b5cf6',
        hojas: ['Entregables por fases con TECNALIA y la Armada', 'Prototipado iterativo del simulador (V1 → V2)', 'Varios proyectos en paralelo']
    },
    {
        id: 'liderazgo', titulo: 'Liderazgo', icono: 'flag', color: '#ea7a1a',
        hojas: ['Lideré el prototipo del simulador de bote fluvial (ONIRIS-ID)', 'Promotor STEM en colegios']
    },
    {
        id: 'comunicacion', titulo: 'Comunicación asertiva', icono: 'chat-dots', color: '#2f80ed',
        hojas: ['Artículo ProtoCalib (OnBoard Knowledge Journal, 2025)', 'Transferencia de conocimiento al grupo CEDNAV', 'Informes técnicos mensuales']
    },
    {
        id: 'adaptabilidad', titulo: 'Adaptabilidad intercultural', icono: 'globe2', color: '#0d9488',
        hojas: ['Congresos en México (INNOVATEC-NM) y Argentina (CIITI)', 'Trabajo con tripulaciones internacionales (LBH)', 'Trabajo de campo con apicultores de los Montes de María']
    }
];

document.addEventListener('DOMContentLoaded', function () {
    iniciarCompetencias();
    iniciarCertificaciones();
    iniciarReferencias();
});

// Observa cuándo un elemento entra en pantalla (una sola vez)
function alVerse(elemento, accion) {
    if (!('IntersectionObserver' in window)) { accion(); return; }
    const obs = new IntersectionObserver((entradas) => {
        if (entradas.some((e) => e.isIntersecting)) { obs.disconnect(); accion(); }
    }, { threshold: 0.15 });
    obs.observe(elemento);
}

const reducirMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------------
// Competencias
// ---------------------------------------------------------------------
function iniciarCompetencias() {
    const arbol = document.getElementById('compArbol');
    if (!arbol) return;

    const blandasPorId = Object.fromEntries(competenciasBlandas.map((b) => [b.id, b]));
    // Relación inversa: qué ramas técnicas apuntan a cada blanda
    const relBlandas = {};
    competenciasTecnicas.forEach((t) => t.rel.forEach((id) => (relBlandas[id] = relBlandas[id] || []).push(t.id)));
    const tecnicasPorId = Object.fromEntries(competenciasTecnicas.map((t) => [t.id, t]));

    const crear = (etiqueta, clase, texto) => {
        const el = document.createElement(etiqueta);
        if (clase) el.className = clase;
        if (texto !== undefined) el.textContent = texto;
        return el;
    };

    const construirColumna = (tipo, titulo, icono, ramas) => {
        const col = crear('div', 'comp-col comp-' + tipo);
        const raiz = crear('div', 'comp-raiz');
        raiz.innerHTML = '<i class="bi bi-' + icono + '" aria-hidden="true"></i>';
        raiz.appendChild(document.createTextNode(titulo));
        col.appendChild(raiz);

        const lista = crear('ul', 'comp-ramas');
        ramas.forEach((rama, i) => {
            const relIds = tipo === 'tec' ? rama.rel : (relBlandas[rama.id] || []);
            const color = tipo === 'tec' ? 'var(--bs-primary)' : rama.color;

            const li = crear('li', 'comp-rama');
            li.dataset.id = rama.id;
            li.dataset.tipo = tipo;
            li.style.setProperty('--c', color);
            li.style.setProperty('--i', i);

            li.appendChild(crear('span', 'comp-nodo'));

            const btn = crear('button', 'comp-rama-btn');
            btn.type = 'button';
            btn.setAttribute('aria-pressed', 'false');
            btn.innerHTML = '<i class="bi bi-' + rama.icono + '" aria-hidden="true"></i>';
            btn.appendChild(crear('span', '', rama.titulo));
            const puntos = crear('span', 'comp-puntos');
            puntos.setAttribute('aria-hidden', 'true');
            const coloresRel = tipo === 'tec' ? relIds.map((id) => blandasPorId[id]?.color) : [rama.color];
            coloresRel.filter(Boolean).forEach((c) => {
                const p = crear('i');
                p.style.setProperty('--p', c);
                puntos.appendChild(p);
            });
            btn.appendChild(puntos);
            if (tipo === 'tec') btn.appendChild(crear('span', 'comp-cuenta', rama.hojas.length));
            li.appendChild(btn);

            const nombresRel = relIds.map((id) => (tipo === 'tec' ? blandasPorId[id] : tecnicasPorId[id])?.titulo).filter(Boolean);
            const rel = crear('div', 'comp-rel');
            rel.appendChild(crear('span', '', 'Se relaciona con: ' + nombresRel.join(' · ')));
            li.appendChild(rel);

            const hojas = crear('ul', 'comp-hojas');
            rama.hojas.forEach((h, j) => {
                const hoja = crear('li', 'comp-hoja', h);
                hoja.style.setProperty('--j', j);
                hoja.style.setProperty('--i', i);
                hojas.appendChild(hoja);
            });
            li.appendChild(hojas);
            lista.appendChild(li);
        });
        col.appendChild(lista);
        return col;
    };

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'comp-enlaces');
    svg.setAttribute('aria-hidden', 'true');

    arbol.innerHTML = '';
    arbol.append(
        svg,
        construirColumna('tec', 'Técnicas', 'tools', competenciasTecnicas),
        construirColumna('bla', 'Blandas', 'people', competenciasBlandas)
    );

    // Dibuja una curva por cada relación técnica → blanda
    const enlaces = [];
    const dibujar = () => {
        const caja = arbol.getBoundingClientRect();
        svg.setAttribute('viewBox', '0 0 ' + caja.width + ' ' + caja.height);
        svg.innerHTML = '';
        enlaces.length = 0;
        if (getComputedStyle(svg).display === 'none') return;
        competenciasTecnicas.forEach((t) => {
            const nodoT = arbol.querySelector('.comp-rama[data-tipo="tec"][data-id="' + t.id + '"] .comp-nodo');
            t.rel.forEach((idB) => {
                const nodoB = arbol.querySelector('.comp-rama[data-tipo="bla"][data-id="' + idB + '"] .comp-nodo');
                if (!nodoT || !nodoB) return;
                const a = nodoT.getBoundingClientRect();
                const b = nodoB.getBoundingClientRect();
                const x1 = a.left + a.width / 2 - caja.left, y1 = a.top + a.height / 2 - caja.top;
                const x2 = b.left + b.width / 2 - caja.left, y2 = b.top + b.height / 2 - caja.top;
                const dx = (x2 - x1) * 0.5;
                const path = document.createElementNS(svgNS, 'path');
                path.setAttribute('d', 'M' + x1 + ',' + y1 + ' C' + (x1 + dx) + ',' + y1 + ' ' + (x2 - dx) + ',' + y2 + ' ' + x2 + ',' + y2);
                path.style.setProperty('--c', blandasPorId[idB]?.color || 'currentColor');
                path.dataset.tec = t.id;
                path.dataset.bla = idB;
                svg.appendChild(path);
                path.style.setProperty('--len', Math.ceil(path.getTotalLength()));
                enlaces.push(path);
            });
        });
        aplicarFoco();
    };

    // Enfoque: al pasar el cursor (temporal) o al hacer clic (fijo)
    let fijo = null;
    let temporal = null;
    const aplicarFoco = () => {
        const actual = temporal || fijo;
        const ramas = arbol.querySelectorAll('.comp-rama');
        ramas.forEach((r) => r.classList.remove('is-rel', 'is-foco'));
        enlaces.forEach((p) => p.classList.remove('is-rel'));
        arbol.classList.toggle('has-foco', !!actual);
        if (!actual) return;
        const [tipo, id] = actual;
        const relacionadas = tipo === 'tec' ? (tecnicasPorId[id]?.rel || []) : (relBlandas[id] || []);
        const otroTipo = tipo === 'tec' ? 'bla' : 'tec';
        arbol.querySelector('.comp-rama[data-tipo="' + tipo + '"][data-id="' + id + '"]')?.classList.add('is-rel', 'is-foco');
        relacionadas.forEach((rid) => arbol.querySelector('.comp-rama[data-tipo="' + otroTipo + '"][data-id="' + rid + '"]')?.classList.add('is-rel'));
        enlaces.forEach((p) => { if (p.dataset[tipo] === id) p.classList.add('is-rel'); });
    };

    arbol.querySelectorAll('.comp-rama').forEach((rama) => {
        const clave = [rama.dataset.tipo, rama.dataset.id];
        const btn = rama.querySelector('.comp-rama-btn');
        rama.addEventListener('mouseenter', () => { temporal = clave; aplicarFoco(); });
        rama.addEventListener('mouseleave', () => { temporal = null; aplicarFoco(); });
        btn.addEventListener('focus', () => { temporal = clave; aplicarFoco(); });
        btn.addEventListener('blur', () => { temporal = null; aplicarFoco(); });
        btn.addEventListener('click', () => {
            const mismo = fijo && fijo[0] === clave[0] && fijo[1] === clave[1];
            fijo = mismo ? null : clave;
            arbol.querySelectorAll('.comp-rama-btn').forEach((b) => b.setAttribute('aria-pressed', 'false'));
            if (!mismo) btn.setAttribute('aria-pressed', 'true');
            aplicarFoco();
        });
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fijo) { fijo = null; arbol.querySelectorAll('.comp-rama-btn').forEach((b) => b.setAttribute('aria-pressed', 'false')); aplicarFoco(); }
    });

    dibujar();
    if ('ResizeObserver' in window) new ResizeObserver(() => dibujar()).observe(arbol);
    else window.addEventListener('resize', dibujar);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(dibujar);

    // Animación de entrada
    if (reducirMovimiento()) return;
    arbol.classList.add('is-animado');
    alVerse(arbol, () => {
        dibujar();
        requestAnimationFrame(() => arbol.classList.add('is-visible'));
        setTimeout(() => { arbol.classList.remove('is-animado'); arbol.classList.add('is-listo'); }, 2200);
    });
}

// ---------------------------------------------------------------------
// Certificaciones - Constancias - Menciones: filtros por tipo
// ---------------------------------------------------------------------
function iniciarCertificaciones() {
    const seccion = document.querySelector('.cert-seccion');
    if (!seccion) return;
    const items = Array.from(seccion.querySelectorAll('.cert-item'));
    const botones = Array.from(seccion.querySelectorAll('.cert-filtro'));

    botones.forEach((btn) => {
        const filtro = btn.dataset.filtro;
        const num = btn.querySelector('.cert-num');
        if (num) num.textContent = filtro === 'todos' ? items.length : items.filter((i) => i.dataset.tipo === filtro).length;

        btn.addEventListener('click', () => {
            botones.forEach((b) => { b.classList.toggle('is-activo', b === btn); b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
            items.forEach((item) => {
                const mostrar = filtro === 'todos' || item.dataset.tipo === filtro;
                item.classList.toggle('is-oculto', !mostrar);
                item.classList.remove('is-entrando');
                if (mostrar && !reducirMovimiento()) {
                    void item.offsetWidth; // reinicia la animación
                    item.classList.add('is-entrando');
                }
            });
        });
    });
}

// ---------------------------------------------------------------------
// Referencias: directorios de contactos que se despliegan
// ---------------------------------------------------------------------
function iniciarReferencias() {
    document.querySelectorAll('.ref-dir').forEach((dir) => {
        const contactos = Array.from(dir.querySelectorAll('.ref-contacto'));
        const cuenta = dir.querySelector('.ref-dir-cuenta');
        if (cuenta) cuenta.textContent = contactos.length + (contactos.length === 1 ? ' contacto' : ' contactos');

        contactos.forEach((c, i) => {
            c.style.setProperty('--i', i);
            const fila = c.querySelector('.ref-fila');
            const detalle = c.querySelector('.ref-detalle');
            if (!fila || !detalle) return;
            const idDetalle = 'ref-det-' + Math.random().toString(36).slice(2, 8);
            detalle.id = idDetalle;
            fila.setAttribute('aria-controls', idDetalle);
            fila.setAttribute('aria-expanded', 'false');
            fila.addEventListener('click', () => {
                const abrir = !c.classList.contains('is-abierto');
                contactos.forEach((otro) => {
                    otro.classList.remove('is-abierto');
                    otro.querySelector('.ref-fila')?.setAttribute('aria-expanded', 'false');
                });
                if (abrir) { c.classList.add('is-abierto'); fila.setAttribute('aria-expanded', 'true'); }
            });
        });

        // Perfiles sin URL todavía (href="#"): se atenúan y no navegan
        dir.querySelectorAll('.ref-red').forEach((red) => {
            if (red.getAttribute('href') !== '#') return;
            red.classList.add('is-pendiente');
            red.setAttribute('aria-disabled', 'true');
            red.title = 'Enlace pendiente';
            red.addEventListener('click', (e) => e.preventDefault());
        });

        if (reducirMovimiento()) return;
        dir.classList.add('is-animado');
        alVerse(dir, () => dir.classList.add('is-visible'));
    });
}
