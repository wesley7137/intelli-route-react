import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import API_BASE_URL from "../../utils/apiConfig";

const PlaygroundTabs = () => {
  const [activeKey, setActiveKey] = useState(1);
  const [agentName, setAgentName] = useState("");
  const [objective, setObjective] = useState("");
  const [api_key, setApiKey] = useState("");
  const [agentResult, setAgentResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Chat-related state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [tokenMetrics, setTokenMetrics] = useState(null);
  const [strongModel, setStrongModel] = useState("gpt4");
  const [weakModel, setWeakModel] = useState("llama3_1_8b");
  const [threshold, setThreshold] = useState(0.5);
  const [modelConfigs, setModelConfigs] = useState({
    strong_models: {},
    weak_models: {},
  });
  const [maxTokens, setMaxTokens] = useState(1024);
  const [temperature, setTemperature] = useState(0.5);
  const [contextLength, setContextLength] = useState(1024);
  useEffect(() => {
    const fetchModelConfigs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/models`);
        const data = await response.json();
        setModelConfigs(data);
      } catch (error) {
        console.error("Error fetching model configs:", error);
      }
    };
    fetchModelConfigs();
  }, []);
  useEffect(() => {
    const savedActiveKey = localStorage.getItem("activeKey");
    if (savedActiveKey) {
      setActiveKey(Number(savedActiveKey));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("activeKey", activeKey);
  }, [activeKey]);
  const executeAgentTeam = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/execute-agent-team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_key}`,
        },
        body: JSON.stringify({
          agent_name: agentName,
          objective: objective,
        }),
      });
      const data = await response.json();
      setAgentResult(data.result);
    } catch (error) {
      console.error("Error executing agent team:", error);
      setAgentResult("Error: " + error.message);
    }
    setIsLoading(false);
  };
  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (input.trim() === "") return;
    setIsLoading(true);
    const newMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    console.log("Sending message:", newMessage);
    const access_token = localStorage.getItem("access_token");
    console.log("Access token:", access_token);

    try {
      const chatResponse = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
          "X-API-Key": api_key,
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
          strong_model: strongModel,
          weak_model: weakModel,
          threshold: threshold,
          max_tokens: maxTokens,
        }),
      });
      console.log("Chat response status:", chatResponse.status);

      if (chatResponse.ok) {
        const data = await chatResponse.json();
        console.log("Chat response:", data);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: data.content },
        ]);
        setTokenMetrics(data.token_metrics);
      } else {
        console.error("Error: Chat response not OK");
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: "Error: Unable to get response" },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Error: Unable to get response" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      <div className="flex border-b">
        <button
          className={`py-2 px-4 font-semibold ${
            activeKey === 1
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveKey(1)}
        >
          Agent Execution
        </button>
        <button
          className={`py-2 px-4 font-semibold ${
            activeKey === 2
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveKey(2)}
        >
          Chat Interface
        </button>
      </div>
      <div className="flex-grow">
        {activeKey === 1 && (
          <div className="p-4">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="agentName"
                >
                  Agent Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="agentName"
                  type="text"
                  placeholder="Enter agent name"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="objective"
                >
                  Objective
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="objective"
                  placeholder="Enter objective"
                  rows="3"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="api_key"
                >
                  API Key
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="api_key"
                  type="text"
                  placeholder="Enter API key"
                  value={api_key}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={executeAgentTeam}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Execute Agent Team"
                  )}
                </button>
              </div>
            </div>
            {agentResult && (
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h4 className="text-lg font-bold mb-2">Result:</h4>
                <pre className="bg-gray-100 p-4 rounded">{agentResult}</pre>
              </div>
            )}
          </div>
        )}
        {activeKey === 2 && (
          <Chat
            messages={messages}
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            isLoading={isLoading}
            tokenMetrics={tokenMetrics}
            strongModel={strongModel}
            setStrongModel={setStrongModel}
            weakModel={weakModel}
            setWeakModel={setWeakModel}
            threshold={threshold}
            setThreshold={setThreshold}
            maxTokens={maxTokens}
            setMaxTokens={setMaxTokens}
            temperature={temperature}
            setTemperature={setTemperature}
            contextLength={contextLength}
            setContextLength={setContextLength}
            modelConfigs={modelConfigs}
          />
        )}
      </div>
    </div>
  );
};
export default PlaygroundTabs;
