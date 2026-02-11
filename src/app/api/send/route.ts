import React from 'react';

import { EmailTemplate } from '@/components/email-template';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message, subject, email } = body;

    if (!name || !message || !subject || !email) {
      return Response.json(
        { error: 'Missing required fields: name, message, subject, email' },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfólio <onboarding@resend.dev>',
      to: ['xanderzinho26@gmail.com'],
      subject: subject,
      react: EmailTemplate({
        name,
        message,
        email,
        subject,
      }) as React.ReactElement,
    });

    if (error) {
      console.error('Resend API error:', error);
      return Response.json({ error: error.message || error }, { status: 500 });
    }

    return Response.json(data);
  } catch (err) {
    console.error('Request error:', err);
    return Response.json(
      { error: err instanceof Error ? err.message : 'Invalid request' },
      { status: 400 },
    );
  }
}
