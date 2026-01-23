export default function InlineSelect({
  label,
  value,
  editable,
  options,
  onChange
}) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      {editable ? (
        <select
          className="form-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt, index) => {
            if (typeof opt === "string") {
              return (
                <option key={index} value={opt}>
                  {opt}
                </option>
              );
            }

            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      ) : (
        <div className="form-control-plaintext">
          {options.find(
            (opt) =>
              (typeof opt === "string" && opt === value) ||
              (typeof opt === "object" && opt.value === value)
          )?.label || value || "Lead Not Assigned"}
        </div>
      )}
    </div>
  );
}
