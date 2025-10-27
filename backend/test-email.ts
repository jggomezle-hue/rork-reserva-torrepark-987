import { config } from 'dotenv';
import { sendBookingEmail } from './utils/mailersend';

config();

async function testEmail() {
  console.log('🧪 Iniciando prueba de envío de email...\n');
  
  console.log('🔑 Variables de entorno:');
  console.log(`   MAILERSEND_API_TOKEN: ${process.env.MAILERSEND_API_TOKEN ? '✅ Configurado' : '❌ No encontrado'}`);
  console.log('');
  
  const testBooking = {
    date: '15/01/2025',
    time: '10:00',
    numberOfChildren: 2,
    customerName: 'Juan Pérez',
    email: 'admin@torrepark.com',
    phone: '+34 600 123 456',
    childrenAges: '5, 7',
    specialRequests: 'Esta es una prueba del sistema de emails',
  };

  console.log('📋 Datos de prueba:');
  console.log(JSON.stringify(testBooking, null, 2));
  console.log('');

  try {
    const result = await sendBookingEmail(testBooking);
    console.log('\n✅ ¡Email enviado con éxito!');
    console.log('📬 Resultado:', result);
    console.log('\n🎉 Prueba completada exitosamente');
  } catch (error) {
    console.error('\n❌ Error al enviar email:');
    console.error(error);
    console.log('\n💡 Verifica:');
    console.log('   1. Que el token de MailerSend sea válido');
    console.log('   2. Que el template ID exista en tu cuenta');
    console.log('   3. Que los emails de origen y destino estén verificados');
  }
}

testEmail();
