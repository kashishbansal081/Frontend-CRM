import { useEffect, useState } from "react";
import useFetch from "../../customHooks/useFetch";
import "../../App.css";

export default function LeadComments({ leadId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [agent, setAgent] = useState("");

  const { data: salesAgents } = useFetch(
    "https://crm-backend-beryl.vercel.app/v1/agents"
  );

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(
        `https://crm-backend-beryl.vercel.app/v1/leads/${leadId}/comments`
      );
      const data = await res.json();

      setComments(data.reverse());
    }

    if (leadId) fetchComments();
  }, [leadId]);

  const addComment = async () => {
    if (!text.trim() || !agent) return;

    const res = await fetch(
      `https://crm-backend-beryl.vercel.app/v1/leads/${leadId}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentText: text,
          author: agent,
        }),
      }
    );

    const newComment = await res.json();

    setComments((prev) => [newComment, ...prev]);
    setText("");
  };

  return (
    <div className="card w-100">
      <div className="card-header fw-semibold">Comments & Updates</div>

      <div className="card-body">
        <div className="mb-3 d-flex flex-column flex-md-row gap-2">
          <textarea
            className="form-control flex-grow-1"
            rows="3"
            placeholder="Add a comment or update..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="d-flex flex-column gap-2 flex-md-grow-0" style={{ minWidth: "200px" }}>
            <select
              className="form-control"
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
            >
              <option value="">Select Sales Agent</option>
              {salesAgents && salesAgents?.map((sa) => (
                <option key={sa._id} value={sa._id}>
                  {sa.name}
                </option>
              ))}
            </select>

            <button className="btn btn-secondary" onClick={addComment}>
              Add Comment
            </button>
          </div>
        </div>

        {comments.length === 0 && <p className="text-muted">No comments yet</p>}

        {comments.map((c, idx) => (
          <div key={idx} className="border rounded p-2 mb-2">
            <div className="fw-semibold">{c.author?.name}</div>
            <div className="text-muted small">
              {new Date(c.createdAt).toLocaleString()}
            </div>
            <div>{c.commentText}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
