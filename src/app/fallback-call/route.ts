const TWIML = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial record="record-from-answer-dual" timeout="15" action="/fallback-call">
    <Number>+115645468506</Number>
  </Dial>
</Response>`;

const EMPTY_TWIML = `<?xml version="1.0" encoding="UTF-8"?>
<Response></Response>`;

function xmlResponse(body: string) {
  return new Response(body, {
    headers: { "Content-Type": "text/xml" },
  });
}

export async function GET() {
  return xmlResponse(TWIML);
}

export async function POST(request: Request) {
  // Twilio posts back to the Dial action URL with DialCallStatus when the
  // dial ends. If we returned the TwiML again there, an unanswered call
  // would redial in a loop — so answer action callbacks with an empty
  // <Response/> and only serve the forwarding TwiML to real fallback hits.
  const body = await request.text();
  if (body.includes("DialCallStatus")) {
    return xmlResponse(EMPTY_TWIML);
  }
  return xmlResponse(TWIML);
}
