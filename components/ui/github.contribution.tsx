"use client";
import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { DogLoader } from "@constants/images";
import Image from "next/image";
import GitHubButton from '@ui/github.button'

export default function GitHubContribution({token, loading}) {
  const [contributions, setContributions] = useState<any[]>([]);

  useEffect(() => {
    setContributions([])
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
  }, [loading]);

  if(!contributions.length) {
    return(
      <Image src={DogLoader} alt="loading" width={100} height={100}/>
    )
  }

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      gap: '0.35rem'
    }}>
      <GitHubButton />
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
    </div>
  );
}
