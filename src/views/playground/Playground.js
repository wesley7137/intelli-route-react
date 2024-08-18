import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaygroundTabs from "./PlaygroundTabs";
import API_BASE_URL from "../../utils/apiConfig";

const Playground = () => {
  const [modelConfigs, setModelConfigs] = useState({
    strong_models: {},
    weak_models: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchModelConfigs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/models`);
        setModelConfigs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching model configs:", error);
        setIsLoading(false);
      }
    };

    fetchModelConfigs();
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Playground</h2>
      <PlaygroundTabs modelConfigs={modelConfigs} />
    </div>
  );
};

export default Playground;
