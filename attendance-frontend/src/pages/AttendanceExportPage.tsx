import React, { useState } from 'react';
import API from '../api/axios';

const AttendanceExportPage = () => {
  const [format, setFormat] = useState<'excel' | 'pdf'>('excel');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await API.get('/attendance/export', {
        params: { format, from, to, status },
        responseType: 'blob',
      });

      // Trigger download
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = `attendance-report.${format === 'excel' ? 'xlsx' : 'pdf'}`;
      a.download = filename;
      a.click();

      setMessage('✅ Export successful.');
    } catch (err) {
      console.error(err);
      setMessage('❌ Export failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">📤 Export Attendance Report</h2>

      <form onSubmit={handleExport} className="space-y-4">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as 'excel' | 'pdf')}
          className="w-full p-2 border rounded"
        >
          <option value="excel">Excel (.xlsx)</option>
          <option value="pdf">PDF (.pdf)</option>
        </select>

        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="From date"
        />

        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="To date"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="permission">Permission</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Exporting...' : 'Export Report'}
        </button>
      </form>

      {message && <p className="mt-4 text-center font-medium">{message}</p>}
    </div>
  );
};

export default AttendanceExportPage;
