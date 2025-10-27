import { serve } from '@hono/node-server';
import app from './hono';
import { config } from 'dotenv';

config();

const port = 3001;

console.log('🚀 Iniciando servidor backend...');
console.log(`📍 Puerto: ${port}`);
console.log('🔍 Verificando configuración...');
console.log(`   🔑 MAILERSEND_API_TOKEN: ${process.env.MAILERSEND_API_TOKEN ? '✅ Configurado' : '❌ NO CONFIGURADO'}`);

if (!process.env.MAILERSEND_API_TOKEN) {
  console.error('\n⚠️  ERROR: MAILERSEND_API_TOKEN no está configurado');
  console.error('📋 Para Replit: Configura el token en el panel de Secrets');
  console.error('📋 Para local: Verifica que el archivo .env tenga MAILERSEND_API_TOKEN');
  console.error('📖 Ver instrucciones en: REPLIT_ENV_SETUP.md\n');
}

serve({
  fetch: app.fetch,
  port: port,
}, () => {
  console.log(`\n✅ Servidor backend corriendo en http://localhost:${port}`);
  console.log(`📧 API de emails: ${process.env.MAILERSEND_API_TOKEN ? '✅ Lista' : '⚠️  Sin configurar'}`);
  console.log(`🌐 Endpoint tRPC: http://localhost:${port}/api/trpc`);
  console.log(`📬 Endpoint email: http://localhost:${port}/api/booking/send-email\n`);
});
