import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function DashboardChart({ type, data, options, title }) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Destroy existing chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Initialize Chart.js
      chartInstanceRef.current = new Chart(canvasRef.current, {
        type,
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                boxWidth: 12,
                font: {
                  size: 11,
                  family: "'Inter', sans-serif"
                },
                color: "#475569"
              }
            },
            title: {
              display: false
            }
          },
          ...options
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <div style={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      height: "320px",
      boxSizing: "border-box"
    }}>
      {title && (
        <h4 style={{ margin: 0, fontSize: "16px", color: "#1e293b", fontWeight: "600", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
          {title}
        </h4>
      )}
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
