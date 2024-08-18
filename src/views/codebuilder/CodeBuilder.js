import React, { useState, useEffect } from "react";
import axios from "axios";
import { createPopper } from "@popperjs/core";
import "./CodeBuilder.css";
import API_BASE_URL from "../../utils/apiConfig";

const CodeBuilder = ({ userId }) => {
  const [provider, setProvider] = useState("");
  const [model, setModel] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [api_key, setApiKey] = useState("");
  const [language, setLanguage] = useState("Python");
  const [useCase, setUseCase] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);

  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const providers = {
    OpenAI: ["gpt-4o-mini", "gpt-4o"],
    Google: ["Gemini-1.5-Pro", "dialogflow-es"],
    Anthropic: ["claude-3-5-sonnet", "claude-3-opus"],
    Mistral: ["mistral-large", "codestral"],
    Ollama: ["llama3_1:8B", "deepseek-coder-v2:16B"],
  };

  const endpoints = ["chat", "agent"];

  const useCases = {
    "Research Assistant": `
# Research Assistant in Python

def research_assistant(query):
    response = requests.post('${API_BASE_URL}', json={
        "model": "${model}",
        "prompt": query + " Provide a detailed summary and relevant references.",
        "max_tokens": 1000,
        "temperature": 0.5
    }, headers={
        "Authorization": "Bearer ${api_key}",
        "Content-Type": "application/json"
    })
    return response.json()['choices'][0]['text']

print(research_assistant("What are the latest trends in artificial intelligence?"))
`,

    "Personal Assistant": `
# Personal Assistant in Python

def personal_assistant(task):
    response = requests.post('${API_BASE_URL}', json={
        "model": "${model}",
        "prompt": f"Act as my personal assistant and {task}.",
        "max_tokens": 1000,
        "temperature": 0.7
    }, headers={
        "Authorization": "Bearer ${api_key}",
        "Content-Type": "application/json"
    })
    return response.json()['choices'][0]['text']

print(personal_assistant("schedule a meeting with John for next Tuesday at 10 AM"))
`,

    "Customer Service Chatbot": `
# Customer Service Chatbot in Python

def customer_service_bot(question):
    response = requests.post('${API_BASE_URL}', json={
        "model": "${model}",
        "prompt": f"You are a customer service assistant. Please help with the following query: {question}",
        "max_tokens": 1000,
        "temperature": 0.7
    }, headers={
        "Authorization": "Bearer ${api_key}",
        "Content-Type": "application/json"
    })
    return response.json()['choices'][0]['text']

print(customer_service_bot("I want to return a product I bought last week. How do I do that?"))
`,

    "Task Automation": `
# Task Automation in JavaScript

async function automateTask(task) {
    const response = await axios.post('${API_BASE_URL}', {
        model: '${model}',
        prompt: 'Automate the following task: ' + task,
        max_tokens: 1000,
        temperature: 0.7
    }, {
        headers: {
            'Authorization': \`Bearer ${api_key}\`,
            'Content-Type': 'application/json'
        }
    });

    console.log('Automated Task Result:', response.data.choices[0].text);
}

automateTask('Generate a weekly sales report based on the attached data.')
`,

    "Marketing Content Generator": `
# Marketing Content Generator in JavaScript

async function generateMarketingContent(productDescription) {
    const response = await axios.post('${API_BASE_URL}', {
        model: '${model}',
        prompt: 'Create a compelling marketing copy for the following product: ' + productDescription,
        max_tokens: 1000,
        temperature: 0.7
    }, {
        headers: {
            'Authorization': \`Bearer ${api_key}\`,
            'Content-Type': 'application/json'
        }
    });

    console.log('Generated Marketing Content:', response.data.choices[0].text);
}

generateMarketingContent('An AI-powered tool for automating customer service tasks.')
`,
  };

  useEffect(() => {
    if (provider) {
      retrieveApiKey(provider);
    }
  }, [provider, userId]);

  const handleProviderChange = (event) => {
    setProvider(event.target.value);
    setModel("");
  };

  const retrieveApiKey = async (provider) => {
    try {
      const response = await axios.get(`/api/getApiKey`, {
        params: {
          user_id: userId,
          provider: provider,
        },
      });
      setApiKey(response.data.api_key);
    } catch (error) {
      console.error("Error retrieving API key:", error);
      setApiKey("");
    }
  };

  const generateCode = () => {
    if (!provider || !model || !endpoint) {
      setGeneratedCode("Please select all options before generating code.");
      return;
    }
    const API_KEY_PLACEHOLDER = "<YOUR_API_KEY>";
    let apiBaseUrl = API_BASE_URL || "https://api.example.com";

    let requestBody = "";
    if (language === "Python") {
      requestBody = `import requests\n\nresponse = requests.post('${apiBaseUrl}', json={...`;
    } else if (language === "JavaScript") {
      requestBody = `const axios = require('axios');\n\nconst response = await axios.post('${apiBaseUrl}', {...`;
    }

    setGeneratedCode(requestBody);
  };

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <div className="codebuilder">
      <h1 className="text-3xl font-bold mb-4">CodeBuilder</h1>

      {/* Language Selection */}
      <div className="mb-4">
        <button
          className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg bg-lightBlue-500 active:bg-lightBlue-600 ease-linear transition-all duration-150"
          ref={btnDropdownRef}
          onClick={() =>
            dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
          }
        >
          {language} Dropdown
        </button>
        <div
          ref={popoverDropdownRef}
          className={
            (dropdownPopoverShow ? "block " : "hidden ") +
            "bg-lightBlue-500 text-base z-50 py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
          }
        >
          <a
            href="#pablo"
            className="text-sm py-2 px-4 font-normal block w-full text-white"
            onClick={() => setLanguage("Python")}
          >
            Python
          </a>
          <a
            href="#pablo"
            className="text-sm py-2 px-4 font-normal block w-full text-white"
            onClick={() => setLanguage("JavaScript")}
          >
            JavaScript
          </a>
        </div>
      </div>

      {/* Provider Selection */}
      <div className="mb-4">
        <select
          className="bg-lightBlue-500 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
          value={provider}
          onChange={handleProviderChange}
        >
          <option value="" disabled>
            Select provider
          </option>
          {Object.keys(providers).map((providerKey) => (
            <option key={providerKey} value={providerKey}>
              {providerKey}
            </option>
          ))}
        </select>
      </div>

      {/* Model Selection */}
      {provider && (
        <div className="mb-4">
          <select
            className="bg-lightBlue-500 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="" disabled>
              Select model
            </option>
            {providers[provider].map((modelOption) => (
              <option key={modelOption} value={modelOption}>
                {modelOption}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Endpoint Selection */}
      <div className="mb-4">
        <select
          className="bg-lightBlue-500 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        >
          <option value="" disabled>
            Select endpoint
          </option>
          {endpoints.map((endpointOption) => (
            <option key={endpointOption} value={endpointOption}>
              {endpointOption}
            </option>
          ))}
        </select>
      </div>

      {/* Use Case Selection */}
      <div className="mb-4">
        <select
          className="bg-lightBlue-500 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
        >
          <option value="" disabled>
            Select use case
          </option>
          {Object.keys(useCases).map((useCaseKey) => (
            <option key={useCaseKey} value={useCaseKey}>
              {useCaseKey}
            </option>
          ))}
        </select>
      </div>

      {/* Generate Code Button */}
      <div className="mb-4">
        <button
          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={generateCode}
        >
          <i className="fas fa-code"></i> Generate Code
        </button>
      </div>

      {/* Generated Code Display */}
      <div className="generated-code mt-4">
        <h3 className="text-lg font-bold mb-2">Generated Code:</h3>
        <pre className="p-4 bg-blueGray-800 text-white rounded">
          {generatedCode}
        </pre>
      </div>
    </div>
  );
};

export default CodeBuilder;
