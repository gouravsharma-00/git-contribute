"use client";
import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function GitHubContribution({token}) {
  const [contributions, setContributions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/client/contribution?t=${token}`);
      const json = await res.json();
      const weeks =
        json?.data?.viewer?.contributionsCollection?.contributionCalendar
          ?.weeks || [];
      const days = weeks.flatMap((week: any) => week.contributionDays);
      setContributions(days);
    }
    fetchData();
  }, []);

  return (
      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        values={contributions.map((c) => ({
          date: c.date,
          count: c.contributionCount,
        }))}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return `color-github-${Math.min(value.count, 4)}`;
        }}
      />
  );
}
