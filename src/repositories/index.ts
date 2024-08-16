import axios from '@/utils/axios'

interface HealthCheck {
  version: string
  environment: string
}

export const apiHealthCheckRepo = async (): Promise<HealthCheck> => {
  try {
    const response = await axios.get('/health')
    return response.data
  } catch (error) {
    console.error('Error fetching health check:', error)
    return {
      version: 'unknown',
      environment: 'unknown'
    }
  }
}
