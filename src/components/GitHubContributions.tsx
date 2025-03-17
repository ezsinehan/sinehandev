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
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "GitHub Contributions",
      font: {
        size: 16,
        weight: "bold",
      },
      color: "#374151",
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleFont: {
        size: 12,
      },
      bodyFont: {
        size: 11,
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
          size: 11,
        },
        color: "#6B7280",
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 8,
      },
    },
    y: {
      grid: {
        color: "rgba(107, 114, 128, 0.1)",
        display: true,
      },
      ticks: {
        font: {
          size: 11,
        },
        color: "#6B7280",
        maxTicksLimit: 5,
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
        borderColor: "#4B5563",
        backgroundColor: "rgba(75, 85, 99, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: "#4B5563",
        pointHoverBorderColor: "#FFFFFF",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <div className="h-[300px]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
