# Path Check (know before you pay)

A tiny web tool: a student enters branch, year, goal, budget, and language. Claude returns an honest free-first skill path, whether each paid certificate is worth it, a 4-week plan, and questions to ask before paying anyone.

## Files
- `index.html` - whole frontend (no framework, no build step)
- `api/plan.js` - serverless function that calls the Anthropic API (the prompt lives here)
- `api/track.js` - logs funnel events (page_view, plan_generated, cta_clicked, questions_copied)

## Deploy (about 5 minutes)
1. Put this folder in a GitHub repo (or run `npx vercel` inside it).
2. On vercel.com: New Project -> import the repo -> Environment Variables -> add `ANTHROPIC_API_KEY`.
3. Deploy. Open the URL on your phone and in a private window to confirm it works without login.

Optional env var: `ANTHROPIC_MODEL` (default `claude-sonnet-5-5`).

## Run locally
`npm i -g vercel`, then `ANTHROPIC_API_KEY=sk-... vercel dev`.

## Things you can change live in an interview
- Tone / rules / output shape: the `SYSTEM` prompt in `api/plan.js`
- Rate limit: `LIMIT` and `WINDOW_MS` in `api/plan.js`
- Inputs: the form in `index.html` and the `student` object in `api/plan.js`
- Events and metric: `ALLOWED` in `api/track.js`

## Known limits (be upfront about these)
- It does not know Beep's real prices or course catalog; it tells students to check checkout.
- Rate limit is in-memory, so it resets on cold starts.
- Events are only logged to Vercel logs, not stored in a database.
