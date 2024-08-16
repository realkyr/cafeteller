import { apiHealthCheckRepo } from '@/repositories'

export const getAPIHealthCheck = async () => {
  return apiHealthCheckRepo()
}
