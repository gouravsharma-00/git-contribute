import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const {searchParams } = new URL(req.url)
    const token = searchParams.get('t')

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          viewer {
            login
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    color
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
