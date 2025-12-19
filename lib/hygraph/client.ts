import { GraphQLClient } from 'graphql-request';

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT || '';
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN || '';

// Public client for read operations
export const hygraphClient = new GraphQLClient(HYGRAPH_ENDPOINT, {
  headers: {
    ...(HYGRAPH_TOKEN && { Authorization: `Bearer ${HYGRAPH_TOKEN}` }),
  },
});

// For server-side operations with caching
export async function fetchHygraph<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate: number = 3600
): Promise<T> {
  const res = await fetch(HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(HYGRAPH_TOKEN && { Authorization: `Bearer ${HYGRAPH_TOKEN}` }),
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  const json = await res.json();

  if (json.errors) {
    console.error('Hygraph Error:', JSON.stringify(json.errors, null, 2));
    const errorMessage = json.errors[0]?.message || 'Failed to fetch from Hygraph';
    throw new Error(`Hygraph Error: ${errorMessage}`);
  }

  return json.data;
}
