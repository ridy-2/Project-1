import { useState, useEffect } from "react";
import DashboardApi from "../api/DashboardApi";
import { toastError } from "../helpers/toast";
import DashboardChart from "../components/atoms/DashboardChart";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalMahasiswa: 0, mahasiswaAktif: 0, mahasiswaTidakAktif: 0,
    totalDosen: 0, dosenAktif: 0, dosenTidakAktif: 0,
    totalMataKuliah: 0, totalKelas: 0,
    rawMahasiswa: [], rawDosen: [], rawMataKuliah: [], rawKelas: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await DashboardApi.getStats();
        setStats(data);
      } catch (err) {
        toastError("Gagal memuat statistik dashboard!");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const Card = ({ label, value, color, icon }) => (
    <div style={{
      backgroundColor: "#fff",
      padding: "20px 25px",
      borderRadius: "12px",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderLeft: `5px solid ${color || "#2563eb"}`
    }}>
      <div>
        <p style={{ color: "#64748b", margin: 0, fontSize: "14px", fontWeight: "600" }}>{label}</p>
        <h2 style={{ fontSize: "28px", margin: "5px 0 0 0", color: "#1e293b", fontWeight: "700" }}>{value}</h2>
      </div>
      <div style={{ fontSize: "32px" }}>{icon}</div>
    </div>
  );

  // Grouping & aggregation logic for Charts
  // 1. Mata Kuliah per Semester
  const semesterCounts = {};
  stats.rawMataKuliah.forEach(mk => {
    const sem = mk.semester || 1;
    semesterCounts[sem] = (semesterCounts[sem] || 0) + 1;
  });
  const sortedSemesters = Object.keys(semesterCounts).map(Number).sort((a, b) => a - b);
  const semesterLabels = sortedSemesters.map(k => `Semester ${k}`);
  const semesterData = sortedSemesters.map(k => semesterCounts[k]);

  // 2. Ruangan Kelas
  const roomCounts = {};
  stats.rawKelas.forEach(k => {
    const r = k.ruang || "Lainnya";
    roomCounts[r] = (roomCounts[r] || 0) + 1;
  });
  const sortedRooms = Object.keys(roomCounts).sort((a, b) => roomCounts[b] - roomCounts[a]);
  const roomLabels = sortedRooms;
  const roomData = sortedRooms.map(r => roomCounts[r]);

  // Chart configs
  const mahasiswaChartData = {
    labels: ["Aktif", "Tidak Aktif"],
    datasets: [{
      data: [stats.mahasiswaAktif, stats.mahasiswaTidakAktif],
      backgroundColor: ["#10b981", "#ef4444"],
      hoverOffset: 4
    }]
  };

  const dosenChartData = {
    labels: ["Aktif", "Tidak Aktif"],
    datasets: [{
      data: [stats.dosenAktif, stats.dosenTidakAktif],
      backgroundColor: ["#06b6d4", "#f43f5e"],
      hoverOffset: 4
    }]
  };

  const matakuliahChartData = {
    labels: semesterLabels.length > 0 ? semesterLabels : ["Semester 1"],
    datasets: [{
      label: "Jumlah MK",
      data: semesterData.length > 0 ? semesterData : [0],
      backgroundColor: "#3b82f6",
      borderRadius: 6,
      barThickness: 20
    }]
  };

  const kelasChartData = {
    labels: roomLabels.length > 0 ? roomLabels : ["Belum Ada"],
    datasets: [{
      label: "Jumlah Kelas",
      data: roomData.length > 0 ? roomData : [0],
      backgroundColor: "#8b5cf6",
      borderRadius: 6,
      barThickness: 15
    }]
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "80px", color: "#64748b", fontSize: "16px" }}>Memuat statistik...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px", padding: "10px" }}>
      <div>
        <h3 style={{ color: "#1e293b", margin: "0 0 5px 0", fontWeight: "700" }}>Statistik Akademik</h3>
        <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>Ringkasan data real-time dashboard akademik kampus.</p>
      </div>

      {/* Top summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
        <Card label="Total Mahasiswa" value={stats.totalMahasiswa} color="#2563eb" icon="🎓" />
        <Card label="Total Dosen" value={stats.totalDosen} color="#06b6d4" icon="👨‍🏫" />
        <Card label="Total Mata Kuliah" value={stats.totalMataKuliah} color="#d97706" icon="📚" />
        <Card label="Total Kelas" value={stats.totalKelas} color="#8b5cf6" icon="🏛️" />
      </div>

      {/* Charts section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "25px" }}>
        {/* Chart 1: Donut Mahasiswa */}
        <DashboardChart
          type="doughnut"
          data={mahasiswaChartData}
          title="Distribusi Status Mahasiswa"
          options={{
            plugins: {
              legend: { position: "right" }
            }
          }}
        />

        {/* Chart 2: Pie Dosen */}
        <DashboardChart
          type="pie"
          data={dosenChartData}
          title="Status Keaktifan Dosen"
          options={{
            plugins: {
              legend: { position: "right" }
            }
          }}
        />

        {/* Chart 3: Bar MK per Semester */}
        <DashboardChart
          type="bar"
          data={matakuliahChartData}
          title="Sebaran Mata Kuliah per Semester"
          options={{
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1 }
              }
            }
          }}
        />

        {/* Chart 4: Horizontal Bar Kelas Room */}
        <DashboardChart
          type="bar"
          data={kelasChartData}
          title="Penggunaan Ruang Kelas"
          options={{
            indexAxis: 'y',
            scales: {
              x: {
                beginAtZero: true,
                ticks: { stepSize: 1 }
              }
            }
          }}
        />
      </div>
    </div>
  );
}
