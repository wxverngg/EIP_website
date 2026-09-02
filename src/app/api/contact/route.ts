import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

// El envío de correo requiere Node (net/tls), no el runtime Edge.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GOLD = '#C6A45D';
const REQUIRED_ENV = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'CONTACT_EMAIL'] as const;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;
  lang?: unknown;
}

interface CleanContact {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  lang: 'EN' | 'ES';
}

/** Recorta y normaliza un campo de texto libre del formulario. */
function field(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

/** Evita inyección de HTML en los correos generados. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Cabeceras de correo: un salto de línea en `replyTo` o `subject` permitiría
 * inyectar cabeceras arbitrarias (Bcc, etc.).
 */
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function isValidEmail(value: string): boolean {
  return /^[^\s@,;<>]+@[^\s@,;<>]+\.[a-z]{2,}$/i.test(value);
}

function parse(body: ContactPayload): { data?: CleanContact; error?: string } {
  const name = field(body.name, 120);
  const email = field(body.email, 160);
  const lang: 'EN' | 'ES' = body.lang === 'ES' ? 'ES' : 'EN';

  if (!name) {
    return { error: lang === 'ES' ? 'El nombre es obligatorio.' : 'Name is required.' };
  }
  if (!isValidEmail(email)) {
    return { error: lang === 'ES' ? 'El correo electrónico no es válido.' : 'A valid email address is required.' };
  }

  return {
    data: {
      name,
      email,
      phone: field(body.phone, 60),
      company: field(body.company, 160),
      service: field(body.service, 120) || 'General Inquiry',
      message: field(body.message, 5000),
      lang,
    },
  };
}

function missingEnv(): string[] {
  return REQUIRED_ENV.filter((key) => !process.env[key]);
}

function buildTransporter(): Transporter {
  const port = Number(process.env.SMTP_PORT);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // 465 = SMTPS (TLS implícito). 587/25 arrancan en claro y suben con STARTTLS.
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      // Muchos cPanel sirven `mail.dominio.com` con un certificado emitido para
      // el hostname del servidor, lo que rompe la validación. Ver SMTP_TLS_REJECT_UNAUTHORIZED.
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
      servername: process.env.SMTP_HOST,
    },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });
}

const LABELS = {
  EN: {
    name: 'Full name',
    email: 'Email',
    phone: 'Phone / WhatsApp',
    company: 'Company / Entity',
    service: 'Practice area',
    message: 'Inquiry summary',
  },
  ES: {
    name: 'Nombre completo',
    email: 'Correo electrónico',
    phone: 'Teléfono / WhatsApp',
    company: 'Empresa / Entidad',
    service: 'Área de interés',
    message: 'Descripción del caso',
  },
} as const;

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #eaeaea;font:600 12px/1.4 Arial,sans-serif;color:#555;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #eaeaea;font:400 13px/1.5 Arial,sans-serif;color:#111;">${escapeHtml(value) || '&mdash;'}</td>
    </tr>`;
}

/** Correo interno para el buzón de la firma. */
function internalEmail(data: CleanContact): { subject: string; html: string; text: string } {
  const l = LABELS[data.lang];
  const subject = `[Web] ${data.service} — ${data.name}`;

  const html = `
  <div style="background:#f5f5f5;padding:24px;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e2e2e2;border-radius:6px;overflow:hidden;">
      <tr>
        <td style="background:#0D0D0D;padding:20px 24px;">
          <div style="font:600 11px/1 Arial,sans-serif;letter-spacing:2px;color:${GOLD};text-transform:uppercase;">EIP &amp; Associates</div>
          <div style="font:400 19px/1.3 Georgia,serif;color:#ffffff;margin-top:6px;">Nueva solicitud desde el sitio web</div>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 10px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            ${row(l.name, data.name)}
            ${row(l.email, data.email)}
            ${row(l.phone, data.phone)}
            ${row(l.company, data.company)}
            ${row(l.service, data.service)}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:6px 24px 24px;">
          <div style="font:600 12px/1.4 Arial,sans-serif;color:#555;margin-bottom:8px;">${escapeHtml(l.message)}</div>
          <div style="font:400 13px/1.6 Arial,sans-serif;color:#111;white-space:pre-wrap;background:#fafafa;border-left:3px solid ${GOLD};padding:12px 14px;">${escapeHtml(data.message) || '&mdash;'}</div>
          <div style="font:400 11px/1.5 Arial,sans-serif;color:#888;margin-top:18px;">
            Responda directamente a este correo para contactar al cliente (Reply-To: ${escapeHtml(data.email)}).
          </div>
        </td>
      </tr>
    </table>
  </div>`;

  const text = [
    'Nueva solicitud desde el sitio web',
    '',
    `${l.name}: ${data.name}`,
    `${l.email}: ${data.email}`,
    `${l.phone}: ${data.phone || '-'}`,
    `${l.company}: ${data.company || '-'}`,
    `${l.service}: ${data.service}`,
    '',
    `${l.message}:`,
    data.message || '-',
  ].join('\n');

  return { subject, html, text };
}

/** Acuse de recibo para la persona que llenó el formulario. */
function confirmationEmail(data: CleanContact): { subject: string; html: string; text: string } {
  const isES = data.lang === 'ES';

  const subject = isES
    ? 'Hemos recibido su solicitud — EIP & Associates'
    : 'We have received your request — EIP & Associates';

  const heading = isES ? 'Su solicitud fue recibida' : 'Your request has been received';
  const body = isES
    ? `Estimado/a ${data.name},<br><br>Confirmamos la recepción de su consulta sobre <strong>${escapeHtml(data.service)}</strong>. Un socio director de EIP &amp; Associates revisará su caso y se pondrá en contacto con usted de forma confidencial dentro de las próximas 24 horas hábiles.<br><br>Este mensaje es un acuse de recibo automático; no es necesario responderlo.`
    : `Dear ${data.name},<br><br>We confirm receipt of your inquiry regarding <strong>${escapeHtml(data.service)}</strong>. A senior managing partner at EIP &amp; Associates will review your case and contact you confidentially within the next 24 business hours.<br><br>This message is an automatic acknowledgement; no reply is needed.`;

  const copyLabel = isES ? 'Copia de su mensaje' : 'Copy of your message';
  const signature = isES ? 'Atentamente,' : 'Sincerely,';

  const html = `
  <div style="background:#f5f5f5;padding:24px;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e2e2;border-radius:6px;overflow:hidden;">
      <tr>
        <td style="background:#0D0D0D;padding:26px 28px;text-align:center;">
          <div style="font:400 24px/1.2 Georgia,serif;color:${GOLD};letter-spacing:1px;">EIP &amp; ASSOCIATES</div>
          <div style="font:600 9px/1 Arial,sans-serif;letter-spacing:3px;color:#9a9a9a;text-transform:uppercase;margin-top:8px;">Attorneys at Law &middot; Panama</div>
        </td>
      </tr>
      <tr>
        <td style="padding:30px 28px 8px;">
          <h1 style="font:400 21px/1.3 Georgia,serif;color:#111;margin:0 0 16px;">${escapeHtml(heading)}</h1>
          <p style="font:400 14px/1.65 Arial,sans-serif;color:#333;margin:0;">${body}</p>
        </td>
      </tr>
      ${
        data.message
          ? `<tr>
        <td style="padding:18px 28px 0;">
          <div style="font:600 11px/1.4 Arial,sans-serif;letter-spacing:1px;color:#888;text-transform:uppercase;margin-bottom:8px;">${escapeHtml(copyLabel)}</div>
          <div style="font:400 13px/1.6 Arial,sans-serif;color:#444;white-space:pre-wrap;background:#fafafa;border-left:3px solid ${GOLD};padding:12px 14px;">${escapeHtml(data.message)}</div>
        </td>
      </tr>`
          : ''
      }
      <tr>
        <td style="padding:26px 28px 30px;">
          <p style="font:400 14px/1.6 Arial,sans-serif;color:#333;margin:0;">${escapeHtml(signature)}<br><strong>EIP &amp; Associates</strong></p>
        </td>
      </tr>
      <tr>
        <td style="background:#fafafa;border-top:1px solid #eaeaea;padding:18px 28px;text-align:center;">
          <div style="font:400 11px/1.6 Arial,sans-serif;color:#999;">
            Torre Las Am&eacute;ricas, Piso 28, Punta Pacífica &middot; Ciudad de Panam&aacute;<br>
            ${escapeHtml(process.env.CONTACT_EMAIL ?? '')}
          </div>
        </td>
      </tr>
    </table>
  </div>`;

  const text = [
    heading,
    '',
    isES
      ? `Estimado/a ${data.name}, confirmamos la recepción de su consulta sobre ${data.service}. Un socio director se pondrá en contacto con usted dentro de las próximas 24 horas hábiles.`
      : `Dear ${data.name}, we confirm receipt of your inquiry regarding ${data.service}. A senior managing partner will contact you within the next 24 business hours.`,
    '',
    data.message ? `${copyLabel}:\n${data.message}` : '',
    '',
    `${signature}\nEIP & Associates`,
  ]
    .filter(Boolean)
    .join('\n');

  return { subject, html, text };
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { data, error } = parse(body);
  if (!data) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  const absent = missingEnv();
  if (absent.length > 0) {
    console.error('[contact] Variables SMTP ausentes:', absent.join(', '));
    return NextResponse.json(
      {
        ok: false,
        error:
          data.lang === 'ES'
            ? 'El servicio de correo no está configurado. Por favor escríbanos directamente.'
            : 'The mail service is not configured. Please email us directly.',
      },
      { status: 500 },
    );
  }

  // cPanel exige que el remitente sea el buzón autenticado. Usar el correo del
  // visitante como `from` hace que SPF/DKIM fallen y el mensaje se pierda.
  const from = `"EIP & Associates" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`;
  const transporter = buildTransporter();

  try {
    const internal = internalEmail(data);
    await transporter.sendMail({
      from,
      to: process.env.CONTACT_EMAIL,
      replyTo: sanitizeHeader(`"${data.name}" <${data.email}>`),
      subject: sanitizeHeader(internal.subject),
      text: internal.text,
      html: internal.html,
    });
  } catch (err) {
    console.error('[contact] Fallo al enviar el aviso interno:', err);
    return NextResponse.json(
      {
        ok: false,
        error:
          data.lang === 'ES'
            ? 'No pudimos enviar su solicitud. Intente de nuevo o escríbanos directamente.'
            : 'We could not send your request. Please try again or email us directly.',
        detail: process.env.NODE_ENV === 'development' ? String(err) : undefined,
      },
      { status: 502 },
    );
  }

  // El aviso interno ya salió: el lead está a salvo. Si el acuse de recibo falla
  // lo registramos, pero no convertimos el envío en un error para el visitante.
  let confirmationSent = true;
  try {
    const confirmation = confirmationEmail(data);
    await transporter.sendMail({
      from,
      to: sanitizeHeader(`"${data.name}" <${data.email}>`),
      replyTo: process.env.CONTACT_EMAIL,
      subject: sanitizeHeader(confirmation.subject),
      text: confirmation.text,
      html: confirmation.html,
    });
  } catch (err) {
    confirmationSent = false;
    console.error('[contact] Fallo al enviar el acuse de recibo al visitante:', err);
  }

  return NextResponse.json({ ok: true, confirmationSent });
}

/**
 * Diagnóstico de la conexión SMTP sin enviar correo:
 *   GET /api/contact?secret=$CRON_SECRET
 * Útil para distinguir un problema de credenciales/TLS de un problema del formulario.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const provided = new URL(request.url).searchParams.get('secret');

  // Fail-closed: sin CRON_SECRET definido el endpoint queda inhabilitado.
  if (!secret || provided !== secret) {
    return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  }

  const absent = missingEnv();
  if (absent.length > 0) {
    return NextResponse.json({ ok: false, missingEnv: absent }, { status: 500 });
  }

  try {
    await buildTransporter().verify();
    return NextResponse.json({
      ok: true,
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      user: process.env.SMTP_USER,
      contactEmail: process.env.CONTACT_EMAIL,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
