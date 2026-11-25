// =====================================================================
// Networking: lista radial de contactos que sale de la foto de perfil
// ---------------------------------------------------------------------
// Para añadir un contacto, agrega un objeto a "contactosRed":
//   nombre, profesion, especialidad  -> texto que aparece junto al contacto
//   ambito                           -> área (Derecho, Ingeniería, Salud...)
//   color                            -> color del círculo cuando no hay foto
//   foto        (opcional)           -> foto del contacto; si falta, se muestran sus iniciales
//   fotoJuntos  (opcional)           -> foto que reemplaza la mía al pasar el cursor
// Los contactos se reparten solos sobre el arco.
// =====================================================================
const contactosRed = [
    {
        nombre: 'Lilan Shanoa Lubo Vazquez',
        profesion: 'Abogada',
        especialidad: 'Derecho administrativo',
        ambito: 'Derecho',
        color: '#9a3412',
        foto: 'assets/img/Networking/Lilan.jpg',
        fotoJuntos: 'assets/img/Networking/Lilan-y-Yamith.jpg'
    },
    // --- Ejemplos: reemplaza nombre (y añade foto / fotoJuntos cuando las tengas) ---
    {
        nombre: 'Nombre del contacto',
        profesion: 'Ingeniero mecánico',
        especialidad: 'Gerencia de proyectos',
        ambito: 'Ingeniería',
        color: '#1d4ed8'
    },
    {
        nombre: 'Nombre del contacto',
        profesion: 'Médico',
        especialidad: 'Interculturalidad',
        ambito: 'Salud',
        color: '#0f766e'
    },
    {
        nombre: 'Nombre del contacto',
        profesion: 'Docente',
        especialidad: 'Educación STEM',
        ambito: 'Educación',
        color: '#6d28d9'
    }
];

(function iniciarNetworking() {
    const boton = document.getElementById('netBoton');
    const zona = document.getElementById('netZona');
    const lista = document.getElementById('netContactos');
    const perfil = zona?.querySelector('.profile-image-container');
    const fotoJuntos = zona?.querySelector('.net-foto-juntos');
    if (!boton) return;
    if (!zona || !lista || !perfil || !fotoJuntos || !contactosRed.length) { boton.hidden = true; return; }

    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
    let fijado = null;      // contacto elegido con clic/toque (queda resaltado)
    let activo = null;      // contacto resaltado en este momento
    let temporizador = null;
    let focoTimer = null;   // foco al primer contacto al abrir con teclado

    // Ángulos del arco (0° = a la derecha de la foto; negativo = arriba)
    const angulos = (n) => {
        if (n === 1) return [0];
        const desde = -50, hasta = 50;
        return Array.from({ length: n }, (_, i) => desde + (hasta - desde) * (i / (n - 1)));
    };
    const iniciales = (nombre) => nombre.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
    const crear = (etiqueta, clase, texto) => {
        const el = document.createElement(etiqueta);
        if (clase) el.className = clase;
        if (texto !== undefined) el.textContent = texto;
        return el;
    };

    // Precarga de las fotos compartidas para que el cambio sea inmediato
    contactosRed.forEach((c) => { if (c.fotoJuntos) { const img = new Image(); img.src = c.fotoJuntos; } });

    // --- Construcción de la lista ---
    const angs = angulos(contactosRed.length);
    const nodos = contactosRed.map((c, i) => {
        const li = crear('li', 'net-nodo');
        li.style.setProperty('--net-ang', angs[i] + 'deg');
        li.style.setProperty('--net-i', i);
        if (c.color) li.style.setProperty('--net-color', c.color);

        const radio = crear('span', 'net-radio');
        radio.setAttribute('aria-hidden', 'true');

        const btn = crear('button', 'net-item');
        btn.type = 'button';
        btn.setAttribute('aria-pressed', 'false');
        btn.tabIndex = -1;

        const avatar = crear('span', 'net-avatar');
        avatar.setAttribute('aria-hidden', 'true');
        if (c.foto) {
            const img = crear('img');
            img.src = c.foto;
            img.alt = '';
            img.decoding = 'async';
            avatar.appendChild(img);
        } else {
            avatar.textContent = iniciales(c.nombre);
        }

        const texto = crear('span', 'net-texto');
        const detalle = crear('span', 'net-detalle');
        detalle.append(crear('span', '', c.profesion), crear('span', 'net-sep', '·'), crear('span', '', c.especialidad));
        texto.append(crear('span', 'net-ambito', c.ambito), crear('span', 'net-nombre', c.nombre), detalle);

        btn.append(avatar, texto);
        li.append(radio, btn);
        lista.appendChild(li);

        // Solo el ratón usa "pasar por encima"; en táctil el toque va directo al clic (fija el contacto)
        btn.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') activar(i); });
        btn.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') programarSoltar(); });
        btn.addEventListener('focus', () => activar(i));
        btn.addEventListener('blur', () => programarSoltar());
        btn.addEventListener('click', () => {
            fijado = fijado === i ? null : i;
            nodos.forEach((n, k) => n.btn.setAttribute('aria-pressed', fijado === k ? 'true' : 'false'));
            if (fijado === null) soltar(); else activar(i);
        });
        return { li, btn, datos: c };
    });

    // --- Resaltar un contacto y cambiar la foto ---
    function activar(i) {
        clearTimeout(temporizador);
        if (!zona.classList.contains('is-abierta')) return;
        const c = nodos[i].datos;
        if (activo !== i && c.fotoJuntos) {
            fotoJuntos.src = c.fotoJuntos;
            fotoJuntos.alt = 'Yamith Romero con ' + c.nombre;
        }
        activo = i;
        nodos.forEach((n, k) => n.li.classList.toggle('is-activo', k === i));
        zona.classList.add('has-foco');
        zona.classList.toggle('is-juntos', Boolean(c.fotoJuntos));
    }

    function soltar() {
        clearTimeout(temporizador);
        if (fijado !== null) { activar(fijado); return; }
        activo = null;
        nodos.forEach((n) => n.li.classList.remove('is-activo'));
        zona.classList.remove('has-foco', 'is-juntos');
    }

    // Pequeña espera para pasar de un contacto a otro sin parpadeo
    function programarSoltar() {
        clearTimeout(temporizador);
        temporizador = setTimeout(soltar, 140);
    }

    // --- Abrir / cerrar ---
    function abrir() {
        zona.classList.add('is-abierta');
        boton.setAttribute('aria-expanded', 'true');
        boton.classList.add('is-activo');
        perfil.classList.add('flipped'); // muestra la foto (no la firma) mientras la lista está abierta
        nodos.forEach((n) => { n.btn.tabIndex = 0; });
    }

    function cerrar() {
        fijado = null;
        clearTimeout(focoTimer);
        nodos.forEach((n) => { n.btn.setAttribute('aria-pressed', 'false'); n.btn.tabIndex = -1; });
        soltar();
        zona.classList.remove('is-abierta');
        boton.setAttribute('aria-expanded', 'false');
        boton.classList.remove('is-activo');
    }

    boton.addEventListener('click', () => {
        if (zona.classList.contains('is-abierta')) { cerrar(); return; }
        abrir();
        // Al abrir con teclado, el foco pasa al primer contacto cuando termina de salir
        clearTimeout(focoTimer);
        if (boton.matches(':focus-visible')) {
            focoTimer = setTimeout(() => {
                if (zona.classList.contains('is-abierta') && document.activeElement === boton) nodos[0].btn.focus({ preventScroll: true });
            }, sinMovimiento.matches ? 0 : 650);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape' || !zona.classList.contains('is-abierta')) return;
        const dentro = zona.contains(document.activeElement);
        cerrar();
        if (dentro) boton.focus();
    });

    // Tocar fuera de la lista (o del botón) suelta el contacto fijado.
    // Se usa pointerup porque iOS no envía "click" desde zonas no interactivas.
    document.addEventListener('pointerup', (e) => {
        if (fijado === null || lista.contains(e.target) || boton.contains(e.target)) return;
        fijado = null;
        nodos.forEach((n) => n.btn.setAttribute('aria-pressed', 'false'));
        soltar();
    });
})();
