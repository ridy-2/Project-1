export default function Header({ title }) {
  return (
    <div style={{
      padding: "16px 24px", background: "#fff",
      borderBottom: "1px solid #e5e7eb", fontWeight: "600", fontSize: "18px"
    }}>
      {title}
    </div>
  );
}