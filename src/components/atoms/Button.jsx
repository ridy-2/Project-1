export default function Button({ label, onClick, variant = "primary" }) {
  const styles = {
    primary: { background: "#1d4ed8", color: "#fff" },
    danger:  { background: "#dc2626", color: "#fff" },
    secondary: { background: "#6b7280", color: "#fff" },
  };
  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: "10px 20px",
        border: "none",
        borderRadius: "6px",
        fontSize: "14px",
        cursor: "pointer",
        width: "100%",
      }}
    >
      {label}
    </button>
  );
}