import { serve } from '@hono/node-server';
import app from './hono';
import { config } from 'dotenv';

config();

const port = 3001;

console.log(`🚀 Iniciando servidor backend en puerto ${port}...`);
console.log(`🔑 MAILERSEND_API_TOKEN configurado: ${process.env.MAILERSEND_API_TOKEN ? '✅ Sí' : '❌ No'}`);

serve({
  fetch: app.fetch,
  port: port,
}, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${port}`);
  console.log(`📧 API de emails configurada con MailerSend`);
});
