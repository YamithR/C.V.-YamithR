// =====================================================================
// Networking: lista radial de contactos que sale de la foto de perfil
// ---------------------------------------------------------------------
// Para añadir un contacto, agrega un objeto a "contactosRed":
//   nombre, profesion, especialidad  -> texto que aparece junto al contacto
//   ambito                           -> área (Derecho, Ingeniería, Salud...)
//   color                            -> color del círculo cuando no hay foto
//   foto        (opcional)           -> foto del contacto; si falta, se muestran sus iniciales
//   fotoJuntos  (opcional)           -> foto que reemplaza la mía al pasar el cursor
//   enlace      (opcional)           -> link al que se va al pulsar el contacto por segunda vez
//                                       (al pulsarlo una vez aparece "Ir a conocerle")
//
// Los contactos se agrupan solos de 3 en 3 (conjuntos). Se muestra un conjunto a la vez;
// el botón "Ver conjunto ..." repliega el actual y despliega el siguiente. Para ampliar,
// basta con agregar más contactos al final de la lista.
// =====================================================================
const contactosRed = [
    // --- Conjunto 1 ---
    {
        nombre: 'Lilan Shanoa Lubo Vazquez',
        profesion: 'Abogada',
        especialidad: 'Derecho administrativo',
        ambito: 'Derecho',
        color: '#9a3412',
        foto: 'assets/img/Networking/Lilan.jpg',
        fotoJuntos: 'assets/img/Networking/Lilan-y-Yamith.jpg',
        },
    /*
    // --- Ejemplos: reemplaza nombre (y añade foto / fotoJuntos / enlace cuando las tengas) ---
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
    // --- Conjunto 2 ---
    {
        nombre: 'Nombre del contacto',
        profesion: 'Docente',
        especialidad: 'Educación STEM',
        ambito: 'Educación',
        color: '#6d28d9'
    },
    {
        nombre: 'Nombre del contacto',
        profesion: 'Arquitecto',
        especialidad: 'Diseño sostenible',
        ambito: 'Arquitectura',
        color: '#dc2626'
    },
    {
        nombre: 'Nombre del contacto',
        profesion: 'Ingeniero electrónico',
        especialidad: 'Robótica',
        ambito: 'Tecnología',
        color: '#0e7490'
    },
    // --- Conjunto 3 ---
    {
        nombre: 'Nombre del contacto',
        profesion: 'Contador',
        especialidad: 'Finanzas para proyectos',
        ambito: 'Finanzas',
        color: '#854d0e'
    },
    {
        nombre: 'Nombre del contacto',
        profesion: 'Diseñador industrial',
        especialidad: 'Impresión 3D',
        ambito: 'Diseño',
        color: '#be185d'
    },
    {
        nombre: 'Nombre del contacto',
        profesion: 'Agrónomo',
        especialidad: 'Agricultura de precisión',
        ambito: 'Agronomía',
        color: '#3f6212'
    }*/
];

// Cuántos contactos se muestran a la vez
const contactosPorConjunto = 3;

(function iniciarNetworking() {
    const boton = document.getElementById('netBoton');
    const zona = document.getElementById('netZona');
    const lista = document.getElementById('netContactos');
    const perfil = zona?.querySelector('.profile-image-container');
    const fotoJuntos = zona?.querySelector('.net-foto-juntos');
    if (!boton) return;
    if (!zona || !lista || !perfil || !fotoJuntos || !contactosRed.length) { boton.hidden = true; return; }

    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
    const totalConjuntos = Math.ceil(contactosRed.length / contactosPorConjunto);
    let fijado = null;      // contacto elegido con clic/toque (queda resaltado)
    let activo = null;      // contacto resaltado en este momento
    let temporizador = null;
    let focoTimer = null;   // foco al primer contacto al abrir con teclado
    let conjunto = 0;       // conjunto visible (0, 1, 2...)

    // Ángulos del arco (0° = a la derecha de la foto; negativo = arriba).
    // Con más contactos el arco se abre más para que no se encimen.
    const angulos = (n) => {
        if (n === 1) return [0];
        const mitad = Math.min(85, Math.max(50, 12.5 * (n - 1)));
        return Array.from({ length: n }, (_, i) => -mitad + (2 * mitad) * (i / (n - 1)));
    };
    const iniciales = (nombre) => nombre.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
    const crear = (etiqueta, clase, texto) => {
        const el = document.createElement(etiqueta);
        if (clase) el.className = clase;
        if (texto !== undefined) el.textContent = texto;
        return el;
    };
    const crearRadio = () => {
        const radio = crear('span', 'net-radio');
        radio.setAttribute('aria-hidden', 'true');
        return radio;
    };

    // Precarga de las fotos compartidas para que el cambio sea inmediato
    contactosRed.forEach((c) => { if (c.fotoJuntos) { const img = new Image(); img.src = c.fotoJuntos; } });

    // --- Construcción de la lista (todos los contactos; cada conjunto se muestra por turno) ---
    function crearNodo(c, indice) {
        const li = crear('li', 'net-nodo');
        if (c.color) li.style.setProperty('--net-color', c.color);
        // Al terminar de replegarse, el contacto se oculta; al terminar de nacer, se limpia la clase
        li.addEventListener('animationend', (e) => {
            if (e.target !== li) return;
            if (li.classList.contains('net-repliega')) { li.classList.remove('net-repliega'); li.hidden = true; }
            else li.classList.remove('net-entra');
        });

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
        texto.append(
            crear('span', 'net-ambito', c.ambito),
            crear('span', 'net-nombre', c.nombre),
            detalle,
            crear('span', 'net-ir', 'Ir a conocerle')   // reemplaza ámbito y profesión tras el primer toque
        );

        btn.append(avatar, texto);
        li.append(crearRadio(), btn);
        lista.appendChild(li);
        return { li, btn, datos: c, conjunto: Math.floor(indice / contactosPorConjunto) };
    }

    const nodos = contactosRed.map((c, i) => crearNodo(c, i));

    // Botón "Ver conjunto N de T": repliega el actual y despliega el siguiente. Último elemento del arco.
    let liMas = null, btnMas = null, avatarMas = null, nombreMas = null;
    if (totalConjuntos > 1) {
        liMas = crear('li', 'net-nodo net-mas-toggle');
        liMas.style.setProperty('--net-color', '#374151');
        liMas.append(crearRadio());

        btnMas = crear('button', 'net-item');
        btnMas.type = 'button';
        btnMas.tabIndex = -1;
        avatarMas = crear('span', 'net-avatar');
        avatarMas.setAttribute('aria-hidden', 'true');
        nombreMas = crear('span', 'net-nombre', 'Conoce más');
        const textoMas = crear('span', 'net-texto');
        textoMas.append(nombreMas);
        btnMas.append(avatarMas, textoMas);
        liMas.append(btnMas);
        lista.appendChild(liMas);

        btnMas.addEventListener('click', () => {
            const teniaFoco = nodos.some((n) => n.btn === document.activeElement);
            conjunto = (conjunto + 1) % totalConjuntos;
            fijado = null;
            actualizarFijado();
            distribuir(!sinMovimiento.matches); // sin animación, el cambio es inmediato
            if (teniaFoco) btnMas.focus({ preventScroll: true });
            soltar();
        });
    }

    // Muestra el conjunto actual: los contactos nuevos nacen de la foto y los anteriores se repliegan hacia ella.
    // Reparte los contactos del conjunto (y el botón) en el arco y ajusta el foco.
    function distribuir(animar) {
        const visibles = nodos.filter((n) => n.conjunto === conjunto);
        nodos.forEach((n) => {
            const li = n.li;
            if (n.conjunto === conjunto) {
                if (li.hidden || li.classList.contains('net-repliega')) {
                    li.hidden = false;
                    li.classList.remove('net-repliega');
                    if (animar) li.classList.add('net-entra');
                }
            } else if (!li.hidden) {
                if (animar) li.classList.add('net-repliega'); // se oculta al terminar la animación
                else li.hidden = true;
            }
        });
        const items = visibles.map((n) => n.li);
        if (liMas) items.push(liMas);
        const angs = angulos(items.length);
        items.forEach((li, k) => {
            li.style.setProperty('--net-ang', angs[k] + 'deg');
            li.style.setProperty('--net-i', k);
        });
        if (btnMas) avatarMas.textContent = '›';   // ›
        marcarFocusables();
    }

    // Solo los contactos del conjunto actual reciben foco, y solo mientras la lista está abierta
    function marcarFocusables() {
        const abierto = zona.classList.contains('is-abierta');
        nodos.forEach((n) => { n.btn.tabIndex = abierto && n.conjunto === conjunto ? 0 : -1; });
        if (btnMas) btnMas.tabIndex = abierto ? 0 : -1;
    }

    // Marca el contacto fijado (aria y, si tiene enlace, la frase "Ir a conocerle")
    function actualizarFijado() {
        nodos.forEach((n, k) => {
            const on = fijado === k;
            n.btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            n.li.classList.toggle('is-listo', on && Boolean(n.datos.enlace));
            // Al fijarse, la clase se añade de nuevo y la animación de pulso arranca desde el inicio
            n.li.classList.toggle('is-fijado', on);
        });
    }

    // Resaltar un contacto y cambiar la foto
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

    // Eventos de cada contacto
    nodos.forEach((n, i) => {
        const { btn, datos: c } = n;
        // Solo el ratón usa "pasar por encima"; en táctil el toque va directo al clic (fija el contacto)
        btn.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') activar(i); });
        btn.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') programarSoltar(); });
        btn.addEventListener('focus', () => activar(i));
        btn.addEventListener('blur', () => programarSoltar());
        btn.addEventListener('click', () => {
            if (fijado === i) {
                // Segundo toque: si tiene enlace, se abre; si no, se suelta el contacto
                if (c.enlace) { window.open(c.enlace, '_blank', 'noopener'); return; }
                fijado = null;
            } else {
                // Primer toque: queda fijado y muestra "Ir a conocerle"
                fijado = i;
            }
            actualizarFijado();
            if (fijado === null) soltar(); else activar(i);
        });
    });

    // --- Abrir / cerrar ---
    function abrir() {
        zona.classList.add('is-abierta');
        boton.setAttribute('aria-expanded', 'true');
        boton.classList.add('is-activo');
        perfil.classList.add('flipped'); // muestra la foto (no la firma) mientras la lista está abierta
        marcarFocusables();
    }

    function cerrar() {
        fijado = null;
        clearTimeout(focoTimer);
        actualizarFijado();
        soltar();
        zona.classList.remove('is-abierta');
        boton.setAttribute('aria-expanded', 'false');
        boton.classList.remove('is-activo');
        marcarFocusables();
    }

    boton.addEventListener('click', () => {
        if (zona.classList.contains('is-abierta')) { cerrar(); return; }
        abrir();
        // Al abrir con teclado, el foco pasa al primer contacto cuando termina de salir
        clearTimeout(focoTimer);
        if (boton.matches(':focus-visible')) {
            focoTimer = setTimeout(() => {
                const primero = nodos.find((n) => n.conjunto === conjunto);
                if (zona.classList.contains('is-abierta') && document.activeElement === boton && primero) primero.btn.focus({ preventScroll: true });
            }, sinMovimiento.matches ? 0 : 650);
        }
    });

    // Con la lista abierta, tocar la foto cierra la lista en vez de voltearla a la firma.
    // Se escucha en captura para adelantarse al volteo de main.js y detenerlo.
    perfil.addEventListener('click', (e) => {
        if (!zona.classList.contains('is-abierta')) return;
        e.stopImmediatePropagation();
        cerrar();
    }, true);

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
        actualizarFijado();
        soltar();
    });

    distribuir(false); // estado inicial: primer conjunto, con sus ángulos
})();
