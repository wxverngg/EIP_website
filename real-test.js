const nodemailer = require('nodemailer');
const fs = require('fs');

const envConfig = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...values] = line.split('=');
  if (key && values.length > 0) acc[key.trim()] = values.join('=').trim().replace(/\r/g, '');
  return acc;
}, {});
process.env = { ...process.env, ...envConfig };

async function runRealTest() {
  const port = Number(process.env.SMTP_PORT);
  console.log('--- DIAGNÓSTICO SMTP ---');
  console.log('Autenticando como:', process.env.SMTP_USER);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
      servername: process.env.SMTP_HOST,
    },
    // Habilitar debug logger de nodemailer para ver las respuestas completas del servidor
    logger: true,
    debug: true
  });

  try {
    const from = `"EIP & Associates" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`;
    const to = "test@gmail.com";
    
    console.log(`\n1. Intentando enviar correo interno de prueba...`);
    console.log(`From: ${from}`);
    console.log(`To: ${to}`);

    const info = await transporter.sendMail({
      from,
      to,
      subject: "[TEST] Prueba de Diagnóstico del Sistema",
      text: "Este es un mensaje de prueba para verificar que el envío SMTP funciona correctamente.",
      html: "<p>Este es un mensaje de prueba para verificar que el envío SMTP funciona correctamente.</p>"
    });

    console.log('\n✅ RESULTADO DEL ENVÍO:');
    console.log('Mensaje aceptado por el servidor SMTP.');
    console.log('Message ID:', info.messageId);
    console.log('Respuesta del servidor:', info.response);

  } catch (err) {
    console.error('\n❌ ERROR DURANTE EL ENVÍO:');
    console.error(err.message);
    if (err.response) {
      console.error('Respuesta SMTP:', err.response);
    }
  }
}

runRealTest();
