import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  // Create private repo
  const repoRes = await fetch("https://api.github.com/user/repos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `History-${Date.now()}`,
      private: true,
      auto_init: true,
    }),
  });

  if (!repoRes.ok) {
    const err = await repoRes.json();
    return NextResponse.json({ error: err }, { status: repoRes.status });
  }

  const repo = await repoRes.json();
  const owner = repo.owner.login;
  const repoName = repo.name;

  // Create N random commits
  for (let i = 0; i < 10; i++) {
    const date = randomDateWithinPastYear();
    const content = `Commit ${i} at ${date.toISOString()}`;

    // Step 1: create blob (file content)
    const blobRes = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/blobs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          encoding: "utf-8",
        }),
      }
    );
    const blob = await blobRes.json();

    // Step 2: get current reference (main branch)
    const refRes = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/ref/heads/main`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const ref = await refRes.json();
    const latestCommitSha = ref.object.sha;

    // Step 3: get commit tree
    const commitRes = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/commits/${latestCommitSha}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const commit = await commitRes.json();
    const baseTree = commit.tree.sha;

    // Step 4: create tree with new file
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/trees`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base_tree: baseTree,
          tree: [
            {
              path: `file-${i}.txt`,
              mode: "100644",
              type: "blob",
              sha: blob.sha,
            },
          ],
        }),
      }
    );
    const tree = await treeRes.json();

    // Step 5: create commit with custom date
    const newCommitRes = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/commits`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Commit ${i}`,
          tree: tree.sha,
          parents: [latestCommitSha],
          author: {
            name: owner,
            email: `${owner}@users.noreply.github.com`,
            date: date.toISOString(), // 👈 this sets the contribution date
          },
        }),
      }
    );
    const newCommit = await newCommitRes.json();

    // Step 6: update reference
    await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/refs/heads/main`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sha: newCommit.sha }),
      }
    );
  }

  return NextResponse.json({ success: true, repoUrl: repo.html_url });
}

// Helper: random date in past year
function randomDateWithinPastYear() {
  const now = new Date();
  const pastYear = new Date();
  pastYear.setFullYear(now.getFullYear() - 1); // -1
  return new Date(
    pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime())
  );
}
