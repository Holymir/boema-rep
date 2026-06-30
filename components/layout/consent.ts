'use client';

import { useEffect, useState } from 'react';

export const CONSENT_KEY = 'mpb_cookie_consent';
export const CONSENT_EVENT = 'mpb-consent-change';

export type Consent = 'accepted' | 'declined' | null;

export function readConsent(): Consent {
  if (typeof window === 'undefined') return null;
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === 'accepted' || v === 'declined' ? v : null;
}

export function setConsent(value: Exclude<Consent, null>) {
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/** Reactive hook that tracks the current consent choice. */
export function useConsent(): Consent {
  const [consent, setStateConsent] = useState<Consent>(null);

  useEffect(() => {
    setStateConsent(readConsent());
    const handler = () => setStateConsent(readConsent());
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  return consent;
}
