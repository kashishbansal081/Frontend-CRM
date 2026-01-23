import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../customHooks/useFetch";

export default function LeadFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: leads } = useFetch("https://crm-backend-beryl.vercel.app/v1/leads");
  const { data: agents } = useFetch("https://crm-backend-beryl.vercel.app/v1/agents");

  const [statusOptions] = useState([
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ]);

  const [sourceOptions] = useState([
    "Website",
    "Referral",
    "Cold Call",
    "Advertisement",
    "Email",
    "Other",
  ]);

  const tagOptions = React.useMemo(() => {
    if (!leads) return [];
    const allTags = leads.flatMap((l) => l.tags || []);
    return [...new Set(allTags)];
  }, [leads]);

  const updateFilter = (key, value) => {
    const updated = new URLSearchParams(searchParams);

    if (!value) updated.delete(key);
    else updated.set(key, value);

    setSearchParams(updated);
  };

  return (
    <div className="p-4 rounded-xl shadow border bg-white">
      <h2 className="text-xl font-semibold mb-4">Lead Filters</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="font-medium">Sales Agent</label>
          <select
            className="form-select mt-1"
            value={searchParams.get("salesAgent") || ""}
            onChange={(e) => updateFilter("salesAgent", e.target.value)}
          >
            <option value="">All</option>
            {agents?.map((agent) => (
              <option key={agent._id} value={agent.name}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Lead Status</label>
          <select
            className="form-select mt-1"
            value={searchParams.get("status") || ""}
            onChange={(e) => updateFilter("status", e.target.value)}
          >
            <option value="">All</option>
            {statusOptions.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Lead Source</label>
          <select
            className="form-select mt-1"
            value={searchParams.get("source") || ""}
            onChange={(e) => updateFilter("source", e.target.value)}
          >
            <option value="">All</option>
            {sourceOptions.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Tags</label>
          <select
            className="form-select mt-1"
            value={searchParams.get("tag") || ""}
            onChange={(e) => updateFilter("tag", e.target.value)}
          >
            <option value="">All</option>
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Sort By</label>
          <select
            className="form-select mt-1"
            value={searchParams.get("sort") || ""}
            onChange={(e) => updateFilter("sort", e.target.value)}
          >
            <option value="">None</option>
            <option value="closingDate">Estimated Closing Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
}