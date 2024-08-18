import axios from 'axios'
import apiConfig from './apiConfig'

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(apiConfig.DASHBOARD_ENDPOINT)
    console.log('Dashboard data received:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    if (error.response) {
      console.error('Response data:', error.response.data)
      console.error('Response status:', error.response.status)
    }
    throw error
  }
}

export const fetchModelUsageData = async () => {
  try {
    const response = await axios.get(apiConfig.MODEL_USAGE_ENDPOINT)
    console.log('Model usage data received:', response.data)

    // Process the data into the required format
    const processedData = response.data.timeline_data.map((item) => ({
      date: item.date,
      strongModelTokens: item.strong_model_usage,
      weakModelTokens: item.weak_model_usage,
    }))

    return {
      chartData: processedData,
      tableData: response.data.tableData,
    }
  } catch (error) {
    console.error('Error fetching model usage data:', error)
    if (error.response) {
      console.error('Response data:', error.response.data)
      console.error('Response status:', error.response.status)
    }
    throw error
  }
}
