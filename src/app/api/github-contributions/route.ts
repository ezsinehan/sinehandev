import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    };
  };
}

export async function GET() {
  if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
    return NextResponse.json(
      { error: "GitHub token or username not configured" },
      { status: 500 }
    );
  }

  try {
    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = (await response.json()) as GitHubResponse;

    // Process the last 30 days of contributions
    const contributions =
      data.data.user.contributionsCollection.contributionCalendar.weeks
        .flatMap((week: ContributionWeek) => week.contributionDays)
        .slice(-30);

    const labels = contributions.map((day: ContributionDay) => {
      const date = new Date(day.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    const contributionCounts = contributions.map(
      (day: ContributionDay) => day.contributionCount
    );

    return NextResponse.json({
      labels,
      contributions: contributionCounts,
    });
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
}
