export default function Label({ text, htmlFor }) {
  return (
    <label htmlFor={htmlFor} style={{ fontSize: "14px", fontWeight: "500", marginBottom: "4px", display: "block" }}>
      {text}
    </label>
  );
}