import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, sanityConfigured } from '../env';

export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

/**
 * Safe query helper — returns `fallback` when Sanity is not configured or a
 * request fails, so the site renders with placeholder content during setup.
 */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T,
): Promise<T> {
  if (!client) return fallback;
  try {
    return await client.fetch<T>(query, params);
  } catch (err) {
    console.error('[sanity] query failed, using fallback:', err);
    return fallback;
  }
}
