import React from 'react';

export default function Pagination({
  currentPage,
  totalItems,
  limit,
  onPageChange,
  onLimitChange
}) {
  const totalPages = Math.ceil(totalItems / limit) || 1;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const buttonStyle = (disabled) => ({
    padding: "8px 16px",
    backgroundColor: disabled ? "#f1f5f9" : "#2563eb",
    color: disabled ? "#94a3b8" : "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s ease",
  });

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "20px",
      padding: "15px 25px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.06)",
      flexWrap: "wrap",
      gap: "15px"
    }}>
      {/* Keterangan Item */}
      <div style={{ fontSize: "14px", color: "#64748b" }}>
        Menampilkan <strong style={{ color: "#1e293b" }}>{totalItems === 0 ? 0 : (currentPage - 1) * limit + 1}</strong> - <strong style={{ color: "#1e293b" }}>{Math.min(currentPage * limit, totalItems)}</strong> dari <strong style={{ color: "#1e293b" }}>{totalItems}</strong> data
      </div>

      {/* Navigasi & Limit */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        {/* Limit Selector */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#64748b" }}>
          <span>Baris per halaman:</span>
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              color: "#1e293b",
              fontWeight: "600",
              cursor: "pointer",
              outline: "none"
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            style={buttonStyle(currentPage === 1)}
          >
            Sebelumnya
          </button>
          
          <span style={{ fontSize: "14px", color: "#475569", fontWeight: "600" }}>
            Halaman {currentPage} dari {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            style={buttonStyle(currentPage === totalPages)}
          >
            Berikutnya
          </button>
        </div>
      </div>
    </div>
  );
}
