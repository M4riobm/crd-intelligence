exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

  try {
    const r = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: event.body
    });
    return { statusCode: r.status, body: JSON.stringify({ ok: r.ok }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Webhook failed' }) };
  }
};