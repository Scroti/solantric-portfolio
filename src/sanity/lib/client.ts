import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// Server-side read token. Kept out of the client bundle (no NEXT_PUBLIC_ prefix;
// this module is only imported from server code).
const token = process.env.SANITY_API_READ_TOKEN

// null until a project id is configured — callers must guard.
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'published',
      token,
    })
  : null
