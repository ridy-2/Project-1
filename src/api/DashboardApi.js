import api from '../helpers/api';

const DashboardApi = {
  getStats: async () => {
    const [mhsRes, dosenRes, mkRes, kelasRes] = await Promise.all([
      api.get('/mahasiswa'),
      api.get('/dosen'),
      api.get('/matakuliah'),
      api.get('/kelas')
    ]);

    const mhs = mhsRes.data;
    const dosen = dosenRes.data;
    const mk = mkRes.data;
    const kelas = kelasRes.data;

    return {
      totalMahasiswa: mhs.length,
      mahasiswaAktif: mhs.filter(m => m.status === true).length,
      mahasiswaTidakAktif: mhs.filter(m => m.status === false).length,
      totalDosen: dosen.length,
      dosenAktif: dosen.filter(d => d.status === true).length,
      dosenTidakAktif: dosen.filter(d => d.status === false).length,
      totalMataKuliah: mk.length,
      totalKelas: kelas.length,
      rawMahasiswa: mhs,
      rawDosen: dosen,
      rawMataKuliah: mk,
      rawKelas: kelas
    };
  }
};

export default DashboardApi;

