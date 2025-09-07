import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function ContributionChart({ contributions }: { contributions: any[] }) {
  return (
    <CalendarHeatmap
      startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
      endDate={new Date()}
      values={contributions.map((c) => ({
        date: c.date,
        count: c.contributionCount,
      }))}
    />
  );
}
