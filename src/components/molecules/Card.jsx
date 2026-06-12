export default function Card({ title, value }) {
  return (
    <div style={{
      background: "#fff", borderRadius: "10px", padding: "20px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.1)", minWidth: "160px"
    }}>
      <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>{title}</p>
      <h2 style={{ margin: "8px 0 0", fontSize: "28px", color: "#1d4ed8" }}>{value}</h2>
    </div>
  );
}