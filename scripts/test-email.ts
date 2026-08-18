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

  console.log("Sending test email to:", contactEmail);
  const res = await transporter.sendMail({
    from: mailFromObj,
    to: contactEmail,
    subject: "Prueba de envío EIP & Associates",
    text: "Hola, esta es una prueba de envío de correo electrónico desde EIP & Associates.",
  });

  console.log("Result:", JSON.stringify(res, null, 2));
}

main().catch(console.error);
