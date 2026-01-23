export default function InlineField({
  label,
  value,
  editable = false,
  onChange,
  type = "text",
}) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">
        {label}
      </label>

      <input
        type={type}
        className={`form-control ${!editable ? "bg-light" : ""}`}
        value={value}
        disabled={!editable}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
