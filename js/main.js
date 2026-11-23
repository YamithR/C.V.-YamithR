document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('project-search');
    const clearSearch = document.getElementById('clear-search');

    // Renderizar proyectos destacados dinámicamente
    function renderProyectosDestacados() {
        const sliderWrapper = document.getElementById('proyectos-slider');
        const indicatorsContainer = document.getElementById('slider-indicators-container');
        
        if (!sliderWrapper || !indicatorsContainer) return;
        
        const proyectosDestacados = getProyectosDestacados();
        
        // Limpiar contenedor
        sliderWrapper.innerHTML = '';
        indicatorsContainer.innerHTML = '';
        
        // Renderizar cada proyecto
        proyectosDestacados.forEach((proyecto, index) => {
            // Crear slide del proyecto
            const slide = document.createElement('div');
            slide.className = 'project-slide';
            slide.setAttribute('data-tags', proyecto.tags.join(' '));
            
            const badgesHTML = proyecto.badges.map(badge => 
                `<span class="badge ${badge.class}">${badge.text}</span>`
            ).join('\n                                        ');
            
            slide.innerHTML = `
                <div class="project-card">
                    <div class="project-image">
                        <img src="${proyecto.image}" alt="${proyecto.title}" class="img-fluid">
                        <div class="project-overlay">
                            <i class="bi bi-arrow-right-circle-fill"></i>
                        </div>
                    </div>
                    <div class="project-content">
                        <h5>${proyecto.title}</h5>
                        <p class="project-description">${proyecto.description}</p>
                        <div class="project-tags">
                            ${badgesHTML}
                        </div>
                    </div>
                </div>
                <a href="${proyecto.link}" class="project-link"></a>
            `;
            
            sliderWrapper.appendChild(slide);
            
            // Crear indicador
            const indicator = document.createElement('span');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('data-slide', index);
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    // Habilidades técnicas
    // Para añadir o quitar una competencia, edita esta lista
    const skills = [
        'Python', 'MicroPython', 'C++', 'Rust', 'JavaScript', 'TypeScript',
        'React', 'Tauri', 'Electron', 'PySide6 / Qt', 'SQLite', 'HTML/CSS',
        'ESP32 / ESP32-S3', 'Arduino', 'Raspberry Pi', 'Ladder (PLC)',
        'SolidWorks', 'Onshape', 'AutoCAD', 'Impresión 3D', 'Klipper / OrcaSlicer',
        'MATLAB/Simulink', 'Proteus', 'Fritzing', 'Tinkercad', 'Linux',
        'Git/GitHub', 'Inkscape', 'Microsoft Office'
    ];

    // Competencias en un solo renglón: si no caben, se deslizan en bucle continuo
    const container = document.querySelector('.skills-container');
    if (container) {
        container.classList.add('skills-marquee');
        const track = document.createElement('div');
        track.className = 'skills-track';
        const crearGrupo = (oculto) => {
            const grupo = document.createElement('div');
            grupo.className = 'skills-group';
            if (oculto) grupo.setAttribute('aria-hidden', 'true');
            skills.forEach(skill => {
                const badge = document.createElement('span');
                badge.className = 'skill-badge';
                badge.textContent = skill;
                grupo.appendChild(badge);
            });
            return grupo;
        };
        const grupoPrincipal = crearGrupo(false);
        track.appendChild(grupoPrincipal);
        container.appendChild(track);

        const actualizarMarquesina = () => {
            const copia = track.querySelector('.skills-group[aria-hidden]');
            const desborda = grupoPrincipal.scrollWidth > container.clientWidth;
            if (desborda && !copia) {
                track.appendChild(crearGrupo(true));
            } else if (!desborda && copia) {
                copia.remove();
            }
            container.classList.toggle('is-scrolling', desborda);
            // Velocidad constante (~40 px/s) sin importar cuántas competencias haya
            track.style.setProperty('--skills-duration', (grupoPrincipal.scrollWidth / 40) + 's');
        };
        actualizarMarquesina();
        window.addEventListener('resize', actualizarMarquesina);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(actualizarMarquesina);
    }

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
    
    // Renderizar proyectos al cargar la página
    renderProyectosDestacados();
    
    // Inicializar slider después de renderizar proyectos
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
        const projectSlides = document.querySelectorAll('.project-slide');
        
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

    if (searchInput) {
        searchInput.addEventListener('input', filterProjects);
    }

    // Limpiar búsqueda
    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            const projectSlides = document.querySelectorAll('.project-slide');
            projectSlides.forEach(slide => slide.classList.remove('hidden'));
            slider.updateVisibleSlides();
            searchInput.focus();
        });
    }

    // ===== Línea de tiempo: duración, estado "Actual", barra de avance y carpetas de imágenes =====
    (function iniciarLineaDeTiempo() {
        const hoy = new Date();
        const mesActual = hoy.getFullYear() * 12 + hoy.getMonth(); // meses absolutos (0 = enero)

        const aMeses = (valor) => {
            const m = /^(\d{4})-(\d{2})$/.exec(valor || '');
            return m ? Number(m[1]) * 12 + Number(m[2]) - 1 : null;
        };

        const nombreMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const formatearMes = (m) => nombreMeses[m % 12] + ' ' + Math.floor(m / 12);

        const textoDuracion = (meses) => {
            const anios = Math.floor(meses / 12);
            const resto = meses % 12;
            const partes = [];
            if (anios) partes.push(anios + (anios === 1 ? ' año' : ' años'));
            if (resto) partes.push(resto + (resto === 1 ? ' mes' : ' meses'));
            return partes.join(' ');
        };

        document.querySelectorAll('.tl-item').forEach((item) => {
            const inicio = aMeses(item.dataset.inicio);
            const finTexto = item.dataset.fin;
            const sinFin = finTexto === 'actual';
            const fin = sinFin ? mesActual : aMeses(finTexto);
            if (inicio === null || fin === null) return;

            const enCurso = inicio <= mesActual && (sinFin || fin >= mesActual);
            const periodo = item.querySelector('.tl-periodo');
            const fechasElem = item.querySelector('.tl-fechas');

            // Si tenía puesto "Actual" en el texto pero tiene fecha de fin fija que ya pasó, actualiza las fechas
            if (fechasElem && !sinFin && fin < mesActual && fechasElem.textContent.includes('Actual')) {
                fechasElem.textContent = `${formatearMes(inicio)} - ${formatearMes(fin)}`;
            }

            // Duración (incluye el mes de inicio y el de fin)
            const total = fin - inicio + 1;
            const duracion = item.querySelector('.tl-duracion');
            if (duracion && total > 1) {
                const transcurrido = Math.min(mesActual, fin) - inicio + 1;
                duracion.textContent = enCurso && !sinFin
                    ? 'Mes ' + transcurrido + ' de ' + total
                    : textoDuracion(sinFin ? transcurrido : total);
            }

            // Barra de avance: completa si terminó; parcial si sigue en curso
            if (periodo && total > 1) {
                const barra = document.createElement('div');
                barra.className = 'tl-barra';
                barra.setAttribute('aria-hidden', 'true');
                const relleno = document.createElement('span');
                const avance = sinFin ? 100 : Math.max(0, Math.min(100, ((mesActual - inicio + 1) / total) * 100));
                relleno.style.setProperty('--tl-avance', avance.toFixed(0) + '%');
                barra.appendChild(relleno);
                periodo.appendChild(barra);
            }

            // Estado "Actual": solo si está en curso actualmente
            if ((enCurso || sinFin) && periodo) {
                item.classList.add('is-actual');
                if (!periodo.querySelector('.tl-estado')) {
                    const estado = document.createElement('span');
                    estado.className = 'tl-estado tl-estado-actual';
                    estado.textContent = 'Actual';
                    periodo.appendChild(estado);
                }
            } else {
                item.classList.remove('is-actual');
                const estadoActual = periodo ? periodo.querySelector('.tl-estado-actual') : null;
                if (estadoActual) estadoActual.remove();
            }
        });

        // Contador de imágenes en cada carpeta
        document.querySelectorAll('.tl-carpeta').forEach((carpeta) => {
            const cuenta = carpeta.querySelector('.tl-cuenta');
            if (cuenta) cuenta.textContent = carpeta.querySelectorAll('.tl-galeria > *').length;
        });

        // Resumen de periodos (Estilo C)
        document.querySelectorAll('.tl-resumen').forEach((res) => {
            const contenedor = res.closest('.estilo-c, section') || res.parentElement;
            const items = Array.from(contenedor.querySelectorAll('.tl-item')).map((it) => {
                const ini = aMeses(it.dataset.inicio);
                const sinFin = it.dataset.fin === 'actual';
                const fin = sinFin ? mesActual : aMeses(it.dataset.fin);
                const cargo = it.querySelector('.tl-cargo')?.textContent?.trim() || '';
                const org = it.querySelector('.tl-org')?.textContent?.trim().split('·')[0].trim() || '';
                const nombre = [cargo, org].filter(Boolean).join(' · ');
                return {
                    nombre,
                    ini,
                    fin,
                    act: it.classList.contains('is-actual') || sinFin
                };
            }).filter((x) => x.ini !== null && x.fin !== null);

            if (!items.length) return;

            const a0 = Math.floor(Math.min(...items.map((x) => x.ini)) / 12) * 12;
            const a1 = (Math.floor(Math.max(mesActual, ...items.map((x) => x.fin)) / 12) + 1) * 12;
            const span = a1 - a0;
            if (span <= 0) return;

            const pct = (m) => (((m - a0) / span) * 100).toFixed(2) + '%';

            res.innerHTML = '';
            items.forEach((x) => {
                const fila = document.createElement('div');
                fila.className = 'tl-resumen-fila';
                const duracionPct = Math.max(0.6, ((x.fin - x.ini + 1) / span) * 100);
                fila.innerHTML = `
                    <div class="tl-resumen-nombre" title="${x.nombre}">${x.nombre}</div>
                    <div class="tl-resumen-pista">
                        <div class="tl-resumen-barra${x.act ? ' is-actual' : ''}" style="left:${pct(x.ini)};width:calc(${duracionPct.toFixed(2)}% - 2px)"></div>
                        <div class="tl-resumen-hoy" style="left:${pct(mesActual + 0.5)}"></div>
                    </div>
                `;
                res.appendChild(fila);
            });

            const eje = document.createElement('div');
            eje.className = 'tl-resumen-eje';
            let aniosHtml = '<div></div><div class="tl-resumen-anios">';
            for (let y = a0; y <= a1; y += 12) {
                aniosHtml += `<span style="left:${pct(y)}">${y / 12}</span>`;
            }
            aniosHtml += '</div>';
            eje.innerHTML = aniosHtml;
            res.appendChild(eje);
        });

        // Visor: al hacer clic en una imagen se abre en grande, con flechas para recorrer su carpeta
        const visor = document.getElementById('tlVisor');
        if (!visor || typeof bootstrap === 'undefined') return;
        const modal = bootstrap.Modal.getOrCreateInstance(visor);
        const imgVisor = visor.querySelector('#tlVisorImg');
        const vidVisor = visor.querySelector('#tlVisorVid');
        const titulo = visor.querySelector('#tlVisorTitulo');
        let grupo = [];
        let indice = 0;

        const detenerVideo = () => {
            vidVisor.pause();
            vidVisor.removeAttribute('src');
            vidVisor.load();
        };

        const mostrar = (i) => {
            indice = (i + grupo.length) % grupo.length;
            const actual = grupo[indice];
            const etiqueta = actual.alt || actual.dataset.titulo || 'Recuerdo';
            if (actual.tagName === 'VIDEO') {
                imgVisor.classList.add('d-none');
                imgVisor.removeAttribute('src');
                vidVisor.classList.remove('d-none');
                vidVisor.src = actual.currentSrc || actual.src;
                vidVisor.play().catch(() => {});
            } else {
                detenerVideo();
                vidVisor.classList.add('d-none');
                imgVisor.classList.remove('d-none');
                imgVisor.src = actual.src;
                imgVisor.alt = etiqueta;
            }
            titulo.textContent = etiqueta + ' (' + (indice + 1) + '/' + grupo.length + ')';
            visor.querySelectorAll('.tl-visor-nav').forEach((b) => { b.hidden = grupo.length < 2; });
        };

        visor.addEventListener('hidden.bs.modal', detenerVideo);

        document.querySelectorAll('.tl-galeria').forEach((galeria) => {
            const imagenes = Array.from(galeria.querySelectorAll('img, video'));
            imagenes.forEach((img, i) => {
                img.tabIndex = 0;
                img.setAttribute('role', 'button');
                const abrir = () => { grupo = imagenes; mostrar(i); modal.show(); };
                img.addEventListener('click', abrir);
                img.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); }
                });
            });
        });

        visor.querySelector('.tl-visor-prev').addEventListener('click', () => mostrar(indice - 1));
        visor.querySelector('.tl-visor-next').addEventListener('click', () => mostrar(indice + 1));
        visor.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') mostrar(indice - 1);
            if (e.key === 'ArrowRight') mostrar(indice + 1);
        });
    })();
});
