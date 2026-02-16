import React from 'react';

import { EmailTemplate } from '@/components/email-template';
import {
  cleanupRateLimitMap,
  hasValidMxRecords,
  isDisposableEmail,
  isHoneypotFilled,
  isRateLimited,
  isSpamContent,
  isSubmittedTooFast,
} from '@/utils/spamDetection';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    cleanupRateLimitMap();

    const body = await request.json();
    const { name, message, subject, email, honeypot, formLoadedAt } = body;

    if (!name || !message || !subject || !email) {
      return Response.json(
        { error: 'Missing required fields: name, message, subject, email' },
        { status: 400 },
      );
    }

    if (isHoneypotFilled(honeypot)) {
      return Response.json({ id: 'ok' });
    }

    if (isSubmittedTooFast(formLoadedAt)) {
      return Response.json(
        { error: 'Submissão muito rápida. Tente novamente.' },
        { status: 422 },
      );
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return Response.json(
        { error: 'Muitas mensagens enviadas. Tente novamente mais tarde.' },
        { status: 429 },
      );
    }

    const spamCheck = isSpamContent({ name, email, subject, message });
    if (spamCheck.spam) {
      console.warn(`Spam blocked from ${ip}: ${spamCheck.reason}`);
      return Response.json({ error: spamCheck.reason }, { status: 422 });
    }

    if (isDisposableEmail(email)) {
      return Response.json(
        { error: 'Emails temporários/descartáveis não são aceitos.' },
        { status: 422 },
      );
    }

    const validMx = await hasValidMxRecords(email);
    if (!validMx) {
      return Response.json(
        {
          error:
            'O domínio do email informado não existe ou não recebe emails.',
        },
        { status: 422 },
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
