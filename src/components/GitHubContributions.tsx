"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "GitHub Contributions",
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
    // Refresh data every 5 minutes
    const interval = setInterval(fetchContributions, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: contributionData.labels,
    datasets: [
      {
        label: "Contributions",
        data: contributionData.contributions,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <Bar options={options} data={data} />
    </div>
  );
}
