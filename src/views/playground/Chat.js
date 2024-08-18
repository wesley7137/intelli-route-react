import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { PaperAirplaneIcon } from "@heroicons/react/outline";

const Chat = ({
  messages,
  input,
  setInput,
  sendMessage,
  isLoading,
  tokenMetrics,
  strongModel,
  setStrongModel,
  weakModel,
  setWeakModel,
  threshold,
  setThreshold,
  modelConfigs,
  temperature,
  setTemperature,
  contextLength,
  setContextLength,
  maxTokens,
  setMaxTokens,
}) => {
  return (
    <div className="flex h-full">
      <div className="flex-grow flex flex-col">
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3/4 p-3 rounded-lg ${
                  msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <form onSubmit={sendMessage} className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
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
                <PaperAirplaneIcon className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="w-80 border-l p-4 overflow-y-auto">
        <Accordion title="Model Settings" defaultOpen>
          <div className="space-y-4">
            <Select
              label="Strong Model"
              value={strongModel}
              onChange={(e) => setStrongModel(e.target.value)}
              options={Object.keys(modelConfigs.strong_models)}
            />
            <Select
              label="Weak Model"
              value={weakModel}
              onChange={(e) => setWeakModel(e.target.value)}
              options={Object.keys(modelConfigs.weak_models)}
            />
            <Input
              type="number"
              label="Threshold"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              min={0}
              max={1}
              step={0.1}
            />
          </div>
        </Accordion>
        <Accordion title="Additional Configurations">
          <div className="space-y-4">
            <Input
              type="number"
              label="Temperature"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              min={0}
              max={2}
              step={0.1}
            />
            <Input
              type="number"
              label="Context Length"
              value={contextLength}
              onChange={(e) => setContextLength(parseInt(e.target.value))}
              min={1}
            />
            <Input
              type="number"
              label="Max Tokens"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              min={1}
            />
          </div>
        </Accordion>
        <Accordion title="Token Metrics" defaultOpen>
          {tokenMetrics ? (
            <div className="space-y-2">
              <p>Estimated Input Tokens: {tokenMetrics.est_input_tokens}</p>
              <p>Estimated Output Tokens: {tokenMetrics.est_output_tokens}</p>
              <p>
                Cost with Abstract: $
                {tokenMetrics.cost_with_abstract.toFixed(4)}
              </p>
              <p>
                Cost without Abstract: $
                {tokenMetrics.cost_without_abstract.toFixed(4)}
              </p>
              <p>Money Saved: ${tokenMetrics.money_saved.toFixed(4)}</p>
              <p>Strong Model: {tokenMetrics.strong_model}</p>
              <p>Weak Model: {tokenMetrics.weak_model}</p>
              <p>Model Selected: {tokenMetrics.selected_model}</p>
              <p>Complexity: {tokenMetrics.complexity.toFixed(4)}</p>
            </div>
          ) : (
            <p>No metrics available yet.</p>
          )}
        </Accordion>
      </div>
    </div>
  );
};

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  return (
    <div className="border-b last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-2 text-left font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5" />
        ) : (
          <ChevronDownIcon className="h-5 w-5" />
        )}
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const Input = ({ type, label, value, onChange, min, max, step }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);

export default Chat;
