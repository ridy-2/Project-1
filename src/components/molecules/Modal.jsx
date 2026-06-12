import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Label from "../atoms/Label";

// Tambahkan props 'title', 'formData', dan 'onChange'
export default function Modal({ onClose, onSave, title, formData, onChange, isEdit }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999
    }}>
      <div style={{ background: "#fff", borderRadius: "10px", padding: "24px", width: "340px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          {/* Judul dinamis berdasarkan props title */}
          <h3 style={{ margin: 0 }}>{title}</h3>
          <span onClick={onClose} style={{ cursor: "pointer", fontSize: "18px" }}>×</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <Label text="NIM" />
            <Input 
              name="nim"
              placeholder="Masukkan NIM" 
              value={formData.nim} 
              onChange={onChange} 
              disabled={isEdit} // NIM tidak bisa diubah saat mode Edit
            />
          </div>
          <div>
            <Label text="Nama" />
            <Input 
              name="nama"
              placeholder="Masukkan Nama" 
              value={formData.nama} 
              onChange={onChange} 
            />
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <button 
              onClick={onClose} 
              style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc", cursor: "pointer" }}
            >
              Batal
            </button>
            <button 
              onClick={onSave} 
              style={{ flex: 1, padding: "10px", borderRadius: "6px", background: "#1d4ed8", color: "#fff", border: "none", cursor: "pointer" }}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}