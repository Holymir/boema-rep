'use client';

import { Analytics } from '@vercel/analytics/react';
import { useConsent } from './consent';

/**
 * Vercel Analytics only mounts after the visitor accepts non-essential
 * cookies — GDPR consent gate.
 */
export default function ConsentAnalytics() {
  const consent = useConsent();
  if (consent !== 'accepted') return null;
  return <Analytics />;
}
