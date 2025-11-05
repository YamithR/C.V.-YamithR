# 🚀 Guía Rápida: Activar Hugging Face

## Opción 1: Modo Local (Ya Activo) ⚡
**Sin configuración necesaria** - El chat funciona inmediatamente con respuestas locales inteligentes.

---

## Opción 2: Modo IA con Hugging Face 🤖

### Paso 1: Obtén tu token (2 minutos)
1. Ve a: https://huggingface.co/settings/tokens
2. Haz clic en **"New token"**
3. Nombre: `CV-Chat`
4. Tipo: **Read**
5. Copia el token (empieza con `hf_...`)

### Paso 2: Configura el token
Abre `js/config.js` y edita:

```javascript
const config = {
    hfToken: 'hf_TU_TOKEN_AQUI',        // 👈 Pega tu token
    hfModel: 'mistralai/Mistral-7B-Instruct-v0.2',
    useHuggingFace: true,               // 👈 Cambia a true
    useLocalFallback: true
};
```

### Paso 3: ¡Listo! 🎉
Recarga la página y el chat usará IA de Hugging Face.

---

## 📊 Diferencias

| Característica | Local | Hugging Face |
|----------------|-------|--------------|
| Velocidad | Instantáneo | 2-4 seg |
| Calidad | Buena | Excelente |
| Natural | Limitado | Muy natural |
| Configuración | Ninguna | Token |
| Costo | Gratis | Gratis |

---

## 🆘 Ayuda Rápida

**¿El modelo está cargando?**
- Es normal la primera vez, espera 30 segundos

**¿Respuestas en inglés?**
- El modelo Mistral responde en español automáticamente

**¿Error de token?**
- Verifica que copiaste completo el token (empieza con `hf_`)

**¿Prefieres solo local?**
- Deja `useHuggingFace: false` en config.js

---

**Documentación completa:** Ver `HUGGINGFACE_SETUP.md`
