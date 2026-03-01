const { sendSubmissionEmail } = require('../../server/submissionsHandler');

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed.' });
  }

  try {
    const payload = event.body ? JSON.parse(event.body) : {};
    await sendSubmissionEmail(payload);
    return json(200, { ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send submission.';
    return json(500, { ok: false, error: message });
  }
};
