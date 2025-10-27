# 🚀 Guía Rápida - TORREPARK Backend

## ⚡ Solución Rápida al Error

Si estás viendo el error: **"MAILERSEND_API_TOKEN no está configurado"**, sigue estos 3 pasos:

### 1️⃣ Configura el Secret en Replit

1. En el panel izquierdo de Replit, busca 🔒 **"Secrets"** (o ve a Tools → Secrets)
2. Haz clic en "Add a secret"
3. Agrega:
   - **Key:** `MAILERSEND_API_TOKEN`
   - **Value:** `mlsn.e49a3fb9ba9edffbea74470ccc74f4b23571ed219f0d9794314e0338ace39f39`
4. Haz clic en "Save"

### 2️⃣ Inicia el Servidor Backend

En la terminal de Replit, ejecuta:
```bash
bun run backend/start-server.ts
```

Deberías ver:
```
🚀 Iniciando servidor backend...
📍 Puerto: 3001
🔍 Verificando configuración...
   🔑 MAILERSEND_API_TOKEN: ✅ Configurado

✅ Servidor backend corriendo en http://localhost:3001
📧 API de emails: ✅ Lista
```

### 3️⃣ Prueba que Funciona

Ejecuta el test de email:
```bash
bun run backend/test-email.ts
```

Si ves "✅ Email enviado con éxito", ¡todo está funcionando!

## 📱 Iniciar la App

Una vez que el backend esté corriendo, puedes iniciar la app en otra terminal:
```bash
bun start
```

## 🔄 Configuración Automática

El archivo `.replit` ya está configurado para iniciar el backend automáticamente cuando abras el Repl.

## ❓ ¿Problemas?

- **El secret no se carga:** Reinicia el servidor después de agregar el secret
- **Puerto ocupado:** Mata el proceso anterior con `pkill -f start-server`
- **URL incorrecta:** Verifica que `EXPO_PUBLIC_RORK_API_BASE_URL` en `.env` apunte a tu URL de Replit con el puerto 3001

## 📚 Más Información

- Ver `REPLIT_ENV_SETUP.md` para configuración detallada
- Ver `EMAIL_SETUP.md` para configuración de MailerSend
