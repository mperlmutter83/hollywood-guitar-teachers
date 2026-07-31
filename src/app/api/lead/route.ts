import { NextRequest, NextResponse } from 'next/server';

// Forwards leads to the Yes Crew CRM form endpoint for Hollywood Guitar Teachers.
// The provider is resolved there from the opaque form_key — never spoofable.
const CRM_FORM_URL =
  'https://yescrew-dashboard.vercel.app/api/forms/f56927d0fd9446d3b83ed95d11cf248a/submit';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message, source, submission_id, elapsed_ms, company_website } = body;

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const serviceNeeded = [
      source ? `Source: ${source}` : null,
      message ? `Details: ${message}` : null,
    ].filter(Boolean).join(' | ') || null;

    const crmResponse = await fetch(CRM_FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        service_needed: serviceNeeded,
        submission_id,
        elapsed_ms,
        company_website, // honeypot passthrough
      }),
    });

    if (!crmResponse.ok) {
      console.error('CRM form submit failed:', crmResponse.status);
      return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
  }
}
