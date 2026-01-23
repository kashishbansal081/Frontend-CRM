import { useState } from "react";
import Sidebar from "../Layout/Sidebar";

export default function SalesAgentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("https://crm-backend-beryl.vercel.app/v1/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        alert("Agent created successfully");
      } else {
        alert("Failed to create agent");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1  main-content-padding">
        <h2 className="mb-4">Add New Sales Agent</h2>

        <div className="card p-4" style={{ width: "50%" }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Agent Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Create Agent
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
