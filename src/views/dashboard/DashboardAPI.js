import API_BASE_URL from '../../utils/apiConfig'

export const fetchDashboardAndModelUsageData = async (user_id, access_token) => {
  try {
    const url = new URL(`${API_BASE_URL}/dashboard-and-model-usage`)
    url.searchParams.append('user_id', user_id)
    url.searchParams.append('access_token', access_token)

    console.log('Fetching from URL:', url.toString()) // Add this line for debugging

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Received data:', data) // Add this line for debugging
    return data
  } catch (error) {
    console.error('Error fetching dashboard and model usage data:', error)
    throw error
  }
}
