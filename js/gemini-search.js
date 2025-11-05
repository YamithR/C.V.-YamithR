import config from './config.js';

class GeminiCV {
    constructor() {
        this.hfToken = config.hfToken;
        this.hfModel = config.hfModel;
        this.useHuggingFace = config.useHuggingFace && config.hfToken !== 'TU_HF_TOKEN_AQUI';
        this.cvData = null;
        this.chatOpen = false;
        this.conversationHistory = [];
        this.init();
    }

    async init() {
        // Cargar datos del CV
        try {
            const res = await fetch('data/cv-data.json');
            if (!res.ok) throw new Error(`No se pudo cargar cv-data.json: ${res.status} ${res.statusText}`);
            this.cvData = await res.json();
            console.log('CV cargado exitosamente:', this.cvData.nombre);
        } catch (error) {
            console.error('Error al cargar el CV:', error);
            this.cvData = this.getDefaultCVData();
        }

        // Crear botón flotante
        this.createFloatingButton();
    }

    getDefaultCVData() {
        return {
            "nombre": "Yamith Juseth Romero Aldana",
            "perfil": "Ingeniero mecatrónico especializado en integración de sistemas embebidos, robótica y automatización industrial. Apasionado por el diseño CAD, impresión 3D y desarrollo de soluciones que combinen hardware y software para optimizar procesos técnicos. Destaco por mi proactividad, adaptabilidad rápida y capacidad para liderar proyectos interdisciplinarios con enfoque en innovación sostenible.",
            "proyectos": [
                {
                    "titulo": "Simulador Mecánico Bote Fluvial",
                    "descripcion": "Lideré el desarrollo y validación de un prototipo a escala de simulador mecánico de bote fluvial, realizando análisis de materiales, experimentación y redacción de informes técnicos para ONIRIS-ID y la Armada Nacional.",
                    "año": 2024,
                    "empresa": "ONIRIS-ID",
                    "tecnologias": ["Mecatrónica", "Prototipado", "SolidWorks", "Impresión 3D", "Análisis de Materiales"]
                },
                {
                    "titulo": "Mecanismos de Encoders M2.50",
                    "descripcion": "Diseñé, fabriqué e implementé mecanismos de encoders para ejes X e Y del Simulador de Ametralladora M2.50 para la Armada Nacional.",
                    "año": 2024,
                    "empresa": "ONIRIS-ID",
                    "tecnologias": ["SolidWorks", "Impresión 3D", "Mecánica", "Diseño CAD"]
                },
                {
                    "titulo": "Automatización de Granja de Impresión 3D",
                    "descripcion": "Automaticé una granja de impresoras 3D con Klipper, OrcaSlicer e IoT para control remoto y gestión centralizada.",
                    "año": 2024,
                    "empresa": "ONIRIS-ID",
                    "tecnologias": ["Klipper", "OrcaSlicer", "IoT", "Raspberry Pi", "Python", "Linux"]
                },
                {
                    "titulo": "Puesta en Marcha SCORBOT",
                    "descripcion": "Restauración e implementación de sistemas IoT para robot SCORBOT en proyecto integrador de Ingeniería Mecatrónica.",
                    "año": 2023,
                    "tecnologias": ["Robótica", "IoT", "Python", "Automatización", "Control"]
                },
                {
                    "titulo": "SensoraCore",
                    "descripcion": "Desarrollo de software de sistema de adquisición de datos de sensores orientados a domótica.",
                    "año": 2023,
                    "tecnologias": ["IoT", "Python", "Sensores", "Software", "Domótica"]
                }
            ],
            "certificaciones": [
                "Consultor en Ingeniería de Materiales – ONIRIS-ID (Diciembre 2024)",
                "Asistente XXII CIITI 2024 – UAI Interamericana (Septiembre 2024)",
                "Bootcamp Programación Nivel Básico – Talento Tech (159h, Agosto 2025)",
                "Feria de la Ciencia ACS 2025 – Anglo Colombia School (Mayo 2025)",
                "Salvamento Acuático – GLEM (Febrero 2024)",
                "Workshop: Transformación Digital y Eficiencia – UNAL (2023)",
                "Seminario: Innovación en IA (UAC, 2023)",
                "Metodologías de Investigación Científica (Semillero UAC, 2022)",
                "HIKVISION: Seguridad de sistemas y videovigilancia (2022)",
                "Certificado de Pertenencia Indígena – Ministerio del Interior (2022)",
                "SENA: Estructura y sintaxis de C++ (2020)",
                "Bachiller Académico – Colegio Sagrado Corazón de Jesús (2020)"
            ],
            "educacion": {
                "carrera": "Ingeniería Mecatrónica",
                "universidad": "Universidad Autónoma del Caribe",
                "graduacion": "Junio 2025 (Previsto)",
                "miembro": "IEEE"
            },
            "habilidades": {
                "tecnicas": ["Python", "C++", "Ladder (PLC)", "Arduino", "SolidWorks", "AutoCAD", "Impresión 3D (Klipper/OrcaSlicer)", "Raspberry Pi", "ESP32", "MATLAB/Simulink", "Linux", "HTML/CSS", "Git/GitHub"],
                "blandas": ["Liderazgo", "Comunicación asertiva", "Gestión ágil de proyectos", "Resolución de problemas complejos", "Trabajo en equipo", "Adaptabilidad"]
            }
        };
    }

    createFloatingButton() {
        const btn = document.createElement('button');
        btn.id = 'gemini-chat-btn';
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
        
        const modeIndicator = this.useHuggingFace 
            ? '<span class="badge bg-success">🤖 HF AI</span>' 
            : '<span class="badge bg-info">⚡ Local</span>';
        
        chat.innerHTML = `
            <div class="chat-header">
                <div>
                    <strong>Yamith IA</strong> ${modeIndicator}<br>
                    <small>Pregúntame sobre mi CV, proyectos o experiencia</small>
                </div>
                <button id="close-chat">×</button>
            </div>
            <div id="chat-messages"></div>
            <div class="chat-input">
                <input type="text" id="gemini-input" placeholder="Ej: ¿Qué proyectos realizaste en 2024?">
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

        const welcomeMsg = this.useHuggingFace 
            ? "¡Hola! Soy Yamith Romero, ingeniero mecatrónico 🤖<br><small>Usando IA de Hugging Face para respuestas más naturales.</small>"
            : "¡Hola! Soy Yamith Romero, ingeniero mecatrónico 🤖<br><small>Pregúntame sobre mis proyectos, certificaciones, educación o habilidades.</small>";
        
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
        const input = document.getElementById('gemini-input');
        const query = input.value.trim();
        if (!query) return;

        this.addMessage(query, 'user');
        input.value = '';
        
        // Agregar historial para contexto
        this.conversationHistory.push({ role: 'user', content: query });

        // Intentar con Hugging Face si está configurado
        if (this.useHuggingFace) {
            // Primero intentar respuesta local rápida
            const quickAnswer = this.getQuickLocalAnswer(query);
            if (quickAnswer) {
                setTimeout(() => {
                    this.addMessage(quickAnswer, 'bot');
                    this.conversationHistory.push({ role: 'bot', content: quickAnswer });
                }, 200);
                return;
            }
            
            // Si no hay respuesta rápida, usar Hugging Face
            this.addMessage('🤔 Pensando...', 'bot');
            try {
                const answer = await this.askHuggingFace(query);
                // Remover mensaje de "Pensando..."
                const messages = document.getElementById('chat-messages');
                messages.removeChild(messages.lastChild);
                this.addMessage(answer, 'bot');
                this.conversationHistory.push({ role: 'bot', content: answer });
            } catch (error) {
                console.error('Error HF:', error);
                // Fallback a respuesta local
                const messages = document.getElementById('chat-messages');
                messages.removeChild(messages.lastChild);
                const localAnswer = this.intelligentLocalSearch(query);
                this.addMessage(localAnswer, 'bot');
                this.conversationHistory.push({ role: 'bot', content: localAnswer });
            }
        } else {
            // Usar sistema local inteligente
            const answer = this.intelligentLocalSearch(query);
            setTimeout(() => {
                this.addMessage(answer, 'bot');
                this.conversationHistory.push({ role: 'bot', content: answer });
            }, 300);
        }
    }

    getQuickLocalAnswer(query) {
        const q = query.toLowerCase();
        
        // Solo respuestas MUY rápidas (saludos básicos)
        // Para permitir que HF maneje más casos
        if (/^(hola)$/i.test(q.trim())) {
            return "¡Hola! 👋 Soy Yamith, ingeniero mecatrónico. ¿En qué te puedo ayudar?";
        }
        
        // Para todo lo demás, usar Hugging Face
        return null;
    }

    async askHuggingFace(query) {
        const endpoint = `https://api-inference.huggingface.co/models/${this.hfModel}`;
        
        // Construir contexto del CV
        const context = `Eres Yamith Juseth Romero Aldana, ingeniero mecatrónico de la Universidad Autónoma del Caribe (graduación 2025). 

Tu experiencia incluye:
- Consultor en ONIRIS-ID (2024): Simulador mecánico de bote fluvial, mecanismos de encoders M2.50, automatización de granja 3D con Klipper
- Proyectos: Robótica (SCORBOT), IoT, impresión 3D, automatización
- Habilidades: Python, C++, SolidWorks, Arduino, Raspberry Pi, Klipper, OrcaSlicer
- Certificaciones: CIITI 2024, Bootcamp Talento Tech, IEEE
- Miembro activo de IEEE

Responde en español, primera persona, profesional pero cercano. Máximo 3 oraciones.`;

        const prompt = this.buildPrompt(context, query);
        
        console.log('🤖 Consultando Hugging Face...');
        console.log('Modelo:', this.hfModel);
        console.log('Prompt:', prompt);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.hfToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 200,
                        temperature: 0.7,
                        top_p: 0.9,
                        return_full_text: false,
                        do_sample: true
                    }
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Error HTTP:', response.status, errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('✅ Respuesta HF:', data);
            
            // Procesar respuesta según el modelo
            let answer = '';
            if (Array.isArray(data)) {
                if (data[0]?.generated_text) {
                    answer = data[0].generated_text;
                } else if (data[0]?.translation_text) {
                    answer = data[0].translation_text;
                } else if (data[0]?.summary_text) {
                    answer = data[0].summary_text;
                }
            } else if (data.generated_text) {
                answer = data.generated_text;
            } else if (data[0]) {
                // Para modelos como flan-t5 que devuelven array de objetos
                answer = typeof data[0] === 'string' ? data[0] : JSON.stringify(data[0]);
            }

            console.log('📝 Respuesta procesada:', answer);

            // Limpiar y formatear la respuesta
            answer = this.cleanHFResponse(answer, query);
            
            if (!answer || answer.length < 10) {
                console.warn('⚠️ Respuesta muy corta o vacía, usando fallback local');
                throw new Error('Respuesta vacía o inválida');
            }
            
            return answer;

        } catch (error) {
            console.error('❌ Error en Hugging Face:', error);
            throw error;
        }
    }

    buildPrompt(context, query) {
        // Formato para Mistral
        if (this.hfModel.includes('Mistral') || this.hfModel.includes('mistral')) {
            return `<s>[INST] ${context}

Pregunta: ${query} [/INST]`;
        }
        
        // Formato para Flan-T5 (más directo)
        if (this.hfModel.includes('flan') || this.hfModel.includes('t5')) {
            return `Contexto: ${context}

Pregunta: ${query}

Respuesta en español como Yamith Romero:`;
        }
        
        // Formato para Llama
        if (this.hfModel.includes('llama') || this.hfModel.includes('Llama')) {
            return `[INST] ${context}

${query} [/INST]`;
        }
        
        // Formato genérico
        return `${context}

Usuario: ${query}
Yamith:`;
    }

    cleanHFResponse(response, query) {
        // Remover el prompt si viene en la respuesta
        response = response.replace(/^.*?Usuario:.*?\n/s, '');
        response = response.replace(/^.*?Yamith:\s*/i, '');
        response = response.replace(/^.*?\[\/INST\]\s*/i, '');
        
        // Tomar solo las primeras 3-4 oraciones
        const sentences = response.match(/[^.!?]+[.!?]+/g) || [response];
        response = sentences.slice(0, 3).join(' ').trim();
        
        // Asegurar que termina con puntuación
        if (!/[.!?]$/.test(response)) {
            response += '.';
        }
        
        // Validar que la respuesta sea relevante
        if (response.length < 20 || response.includes('undefined') || response.includes('null')) {
            return null;
        }
        
        return response;
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
                : data.proyectos.slice(0, 4); // Mostrar solo los primeros 4

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
            return `<strong>Simulador Mecánico Bote Fluvial</strong> 🚤<br>Fue mi trabajo más reciente para ONIRIS-ID y la Armada Nacional (2024). Desarrollé un prototipo a escala con análisis de materiales completo. Usé SolidWorks, impresión 3D y Python.<br><br>✨ <strong>Impacto:</strong> Validación exitosa del diseño mecánico y reducción de costos.`;
        }

        if (q.includes('encoder') || q.includes('m2.50') || q.includes('ametralladora')) {
            return `<strong>Mecanismos de Encoders M2.50</strong> 🎯<br>Diseñé e imprimí en 3D los mecanismos de encoders para un simulador de ametralladora (2024). Proyecto también para ONIRIS-ID/Armada.<br><br><em>Tecnologías:</em> SolidWorks, Impresión 3D, Análisis mecánico.`;
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
            return `<strong>💻 Stack Tecnológico:</strong><br><br><strong>Programación:</strong> ${data.habilidades.tecnicas.slice(0, 6).join(', ')}<br><br><strong>Diseño & Fabricación:</strong> SolidWorks, Impresión 3D, AutoCAD, Tinkercad<br><br><strong>Hardware:</strong> Raspberry Pi, ESP32, Arduino, Sensores IoT<br><br><strong>Soft Skills:</strong> ${data.habilidades.blandas.join(', ')}`;
        }

        // Experiencia laboral
        if (q.includes('experiencia') || q.includes('trabajo') || q.includes('empresa') || q.includes('oniris')) {
            return `<strong>💼 Experiencia Profesional:</strong><br><br>🔹 <strong>Consultor en Ingeniería de Materiales</strong> - ONIRIS-ID (2024)<br>Desarrollé prototipos y realicé análisis técnico para la Armada Nacional.<br><br>🔹 <strong>Promotor de Prototipado IEEE</strong> - UAC (2022-2023)<br>Motivé a 150+ estudiantes a ingresar a carreras STEM con talleres prácticos.<br><br>🔹 <strong>Múltiples proyectos</strong> en robótica, IoT y automatización industrial.`;
        }

        // Perfil general
        if (q.includes('quien') || q.includes('eres') || q.includes('perfil') || q.includes('sobre ti') || q.includes('describete')) {
            return `<strong>👨‍💻 Sobre mí:</strong><br><br>${data.perfil}<br><br>🎯 <strong>Especialidades:</strong> Robótica, IoT, Impresión 3D, Automatización Industrial<br>🌟 <strong>Certificado indígena</strong> de la comunidad Casa Blanca (Alta y Media Guajira)`;
        }

        // Contacto
        if (q.includes('contacto') || q.includes('email') || q.includes('linkedin') || q.includes('github') || q.includes('ubicación')) {
            return `<strong>📬 Contacto:</strong><br><br>🔗 <a href="https://www.linkedin.com/in/yamith-romero" target="_blank" style="color:#06b6d4">LinkedIn</a><br>💻 <a href="https://github.com/YamithR" target="_blank" style="color:#06b6d4">GitHub</a><br>🆔 <a href="https://orcid.org/0000-0001-9002-533X" target="_blank" style="color:#06b6d4">ORCID</a><br><br>📍 Barranquilla, Colombia`;
        }

        // Referencias
        if (q.includes('referencia') || q.includes('recomendación') || q.includes('contactos profesionales')) {
            return `<strong>👥 Referencias Profesionales:</strong><br><br>🔹 <strong>Carlos Mario Soto</strong> - Director ONIRIS-ID<br>🔹 <strong>Pablo Daniel Bonaveri</strong> - Vicerrector UAC<br>🔹 <strong>Saul Antonio Pérez</strong> - Ingeniero Electrónico, M.Sc.<br><br><small>Puedes ver más detalles en mi CV completo.</small>`;
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
    new GeminiCV();
});
