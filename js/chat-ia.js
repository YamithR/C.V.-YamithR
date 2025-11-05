/**
 * Chat IA - Sistema de chat inteligente para CV
 * Basado completamente en búsquedas locales sin APIs externas
 */

class ChatIA {
    constructor() {
        this.cvData = null;
        this.chatOpen = false;
        this.conversationHistory = [];
        this.init();
    }

    async init() {
        // Cargar datos del CV
        try {
            const res = await fetch('data/cv-data.json');
            if (!res.ok) throw new Error(`No se pudo cargar cv-data.json: ${res.status}`);
            this.cvData = await res.json();
            console.log('✅ CV cargado exitosamente');
        } catch (error) {
            console.error('❌ Error al cargar el CV:', error);
            this.cvData = this.getDefaultCVData();
        }

        // Crear botón flotante
        this.createFloatingButton();
    }

    getDefaultCVData() {
        return {
            "nombre": "Yamith Juseth Romero Aldana",
            "perfil": "Ingeniero mecatrónico especializado en integración de sistemas embebidos, robótica y automatización industrial. Apasionado por el diseño CAD, impresión 3D y desarrollo de soluciones que combinen hardware y software.",
            "proyectos": [
                {
                    "titulo": "Simulador Mecánico Bote Fluvial",
                    "descripcion": "Desarrollo y validación de prototipo a escala para ONIRIS-ID y Armada Nacional.",
                    "año": 2024,
                    "empresa": "ONIRIS-ID",
                    "tecnologias": ["Mecatrónica", "Prototipado", "SolidWorks", "Impresión 3D"]
                },
                {
                    "titulo": "Mecanismos de Encoders M2.50",
                    "descripcion": "Diseño e implementación de mecanismos de encoders para Simulador de Ametralladora M2.50.",
                    "año": 2024,
                    "empresa": "ONIRIS-ID",
                    "tecnologias": ["SolidWorks", "Impresión 3D", "Mecánica"]
                },
                {
                    "titulo": "Automatización de Granja de Impresión 3D",
                    "descripcion": "Automatización de granja de impresoras 3D con Klipper, OrcaSlicer e IoT.",
                    "año": 2024,
                    "empresa": "ONIRIS-ID",
                    "tecnologias": ["Klipper", "OrcaSlicer", "IoT", "Python"]
                }
            ],
            "certificaciones": [
                "Consultor en Ingeniería de Materiales – ONIRIS-ID (2024)",
                "Bootcamp Programación – Talento Tech (159h, 2025)",
                "Asistente XXII CIITI 2024 – UAI Interamericana",
                "SENA: Estructura y sintaxis de C++ (2020)"
            ],
            "educacion": {
                "carrera": "Ingeniería Mecatrónica",
                "universidad": "Universidad Autónoma del Caribe",
                "graduacion": "Junio 2025 (Previsto)",
                "miembro": "IEEE"
            },
            "habilidades": {
                "tecnicas": ["Python", "C++", "SolidWorks", "Arduino", "Raspberry Pi", "Klipper", "IoT"],
                "blandas": ["Liderazgo", "Trabajo en equipo", "Resolución de problemas"]
            }
        };
    }

    createFloatingButton() {
        const btn = document.createElement('button');
        btn.id = 'chat-ia-btn';
        btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
        `;
        btn.title = "Chatea con Yamith IA";
        document.body.appendChild(btn);

        btn.addEventListener('click', () => this.toggleChat());
    }

    toggleChat() {
        if (this.chatOpen) {
            document.getElementById('chat-ia-container')?.remove();
            this.chatOpen = false;
        } else {
            this.createChat();
            this.chatOpen = true;
        }
    }

    createChat() {
        const chat = document.createElement('div');
        chat.id = 'chat-ia-container';
        
        chat.innerHTML = `
            <div class="chat-header">
                <div>
                    <strong>Yamith IA</strong> <span class="badge bg-success">🤖 Local</span><br>
                    <small>Pregúntame sobre mi CV, proyectos o experiencia</small>
                </div>
                <button id="close-chat">×</button>
            </div>
            <div id="chat-messages"></div>
            <div class="chat-input">
                <input type="text" id="chat-input-field" placeholder="Ej: ¿Qué proyectos realizaste en 2024?">
                <button id="send-msg-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(chat);

        document.getElementById('close-chat').onclick = () => this.toggleChat();
        document.getElementById('send-msg-btn').onclick = () => this.sendMessage();
        document.getElementById('chat-input-field').onkeypress = (e) => {
            if (e.key === 'Enter') this.sendMessage();
        };

        const welcomeMsg = "¡Hola! 👋 Soy Yamith Romero, ingeniero mecatrónico.<br><small>Pregúntame sobre mis proyectos, certificaciones, educación o habilidades.</small>";
        this.addMessage(welcomeMsg, 'bot');
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
        const input = document.getElementById('chat-input-field');
        const query = input.value.trim();
        if (!query) return;

        this.addMessage(query, 'user');
        input.value = '';
        
        this.conversationHistory.push({ role: 'user', content: query });

        // Usar sistema local inteligente
        const answer = this.intelligentLocalSearch(query);
        setTimeout(() => {
            this.addMessage(answer, 'bot');
            this.conversationHistory.push({ role: 'bot', content: answer });
        }, 300);
    }

    intelligentLocalSearch(query) {
        const q = query.toLowerCase();
        const data = this.cvData;

        if (!data) return "Disculpa, no puedo acceder a mis datos en este momento. 😕";

        // Saludos
        if (/^(hola|hi|hey|buenos días|buenas tardes|buenas noches|qué tal|saludos)/i.test(q)) {
            const responses = [
                "¡Hola! 👋 Soy Yamith, ingeniero mecatrónico. ¿En qué te puedo ayudar?",
                "¡Hey! 😊 ¿Quieres saber sobre mis proyectos o experiencia?",
                "¡Hola! Cuéntame, ¿qué te gustaría saber sobre mi trabajo?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        // Despedidas
        if (/^(adiós|chao|bye|hasta luego|nos vemos|gracias)/i.test(q)) {
            return "¡Gracias por tu interés! 🙌 Si tienes más preguntas, aquí estaré. ¡Éxito!";
        }

        // Proyectos
        if (q.includes('proyecto') || q.includes('hice') || q.includes('realizaste') || q.includes('trabajos') || q.includes('desarrollado')) {
            const year = q.match(/\d{4}/);
            const proyectos = year 
                ? data.proyectos.filter(p => p.año == year[0])
                : data.proyectos.slice(0, 4);

            if (proyectos.length > 0) {
                let intro = year ? `En ${year[0]} trabajé en:` : "Estos son algunos de mis proyectos destacados:";
                let res = `<strong>${intro}</strong><ul>`;
                proyectos.forEach(p => {
                    res += `<li><strong>${p.titulo}</strong> (${p.año})<br><small>${p.descripcion}</small><br><em>Tech: ${p.tecnologias.join(', ')}</em></li>`;
                });
                res += `</ul><small>💡 Pregúntame por un proyecto específico para más detalles.</small>`;
                return res;
            }
            return "No encontré proyectos para ese criterio. ¿Quieres ver todos mis proyectos?";
        }

        // Proyecto específico
        if (q.includes('simulador') || q.includes('bote')) {
            return `<strong>Simulador Mecánico Bote Fluvial</strong> 🚤<br>Mi trabajo más reciente para ONIRIS-ID y la Armada Nacional (2024). Desarrollé un prototipo a escala con análisis de materiales completo. Usé SolidWorks, impresión 3D y Python.<br><br>✨ <strong>Impacto:</strong> Validación exitosa del diseño mecánico y reducción de costos.`;
        }

        if (q.includes('encoder') || q.includes('m2.50') || q.includes('ametralladora')) {
            return `<strong>Mecanismos de Encoders M2.50</strong> 🎯<br>Diseñé e imprimí en 3D los mecanismos de encoders para un simulador de ametralladora (2024). Proyecto para ONIRIS-ID/Armada.<br><br><em>Tecnologías:</em> SolidWorks, Impresión 3D, Análisis mecánico.`;
        }

        if (q.includes('granja') || q.includes('impresora') || q.includes('klipper')) {
            return `<strong>Automatización de Granja 3D</strong> 🖨️<br>Automaticé una granja de impresoras 3D con Klipper, OrcaSlicer e IoT. Control remoto completo con Tailscale y Raspberry Pi.<br><br><em>Resultado:</em> Gestión centralizada y eliminación de memorias físicas.`;
        }

        if (q.includes('scorbot')) {
            return `<strong>Puesta en Marcha SCORBOT</strong> 🤖<br>Proyecto integrador en la UAC. Restauramos un robot industrial, implementamos IoT y desarrollamos un controlador personalizado.<br><br><em>Tech stack:</em> Python, IoT, Control automático, Mecatrónica.`;
        }

        // Certificaciones
        if (q.includes('certificado') || q.includes('diploma') || q.includes('certificación') || q.includes('cursos')) {
            const year = q.match(/\d{4}/);
            const certs = year 
                ? data.certificaciones.filter(c => c.toLowerCase().includes(year[0]))
                : data.certificaciones.slice(0, 6);
            return `<strong>📜 Mis certificaciones más relevantes:</strong><ul><li>${certs.join('</li><li>')}</li></ul><small>Tengo ${data.certificaciones.length} certificaciones en total.</small>`;
        }

        // Educación
        if (q.includes('estudi') || q.includes('universidad') || q.includes('carrera') || q.includes('uac')) {
            return `🎓 Estudié <strong>${data.educacion.carrera}</strong> en la <strong>${data.educacion.universidad}</strong>.<br><br>📅 Graduación: <strong>${data.educacion.graduacion}</strong><br>👥 Miembro activo de <strong>${data.educacion.miembro}</strong><br><br>Durante la carrera participé en congresos internacionales y lideré proyectos de robótica e IoT.`;
        }

        // Habilidades técnicas
        if (q.includes('habilidad') || q.includes('tecnologia') || q.includes('sabes') || q.includes('dominas') || q.includes('lenguaje')) {
            return `<strong>💻 Stack Tecnológico:</strong><br><br><strong>Programación:</strong> ${data.habilidades.tecnicas.slice(0, 6).join(', ')}<br><br><strong>Diseño & Fabricación:</strong> SolidWorks, Impresión 3D, AutoCAD<br><br><strong>Hardware:</strong> Raspberry Pi, ESP32, Arduino<br><br><strong>Soft Skills:</strong> ${data.habilidades.blandas.join(', ')}`;
        }

        // Experiencia laboral
        if (q.includes('experiencia') || q.includes('trabajo') || q.includes('empresa') || q.includes('oniris')) {
            return `<strong>💼 Experiencia Profesional:</strong><br><br>🔹 <strong>Consultor en Ingeniería de Materiales</strong> - ONIRIS-ID (2024)<br>Desarrollé prototipos y realicé análisis técnico para la Armada Nacional.<br><br>🔹 <strong>Promotor de Prototipado IEEE</strong> - UAC (2022-2023)<br>Motivé a 150+ estudiantes a ingresar a carreras STEM con talleres prácticos.<br><br>🔹 <strong>Múltiples proyectos</strong> en robótica, IoT y automatización industrial.`;
        }

        // Perfil general
        if (q.includes('quien') || q.includes('eres') || q.includes('perfil') || q.includes('sobre ti') || q.includes('describete')) {
            return `<strong>👨‍💻 Sobre mí:</strong><br><br>${data.perfil}<br><br>🎯 <strong>Especialidades:</strong> Robótica, IoT, Impresión 3D, Automatización Industrial`;
        }

        // Contacto
        if (q.includes('contacto') || q.includes('email') || q.includes('linkedin') || q.includes('github')) {
            return `<strong>📬 Contacto:</strong><br><br>🔗 <a href="https://www.linkedin.com/in/yamith-romero" target="_blank" style="color:#06b6d4">LinkedIn</a><br>💻 <a href="https://github.com/YamithR" target="_blank" style="color:#06b6d4">GitHub</a><br>🆔 <a href="https://orcid.org/0000-0001-9002-533X" target="_blank" style="color:#06b6d4">ORCID</a><br><br>📍 Barranquilla, Colombia`;
        }

        // Referencias
        if (q.includes('referencia') || q.includes('recomendación')) {
            return `<strong>👥 Referencias Profesionales:</strong><br><br>🔹 <strong>Carlos Mario Soto</strong> - Director ONIRIS-ID<br>🔹 <strong>Pablo Daniel Bonaveri</strong> - Vicerrector UAC<br>🔹 <strong>Saul Antonio Pérez</strong> - Ingeniero Electrónico, M.Sc.`;
        }

        // Ayuda
        if (q.includes('ayuda') || q.includes('puedes hacer') || q.includes('qué saber')) {
            return `<strong>🤖 Puedo ayudarte con:</strong><br><br>✅ Proyectos y trabajos realizados<br>✅ Certificaciones y educación<br>✅ Habilidades técnicas<br>✅ Experiencia profesional<br>✅ Información de contacto<br>✅ Referencias<br><br><em>Ejemplo: "¿Qué proyectos hiciste en 2024?" o "Háblame de tus habilidades"</em>`;
        }

        // Si no encuentra nada específico
        const suggestions = [
            "🤔 No estoy seguro de entender. ¿Quieres saber sobre mis <strong>proyectos</strong>, <strong>certificaciones</strong> o <strong>experiencia</strong>?",
            "Hmm, no tengo info específica sobre eso. Prueba preguntarme por:<br>• Proyectos recientes<br>• Educación<br>• Habilidades técnicas",
            "No encontré esa información. ¿Te gustaría saber sobre mi trabajo en <strong>robótica</strong>, <strong>IoT</strong> o <strong>impresión 3D</strong>?"
        ];
        return suggestions[Math.floor(Math.random() * suggestions.length)];
    }
}

// Iniciar al cargar
document.addEventListener('DOMContentLoaded', () => {
    new ChatIA();
});
