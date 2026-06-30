import { z } from 'zod';

export const ALLOWED_EXT = ['step', 'stp', 'xt', 'pdf', 'jpg', 'jpeg'] as const;
export const MAX_BYTES = 20 * 1024 * 1024; // 20 MB

export const rfqSchema = z.object({
  name: z.string().trim().min(1).max(200),
  company: z.string().trim().max(200).optional().default(''),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).optional().default(''),
  interest: z.string().trim().max(200).optional().default(''),
  message: z.string().trim().min(1).max(5000),
  locale: z.enum(['bg', 'en']).optional().default('bg'),
});

export type RfqInput = z.infer<typeof rfqSchema>;

export function isAllowedFile(name: string, size: number): boolean {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  return (ALLOWED_EXT as readonly string[]).includes(ext) && size > 0 && size <= MAX_BYTES;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
