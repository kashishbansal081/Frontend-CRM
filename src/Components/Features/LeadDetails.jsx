import { useState, useEffect } from "react";
import InlineField from "../InlineField";
import InlineSelect from "../InlineSelect";
import LeadComments from "./LeadComments";
import useFetch from "../../customHooks/useFetch";

export default function LeadDetails({ lead }) {
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    status: "",
    priority: "",
    salesAgent: null,
  });

  const { data } = useFetch("https://crm-backend-beryl.vercel.app/v1/agents");
  const agents = data || [];

  console.log(agents);

  useEffect(() => {
    if (lead) {
      setForm({
        status: lead.status,
        priority: lead.priority,
        salesAgent: lead.salesAgent?._id || null,
      });
    }
  }, [lead]);

  const handleSave = async () => {
    try {
      await fetch(`https://crm-backend-beryl.vercel.app/v1/leads/${lead._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: form.status,
          priority: form.priority,
          salesAgent: form.salesAgent,
        }),
      });

      setIsEdit(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update lead");
    }
  };

  return (
    <div className="container my-4">
      <div className="card mb-4 w-100">
        <div className="card-header d-flex justify-content-between">
          <h5>Lead Details</h5>

          {!isEdit ? (
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              Save
            </button>
          )}
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <InlineField
                label="Lead Name"
                value={lead.name}
                editable={false}
              />

              <InlineSelect
                label="Sales Agent"
                value={form.salesAgent || ""}
                editable={isEdit}
                options={[
                  { label: "Lead Not Assigned", value: "" },
                  ...agents?.map((agent) => ({
                    label: agent.name,
                    value: agent._id,
                  })),
                ]}
                onChange={(v) => setForm({ ...form, salesAgent: v || null })}
              />

              <InlineSelect
                label="Status"
                value={form.status}
                editable={isEdit}
                options={["New", "Contacted", "Qualified", "Closed"]}
                onChange={(v) => setForm({ ...form, status: v })}
              />
            </div>

            <div className="col-md-6">
              <InlineField
                label="Source"
                value={lead.source}
                editable={false}
              />

              <InlineSelect
                label="Priority"
                value={form.priority}
                editable={isEdit}
                options={["Low", "Medium", "High"]}
                onChange={(v) => setForm({ ...form, priority: v })}
              />

              <InlineField
                label="Time To Close"
                value={`${lead.timeToClose} days`}
                editable={false}
              />
            </div>
          </div>
        </div>
      </div>

      <LeadComments leadId={lead._id} />
    </div>
  );
}
