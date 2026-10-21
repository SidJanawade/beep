// POST /api/track -> logs a funnel event to Vercel logs (view them in the Vercel dashboard).
// This is how the 7-day metric would be measured: plan_generated -> cta_clicked.

const ALLOWED = new Set(["page_view", "plan_generated", "cta_clicked", "questions_copied"]);

module.exports = function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    if (ALLOWED.has(body.event)) {
      console.log(JSON.stringify({ event: body.event, sid: String(body.sid || "").slice(0, 20), t: Date.now() }));
    }
  } catch (_) {}
  res.status(204).end();
};
