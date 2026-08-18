import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * =================================================================
 * EIP & Associates – Contact Form API Endpoint (POST /api/contact)
 * =================================================================
 */

// ─── Sanitización y Eliminación de Tags HTML ─────────────────────
function sanitizeInput(text: string): string {
  if (!text) return "";
  return text
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .replace(/[\r\n]+/g, "\n") // Normalizar saltos de línea
    .trim();
}

// ─── Verificación de Cloudflare Turnstile ────────────────────────
async function verifyTurnstileToken(token: string, remoteIp: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey || secretKey.startsWith("1x00") || secretKey === "dummy") {
    console.warn("[Turnstile] Clave de prueba detectada. Omitiendo verificación remota en desarrollo.");
    return true;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp && remoteIp !== "unknown") {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return Boolean(data.success);
  } catch (error) {
    console.error("[Turnstile] Error en la verificación server-side:", error);
    // En caso de falla de la API de Cloudflare, fail-open para no bloquear clientes legítimos
    return true;
  }
}

// ─── Plantilla HTML: Correo Notificación para EIP ──────────────────
function buildEipEmailHtml(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  subject: string;
  message: string;
  dateStr: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Consulta Recibida | EIP & Associates</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0D0D0D; color: #F5F5F5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0D0D0D; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #151515; border: 1px solid rgba(200, 160, 74, 0.3); border-radius: 8px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
          
          <!-- Encabezado con Logo -->
          <tr>
            <td style="padding: 35px 40px; background: linear-gradient(180deg, #1A1A1A 0%, #151515 100%); text-align: center; border-bottom: 1px solid rgba(200, 160, 74, 0.2);">
              <h1 style="margin: 0; font-family: 'Georgia', serif; font-size: 26px; font-weight: 400; color: #C8A04A; letter-spacing: 2px;">
                EIP &amp; ASSOCIATES
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 10px; color: #A1A1AA; text-transform: uppercase; letter-spacing: 3px;">
                Firma Legal Corporativa y Migratoria
              </p>
            </td>
          </tr>

          <!-- Cuerpo Principal -->
          <tr>
            <td style="padding: 35px 40px;">
              <div style="display: inline-block; padding: 4px 12px; background-color: rgba(200, 160, 74, 0.15); border: 1px solid #C8A04A; border-radius: 20px; color: #C8A04A; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
                Nueva Consulta de Cliente
              </div>

              <h2 style="margin: 0 0 20px 0; font-family: 'Georgia', serif; font-size: 22px; font-weight: 400; color: #F5F5F5;">
                Detalles del Contacto
              </h2>

              <!-- Tarjeta de Datos -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #1A1A1A; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); width: 35%; color: #A1A1AA; font-size: 13px;">Nombre Completo:</td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #F5F5F5; font-size: 14px; font-weight: 600;">${data.firstName} ${data.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #A1A1AA; font-size: 13px;">Correo Electrónico:</td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #C8A04A; font-size: 14px; font-weight: 500;">
                    <a href="mailto:${data.email}" style="color: #C8A04A; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #A1A1AA; font-size: 13px;">Teléfono:</td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #F5F5F5; font-size: 14px;">${data.phone || "No proporcionado"}</td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #A1A1AA; font-size: 13px;">País de Residencia:</td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #F5F5F5; font-size: 14px;">${data.country}</td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; color: #A1A1AA; font-size: 13px;">Asunto de Consulta:</td>
                  <td style="padding: 16px 20px; color: #C8A04A; font-size: 14px; font-weight: 600;">${data.subject}</td>
                </tr>
              </table>

              <!-- Mensaje -->
              <h3 style="margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; color: #A1A1AA; letter-spacing: 1px;">Mensaje enviado:</h3>
              <div style="background-color: #1A1A1A; border: 1px solid rgba(200, 160, 74, 0.2); border-left: 3px solid #C8A04A; border-radius: 4px; padding: 20px; color: #E4E4E7; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${data.message}</div>

              <!-- Fecha -->
              <p style="margin: 25px 0 0 0; font-size: 12px; color: #71717A; text-align: right;">
                Fecha de envío: ${data.dateStr} (Hora Oficial de Panamá)
              </p>
            </td>
          </tr>

          <!-- Pie de página -->
          <tr>
            <td style="padding: 20px 40px; background-color: #0D0D0D; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); font-size: 11px; color: #71717A;">
              Este mensaje fue enviado automáticamente desde el sitio web de EIP &amp; Associates (eippanamalawyers.net).
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// ─── Plantilla HTML: Auto-Respuesta para el Cliente ───────────────
function buildClientAutoReplyHtml(data: { firstName: string; subject: string }): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hemos recibido su consulta | EIP & Associates</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0D0D0D; color: #F5F5F5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0D0D0D; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #151515; border: 1px solid rgba(200, 160, 74, 0.3); border-radius: 8px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
          
          <!-- Encabezado con Logo -->
          <tr>
            <td style="padding: 35px 40px; background: linear-gradient(180deg, #1A1A1A 0%, #151515 100%); text-align: center; border-bottom: 1px solid rgba(200, 160, 74, 0.2);">
              <h1 style="margin: 0; font-family: 'Georgia', serif; font-size: 26px; font-weight: 400; color: #C8A04A; letter-spacing: 2px;">
                EIP &amp; ASSOCIATES
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 10px; color: #A1A1AA; text-transform: uppercase; letter-spacing: 3px;">
                Firma Legal Corporativa y Migratoria
              </p>
            </td>
          </tr>

          <!-- Cuerpo Principal -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; font-family: 'Georgia', serif; font-size: 24px; font-weight: 400; color: #F5F5F5;">
                Estimado/a ${data.firstName},
              </h2>

              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.7; color: #D4D4D8;">
                Gracias por comunicarse con <strong style="color: #C8A04A;">EIP &amp; Associates</strong>. Le confirmamos que hemos recibido exitosamente su solicitud de información respecto a:
              </p>

              <div style="background-color: #1A1A1A; border-left: 3px solid #C8A04A; padding: 14px 18px; margin-bottom: 24px; font-size: 14px; font-weight: 600; color: #F5F5F5;">
                "${data.subject}"
              </div>

              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.7; color: #A1A1AA;">
                Uno de nuestros asesores legales especializados revisará su mensaje y se pondrá en contacto con usted en un plazo máximo de <strong style="color: #F5F5F5;">24 horas hábiles</strong>.
              </p>

              <div style="background-color: #1A1A1A; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 20px; margin-top: 30px; text-align: center;">
                <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #A1A1AA;">Contacto Directo de la Firma</p>
                <p style="margin: 0; font-size: 14px; color: #C8A04A; font-weight: 500;">
                  📞 +507 6725-6030 &nbsp;|&nbsp; 📧 info@eippanamalawyers.net
                </p>
              </div>
            </td>
          </tr>

          <!-- Pie de página -->
          <tr>
            <td style="padding: 25px 40px; background-color: #0D0D0D; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); font-size: 12px; color: #71717A; line-height: 1.6;">
              <p style="margin: 0 0 6px 0; font-weight: 500; color: #A1A1AA;">EIP &amp; Associates • Panamá</p>
              <p style="margin: 0;">Century Tower, Ciudad de Panamá, República de Panamá.</p>
              <p style="margin: 8px 0 0 0; font-size: 11px; color: #52525B;">© ${new Date().getFullYear()} EIP &amp; Associates. Todos los derechos reservados.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// ─── POST Handler Principal ──────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      subject,
      message,
      privacyPolicy,
      turnstileToken,
      website, // Honeypot
    } = body;

    // 1. Verificación Honeypot (trampa para bots)
    if (website && website.trim() !== "") {
      // Responder 200 de mentira para engañar al bot
      return NextResponse.json({
        success: true,
        message: "Solicitud procesada correctamente.",
      });
    }

    // 2. Verificación Cloudflare Turnstile
    const clientIp = request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || "unknown";
    if (turnstileToken) {
      const isValidTurnstile = await verifyTurnstileToken(turnstileToken, clientIp);
      if (!isValidTurnstile) {
        return NextResponse.json(
          {
            success: false,
            error: "La verificación de seguridad de Cloudflare ha fallado. Por favor, inténtelo de nuevo.",
          },
          { status: 400 }
        );
      }
    }

    // 3. Validaciones de Servidor
    const cleanFirstName = sanitizeInput(firstName);
    const cleanLastName = sanitizeInput(lastName);
    const cleanEmail = sanitizeInput(email).toLowerCase();
    const cleanPhone = sanitizeInput(phone);
    const cleanCountry = sanitizeInput(country);
    const cleanSubject = sanitizeInput(subject);
    const cleanMessage = sanitizeInput(message);

    if (!cleanFirstName || !cleanLastName || !cleanEmail || !cleanCountry || !cleanSubject || !cleanMessage) {
      return NextResponse.json(
        {
          success: false,
          error: "Por favor complete todos los campos obligatorios del formulario.",
        },
        { status: 400 }
      );
    }

    if (!privacyPolicy) {
      return NextResponse.json(
        {
          success: false,
          error: "Debe aceptar la Política de Privacidad para enviar su consulta.",
        },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: "Por favor ingrese una dirección de correo electrónico válida.",
        },
        { status: 400 }
      );
    }

    // Validar longitud del mensaje (20 a 3000 caracteres)
    if (cleanMessage.length < 20 || cleanMessage.length > 3000) {
      return NextResponse.json(
        {
          success: false,
          error: "El mensaje debe contener entre 20 y 3000 caracteres.",
        },
        { status: 400 }
      );
    }

    // Prevención de Header Injection
    if (/[\r\n]/.test(cleanFirstName) || /[\r\n]/.test(cleanLastName) || /[\r\n]/.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "Datos de entrada no válidos." },
        { status: 400 }
      );
    }

    // 4. Guardar en Supabase (Respaldo garantizado)
    let supabaseRecordId = null;
    try {
      const supabaseAdmin = getSupabaseAdmin();
      const { data: dbData, error: dbError } = await supabaseAdmin
        .from("contact_messages")
        .insert({
          first_name: cleanFirstName,
          last_name: cleanLastName,
          email: cleanEmail,
          phone: cleanPhone,
          country: cleanCountry,
          subject: cleanSubject,
          message: cleanMessage,
          status: "pending",
        })
        .select("id")
        .single();

      if (dbError) {
        console.error("[Supabase] Error al insertar mensaje de contacto:", dbError);
      } else if (dbData) {
        supabaseRecordId = dbData.id;
      }
    } catch (dbErr) {
      console.error("[Supabase] Excepción en base de datos:", dbErr);
    }

    // 5. Envío mediante SMTP Nodemailer (cPanel EIP)
    const host = process.env.SMTP_HOST || "mail.eippanamalawyers.net";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const user = process.env.SMTP_USER || "info@eippanamalawyers.net";
    const pass = process.env.SMTP_PASSWORD;
    const contactEmail = process.env.CONTACT_EMAIL || "info@eippanamalawyers.net";

    const mailFromObj = {
      name: "EIP & Associates",
      address: user,
    };

    const dateStr = new Date().toLocaleString("es-PA", {
      timeZone: "America/Panama",
      dateStyle: "full",
      timeStyle: "medium",
    });

    if (pass) {
      let transporter;
      try {
        transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465, // True para puerto 465 SSL
          auth: {
            user,
            pass,
          },
          pool: true,
          maxConnections: 3,
          maxMessages: 100,
          tls: {
            rejectUnauthorized: false, // Compatibilidad con certificados cPanel
          },
        });

        // Correo 1 (Prioritario): Notificación interna para EIP & Associates
        const eipMailOptions = {
          from: mailFromObj,
          to: contactEmail,
          replyTo: {
            name: `${cleanFirstName} ${cleanLastName}`,
            address: cleanEmail,
          },
          subject: `Nueva Consulta Web: ${cleanFirstName} ${cleanLastName} - ${cleanSubject}`,
          text: `NUEVA CONSULTA RECIBIDA\n\nNombre: ${cleanFirstName} ${cleanLastName}\nCorreo: ${cleanEmail}\nTeléfono: ${cleanPhone || "No proporcionado"}\nPaís: ${cleanCountry}\nAsunto: ${cleanSubject}\n\nMensaje:\n${cleanMessage}\n\nFecha: ${dateStr}`,
          html: buildEipEmailHtml({
            firstName: cleanFirstName,
            lastName: cleanLastName,
            email: cleanEmail,
            phone: cleanPhone,
            country: cleanCountry,
            subject: cleanSubject,
            message: cleanMessage,
            dateStr,
          }),
        };

        // Enviar notificación a la firma de forma secuencial y garantizada
        try {
          const eipRes = await transporter.sendMail(eipMailOptions);
          console.log("[SMTP] Correo de notificación a EIP enviado con éxito. ID:", eipRes.messageId);
        } catch (eipError) {
          console.error("[SMTP] Error crítico enviando notificación a EIP:", eipError);
        }

        // Correo 2 (Secundario): Auto-Respuesta al Cliente
        const clientMailOptions = {
          from: mailFromObj,
          to: cleanEmail,
          subject: `Confirmación de consulta recibida - EIP & Associates`,
          text: `Estimado/a ${cleanFirstName},\n\nGracias por comunicarse con EIP & Associates. Le confirmamos que hemos recibido exitosamente su solicitud de información respecto a:\n"${cleanSubject}"\n\nUno de nuestros asesores legales especializados revisará su mensaje y se pondrá en contacto con usted en un plazo máximo de 24 horas hábiles.\n\nAtentamente,\nEIP & Associates • Firma Legal Corporativa y Migratoria\nCentury Tower, Ciudad de Panamá, República de Panamá\nTeléfono: +507 6725-6030 | Correo: info@eippanamalawyers.net`,
          html: buildClientAutoReplyHtml({
            firstName: cleanFirstName,
            subject: cleanSubject,
          }),
        };

        try {
          const clientRes = await transporter.sendMail(clientMailOptions);
          console.log("[SMTP] Auto-respuesta enviada al cliente con éxito. ID:", clientRes.messageId);
        } catch (clientError) {
          console.error("[SMTP] Advertencia: No se pudo enviar auto-respuesta al cliente:", clientError);
        }
      } catch (mailError) {
        console.error("[SMTP] Error al inicializar o enviar correos electrónicas:", mailError);
      } finally {
        if (transporter) {
          try {
            transporter.close();
          } catch (e) {}
        }
      }
    } else {
      console.warn("[SMTP] Contraseña SMTP no encontrada en variables de entorno.");
    }

    return NextResponse.json({
      success: true,
      message: "Su consulta ha sido recibida correctamente. Nos pondremos en contacto a la brevedad.",
      recordId: supabaseRecordId,
    });
  } catch (error: any) {
    console.error("[API Contact] Error no controlado:", error);
    // Enmascaramiento de errores técnicos hacia el cliente
    return NextResponse.json(
      {
        success: false,
        error: "Ha ocurrido un error inesperado al procesar su solicitud. Por favor intente más tarde o contáctenos directamente al teléfono +507 6725-6030.",
      },
      { status: 500 }
    );
  }
}
