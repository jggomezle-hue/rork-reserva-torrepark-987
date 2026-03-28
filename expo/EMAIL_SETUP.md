# Configuración de Email con MailerSend - TorrePark

## ✅ Integración Completa

La aplicación ahora está completamente integrada con MailerSend para enviar emails de confirmación automáticamente.

## 📋 Configuración Actual

- **Domain ID**: `68zxl27dr734j905`
- **Template ID**: `jpzkmgqyj5ml059v`
- **Servicio**: MailerSend

## 🔧 Cómo Funciona

1. El usuario completa el formulario de reserva en la app
2. Al hacer clic en "Confirmar Reserva":
   - Los datos se guardan localmente en AsyncStorage
   - Se envía automáticamente un email de confirmación vía MailerSend usando la plantilla configurada
   - El usuario ve una pantalla de confirmación

## 📧 Variables de la Plantilla

Las siguientes variables están disponibles en tu plantilla de MailerSend:

- `customer_name` - Nombre del cliente
- `booking_date` - Fecha de la visita (formato DD/MM/YYYY)
- `booking_time` - Hora de llegada
- `number_of_children` - Número de niños
- `children_ages` - Edades de los niños
- `phone` - Teléfono de contacto
- `special_requests` - Peticiones especiales (o "Ninguna")

## 🔑 Variables de Entorno

Para que el envío de emails funcione, necesitas configurar tu API Key de MailerSend:

**En tu entorno de desarrollo local**, crea un archivo `.env` (no lo subas a GitHub):
```
MAILERSEND_API_KEY=tu_api_key_aquí
```

**En producción**, configura la variable de entorno `MAILERSEND_API_KEY` en tu servidor.

## 📝 Ejemplo de HTML en tu Plantilla de MailerSend

Tu plantilla en MailerSend puede usar las variables así:

```html
<h1>¡Reserva Confirmada!</h1>

<p>Hola {{customer_name}},</p>

<p>Tu reserva en TorrePark ha sido confirmada con los siguientes detalles:</p>

<ul>
  <li><strong>Fecha:</strong> {{booking_date}}</li>
  <li><strong>Hora:</strong> {{booking_time}}</li>
  <li><strong>Número de niños:</strong> {{number_of_children}}</li>
  <li><strong>Edades:</strong> {{children_ages}}</li>
  <li><strong>Teléfono:</strong> {{phone}}</li>
</ul>

<p><strong>Peticiones especiales:</strong> {{special_requests}}</p>

<p>¡Nos vemos pronto en TorrePark! 🎉</p>
```

## 🚀 Testing

Para probar el envío de emails:

1. Completa el formulario de reserva con un email válido
2. Verifica que recibes el email de confirmación
3. Revisa la consola para ver logs del proceso

## 📂 Archivos Importantes

- **Backend Email API**: `backend/trpc/routes/bookings/send-confirmation/route.ts`
- **Formulario de Reserva**: `app/booking.tsx`
- **Router tRPC**: `backend/trpc/app-router.ts`

## 🔍 Debugging

Si los emails no se envían:

1. Verifica que `MAILERSEND_API_KEY` esté configurada
2. Revisa los logs de la consola del servidor
3. Confirma que tu dominio esté verificado en MailerSend
4. Asegúrate de que el Template ID sea correcto

## ✉️ Email del Remitente

Los emails se envían desde: `noreply@68zxl27dr734j905.mailersend.net`

Si quieres usar un dominio personalizado, necesitas:
1. Verificar tu dominio en MailerSend
2. Actualizar la dirección del remitente en el código
