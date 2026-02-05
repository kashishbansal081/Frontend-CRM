import { useState } from "react";
import useFetch from "../../customHooks/useFetch";
import { toast } from "react-toastify";

export default function LeadForm({ defaultValues = {} }) {
  const { data: salesAgentData } = useFetch(
    "https://crm-backend-beryl.vercel.app/v1/agents",
  );
  const { data: tagsData } = useFetch(
    "https://crm-backend-beryl.vercel.app/v1/tags",
  );

  const [form, setForm] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "New",
    tags: [],
    timeToClose: "",
    priority: "Medium",
    ...defaultValues,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagSelect = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setForm((prev) => {
      if (isChecked) {
        return { ...prev, tags: [...prev.tags, value] };
      } else {
        return { ...prev, tags: prev.tags.filter((t) => t !== value) };
      }
    });
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = e.target.value.trim();

      if (newTag && !form.tags.includes(newTag)) {
        setForm((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }

      e.target.value = "";
    }
  };

  const removeTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://crm-backend-beryl.vercel.app/v1/leads",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );

    const result = await response.json();
    console.log("Saved Lead:", result);

    toast.success("Lead added successfully!");

    setForm({
      name: "",
      source: "",
      salesAgent: "",
      status: "New",
      tags: [],
      timeToClose: "",
      priority: "Medium",
    });
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3">Form to Add a Lead</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="form-control"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="source">Lead Source:</label>
        <select
          name="source"
          id="source"
          className="form-control"
          required
          value={form.source}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Cold Call">Cold Call</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Email">Email</option>
          <option value="Other">Other</option>
        </select>
        <br />

        <label htmlFor="salesAgent">Assigned Sales Agent:</label>
        <select
          name="salesAgent"
          id="salesAgent"
          className="form-control"
          required
          value={form.salesAgent}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Sales Agent
          </option>

          {salesAgentData &&
            salesAgentData.map((sa) => (
              <option key={sa._id} value={sa._id}>
                {sa.name}
              </option>
            ))}
        </select>
        <br />

        <label htmlFor="status">Lead Status:</label>
        <select
          name="status"
          id="status"
          className="form-control"
          required
          value={form.status}
          onChange={handleChange}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Closed">Closed</option>
        </select>
        <br />

        <label className="mb-2">Tags:</label>
        <br />

        {tagsData &&
          tagsData?.map((tag) => (
            <div key={tag._id} className="form-check form-check-inline">
              <input
                type="checkbox"
                id={tag.name}
                value={tag.name}
                checked={form.tags.includes(tag.name)}
                onChange={handleTagSelect}
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor={tag.name}>
                {tag.name}
              </label>
            </div>
          ))}

        <input
          type="text"
          placeholder="Press Enter to add tag"
          className="form-control mt-3"
          onKeyDown={handleTagInput}
        />

        <div className="mt-2">
          {form.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "5px 10px",
                background: "#e3e3e3",
                marginRight: "8px",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                type="button"
                style={{
                  marginLeft: 6,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <br />

        <label htmlFor="timeToClose">Time To Close (days):</label>
        <input
          type="number"
          name="timeToClose"
          id="timeToClose"
          className="form-control"
          min="1"
          value={form.timeToClose}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="priority">Priority:</label>
        <select
          name="priority"
          id="priority"
          className="form-control"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <br />

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
