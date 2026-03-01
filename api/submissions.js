const { sendSubmissionEmail } = require('../server/submissionsHandler');

const parseBody = (body) => {
  if (!body) return {};
  if (typeof body === 'object') return body;
  if (typeof body === 'string') return JSON.parse(body);
  return {};
};

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed.' });
    return;
  }

  try {
    const payload = parseBody(req.body);
    await sendSubmissionEmail(payload);
    res.status(200).json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send submission.';
    res.status(500).json({ ok: false, error: message });
  }
};
