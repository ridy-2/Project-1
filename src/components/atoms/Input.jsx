export default function Input({ type = "text", placeholder, value, onChange, name, disabled }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "14px",
        boxSizing: "border-box",
        // PERBAIKAN WARNA TEKS:
        color: "#000000", // Memastikan teks berwarna hitam pekat
        backgroundColor: disabled ? "#f3f4f6" : "#ffffff", // Background putih jika aktif
        outline: "none",
      }}
    />
  );
}