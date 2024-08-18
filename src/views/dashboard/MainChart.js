import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart";
import { format } from "date-fns";

// Register the chart components
Chart.register(...registerables);

const MainChart = ({ data }) => {
  const chartRef = useRef(null);

  const labels = data.map((item) => format(new Date(item.date), "MMM d"));
  const strongModelData = data.map((item) => item.strongModelTokens);
  const weakModelData = data.map((item) => item.weakModelTokens);

  useEffect(() => {
    const updateChartColors = () => {
      if (chartRef.current) {
        const chart = chartRef.current.chartInstance;
        chart.options.scales.x.grid.color = "#e5e7eb"; // Update to the desired color
        chart.options.scales.y.grid.color = "#e5e7eb"; // Update to the desired color
        chart.update();
      }
    };

    document.documentElement.addEventListener(
      "ColorSchemeChange",
      updateChartColors
    );

    return () => {
      document.documentElement.removeEventListener(
        "ColorSchemeChange",
        updateChartColors
      );
    };
  }, []);

  return (
    <Bar
      ref={chartRef}
      data={{
        labels,
        datasets: [
          {
            label: "Strong Model Tokens",
            backgroundColor: "#f87171", // Example color
            borderColor: "#f87171",
            borderWidth: 1,
            data: strongModelData,
            barThickness: 10,
          },
          {
            label: "Weak Model Tokens",
            backgroundColor: "#34d399", // Example color
            borderColor: "#34d399",
            borderWidth: 1,
            data: weakModelData,
            barThickness: 10,
          },
        ],
      }}
      options={{
        indexAxis: "x",
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            grid: {
              color: "#e5e7eb",
              drawOnChartArea: false,
            },
            ticks: {
              color: "#374151",
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#e5e7eb",
            },
            ticks: {
              color: "#374151",
              maxTicksLimit: 5,
            },
          },
        },
      }}
    />
  );
};

export default MainChart;
