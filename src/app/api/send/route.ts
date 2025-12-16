import React from 'react';

import { EmailTemplate } from '@/components/email-template';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, message, subject, email } = await request.json();

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
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
