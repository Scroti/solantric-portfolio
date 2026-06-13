import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// null until a project id is configured — callers must guard.
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null
