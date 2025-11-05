# Chat IA - Sistema de Chat Inteligente Local

## 📋 Descripción
Sistema de chat inteligente completamente local (sin APIs externas) que permite a los visitantes del CV interactuar y obtener información sobre proyectos, experiencia, habilidades y certificaciones.

## ✨ Características

### 🎯 Búsqueda Inteligente Local
- **Sin APIs externas**: Todo funciona en el navegador del usuario
- **Respuestas instantáneas**: Sin latencia de red
- **Sin costos**: No requiere tokens ni suscripciones
- **100% Privado**: No se envían datos a servidores externos

### 🤖 Capacidades del Chat
El chat puede responder preguntas sobre:
- ✅ **Proyectos**: "¿Qué proyectos hiciste en 2024?"
- ✅ **Certificaciones**: "Cuéntame sobre tus certificaciones"
- ✅ **Educación**: "¿Dónde estudiaste?"
- ✅ **Habilidades**: "¿Qué tecnologías dominas?"
- ✅ **Experiencia**: "Háblame de tu experiencia en ONIRIS-ID"
- ✅ **Contacto**: "¿Cómo puedo contactarte?"
- ✅ **Referencias**: "¿Tienes referencias profesionales?"

### 💬 Ejemplos de Preguntas
```
- "Hola, ¿quién eres?"
- "¿Qué proyectos realizaste en 2024?"
- "Háblame del simulador de bote fluvial"
- "¿Qué sabes de impresión 3D?"
- "¿Dónde estudiaste?"
- "¿Tienes experiencia con IoT?"
- "¿Cómo puedo contactarte?"
```

## 🚀 Implementación

### Archivos Principales
- **`chat-ia.js`**: Lógica del chat y sistema de búsqueda inteligente
- **`cv-data.json`**: Base de datos con información del CV
- **`styles.css`**: Estilos del chat (integrado en el CSS principal)

### Integración en HTML
```html
<script type="module" src="js/chat-ia.js"></script>
```

## 🔧 Configuración

### Actualizar Datos del CV
Edita `data/cv-data.json` con tu información:
```json
{
  "nombre": "Tu Nombre",
  "perfil": "Tu descripción profesional",
  "proyectos": [...],
  "certificaciones": [...],
  "educacion": {...},
  "habilidades": {...}
}
```

## 📊 Ventajas vs Sistema Anterior (Gemini)

| Característica | Sistema Anterior | Sistema Actual |
|----------------|------------------|----------------|
| API Externa | ❌ Sí (Gemini/HF) | ✅ No necesita |
| Costos | ❌ Tokens/Límites | ✅ Gratis |
| Velocidad | ⚠️ Depende de red | ✅ Instantáneo |
| Privacidad | ⚠️ Datos externos | ✅ 100% Local |
| Mantenimiento | ❌ APIs pueden cambiar | ✅ Sin dependencias |
| Precisión | ⚠️ Variable | ✅ Información exacta |

## 🎨 Personalización

### Cambiar Colores del Chat
Edita las variables CSS en `styles.css`:
```css
#chat-ia-btn {
    background: #06b6d4; /* Color del botón */
}
```

### Modificar Respuestas
Edita las funciones de respuesta en `chat-ia.js`:
```javascript
intelligentLocalSearch(query) {
    // Agregar nuevas categorías de respuestas aquí
}
```

## 🐛 Solución de Problemas

### El chat no aparece
1. Verifica que `chat-ia.js` esté cargado correctamente
2. Revisa la consola del navegador para errores
3. Asegúrate de que `cv-data.json` sea accesible

### Las respuestas no son precisas
1. Actualiza `cv-data.json` con información completa
2. Agrega más palabras clave en las condiciones de búsqueda
3. Revisa los patrones de regex en `intelligentLocalSearch()`

## 📝 Notas Técnicas

### Algoritmo de Búsqueda
El sistema usa:
1. **Coincidencia de palabras clave**: Busca términos específicos en la consulta
2. **Regex patterns**: Para saludos, despedidas y preguntas comunes
3. **Búsqueda por año**: Filtra proyectos y certificaciones por fecha
4. **Respuestas contextuales**: Proporciona información relevante con formato HTML

### Historial de Conversación
- Se mantiene en memoria durante la sesión
- Se reinicia al recargar la página
- No se almacena en el servidor

## 🔄 Migración desde Gemini

### Archivos Eliminados/Obsoletos
- ❌ `gemini-search.js` (reemplazado por `chat-ia.js`)
- ❌ `config.js` (ya no necesita API keys)

### Archivos Actualizados
- ✅ `index.html` (cambiada referencia al script)
- ✅ `styles.css` (actualizados IDs del chat)
- ✅ `cv-data.json` (sin cambios, sigue igual)

## 📈 Mejoras Futuras
- [ ] Agregar sugerencias de preguntas rápidas
- [ ] Implementar búsqueda difusa (fuzzy search)
- [ ] Agregar comandos especiales (/help, /clear)
- [ ] Modo oscuro/claro para el chat
- [ ] Exportar conversación como PDF
- [ ] Multilingual support (EN/ES)

## 📞 Soporte
Si encuentras problemas o tienes sugerencias, contacta a:
- LinkedIn: [Yamith Romero](https://www.linkedin.com/in/yamith-romero)
- GitHub: [@YamithR](https://github.com/YamithR)

---
**Versión**: 2.0.0 (Chat Local)  
**Última actualización**: Noviembre 2025  
**Autor**: Yamith Juseth Romero Aldana
