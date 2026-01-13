import React, { useRef, useState } from 'react';
import { useSession } from 'next-auth/react'

export default function FeedBack() {
  const dialogRef = useRef(null);
    const {data: session} = useSession()
  
  const [feedback, setFeedback] = useState('');

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setFeedback('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/client/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email : session ? session.user.email : 'Anonomous', feedback }),
      });

      if (!res.ok) throw new Error('Failed to submit feedback');
      alert('Feedback submitted. Thank you!');
      closeDialog();
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
  <>
    <button
      style={{
        position: "absolute",
        top: "12px",
        left: "12px",
        padding: "8px 14px",
        borderRadius: "8px",
        background: "#0f172a",
        color: "white",
        border: "none",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        transition: "all 0.2s ease"
      }}
      onMouseOver={(e) => (e.target.style.background = "#020617")}
      onMouseOut={(e) => (e.target.style.background = "#0f172a")}
      onClick={openDialog}
    >
      🐞 Report a Bug
    </button>

    <dialog
      ref={dialogRef}
      style={{
        border: "none",
        borderRadius: "14px",
        padding: "0",
        width: "420px",
        maxWidth: "90vw",
        boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
        background: "#ffffff"
      }}
    >
      <form
        onSubmit={handleSubmit}
        method="dialog"
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}
      >
        <h3
          style={{
            margin: "0",
            fontSize: "18px",
            fontWeight: "600",
            color: "#0f172a"
          }}
        >
          Report a Bug
        </h3>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Describe the bug in detail..."
          required
          rows={4}
          style={{
            width: "100%",
            resize: "none",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            outline: "none",
            fontSize: "14px",
            fontFamily: "inherit",
            background: "#f8fafc"
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #6366f1")}
          onBlur={(e) => (e.target.style.border = "1px solid #e2e8f0")}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "8px"
          }}
        >
          <button
            type="button"
            onClick={closeDialog}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              color: "#0f172a",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#6366f1",
              color: "white",
              fontWeight: "500",
              cursor: "pointer",
              boxShadow: "0 6px 14px rgba(99,102,241,0.35)"
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </dialog>
  </>
);
}
