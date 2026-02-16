import dns from 'dns';

const MIN_SUBMIT_TIME_MS = 3_000;

const UPPERCASE_RATIO_THRESHOLD = 0.6;
const CONSONANT_RUN_RE = /[bcdfghjklmnpqrstvwxyz]{6,}/i;
const MIN_VOWEL_RATIO = 0.15;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 15 * 60 * 1_000;

let lastCleanup = Date.now();

export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === 'string' && value.length > 0;
}

export function isSubmittedTooFast(formLoadedAt: number | undefined): boolean {
  if (!formLoadedAt || typeof formLoadedAt !== 'number') return true;
  const elapsed = Date.now() - formLoadedAt;
  return elapsed < MIN_SUBMIT_TIME_MS;
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return true;
  }

  return false;
}

export function cleanupRateLimitMap() {
  const now = Date.now();
  if (now - lastCleanup < 10 * 60 * 1_000) return;
  lastCleanup = now;
  for (const key of Array.from(rateLimitMap.keys())) {
    const entry = rateLimitMap.get(key);
    if (entry && now > entry.resetAt) rateLimitMap.delete(key);
  }
}

function vowelRatio(text: string): number {
  const letters = text.replace(/[^a-záàâãéèêíìîóòôõúùûç]/gi, '');
  if (letters.length === 0) return 0;
  const vowels = letters.replace(/[^aeiouáàâãéèêíìîóòôõúùû]/gi, '');
  return vowels.length / letters.length;
}

function uppercaseRatio(text: string): number {
  const letters = text.replace(/[^a-zA-ZÀ-ÿ]/g, '');
  if (letters.length === 0) return 0;
  const upper = letters.replace(/[^A-ZÀ-ÖÙ-Ý]/g, '');
  return upper.length / letters.length;
}

function hasLongConsonantRuns(text: string): boolean {
  return CONSONANT_RUN_RE.test(text);
}

function isGibberish(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 4) return false;

  if (hasLongConsonantRuns(trimmed)) return true;
  if (vowelRatio(trimmed) < MIN_VOWEL_RATIO && trimmed.length > 6) return true;
  if (trimmed.length > 8 && uppercaseRatio(trimmed) > UPPERCASE_RATIO_THRESHOLD)
    return true;

  return false;
}

export function isSpamContent(fields: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { spam: boolean; reason?: string } {
  if (isGibberish(fields.name)) {
    return { spam: true, reason: 'Nome parece ser gerado automaticamente.' };
  }

  if (isGibberish(fields.subject)) {
    return { spam: true, reason: 'Assunto parece ser gerado automaticamente.' };
  }

  if (isGibberish(fields.message)) {
    return {
      spam: true,
      reason: 'Mensagem parece ser gerada automaticamente.',
    };
  }

  const localPart = fields.email.split('@')[0] ?? '';
  if (isGibberish(localPart.replace(/[.0-9_-]/g, ''))) {
    return { spam: true, reason: 'Email parece ser gerado automaticamente.' };
  }

  return { spam: false };
}

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamailblock.com',
  'tempmail.com',
  'temp-mail.org',
  'throwaway.email',
  'yopmail.com',
  'yopmail.fr',
  'sharklasers.com',
  'guerrillamail.de',
  'grr.la',
  'dispostable.com',
  'mailnesia.com',
  'maildrop.cc',
  'discard.email',
  'fakeinbox.com',
  'trashmail.com',
  'trashmail.me',
  'trashmail.net',
  'trashmail.org',
  'mailcatch.com',
  'tempr.email',
  'tempail.com',
  'mohmal.com',
  'burnermail.io',
  'guerrillamail.info',
  'harakirimail.com',
  'jetable.org',
  'mailexpire.com',
  'mailforspam.com',
  'meltmail.com',
  'mintemail.com',
  'mytemp.email',
  'spamgourmet.com',
  'tempinbox.com',
  'tmpmail.net',
  'tmpmail.org',
  '10minutemail.com',
  '10minutemail.net',
  'getairmail.com',
  'mailnator.com',
  'crazymailing.com',
  'tmail.ws',
  'emailondeck.com',
  'getnada.com',
  'temp-mail.io',
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  return DISPOSABLE_DOMAINS.has(domain);
}

export async function hasValidMxRecords(email: string): Promise<boolean> {
  const domain = email.split('@')[1];
  if (!domain) return false;

  try {
    const addresses = await dns.promises.resolveMx(domain);
    return addresses.length > 0;
  } catch {
    return false;
  }
}
