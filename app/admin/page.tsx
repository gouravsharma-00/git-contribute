"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Refresh } from "@constants/icons"

export default function Admin() {
  const [users, setUsers] = useState<any[]>([])
    const mongoFetch = async () => {
        setUsers(null)
      try {
        const mongo = await fetch("/api/client/admin/users", { method: "GET" })
        const response = await mongo.json()
        console.log(response)
        setUsers(response.message || [])
      } catch (err) {
        console.error("Failed to fetch users:", err)
      }
    }
  useEffect(() => {

    mongoFetch()
  }, [])

  if (!users) {
    return <p>Loading..</p>
  }

  return (
    <main style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        Admin Dashboard     
        <Image src={Refresh} alt='refresh' width={20} height={20} onClick={mongoFetch} />
      </h1>
      <table
        style={{
          width: "100%",
          border: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>User</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Github</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Profile Image</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>First Login</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Last Online</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Repo Boost</th>
          </tr>
        </thead>
        <tbody>
          {users.map((c) => (
            <tr key={c._id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>{c.username}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{c.githubUsername}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{c.email}</td>
              <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                {c.image ? (
                  <img
                    src={c.image}
                    alt={`${c.username} profile`}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {c.firstLoginDate
                  ? new Date(c.firstLoginDate).toLocaleString()
                  : "N/A"}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {c.lastOnline ? new Date(c.lastOnline).toLocaleString() : "N/A"}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {c.repoBoost}                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
