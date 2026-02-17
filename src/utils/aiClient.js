const fallbackSummary = ({ projectName, selectedItems }) => {
  const items = selectedItems.length ? selectedItems.join(', ') : 'core build';
  return `AI summary for ${projectName || 'your project'}: We recommend a discovery workshop, UX prototypes, and a phased build. Included scope: ${items}.`;
};

export const generateAiSummary = async ({ projectName, selectedItems }) => {
  const apiBase = process.env.REACT_APP_API_BASE_URL;
  if (!apiBase) {
    return fallbackSummary({ projectName, selectedItems });
  }

  const response = await fetch(`${apiBase}/api/ai/summary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectName, selectedItems }),
  });

  if (!response.ok) {
    return fallbackSummary({ projectName, selectedItems });
  }

  const data = await response.json();
  return data.summary || fallbackSummary({ projectName, selectedItems });
};
