const getSubmissionEndpoints = () => {
  const customEndpoint = process.env.REACT_APP_SUBMISSION_ENDPOINT;
  if (customEndpoint) return [customEndpoint];

  return ['/api/submissions', '/.netlify/functions/submissions'];
};

const parseJsonIfAvailable = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return null;

  try {
    return await response.json();
  } catch (error) {
    return null;
  }
};

export const submitLead = async (payload) => {
  const endpoints = getSubmissionEndpoints();
  let lastError = new Error('Submission endpoint is unavailable.');

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await parseJsonIfAvailable(response);

      if (response.ok && data?.ok) {
        return data;
      }

      if (response.status === 404 || !data) {
        continue;
      }

      throw new Error(data.error || 'Failed to submit request.');
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Failed to submit request.');
    }
  }

  throw lastError;
};
