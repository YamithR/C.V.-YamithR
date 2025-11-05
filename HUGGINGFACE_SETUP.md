# 🤗 Configuración de Hugging Face para Chat IA

## 📋 Requisitos

1. Cuenta gratuita en Hugging Face
2. Token de acceso (Read)
3. Conexión a internet

## 🚀 Pasos de Configuración

### 1. Crear cuenta en Hugging Face

Ve a [https://huggingface.co/join](https://huggingface.co/join) y crea una cuenta gratuita.

### 2. Generar Token de Acceso

1. Inicia sesión en tu cuenta
2. Ve a **Settings** → **Access Tokens**: [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
3. Haz clic en **"New token"**
4. Dale un nombre (ej: "CV-Chat-Token")
5. Selecciona el tipo: **Read**
6. Copia el token generado (algo como: `hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### 3. Configurar en el proyecto

Abre el archivo `js/config.js` y pega tu token:

```javascript
const config = {
    hfToken: 'hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Tu token aquí
    hfModel: 'mistralai/Mistral-7B-Instruct-v0.2',
    useHuggingFace: true, // Cambiar a true para activar
    useLocalFallback: true
};
```

## 🤖 Modelos Recomendados

### 1. **Mistral-7B-Instruct-v0.2** (Recomendado)
```javascript
hfModel: 'mistralai/Mistral-7B-Instruct-v0.2'
```
- ✅ Rápido y preciso
- ✅ Multilingüe (español/inglés)
- ✅ Excelente para conversaciones profesionales
- ⚡ Tiempo de respuesta: 2-4 segundos

### 2. **Llama-2-7B-Chat**
```javascript
hfModel: 'meta-llama/Llama-2-7b-chat-hf'
```
- ✅ Muy conversacional
- ✅ Respuestas naturales
- ⚠️ Puede requerir aprobación de acceso

### 3. **Flan-T5-Base**
```javascript
hfModel: 'google/flan-t5-base'
```
- ✅ Más rápido (1-2 segundos)
- ✅ Gratuito sin límites
- ⚠️ Respuestas más cortas

### 4. **Zephyr-7B-Beta**
```javascript
hfModel: 'HuggingFaceH4/zephyr-7b-beta'
```
- ✅ Optimizado para instrucciones
- ✅ Muy bueno en español
- ⚡ Velocidad media

## ⚙️ Configuración Avanzada

### Ajustar parámetros de generación

En `gemini-search.js`, función `askHuggingFace()`:

```javascript
parameters: {
    max_new_tokens: 150,     // Longitud máxima de respuesta
    temperature: 0.7,        // Creatividad (0.1-1.0)
    top_p: 0.9,             // Diversidad de respuesta
    return_full_text: false
}
```

**Recomendaciones:**
- `temperature: 0.7` - Equilibrado (profesional pero natural)
- `temperature: 0.3` - Más conservador y preciso
- `temperature: 0.9` - Más creativo y variado

## 🔄 Sistema Híbrido

El sistema funciona en **3 niveles**:

1. **Respuestas rápidas locales** (< 200ms)
   - Saludos, despedidas
   - Preguntas simples

2. **Hugging Face IA** (2-4 segundos)
   - Preguntas complejas
   - Conversaciones naturales
   - Contexto personalizado

3. **Fallback local** (300ms)
   - Si Hugging Face falla
   - Si no hay token configurado
   - Respuestas predefinidas inteligentes

## 📊 Comparación de Opciones

| Característica | Local | Hugging Face |
|----------------|-------|--------------|
| **Velocidad inicial** | 300ms ⚡ | 2-4 seg |
| **Calidad respuesta** | Buena ⭐⭐⭐ | Excelente ⭐⭐⭐⭐⭐ |
| **Conversacional** | Limitado | Natural 💬 |
| **Costo** | Gratis 💰 | Gratis 💰 |
| **Configuración** | No requiere | Token necesario |
| **Offline** | Sí 📴 | No |

## 🎯 Casos de Uso

### Usar Solo Local
```javascript
useHuggingFace: false
```
**Cuándo:**
- Demo sin internet
- Máxima velocidad
- No quieres configurar token

### Usar Hugging Face
```javascript
useHuggingFace: true
```
**Cuándo:**
- Conversaciones más naturales
- Respuestas personalizadas
- Mejor comprensión de contexto

## 🐛 Solución de Problemas

### Error: "Invalid token"
- Verifica que copiaste el token completo
- Asegúrate de que empiece con `hf_`
- Regenera el token si es necesario

### Error: "Model is loading"
- Es normal la primera vez
- Espera 20-30 segundos y reintenta
- El modelo se "despierta" después de inactividad

### Respuestas lentas
- Cambia a un modelo más pequeño (flan-t5-base)
- Reduce `max_new_tokens` a 100
- El primer request siempre es más lento

### Respuestas en inglés
- Asegúrate de que el prompt incluya "Responde en español"
- Usa modelos multilingües como Mistral
- Ajusta la temperatura a 0.6-0.7

## 💡 Tips de Optimización

1. **Primera pregunta siempre más lenta** - El modelo se carga en memoria
2. **Preguntas siguientes son más rápidas** - Modelo ya cargado
3. **Sistema híbrido inteligente** - Respuestas rápidas van local, complejas van a HF
4. **Fallback automático** - Si HF falla, usa sistema local
5. **Badge indicador** - Muestra qué sistema está activo

## 📝 Ejemplo de Uso

```javascript
// En config.js
const config = {
    hfToken: 'hf_TuTokenAqui123456789',
    hfModel: 'mistralai/Mistral-7B-Instruct-v0.2',
    useHuggingFace: true,
    useLocalFallback: true
};
```

**Resultado:**
- Preguntas simples: Respuesta local inmediata ⚡
- Preguntas complejas: IA de Hugging Face 🤖
- Error o sin token: Fallback local 🔄

---

**🎉 ¡Listo para usar! El chat ahora tiene IA conversacional de última generación.**

## 🔗 Enlaces Útiles

- [Hugging Face Models](https://huggingface.co/models)
- [Inference API Docs](https://huggingface.co/docs/api-inference/index)
- [Token Settings](https://huggingface.co/settings/tokens)
- [Model Pricing](https://huggingface.co/pricing) (Inference API es gratis)
