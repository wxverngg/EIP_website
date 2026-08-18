import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

const envPath = path.join(process.cwd(), ".env.local");
const envContent = fs.readFileSync(envPath, "utf8");
envContent.split("\n").forEach((line) => {
  const [k, ...v] = line.split("=");
  if (k && v.length) process.env[k.trim()] = v.join("=").trim();
});

async function main() {
  const host = process.env.SMTP_HOST || "mail.eippanamalawyers.net";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER || "info@eippanamalawyers.net";
  const pass = process.env.SMTP_PASSWORD;
  const contactEmail = process.env.CONTACT_EMAIL || "info@eippanamalawyers.net";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });

  const mailFromObj = {
    name: "EIP & Associates",
    address: user,
  };

  console.log("Probando envío de notificación para EIP e email externo...");

  const eipMail = await transporter.sendMail({
    from: mailFromObj,
    to: contactEmail,
    subject: "[Test Web] Consulta de notificación interna EIP",
    text: "Esta es la notificación interna para EIP & Associates.",
  });
  console.log("1. Notificación EIP enviada:", eipMail.messageId, "Response:", eipMail.response);

  // Probar envío a correo de prueba externo
  const testClientEmail = "tbieber90@gmail.com"; // O cualquier correo del usuario
  const clientMail = await transporter.sendMail({
    from: mailFromObj,
    to: testClientEmail,
    subject: "Hemos recibido su consulta | EIP & Associates",
    text: "Hola, esta es una prueba de auto-respuesta enviada al cliente.",
  });
  console.log("2. Auto-respuesta al cliente enviada a", testClientEmail, ":", clientMail.messageId, "Response:", clientMail.response);
}

main().catch(console.error);
