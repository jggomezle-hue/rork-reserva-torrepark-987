# Configuración del Backend en Replit

Este documento explica cómo configurar y desplegar el backend de TorrePark en Replit.

## 📋 Requisitos Previos

- Una cuenta en [Replit](https://replit.com)
- El código de tu backend (carpeta `backend/`)

## 🚀 Pasos de Configuración

### 1. Crear un Nuevo Repl

1. Ve a [Replit](https://replit.com)
2. Haz clic en "Create Repl"
3. Selecciona "Node.js" como plantilla
4. Nombra tu Repl como "torrepark-backend"

### 2. Subir los Archivos del Backend

Necesitas subir estos archivos/carpetas a tu Repl:

```
backend/
├── hono.ts
├── trpc/
│   ├── create-context.ts
│   ├── app-router.ts
│   └── routes/
│       ├── example/
│       └── bookings/
package.json (solo las dependencias del backend)
```

### 3. Crear package.json para Replit

Crea un archivo `package.json` en la raíz de tu Repl con este contenido:

```json
{
  "name": "torrepark-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node --loader ts-node/esm server.ts",
    "dev": "node --loader ts-node/esm --watch server.ts"
  },
  "dependencies": {
    "@hono/trpc-server": "^0.4.0",
    "@trpc/server": "^11.7.0",
    "hono": "^4.10.3",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.0"
  }
}
```

### 4. Crear el archivo server.ts

Crea un archivo `server.ts` en la raíz de tu Repl:

```typescript
import { serve } from '@hono/node-server'
import app from './backend/hono'

const port = Number(process.env.PORT) || 3000

console.log(`Server starting on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

console.log(`🚀 Server running at http://localhost:${port}`)
```

### 5. Configurar Variables de Entorno en Replit

1. En tu Repl, ve a "Tools" (panel izquierdo)
2. Haz clic en "Secrets" (icono de candado 🔒)
3. Agrega las siguientes variables:

```
MAILERSEND_API_KEY=mlsn.e49a3fb9ba9edffbea74470ccc74f4b23571ed219f0d9794314e0338ace39f39
```

### 6. Configurar .replit

Crea un archivo `.replit` en la raíz:

```
run = "npm start"
entrypoint = "server.ts"

[env]
PORT = "3000"

[nix]
channel = "stable-22_11"

[deployment]
run = ["sh", "-c", "npm start"]
deploymentTarget = "cloudrun"
```

### 7. Iniciar el Servidor

1. Haz clic en el botón "Run" en la parte superior
2. Replit instalará las dependencias automáticamente
3. El servidor se iniciará en el puerto 3000
4. Verás la URL de tu backend en la parte superior (algo como: `https://torrepark-backend.username.repl.co`)

### 8. Probar el Backend

Prueba que el backend funciona visitando:
```
https://tu-repl-url.repl.co/
```

Deberías ver:
```json
{"status":"ok","message":"API is running"}
```

### 9. Actualizar el Frontend

En tu app de Expo, necesitas actualizar la configuración de tRPC para apuntar a tu backend de Replit.

Busca el archivo `lib/trpc.ts` y actualiza la URL del backend:

```typescript
const BACKEND_URL = 'https://tu-repl-url.repl.co';
```

## 🔧 Troubleshooting

### Error: Cannot find module
- Asegúrate de que todas las dependencias estén instaladas
- Ejecuta `npm install` manualmente en la consola de Replit

### Error: Port already in use
- Replit maneja los puertos automáticamente, no debería pasar
- Si ocurre, reinicia el Repl

### Error 401 de MailerSend
- Verifica que la API key esté correctamente configurada en Secrets
- Asegúrate de que no haya espacios extra en la clave
- Verifica que la clave sea válida en tu cuenta de MailerSend

### CORS Errors
- El backend ya tiene CORS habilitado en `backend/hono.ts`
- Si sigues teniendo problemas, verifica la consola del navegador

## 📱 Mantener el Backend Activo

Replit mantiene tu backend activo mientras lo estés usando. Para producción:

1. Considera actualizar a Replit Hacker o Pro plan
2. O usa un servicio como Railway, Render, o Heroku para despliegue permanente

## 🔄 Actualizar el Código

Cada vez que hagas cambios:
1. Sube los archivos actualizados a Replit
2. El servidor se reiniciará automáticamente (si usas `--watch`)
3. O haz clic en "Stop" y luego "Run" para reiniciar manualmente

## 📞 URLs Importantes

- **Backend Base URL**: `https://tu-repl-url.repl.co`
- **tRPC Endpoint**: `https://tu-repl-url.repl.co/api/trpc`
- **Health Check**: `https://tu-repl-url.repl.co/`

---

¡Listo! Tu backend de TorrePark ahora está corriendo en Replit 🎉
