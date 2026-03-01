const nodemailer = require('nodemailer');

const DEFAULT_RECIPIENT = 'anesungombe@gmail.com';

let cachedTransporter = null;

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

const money = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return '0.00';
  return numeric.toFixed(2);
};

const getTransporter = () => {
  if (cachedTransporter) return cachedTransporter;

  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error('SMTP credentials are missing. Set SMTP_USER and SMTP_PASS.');
  }

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  return cachedTransporter;
};

const buildNewsletterEmail = (payload) => {
  const email = clean(payload.email);
  const interests = clean(payload.interests);
  const source = clean(payload.source) || 'website';

  if (!email) {
    throw new Error('Newsletter email is required.');
  }

  return {
    subject: 'ByteAxis Newsletter Signup',
    replyTo: email,
    text: [
      'A new newsletter subscription was submitted.',
      '',
      `Email: ${email}`,
      `Interests: ${interests || 'N/A'}`,
      `Source: ${source}`,
    ].join('\n'),
  };
};

const buildContactEmail = (payload) => {
  const name = clean(payload.name);
  const email = clean(payload.email);
  const service = clean(payload.service);
  const message = clean(payload.message);

  if (!name || !email || !message) {
    throw new Error('Name, email, and message are required for contact requests.');
  }

  return {
    subject: 'ByteAxis Contact Request',
    replyTo: email,
    text: [
      'A new contact request was submitted.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Service Needed: ${service || 'N/A'}`,
      '',
      'Message:',
      message,
    ].join('\n'),
  };
};

const buildQuotationEmail = (payload) => {
  const projectName = clean(payload.projectName) || 'Custom Project';
  const companyName = clean(payload.companyName);
  const timeline = clean(payload.timeline);
  const notes = clean(payload.notes);
  const subtotal = money(payload.subtotal);
  const vat = money(payload.vat);
  const total = money(payload.total);
  const client = payload.client && typeof payload.client === 'object' ? payload.client : {};
  const clientName = clean(client.name);
  const clientEmail = clean(client.email);
  const clerkUserId = clean(client.clerkUserId);
  const lineItems = Array.isArray(payload.lineItems) ? payload.lineItems : [];

  if (!lineItems.length) {
    throw new Error('Quotation must include at least one line item.');
  }

  const lineItemText = lineItems.map((item, index) => {
    const label = clean(item?.label) || `Item ${index + 1}`;
    const category = clean(item?.category) || 'General';
    const price = money(item?.price);
    return `${index + 1}. ${label} (${category}) - $${price}`;
  }).join('\n');

  return {
    subject: `ByteAxis Quotation Request - ${projectName}`,
    replyTo: clientEmail || undefined,
    text: [
      'A new quotation request was submitted.',
      '',
      `Project Name: ${projectName}`,
      `Company Name: ${companyName || 'N/A'}`,
      `Timeline: ${timeline || 'N/A'}`,
      `Client Name: ${clientName || 'N/A'}`,
      `Client Email: ${clientEmail || 'N/A'}`,
      `Clerk User ID: ${clerkUserId || 'N/A'}`,
      '',
      'Line Items:',
      lineItemText,
      '',
      `Subtotal: $${subtotal}`,
      `VAT: $${vat}`,
      `Total: $${total}`,
      '',
      `Notes: ${notes || 'N/A'}`,
    ].join('\n'),
  };
};

const buildEmail = (payload) => {
  const type = clean(payload.type).toLowerCase();

  if (type === 'newsletter') return buildNewsletterEmail(payload);
  if (type === 'contact') return buildContactEmail(payload);
  if (type === 'quotation') return buildQuotationEmail(payload);

  throw new Error('Unsupported submission type.');
};

const sendSubmissionEmail = async (payload) => {
  const transporter = getTransporter();
  const { subject, text, replyTo } = buildEmail(payload || {});
  const to = process.env.MAIL_TO || DEFAULT_RECIPIENT;
  const from = process.env.MAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER || DEFAULT_RECIPIENT;

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    replyTo,
  });

  return { ok: true };
};

module.exports = {
  sendSubmissionEmail,
};
