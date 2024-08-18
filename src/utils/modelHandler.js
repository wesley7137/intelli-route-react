const axios = require('axios')

const handleOpenAIRequest = async (query) => {
  const apiUrl = 'https://api.openai.com/v1/completions'
  const apiKey = process.env.OPENAI_API_KEY

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-4',
        prompt: query,
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error in OpenAI request:', error)
    throw new Error('OpenAI request failed')
  }
}

const handleLlamaRequest = async (query) => {
  const apiUrl = 'https://llama-api-endpoint.com/query'
  const apiKey = process.env.LLAMA_API_KEY

  try {
    const response = await axios.post(
      apiUrl,
      {
        query: query,
        model: 'llama-3h8b',
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error in Llama request:', error)
    throw new Error('Llama request failed')
  }
}

module.exports = {
  handleOpenAIRequest,
  handleLlamaRequest,
}
