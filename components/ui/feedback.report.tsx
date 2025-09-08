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
          position: 'absolute',
          top: '0',
          left: '0',
          padding: '0.25rem',
          marginTop: '5px',
          marginLeft: '5px'
        }}
        onClick={openDialog}
      >
        Report a Bug
      </button>

      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit} method="dialog">
          <h3>Report a Bug</h3>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Describe the bug..."
            required
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Submit</button>
            <button type="button" onClick={closeDialog} style={{ marginLeft: '0.5rem' }}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
