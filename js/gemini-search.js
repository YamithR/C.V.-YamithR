import config from './config.js';

class GeminiCV {
    constructor() {
        this.apiKey = config.apiKey; // Carga la key desde el archivo externo
        this.cvData = null;
        this.chatOpen = false;
        this.init();
    }

    async init() {
        // Cargar datos del CV (enriquecido con certificados reales)
        try {
            const res = await fetch('data/cv-data.json');
            if (!res.ok) throw new Error(`No se pudo cargar cv-data.json: ${res.status} ${res.statusText}`);
            this.cvData = await res.json();
            console.log('CV cargado exitosamente:', this.cvData.nombre);
        } catch (error) {
            console.error('Error al cargar el CV:', error);
            this.cvData = {
                "nombre": "Yamith Juseth Romero Aldana",
                "perfil": "Ingeniero mecatrónico especializado en integración de sistemas embebidos, robótica y automatización industrial. Apasionado por el diseño CAD, impresión 3D y desarrollo de soluciones que combinen hardware y software para optimizar procesos técnicos. Destaco por mi proactividad, adaptabilidad rápida y capacidad para liderar proyectos interdisciplinarios con enfoque en innovación sostenible.",
                "proyectos": [
                    {
                        "titulo": "Simulador Mecánico Bote Fluvial",
                        "descripcion": "Lideré el desarrollo y validación de un prototipo a escala de simulador mecánico de bote fluvial, realizando análisis de materiales, experimentación y redacción de informes técnicos.",
                        "año": 2024,
                        "empresa": "ONIRIS-ID",
                        "certificado": "oniris.pdf",
                        "tecnologias": ["Mecatrónica", "Prototipado", "Análisis de Materiales"]
                    },
                    {
                        "titulo": "Extrusora de Filamento Reciclado",
                        "descripcion": "Diseñé y construí una máquina para reciclar plástico, reduciendo costos de material en 20% para proyectos académicos. Implementación de control automatizado con Arduino para optimizar el proceso de extrusión.",
                        "año": 2023,
                        "tecnologias": ["Sostenibilidad", "Arduino", "Impresión 3D"]
                    },
                    {
                        "titulo": "Entorno Inteligente para SCORBOT",
                        "descripcion": "Integración de sensores IoT y programación en Python para optimizar la interacción humano-robot en entornos educativos. Validación mediante pruebas funcionales y documentación técnica.",
                        "año": 2023,
                        "tecnologias": ["IoT", "Python", "Robótica"]
                    },
                    {
                        "titulo": "Masajeador Automatizado",
                        "descripcion": "Desarrollo de un dispositivo mecatrónico con sensores de presión y actuadores lineales, validado en entornos clínicos.",
                        "año": 2023,
                        "tecnologias": ["Sensores", "Mecatrónica", "Clínico"]
                    }
                ],
                "certificaciones": [
                    "Certificado de Pertenencia Indígena – Ministerio del Interior (2022)",
                    "Bachiller Académico – Colegio Sagrado Corazón de Jesús (2020)",
                    "Feria de la Ciencia ACS 2025 – Anglo Colombia School (2025)",
                    "Bootcamp Programación Nivel Básico – Talento Tech (159h, Agosto 2025)",
                    "Asistente XXII CIITI 2024 – UAI Interamericana (Septiembre 2024)",
                    "Workshop: Transformación Digital y Eficiencia – UNAL (2023)",
                    "Salvamento Acuático – GLEM (Febrero 2024)",
                    "Consultor en Ingeniería de Materiales – ONIRIS-ID (Diciembre 2024)",
                    "Seminario: Innovación en IA (UAC, 2023)",
                    "Metodologías de Investigación Científica (Semillero UAC, 2022)",
                    "HIKVISION: Seguridad de sistemas y videovigilancia (2022)",
                    "SENA: Estructura y sintaxis de C++ (2020)"
                ],
                "educacion": {
                    "carrera": "Ingeniería Mecatrónica",
                    "universidad": "Universidad Autónoma del Caribe",
                    "graduacion": "Jun 2025 (Previsto)",
                    "miembro": "IEEE",
                    "bachiller": "Bachiller Académico – Colegio de Bachillerato Sagrado Corazón de Jesús (2020)"
                },
                "experiencia": [
                    "Consultor en Ingeniería de Materiales – ONIRIS-ID (Diciembre 2024)",
                    "Promotor de Prototipado y Miembro Activo de IEEE – Universidad Autónoma del Caribe (2022-2023)",
                    "Proyecto: Entorno Inteligente para SCORBOT (2023)"
                ],
                "referencias": [
                    {
                        "nombre": "Pablo Daniel Bonaveri",
                        "cargo": "Vicerrector Académico – Universidad Autónoma del Caribe",
                        "contacto": "+57 315 789 815"
                    },
                    {
                        "nombre": "Saul Antonio Pérez",
                        "cargo": "Ingeniero Electrónico Magister en Ingeniería Mecánica",
                        "contacto": "+57 316 740 2247"
                    },
                    {
                        "nombre": "Carlos Mario Soto",
                        "cargo": "Ingeniero Mecánico – Director de Oniris ID",
                        "contacto": "+57 300 863 880",
                        "frase": "Durante el proyecto trabajó con competencia técnica y liderazgo en el equipo."
                    },
                    {
                        "nombre": "Yamasain Romero Sánchez",
                        "cargo": "Médico Especialista En Gerencia De Los Servicios De Salud, Docente Investigador Línea Intercultural, Asesor En Salud Étnica",
                        "contacto": "+57 316 281 067"
                    }
                ],
                "habilidades": {
                    "tecnicas": ["Python", "C++", "Ladder (PLC)", "Arduino", "SolidWorks", "AutoCAD", "Impresión 3D (Klipper/OrcaSlicer)", "Raspberry Pi", "ESP32", "MATLAB/Simulink"],
                    "blandass": ["Liderazgo", "Comunicación asertiva", "Gestión ágil de proyectos", "Resolución de problemas complejos"]
                }
            };
        }

        // Crear botón flotante
        this.createFloatingButton();
    }

    createFloatingButton() {
        const btn = document.createElement('button');
        btn.id = 'gemini-chat-btn';
        btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
        `;
        document.body.appendChild(btn);

        btn.addEventListener('click', () => this.toggleChat());
    }

    toggleChat() {
        if (this.chatOpen) {
            document.getElementById('gemini-chat')?.remove();
            this.chatOpen = false;
        } else {
            this.createChat();
            this.chatOpen = true;
        }
    }

    createChat() {
        const chat = document.createElement('div');
        chat.id = 'gemini-chat';
        chat.innerHTML = `
            <div class="chat-header">
                <div>
                    <strong>Yamith IA</strong><br>
                    <small>Pregúntame sobre proyectos, certificados o CV</small>
                </div>
                <button id="close-chat">×</button>
            </div>
            <div id="chat-messages"></div>
            <div class="chat-input">
                <input type="text" id="gemini-input" placeholder="Ej: ¿Qué proyectos hice en 2024?">
                <button id="send-msg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(chat);

        document.getElementById('close-chat').onclick = () => this.toggleChat();
        document.getElementById('send-msg').onclick = () => this.sendMessage();
        document.getElementById('gemini-input').onkeypress = (e) => {
            if (e.key === 'Enter') this.sendMessage();
        };

        this.addMessage("¡Hola! Soy tu asistente IA. Pregúntame sobre tus proyectos, certificados o experiencia.", 'bot');
    }

    addMessage(text, sender) {
        const messages = document.getElementById('chat-messages');
        const msg = document.createElement('div');
        msg.className = `msg ${sender}`;
        msg.innerHTML = `<div class="bubble">${text}</div>`;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    async sendMessage() {
        const input = document.getElementById('gemini-input');
        const query = input.value.trim();
        if (!query) return;

        this.addMessage(query, 'user');
        input.value = '';

        // Respuesta local primero
        const localAnswer = this.localSearch(query);
        if (localAnswer) {
            this.addMessage(localAnswer, 'bot');
            return;
        }

        // Intento con Gemini si hay API Key
        if (this.apiKey) {
            this.addMessage("Buscando con Gemini AI...", 'bot');
            const answer = await this.askGemini(query);
            this.addMessage(answer, 'bot');
        } else {
            this.addMessage("Configura tu API Key en config.js para respuestas avanzadas. Usando datos locales.", 'bot');
        }
    }

    localSearch(query) {
        const q = query.toLowerCase();
        const data = this.cvData;

        if (!data) return "Datos del CV no disponibles.";

        // Proyectos
        if (q.includes('proyecto') || q.includes('hice')) {
            const year = q.match(/\d{4}/);
            const proyectos = year 
                ? data.proyectos.filter(p => p.año == year[0])
                : data.proyectos;

            if (proyectos.length > 0) {
                let res = `<strong>Proyectos encontrados:</strong><ul>`;
                proyectos.forEach(p => {
                    res += `<li><a href="proyectos/proyecto${data.proyectos.indexOf(p)+1}.html" style="color:#06b6d4">${p.titulo}</a> - ${p.descripcion} (${p.año})</li>`;
                });
                return res + `</ul>`;
            }
        }

        // Certificaciones
        if (q.includes('certificado') || q.includes('diploma')) {
            const year = q.match(/\d{4}/);
            const certs = year 
                ? data.certificaciones.filter(c => c.toLowerCase().includes(year[0]))
                : data.certificaciones;
            return `<strong>Certificaciones:</strong><br>${certs.join('<br>') || 'Ninguna encontrada.'}`;
        }

        // Referencias
        if (q.includes('carlos') || q.includes('soto')) {
            const ref = data.referencias.find(r => r.nombre.toLowerCase().includes('carlos'));
            return ref ? `${ref.nombre} (${ref.cargo}):<br><em>"${ref.frase}"</em>` : "No encontré esa referencia.";
        }

        // Educación
        if (q.includes('estudi') || q.includes('universidad')) {
            return `Estudiaste <strong>${data.educacion.carrera}</strong> en <strong>${data.educacion.universidad}</strong>. Graduación: <strong>${data.educacion.graduacion}</strong>. Bachiller: <strong>${data.educacion.bachiller}</strong>`;
        }

        // Habilidades
        if (q.includes('habilidad') || q.includes('tecnologia')) {
            return `<strong>Habilidades Técnicas:</strong> ${data.habilidades.tecnicas.join(', ')}<br><strong>Habilidades Blandas:</strong> ${data.habilidades.blandass.join(', ')}`;
        }

        return "No encontré coincidencias. ¡Prueba con 'proyectos 2024', 'certificados 2025' o 'referencias Carlos'!";
    }

    async askGemini(query) {
        if (!this.apiKey) {
            return "Configura tu API Key en config.js para respuestas avanzadas con Gemini.";
        }

        const endpoint = 'https://api.google.generativeai.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
        const prompt = `Eres Yamith Romero, ingeniero mecatrónico. Responde en español, breve y profesional sobre mi CV. Datos clave:\n\nNombre: ${this.cvData.nombre}\nPerfil: ${this.cvData.perfil}\nProyectos: ${this.cvData.proyectos.map(p => `${p.titulo} (${p.año}) - ${p.descripcion}`).join('; ')}\nCertificaciones: ${this.cvData.certificaciones.join('; ')}\nEducación: ${this.cvData.educacion.carrera} en ${this.cvData.educacion.universidad} (graduación ${this.cvData.educacion.graduacion})\nReferencias: ${this.cvData.referencias.map(r => `${r.nombre}: ${r.frase || r.cargo}`).join('; ')}\n\nPregunta del usuario: ${query}\n\nRespuesta clara y estructurada:`;

        try {
            console.log('Enviando solicitud a:', endpoint);
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP ${res.status}: ${res.statusText} - ${errorText}`);
            }

            const data = await res.json();
            console.log('Respuesta de Gemini:', data);
            return data.candidates?.[0]?.content?.parts?.[0]?.text || "Respuesta no disponible.";
        } catch (error) {
            console.error('Error Gemini:', error);
            return `Error de conexión con Gemini: ${error.message}. Respuesta local: ${this.localSearch(query) || 'No encontré coincidencias.'}`;
        }
    }

    createFloatingButton() {
        const btn = document.createElement('button');
        btn.id = 'gemini-chat-btn';
        btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
        `;
        document.body.appendChild(btn);

        btn.addEventListener('click', () => this.toggleChat());
    }

    toggleChat() {
        if (this.chatOpen) {
            document.getElementById('gemini-chat')?.remove();
            this.chatOpen = false;
        } else {
            this.createChat();
            this.chatOpen = true;
        }
    }

    createChat() {
        const chat = document.createElement('div');
        chat.id = 'gemini-chat';
        chat.innerHTML = `
            <div class="chat-header">
                <div>
                    <strong>Yamith IA</strong><br>
                    <small>Pregúntame sobre proyectos, certificados o CV</small>
                </div>
                <button id="close-chat">×</button>
            </div>
            <div id="chat-messages"></div>
            <div class="chat-input">
                <input type="text" id="gemini-input" placeholder="Ej: ¿Qué proyectos hice en 2024?">
                <button id="send-msg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(chat);

        document.getElementById('close-chat').onclick = () => this.toggleChat();
        document.getElementById('send-msg').onclick = () => this.sendMessage();
        document.getElementById('gemini-input').onkeypress = (e) => {
            if (e.key === 'Enter') this.sendMessage();
        };

        this.addMessage("¡Hola! Soy tu asistente IA. Pregúntame sobre tus proyectos, certificados o experiencia.", 'bot');
    }

    addMessage(text, sender) {
        const messages = document.getElementById('chat-messages');
        const msg = document.createElement('div');
        msg.className = `msg ${sender}`;
        msg.innerHTML = `<div class="bubble">${text}</div>`;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }
}

// Iniciar al cargar
document.addEventListener('DOMContentLoaded', () => {
    new GeminiCV();
});