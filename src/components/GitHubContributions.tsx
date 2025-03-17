"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
  Scale,
  CoreScaleOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "CREATIVE FLOW",
      font: {
        family: "'Arial Black', sans-serif",
        size: 24,
        weight: "bold" as const,
      },
      color: "#000000",
      padding: 20,
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      titleFont: {
        family: "Arial",
        size: 14,
        weight: "bold",
      },
      bodyFont: {
        family: "Arial",
        size: 12,
      },
      callbacks: {
        label: function (context: TooltipItem<"line">) {
          return `${context.parsed.y} contributions`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: "Arial",
          size: 12,
          weight: "bold",
        },
        color: "#000000",
      },
    },
    y: {
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
        display: true,
      },
      ticks: {
        font: {
          family: "Arial",
          size: 12,
          weight: "bold",
        },
        color: "#000000",
        callback: function (
          this: Scale<CoreScaleOptions>,
          tickValue: number | string
        ) {
          return tickValue;
        },
      },
    },
  },
};

export default function GitHubContributions() {
  const [contributionData, setContributionData] = useState<{
    labels: string[];
    contributions: number[];
  }>({ labels: [], contributions: [] });

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch("/api/github-contributions");
        const data = await response.json();
        setContributionData(data);
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
      }
    };

    fetchContributions();
    const interval = setInterval(fetchContributions, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: contributionData.labels,
    datasets: [
      {
        label: "Contributions",
        data: contributionData.contributions,
        borderColor: "#000000",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#000000",
        pointHoverBorderColor: "#FFFFFF",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full p-8 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-lg border border-gray-100">
      <div className="mb-4 text-center text-sm text-gray-600 uppercase tracking-widest">
        &ldquo;Crafting Digital Experiences&rdquo;
      </div>
      <Line options={options} data={data} />
      <div className="mt-4 text-right text-xs text-gray-500 uppercase tracking-wider">
        Contribution Flow
      </div>
    </div>
  );
}
