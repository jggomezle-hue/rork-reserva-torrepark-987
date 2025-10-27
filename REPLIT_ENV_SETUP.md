# 🔧 Configuración de Variables de Entorno en Replit

## ⚠️ IMPORTANTE: Configurar Secrets en Replit

Para que el backend funcione correctamente en Replit, necesitas configurar las variables de entorno a través del panel de **Secrets** de Replit:

### Paso 1: Abrir el Panel de Secrets
1. En Replit, busca el icono de 🔒 "Secrets" en el panel lateral izquierdo
2. O ve a "Tools" → "Secrets"

### Paso 2: Agregar el Secret
Agrega el siguiente secret:

**Key:** `MAILERSEND_API_TOKEN`  
**Value:** `mlsn.e49a3fb9ba9edffbea74470ccc74f4b23571ed219f0d9794314e0338ace39f39`

### Paso 3: Iniciar el Backend
Ejecuta el servidor backend:
```bash
bun run backend/start-server.ts
```

O agrégalo como comando en `.replit` para que se inicie automáticamente.

## 🧪 Verificar que Funciona

Ejecuta el test de email:
```bash
bun run backend/test-email.ts
```

Si ves "✅ Email enviado con éxito", todo está configurado correctamente.

## 🚀 Configuración Automática para Replit

Para que el backend se inicie automáticamente cuando abras el Repl, crea o edita el archivo `.replit` en la raíz del proyecto:

```toml
run = "bun run backend/start-server.ts"

[deployment]
run = ["bun", "run", "backend/start-server.ts"]
```

## 🔧 Troubleshooting

### Error: "MAILERSEND_API_TOKEN no está configurado"
1. Verifica que agregaste el secret en el panel de Replit
2. Reinicia el servidor después de agregar el secret
3. Si el error persiste, verifica que el nombre del secret sea exactamente `MAILERSEND_API_TOKEN`

### El servidor no está respondiendo
1. Asegúrate de que el servidor backend esté corriendo
2. Verifica la URL en `.env`: `EXPO_PUBLIC_RORK_API_BASE_URL`
3. La URL debe apuntar al puerto 3001 de tu Repl

## 📝 Notas
- Los secrets de Replit se cargan automáticamente como variables de entorno
- No necesitas usar `dotenv` si usas los Secrets de Replit (pero lo usamos para compatibilidad local)
- El archivo `.env` es solo para desarrollo local
- En Replit, SIEMPRE usa el panel de Secrets para variables sensibles
