import React from 'react';

import { EmailTemplate } from '@/components/email-template';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(2, '5 s'),
});

export async function POST(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { remaining, limit, reset } = await rateLimit.limit(ip);

  if (remaining === 0) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    });
  }

  try {
    const { name, message, subject, email } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Portfólio <onboarding@resend.dev>',
      to: ['xanderzinho26@gmail.com'],
      subject: subject,
      react: EmailTemplate({ name, message, email }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
